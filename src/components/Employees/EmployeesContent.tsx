import { useLoaderData, useNavigate } from "react-router";
import { columnsForEmployees } from "../../helpers/fnHelpers";
import ButtonComponent from "../UI/ButtonComponent";
import DataTable from "../UI/DataTable";
import DropDown from "../UI/DropDown";
import { useEffect, useState } from "react";
import Delete from "../UI/Delete";
import { createPortal } from "react-dom";
import { Checkbox } from "antd";
import { IDataEmployeeType } from "../../helpers/types";
import useActions from "../../helpers/hooks/useActions";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";

function EmployeesContent() {
  const [showDialog, setShowDialog] = useState(false);
  const dataEmployees = useAppSelector(state => state.employeeStore.allEmployees)
  const dispatch = useActions();
  const navigate = useNavigate()
  const users = useLoaderData();
  console.log('users', users)
  useEffect(() => {dispatch.setEmployeeList(users)},[])
  const selectedRowKeys = useAppSelector(state => state.employeeStore.employeeSelected);
  const buttons = [
    {title: "Применить", color: "bg-lombard-main-blue"},
    {title: "Удалить", color: "bg-lombard-btn-red", handler: () => setShowDialog(true) }, 
    /* {title: "Печать", color: "bg-lombard-btn-yellow"}, */
    {title: "Регистрация", color: "bg-lombard-btn-green", handler: () => {navigate('/new-employee')}}
  ];
  const checkbox =  {
    title: () => <Checkbox onChange={() => dispatch.setAllEmployeeSelect()} checked={!!selectedRowKeys.length}/>,
    key: 'select',
    render: (_: string, record: IDataEmployeeType) => <Checkbox onChange={() => dispatch.setEmployeeSelectedOne(record.key)} onClick={(e) => e.stopPropagation()} checked={selectedRowKeys.includes(record.key)}/>    
  }
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
      <DataTable columns={[...columnsForEmployees, checkbox]} data={dataEmployees} classes="customCssTable" pagination/>
    </>
   );
}

export default EmployeesContent;