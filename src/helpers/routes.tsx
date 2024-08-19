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
import SMS from "../pages/SMS";

export const childrenRoutes = [
  { path: '/', element: <MainPage />, title: 'Главная страница'},
  { path: '/employees', element: <Employees />, title: 'Сотрудники'},
  { path: '/contracts', element: <Contracts />, title: 'Контракты'},
  { path: '/filials', title: 'Филиалы', children: [{path: '', element: <Filials />, title: 'Филиалы'}, {path: ':id_browse', element: <FilialBrowse />, title: 'Обзор филиала'}]},
  { path: '/cash', element: <Cash />, title: 'Касса'},
  { path: '/sms', element: <SMS />, title: 'Уведомления'},
  { path: '/katm', title: 'КАТМ', children: [{path: '', element: <KATM/>, title: 'КАТМ'}, {path: ':id_client', element: <KATMBrowseContent />, title: 'выбранный КАТМ'}]},
  { path: '/new-employee', element: <NewEmployeePage />, title: 'Регистрация сотрудника'},
  { path: '/new-client', element: <NewClient />, title: 'Регистрация Клиента'},
];