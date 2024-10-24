import { useNavigate } from "react-router";
import { columnsForEmployees } from "../../helpers/fnHelpers";
import ButtonComponent from "../UI/ButtonComponent";
import DataTable from "../UI/DataTable";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Checkbox } from "antd";
import { IDataEmployeeType } from "../../helpers/types";
import useActions from "../../helpers/hooks/useActions";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { ApiService } from "../../helpers/API/ApiSerivce";
import RangeFilter from "../Clients/RangeFilter";
import Confirmation from "../Modals/Confirmation";

function EmployeesContent() {
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useActions();
  const navigate = useNavigate()
  const selectedRowIds = useAppSelector(state => state.employeeStore.employeeSelected);
  const buttons = [
    {title: "Удалить", color: "bg-lombard-btn-red", handler: () => setShowDialog(true) }, 
    {title: "Регистрация", color: "bg-lombard-btn-green", handler: () => {navigate('/new-employee')}}
  ];
  const checkbox =  {
    title: () => <Checkbox onChange={() => dispatch.setAllEmployeeSelect()} checked={!!selectedRowIds.length}/>,
    key: 'select',
    render: (_: string, record: IDataEmployeeType) => <Checkbox onChange={() => {dispatch.setEmployeeSelectedOne(record.id)}} onClick={(e) => e.stopPropagation()} checked={selectedRowIds.includes(record.id)}/>    
  }
  const setUsers = (arr: any) => {
    dispatch.setEmployeeList(arr)
  }

  function selectEmployeeHandler(...args: IDataEmployeeType[]) {
    navigate(`/employees/browse=${args[0].id}`);
  }
  async function deleteEmployee() {
    try {
      selectedRowIds.forEach(async (id: string) => {
        const getUserRes = await ApiService.getUser(id);
        await ApiService.deleteUser(id, getUserRes.headers.etag.slice(2).replaceAll("\\", ""));
        console.log(getUserRes);
      })
      dispatch.setAllEmployeeSelect();
      setShowDialog(false)
    } catch (err) {
      console.log(err);
    }
  }
  return ( 
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Сотрудники</h3>
        <div className="flex gap-1 items-center">
          {/* <ButtonComponent color="bg-white" className="text-lombard-btn-red h-8 font-semibold" titleBtn="Очистить фильтр ✕"/> */}          
          <RangeFilter iconInput="filters" />
          {buttons.map(btn =>  {if(btn.title === 'Удалить' && !selectedRowIds.length) {return} else return <ButtonComponent key={btn.title} titleBtn={btn.title} color={btn.color} clickHandler={btn.handler}/>})}
        </div>
        {showDialog && createPortal(<Confirmation handleClose={() => setShowDialog(false)} handleSave={deleteEmployee} title="Удалить?" textMsg="Вы действительно хотите удалить?"/>, document.body)}
      </div>
      <DataTable columns={[...columnsForEmployees, checkbox]} classes="customCssTable" pagination selectHandler={selectEmployeeHandler} endPoint={ApiService.getUsers} setDataToState={setUsers}/>
    </>
   );
}

export default EmployeesContent;