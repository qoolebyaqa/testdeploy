import { useNavigate } from "react-router";
import { columnsForEmployees, dataEmployees } from "../../helpers/fnHelpers";
import ButtonComponent from "../UI/ButtonComponent";
import DataTable from "../UI/DataTable";
import DropDown from "../UI/DropDown";
import { useState } from "react";
import Delete from "../UI/Delete";
import { createPortal } from "react-dom";

function EmployeesContent() {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate()
  const buttons = [
    {title: "Применить", color: "bg-lombard-main-blue"},
    {title: "Удалить", color: "bg-lombard-btn-red", handler: () => setShowDialog(true) }, 
    /* {title: "Печать", color: "bg-lombard-btn-yellow"}, */
    {title: "Регистрация", color: "bg-lombard-btn-green", handler: () => {navigate('/new-employee')}}
  ];

  return ( 
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Сотрудники</h3>
        <div className="flex gap-1 items-center">
          <DropDown name="employeePosition" title="Должность" listOfItems={[{label: 'Директор', key: 1}, {label: 'Оператор', key: 2}]}/>
          <DropDown name="employeeStatus" title="Статус" listOfItems={[{label: 'Узбекистан', key: 1}, {label: 'Экспат', key: 2}]}/>
          <DropDown name="employeeRate" title="Ставка" listOfItems={[{label: 'Узбекистан', key: 1}, {label: 'Экспат', key: 2}]}/>
          <DropDown name="employee" title="Филиалы" listOfItems={[{label: 'Узбекистан', key: 1}, {label: 'Экспат', key: 2}]}/>
          <ButtonComponent color="bg-white" className="text-lombard-btn-red h-8 font-semibold" titleBtn="Очистить фильтр ✕"/>
          {buttons.map(btn => <ButtonComponent key={btn.title} titleBtn={btn.title} color={btn.color} clickHandler={btn.handler}/>)}
        </div>
        {showDialog && createPortal(<Delete clickHandler={() => setShowDialog(false)}/>, document.body)}
      </div>
      <DataTable columns={columnsForEmployees} data={dataEmployees}/>
    </>
   );
}

export default EmployeesContent;