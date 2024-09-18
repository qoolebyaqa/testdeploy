import { createBrowserRouter, redirect } from "react-router-dom";
import ContractBrowse from "../components/Contracts/ContractBrowse/ContractBrowse";
import KATMBrowseContent from "../components/Katm/KATMBrowse/KATMBrowseContent";
import Cash from "../pages/Cash";
import Contracts from "../pages/Contracts";
import Employees from "../pages/Eployees";
import FilialBrowse from "../pages/FilialBrowse";
import Filials from "../pages/Filials";
import KATM from "../pages/KATM";
import MainPage from "../pages/MainPage";
import NewClient from "../pages/NewClient";
import NewEmployeePage from "../pages/NewEmployeePage";
import Notification from "../pages/Notification";
import Authentification from "../pages/Authentification";
import RootLayout from "../pages/RootLayout";
import { ApiService } from "./API/ApiSerivce";
import ClientBrowse from "../components/Main/ClientBrowse/ClientBrowse";
import store from "../store";
import EmployeeBrowse from "../components/Employees/EmployeeBrowse/EmployeeBrowse";
import Password from "../pages/Password";

const childrenRoutes = [
  {
    path: "/",
    title: "Главная страница",
    children: [
      {
        path: "/",
        element: <MainPage />,
        title: "Главная страница",
        loader: clientsLoader,
      },
      {
        path: "/clients/:id_browse",
        element: <ClientBrowse />,
        title: "Обзор клиента",
        loader: clientLoader
      }
    ],
  },
  {
    path: "/employees",
    title: "Сотрудники",
    children: [
      {
        path: "",
        element: <Employees />,
        title: "Сотрудники",
        loader: employeesLoader,
      },
      {
        path: ":id_browse",
        element: <EmployeeBrowse />,
        title: "Обзор сотрудника",
        loader: employeeLoader
      }
    ],
  },
  {
    path: "/contracts",
    title: "Контракты",
    children: [
      { path: "", element: <Contracts />, title: "Контракты" },
      {
        path: ":id_browse",
        element: <ContractBrowse />,
        title: "Обзор договора",
      },
    ],
  },
  {
    path: "/filials",
    title: "Филиалы",
    children: [
      { path: "", element: <Filials />, title: "Филиалы" },
      { path: ":id_browse", element: <FilialBrowse />, title: "Обзор филиала" },
    ],
  },
  { path: "/cash", element: <Cash />, title: "Касса" },
  { path: "/sms", element: <Notification />, title: "Уведомления" },
  {
    path: "/katm",
    title: "КАТМ",
    children: [
      { path: "", element: <KATM />, title: "КАТМ" },
      {
        path: ":id_client",
        element: <KATMBrowseContent />,
        title: "выбранный КАТМ",
      },
    ],
  },
  {
    path: "/new-employee",
    element: <NewEmployeePage />,
    title: "Регистрация сотрудника",
  },
  { path: "/new-client", element: <NewClient />, title: "Регистрация Клиента" },
];

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Authentification />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: childrenRoutes,
  },
  {
    path: "/password/:tkn",
    element: <Password />,
    /* loader: passReset */
  },
]);

//loaders
/* async function passReset({params}:any){
  const OTP = await ApiService.getOTP(params.tkn)
  return OTP;
} */

async function clientsLoader() {
  if (!localStorage.getItem("rt")) {
    return redirect("/auth");
  } else {
    const response = await ApiService.getCustomers();
    if (response.status === 401) {
      return redirect("/auth");
    } else {
      return response.data.content.map((item: any, index: number) => {
        const client: any = {...item};
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
        delete client.middle_name
        return client;
      }).sort((a:any, b:any) => a.id - b.id);
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
      return response.data.content.map((user: any, index: number) => {
        user.workterm = 1;
        user.fprint = 10;
        user.seekdays = "Воскресенье";
        user.grade = 5;
        user.key = user.id;
        user.index = index + 1;
        return user;
      }).sort((a:any, b:any) => a.id - b.id);
    }
  }
}

async function clientLoader({params}:any) {
  const id = params.id_browse.slice(params.id_browse.indexOf('=') + 1)
  if (!localStorage.getItem("rt")) {
    return redirect("/auth");
  } else {
    const response = await ApiService.getCustomer(id);
    if (response.status === 401) {
      return redirect("/auth");
    } else {
      const etag = response.headers.etag.slice(2).replaceAll("\\", "")
      const client = {...response.data};
      client.key = client.id;
      client.index = store.getState().clientStore.clientsList.find(val => val.id === client.id)?.index;
      client.name = `${client.first_name} ${client.last_name} ${
        client.middle_name ? client.middle_name : ""
      }`;
      client.sum = "-";
      delete client.first_name;
      delete client.last_name;
      delete client.middle_name
      return {client, etag}
    }
  }
}

async function employeeLoader({params}:any) {
  const id = params.id_browse.slice(params.id_browse.indexOf('=') + 1)
  if (!localStorage.getItem("rt")) {
    return redirect("/auth");
  } else {
    const response = await ApiService.getUser(id);
    if (response.status === 401) {
      console.log(response.status === 401);
      return redirect("/auth");
    } else {
      const etag = response.headers.etag.slice(2).replaceAll("\\", "")
      const user = {...response.data};
      user.key = user.id;
      user.index = store.getState().employeeStore.allEmployees.find(val => val.id === user.id)?.index;      
      user.workterm = 1;
      user.fprint = 10;
      user.seekdays = "Воскресенье";
      user.grade = 5;
      return {user, etag}
    }
  }
}

