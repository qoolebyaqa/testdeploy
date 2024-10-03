import { createBrowserRouter, defer, redirect } from "react-router-dom";
import ContractBrowse from "../components/Contracts/ContractBrowse/ContractBrowse";
import KATMBrowseContent from "../components/Katm/KATMBrowse/KATMBrowseContent";
import Contracts from "../pages/Contracts";
import Employees from "../pages/Eployees";
import FilialBrowse from "../pages/FilialBrowse";
import Filials from "../pages/Filials";
import KATM from "../pages/KATM";
import NewClient from "../pages/NewClient";
import NewEmployeePage from "../pages/NewEmployeePage";
import Notification from "../pages/Notification";
import Authentification from "../pages/Authentification";
import RootLayout from "../pages/RootLayout";
import { ApiService } from "./API/ApiSerivce";
import ClientBrowse from "../components/Clients/ClientBrowse/ClientBrowse";
import store from "../store";
import EmployeeBrowse from "../components/Employees/EmployeeBrowse/EmployeeBrowse";
import Password from "../pages/Password";
import CashCredit from "../components/Cash/CashCredit";
import CashDebet from "../components/Cash/CashDebit";
import DebitCreditLayout from "../pages/Cash/DebitCreditLayout";
import General from "../components/Cash/General";
import Received from "../components/Cash/Received";
import Lowcost from "../components/Cash/Lowcost";
import Bills from "../pages/Cash/Bills";
import { RouteProtector } from "../components/UI/RouteProtector";
import Main from "../pages/Main";
import Clients from "../pages/Clients";
import Monitoring from "../pages/Monitoring";
import NotFound from "../pages/NotFound";
import { clientActions } from "../store/client";

const childrenCashOperationsRoutes = [
  { path: "debet", element: <CashDebet /> },
  { path: "credit", element: <CashCredit /> },
  { path: "general", element: <General /> },
  { path: "received", element: <Received /> },
  { path: "lowcost", element: <Lowcost /> },
];

const childrenRoutes = [
  {
    path: "",
    element: <RouteProtector allowedRoles={['USER', 'ADMIN', 'ACCOUNTANT']}><Main /></RouteProtector>,
    title: "Главная страница",
  },
  {
    path: "/clients",
    children: [{
      path: "",
      element: <RouteProtector allowedRoles={['USER']}><Clients /></RouteProtector>,
      title: "Клиенты",
      loader: clientsLoader,
    },{
      path: ":id_browse",
      element: <RouteProtector allowedRoles={['USER']}><ClientBrowse /></RouteProtector>,
      title: "Обзор клиента",
      loader: clientLoader,
    }],
  },
  {
    path: "/contracts",
    title: "Контракты",
    children: [
      { path: "", 
        element: <RouteProtector allowedRoles={['USER']}><Contracts /></RouteProtector>, 
        title: "Контракты" },
      {
        path: ":id_browse",
        element: <RouteProtector allowedRoles={['USER']}><ContractBrowse /></RouteProtector>,
        title: "Обзор договора",
      },
    ],
  },
  {
    path: "/katm",
    title: "КАТМ",
    children: [
      { 
        path: "", 
        element: <RouteProtector allowedRoles={['USER']}><KATM /></RouteProtector>, 
        title: "КАТМ" },
      {
        path: ":id_browse",
        element: <RouteProtector allowedRoles={['USER']}><KATMBrowseContent /></RouteProtector>,
        title: "выбранный КАТМ",
      },
    ],
  },  
  { 
    path: "/sms", 
    element: <RouteProtector allowedRoles={['USER', 'ADMIN']}><Notification /></RouteProtector>, 
    title: "Уведомления" 
  },
  { 
    path: "/monitoring", 
    element: <RouteProtector allowedRoles={['ADMIN']}><Monitoring /></RouteProtector>, 
    title: "Мониторинг" 
  },
  {
    path: "/employees",
    title: "Сотрудники",
    children: [
      {
        path: "",
        element: <RouteProtector allowedRoles={['ADMIN']}><Employees /></RouteProtector>,
        title: "Сотрудники",
        loader: employeesLoader,
      },
      {
        path: ":id_browse",
        element: <RouteProtector allowedRoles={['ADMIN']}><EmployeeBrowse /></RouteProtector>,
        title: "Обзор сотрудника",
        loader: employeeLoader,
      },
    ],
  },
  {
    path: "/filials",
    title: "Филиалы",
    children: [
      { path: "", element: <RouteProtector allowedRoles={['ADMIN']}><Filials /></RouteProtector>, title: "Филиалы" },
      { path: ":id_browse", element: <RouteProtector allowedRoles={['ADMIN']}><FilialBrowse /></RouteProtector>, title: "Обзор филиала" },
    ],
  },
  {
    path: "/new-employee",
    element: <RouteProtector allowedRoles={['ADMIN']}><NewEmployeePage /></RouteProtector>,
    title: "Регистрация сотрудника",
  },
  { path: "/new-client", element: <RouteProtector allowedRoles={['USER']}><NewClient /></RouteProtector>, title: "Регистрация Клиента" },
  {
    path: "/accountant/",
    children: [
      { 
        path: "operations/", 
        element: <RouteProtector allowedRoles={['ACCOUNTANT']}><DebitCreditLayout /></RouteProtector>,
        children: childrenCashOperationsRoutes 
      },     
      { path: "/accountant/bills", element: <RouteProtector allowedRoles={['ACCOUNTANT']}><Bills /></RouteProtector> },
      { path: "/accountant/deals", element: <RouteProtector allowedRoles={['ACCOUNTANT']}><Bills /></RouteProtector> },
      { path: "/accountant/proccess", element: <RouteProtector allowedRoles={['ACCOUNTANT']}><Bills /></RouteProtector> },
      { path: "/accountant/reports", element: <RouteProtector allowedRoles={['ACCOUNTANT']}><Bills /></RouteProtector> },
      { path: "/accountant/monitoring", element: <RouteProtector allowedRoles={['ACCOUNTANT']}><Bills /></RouteProtector> },]
  }
];


export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Authentification />,
    errorElement: <NotFound />
  },
  {
    path: "/",
    element: <RootLayout />,
    children: childrenRoutes,
    errorElement: <NotFound />
  },
  {
    path: "/password/:tkn",
    element: <Password />,
    loader: passReset,
  },
]);

//loaders
async function passReset({ params }: any) {
  try {
    const OTP = await ApiService.getOTP(params.tkn);
    return OTP;
  } catch (err) {
    console.log(err)
    return new Error('Some problem with server')
  }
}

async function clientsLoader() {
  if (!localStorage.getItem("rt")) {
    return redirect("/auth");
  } else {
    const response = await ApiService.getCustomers();
    if (response.status === 401) {
      return redirect("/auth");
    } else {
      return response.data.content
        .map((item: any, index: number) => {
          const client: any = { ...item };
          client.key = item.id;
          client.index = index + 1;
          client.name = `${item.first_name} ${item.last_name} ${
            item.middle_name ? item.middle_name : ""
          }`;
          client.passport =
            `${item.passport_series} ${item.passport_number}`.toUpperCase();
          client.sum = "-";
          delete client.passport_number;
          delete client.passport_series;
          delete client.first_name;
          delete client.last_name;
          delete client.middle_name;
          return client;
        })
        .sort((a: any, b: any) => a.index - b.index);
    }
  }
}

async function employeesLoader() {
  if (!localStorage.getItem("rt")) {
    return redirect("/auth");
  } else {
    const response = await ApiService.getUsers();
    if (response.status === 401) {
      return redirect("/auth");
    } else {
      return response.data.content
        .map((user: any, index: number) => {
          user.workterm = 1;
          user.fprint = 10;
          user.seekdays = "Воскресенье";
          user.grade = 5;
          user.key = user.id;
          user.index = index + 1;
          return user;
        })
        .sort((a: any, b: any) => a.index - b.index);
    }
  }
}

async function clientLoader({ params }: any) {
  const id = params.id_browse && params.id_browse.slice(params.id_browse.indexOf("=") + 1);
  if (!localStorage.getItem("rt")) {
    return redirect("/auth");
  } else {
    try {
    const response = await ApiService.getCustomer(id);
    if (response.status === 401) {
      return redirect("/auth");
    } else {
      let etag = String(response.headers)
      console.log(etag);
      const etagMatch = etag.match(/"(.*)"/); 
      if (etagMatch && etagMatch[1]) {
        etag = etagMatch[1]; 
      } else {
        console.error("Неверный формат etag");
      }
      const client = { ...response.data };
      client.key = client.id;
      client.index = store
        .getState()
        .clientStore.clientsList.find((val) => val.id === client.id)?.index;
      client.sum = "-";
      store.dispatch(clientActions.setClientChoosenOne(client));
      return defer ({ client, etag });
    }
  } catch (err) {
    console.log(err);
  }
  }
}

async function employeeLoader({ params }: any) {
  const id = params.id_browse.slice(params.id_browse.indexOf("=") + 1);
  if (!localStorage.getItem("rt")) {
    return redirect("/auth");
  } else {
    const response = await ApiService.getUser(id);
    if (response.status === 401) {
      console.log(response.status === 401);
      return redirect("/auth");
    } else {
      const etag = response.headers.etag.slice(2).replaceAll("\\", "");
      const user = { ...response.data };
      user.key = user.id;
      user.index = store
        .getState()
        .employeeStore.allEmployees.find((val) => val.id === user.id)?.index;
      user.workterm = 1;
      user.fprint = 10;
      user.seekdays = "Воскресенье";
      user.grade = 5;
      return { user, etag };
    }
  }
}
