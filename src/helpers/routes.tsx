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

const childrenRoutes = [
  { path: '/', element: <MainPage />, title: 'Главная страница', loader: clientsLoader},
  { path: '/employees', element: <Employees />, title: 'Сотрудники', loader: employeesLoader},
  { path: '/contracts', title: 'Контракты', children: [{path: '', element: <Contracts />, title: 'Контракты'}, {path: ':id_browse', element: <ContractBrowse />, title: 'Обзор договора'}]},
  { path: '/filials', title: 'Филиалы', children: [{path: '', element: <Filials />, title: 'Филиалы'}, {path: ':id_browse', element: <FilialBrowse />, title: 'Обзор филиала'}]},
  { path: '/cash', element: <Cash />, title: 'Касса'},
  { path: '/sms', element: <Notification />, title: 'Уведомления'},
  { path: '/katm', title: 'КАТМ', children: [{path: '', element: <KATM/>, title: 'КАТМ'}, {path: ':id_client', element: <KATMBrowseContent />, title: 'выбранный КАТМ'}]},
  { path: '/new-employee', element: <NewEmployeePage />, title: 'Регистрация сотрудника'},
  { path: '/new-client', element: <NewClient />, title: 'Регистрация Клиента'},
];

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Authentification />
  },
  {
    path: '/',
    element: <RootLayout/>,
    children: childrenRoutes,
  },
]);

//loaders
async function clientsLoader() {
  if(!localStorage.getItem('rt')){
    return redirect('/auth')
  } else {
    const response = await ApiService.getCustomers();
    if(response.status === 401) {
      return redirect('/auth')
    } else {
      return response.data.content.map((item:any, index: number) => {        
        const { id, pin, phone_number, birth_date, status} = item;
        const client:any = { id, pin, phone_number, birth_date, status}
        client.key = item.id;
        client.index = index + 1;
        client.name = `${item.first_name} ${item.last_name} ${item.middle_name ? item.middle_name : ''}`
        client.passport = `${item.passport_series} ${item.passport_number}`.toUpperCase();
        client.sum = '-'
        return client;
      })       
    }
  }
}

async function employeesLoader() {
  if(!localStorage.getItem('rt')){
    return redirect('/auth')
  } else {
    const response = await ApiService.getUsers();
    if(response.status === 401) {
      return redirect('/auth')
    } else {
      return response.data.content.map((user:any, index: number) => {   
        user.workterm = 1;
        user.fprint = 10;
        user.seekdays = 'Воскресенье';
        user.grade = 5;
        user.key = user.id;
        user.index = index + 1;
        return user;
      })       
    }
  }
}