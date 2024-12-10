import { createBrowserRouter, defer, redirect } from "react-router-dom";
import { ApiService } from "./API/ApiSerivce";
import store from "../store";
import { RouteProtector } from "../components/UI/RouteProtector";
import Main from "../pages/Main";
import { clientActions } from "../store/client";
import { employeeActions } from "../store/employee";
import { lazy, Suspense } from "react";
import Loader from "../components/UI/Loader";

const Authentification = lazy(() => import("../pages/Authentification"));
const RootLayout = lazy(() => import("../pages/RootLayout"));
const Password = lazy(() => import("../pages/Password"));
const ContractBrowse = lazy(
  () => import("../components/Contracts/ContractBrowse/ContractBrowse")
);
const KATMBrowseContent = lazy(
  () => import("../components/Katm/KATMBrowse/KATMBrowseContent")
);
const Contracts = lazy(() => import("../pages/Contracts"));
const Employees = lazy(() => import("../pages/Eployees"));
const FilialBrowse = lazy(() => import("../pages/FilialBrowse"));
const Filials = lazy(() => import("../pages/Filials"));
const KATM = lazy(() => import("../pages/KATM"));
const NewClient = lazy(() => import("../pages/NewClient"));
const NewEmployeePage = lazy(() => import("../pages/NewEmployeePage"));
const Notification = lazy(() => import("../pages/Notification"));
const ClientBrowse = lazy(
  () => import("../components/Clients/ClientBrowse/ClientBrowse")
);
const EmployeeBrowse = lazy(
  () => import("../components/Employees/EmployeeBrowse/EmployeeBrowse")
);
const CashCredit = lazy(() => import("../components/Cash/CashCredit"));
const CashDebet = lazy(() => import("../components/Cash/CashDebit"));
const DebitCreditLayout = lazy(() => import("../pages/Cash/DebitCreditLayout"));
const General = lazy(() => import("../components/Cash/General"));
const Lowcost = lazy(() => import("../components/Cash/Lowcost"));
const Bills = lazy(() => import("../pages/Cash/Bills"));
const Clients = lazy(() => import("../pages/Clients"));
const Monitoring = lazy(() => import("../pages/Monitoring"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Profile = lazy(() => import("../pages/Profile"));
const Received = lazy(() => import("../components/Cash/Received"));

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
    element: (
      <RouteProtector allowedRoles={["OPERATOR", "ADMIN", "ACCOUNTANT"]}>
        <Main />
      </RouteProtector>
    ),
    title: "Главная страница",
  },
  {
    path: "/profile",
    element: (
      <RouteProtector allowedRoles={["OPERATOR", "ADMIN", "ACCOUNTANT"]}>
        <Suspense fallback={<Loader justWhite/>}>
          <Profile />
        </Suspense>
      </RouteProtector>
    ),
    title: "Профиль",
  },
  {
    path: "/clients",
    children: [
      {
        path: "",
        element: (
          <RouteProtector allowedRoles={["OPERATOR"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <Clients />
            </Suspense>
          </RouteProtector>
        ),
        title: "Клиенты",
      },
      {
        path: ":id_browse",
        element: (
          <RouteProtector allowedRoles={["OPERATOR"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <ClientBrowse />
            </Suspense>
          </RouteProtector>
        ),
        title: "Обзор клиента",
        loader: clientLoader,
        shouldRevalidate: ({ currentUrl }: { currentUrl: URL }) => {
          return currentUrl.pathname === "/clients";
        },
      },
    ],
  },
  {
    path: "/contracts",
    title: "Контракты",
    children: [
      {
        path: "",
        element: (
          <RouteProtector allowedRoles={["OPERATOR"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <Contracts />
            </Suspense>
          </RouteProtector>
        ),
        title: "Контракты",
      },
      {
        path: ":id_browse",
        element: (
          <RouteProtector allowedRoles={["OPERATOR"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <ContractBrowse />
            </Suspense>
          </RouteProtector>
        ),
        title: "Обзор договора",
        loader: clientLoader,
        shouldRevalidate: ({ currentUrl }: { currentUrl: URL }) => {
          return currentUrl.pathname === "/contracts";
        },
      },
    ],
  },
  {
    path: "/katm",
    title: "КАТМ",
    children: [
      {
        path: "",
        element: (
          <RouteProtector allowedRoles={["OPERATOR"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <KATM />
            </Suspense>
          </RouteProtector>
        ),
        title: "КАТМ",
      },
      {
        path: ":id_browse",
        element: (
          <RouteProtector allowedRoles={["OPERATOR"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <KATMBrowseContent />
            </Suspense>
          </RouteProtector>
        ),
        title: "выбранный КАТМ",
      },
    ],
  },
  {
    path: "/sms",
    element: (
      <RouteProtector allowedRoles={["OPERATOR", "ADMIN"]}>
        <Suspense fallback={<Loader justWhite/>}>
          <Notification />
        </Suspense>
      </RouteProtector>
    ),
    title: "Уведомления",
  },
  {
    path: "/monitoring",
    element: (
      <RouteProtector allowedRoles={["ADMIN"]}>
        <Suspense fallback={<Loader justWhite/>}>
          <Monitoring />
        </Suspense>
      </RouteProtector>
    ),
    title: "Мониторинг",
  },
  {
    path: "/employees",
    title: "Сотрудники",
    children: [
      {
        path: "",
        element: (
          <RouteProtector allowedRoles={["ADMIN"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <Employees />
            </Suspense>
          </RouteProtector>
        ),
        title: "Сотрудники",
        /* loader: employeesLoader, */
      },
      {
        path: ":id_browse",
        element: (
          <RouteProtector allowedRoles={["ADMIN"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <EmployeeBrowse />
            </Suspense>
          </RouteProtector>
        ),
        title: "Обзор сотрудника",
        loader: employeeLoader,
      },
    ],
  },
  {
    path: "/filials",
    title: "Филиалы",
    children: [
      {
        path: "",
        element: (
          <RouteProtector allowedRoles={["ADMIN"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <Filials />
            </Suspense>
          </RouteProtector>
        ),
        title: "Филиалы",
      },
      {
        path: ":id_browse",
        element: (
          <RouteProtector allowedRoles={["ADMIN"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <FilialBrowse />
            </Suspense>
          </RouteProtector>
        ),
        title: "Обзор филиала",
      },
    ],
  },
  {
    path: "/new-employee",
    element: (
      <RouteProtector allowedRoles={["ADMIN"]}>
        <Suspense fallback={<Loader justWhite/>}>
          <NewEmployeePage />
        </Suspense>
      </RouteProtector>
    ),
    title: "Регистрация сотрудника",
  },
  {
    path: "/new-client",
    element: (
      <RouteProtector allowedRoles={["OPERATOR"]}>
        <Suspense fallback={<Loader justWhite/>}>
          <NewClient />
        </Suspense>
      </RouteProtector>
    ),
    title: "Регистрация Клиента",
  },
  {
    path: "/accountant/",
    children: [
      {
        path: "operations/",
        element: (
          <RouteProtector allowedRoles={["ACCOUNTANT"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <DebitCreditLayout />
            </Suspense>
          </RouteProtector>
        ),
        children: childrenCashOperationsRoutes,
      },
      {
        path: "/accountant/bills",
        element: (
          <RouteProtector allowedRoles={["ACCOUNTANT"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <Bills />
            </Suspense>
          </RouteProtector>
        ),
      },
      {
        path: "/accountant/deals",
        element: (
          <RouteProtector allowedRoles={["ACCOUNTANT"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <Bills />
            </Suspense>
          </RouteProtector>
        ),
      },
      {
        path: "/accountant/proccess",
        element: (
          <RouteProtector allowedRoles={["ACCOUNTANT"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <Bills />
            </Suspense>
          </RouteProtector>
        ),
      },
      {
        path: "/accountant/reports",
        element: (
          <RouteProtector allowedRoles={["ACCOUNTANT"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <Bills />
            </Suspense>
          </RouteProtector>
        ),
      },
      {
        path: "/accountant/monitoring",
        element: (
          <RouteProtector allowedRoles={["ACCOUNTANT"]}>
            <Suspense fallback={<Loader justWhite/>}>
              <Bills />
            </Suspense>
          </RouteProtector>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Suspense fallback={<Loader justWhite/>}><Authentification /></Suspense>,
    errorElement: <Suspense fallback={<Loader justWhite/>}><NotFound /></Suspense>,
  },
  {
    path: "/",
    element: <Suspense fallback={<Loader justWhite/>}><RootLayout /></Suspense>,
    children: childrenRoutes,
    errorElement: <Suspense fallback={<Loader justWhite/>}><NotFound /></Suspense>,
  },
  {
    path: "/password/:tkn",
    element: <Suspense fallback={<Loader justWhite/>}><Password /></Suspense>,
    loader: passReset,
  },
]);

//loaders
async function passReset({ params }: any) {
  try {
    const OTP = await ApiService.getOTP(params.tkn);
    return OTP;
  } catch (err) {
    console.log(err);
    return new Error("Some problem with server");
  }
}

async function clientLoader({ params }: any) {
  const id = params.id_browse;
  if (!localStorage.getItem("rt")) {
    return redirect("/auth");
  } else {
    try {
      const response = await ApiService.getCustomer(id);
      const documentsResponse = await ApiService.getDocuments(id, "passport");
      if (response.status === 401 || documentsResponse.status === 401) {
        return redirect("/auth");
      } else {
        const docList = documentsResponse.data;
        let etag = String(response.headers.etag);
        const etagMatch = etag.match(/"(.*)"/);
        if (etagMatch && etagMatch[1]) {
          etag = etagMatch[1];
        } else {
          console.error("Неверный формат etag");
        }
        const client = { ...response.data };
        client.key = client.id;
        client.sum = "-";
        store.dispatch(clientActions.setClientChoosenOne(client));
        return defer({ client, etag, docList });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

async function employeeLoader({ params }: any) {
  const id = params.id_browse;
  if (!localStorage.getItem("rt")) {
    return redirect("/auth");
  } else {
    try {
      const response = await ApiService.getUser(id);
      if (response.status === 401) {
        console.log(response.status === 401);
        return redirect("/auth");
      } else {
        let etag = String(response.headers.etag);
        const etagMatch = etag.match(/"(.*)"/);
        if (etagMatch && etagMatch[1]) {
          etag = etagMatch[1];
        } else {
          console.error("Неверный формат etag");
        }
        const user = { ...response.data };
        user.key = user.id;
        user.index = store
          .getState()
          .employeeStore.allEmployees.find((val) => val.id === user.id)?.index;
        user.workterm = 1;
        user.fprint = 10;
        user.seekdays = "Воскресенье";
        user.grade = 5;
        store.dispatch(employeeActions.setEmployeeChoosenOne(user));
        return { user, etag };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
