import { TableColumnsType } from "antd";
import { useNavigate } from "react-router";
import { IDataEmployeeType } from "../../helpers/types";
import { CopierEmployee } from "../../helpers/fnHelpers";
import ButtonComponent from "../UI/ButtonComponent";
import DataTable from "../UI/DataTable";
import DropDown from "../UI/DropDown";

function EmployeesContent() {
  const navigate = useNavigate()
  const buttons = [
    {title: "Применить", color: "bg-lombard-main-blue"},
    {title: "Удалить", color: "bg-lombard-btn-red"},
    {title: "Печать", color: "bg-lombard-btn-yellow"},
    {title: "Регистрация", color: "bg-lombard-btn-green", handler: () => {navigate('/new-employee')}}
  ];
  const columnsForEmployees: TableColumnsType<IDataEmployeeType> = [
    {
      title: "№",
      dataIndex: "index",
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: "Логин",
      dataIndex: "login",
    },
    {
      title: "ФИО",
      dataIndex: "name",
    },
    {
      title: "Статус",
      dataIndex: "status",
    },
    {
      title: "Должность",
      dataIndex: "position",
    },
    {
      title: "Ставка",
      dataIndex: "workterm",
    },
    {
      title: "Пользватель",
      dataIndex: "role",
    },
    {
      title: "Отпечаток пальца",
      dataIndex: "fprint",
    },
    {
      title: "Язык",
      dataIndex: "language",
    },
    {
      title: "Выходные",
      dataIndex: "seekdays",
    },
    {
      title: "Оценка",
      dataIndex: "grade",
    },
    {
      title: "Действия",
      dataIndex: "actionsEmployee",
    },
  ]
  const item = {
    key: 1,
    index: 1,
    login: "Rushana-adm",
    name: "Narmuratova Rushana Maxmatmurodovna",
    position: "Директор",
    status: "Актив",
    workterm: 1,
    role: "Админ",
    fprint: 10,
    language: "English",
    seekdays: "Воскресенье",
    grade: 5,
    actionsEmployee: null
  };
  const dataEmployees: IDataEmployeeType[] = CopierEmployee(item);
  return ( 
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Сотрудники</h3>
        <div className="flex gap-1 items-center">
          <DropDown title="Статус" listOfItems={[{label: 'Узбекистан', key: 1}, {label: 'Экспат', key: 2}]}/>
          <DropDown title="Ставка" listOfItems={[{label: 'Узбекистан', key: 1}, {label: 'Экспат', key: 2}]}/>
          <DropDown title="Филиалы" listOfItems={[{label: 'Узбекистан', key: 1}, {label: 'Экспат', key: 2}]}/>
          {buttons.map(btn => <ButtonComponent key={btn.title} titleBtn={btn.title} color={btn.color} clickHandler={btn.handler}/>)}
        </div>
      </div>
      <DataTable columns={columnsForEmployees} data={dataEmployees}/>
    </>
   );
}

export default EmployeesContent;