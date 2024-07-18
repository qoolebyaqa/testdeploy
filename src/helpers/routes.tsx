import Contracts from "../pages/Contracts";
import Employees from "../pages/Eployees";
import MainPage from "../pages/MainPage";
import NewClient from "../pages/NewClient";
import NewEmployeePage from "../pages/NewEmployeePage";

export const childrenRoutes = [
  { path: '/', element: <MainPage />, title: 'Главная страница'},
  { path: '/employees', element: <Employees />, title: 'Сотрудники'},
  { path: '/contracts', element: <Contracts />, title: 'Контракты'},
  { path: '/new-employee', element: <NewEmployeePage />, title: 'Регистрация сотрудника'},
  { path: '/new-client', element: <NewClient />, title: 'Регистрация Клиента'},
];