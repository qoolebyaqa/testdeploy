import {  Outlet, useNavigate } from "react-router";
import HeaderNavItem from "../../components/HeaderMainNav/HeaderNavItem";
import RangeFilter from "../../components/Clients/RangeFilter";
import DropDown from "../../components/UI/DropDown";
import ButtonComponent from "../../components/UI/ButtonComponent";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modals from "../../components/Cash/Modals";

function DebitCreditLayout() {
  const navList = [
    {
      path: "/accountant/operations/debet",
      svgCase: "contracts",
      titleBtn: "Приход",
      pageName: "debet"
    },
    {
      path: "/accountant/operations/credit",
      svgCase: "contracts",
      titleBtn: "Расход",
      pageName: "credit"
    },
    {
      path: "/accountant/operations/general",
      svgCase: "contracts",
      titleBtn: "Основные средства",
      pageName: "general"
    },
    {
      path: "/accountant/operations/received",
      svgCase: "contracts",
      titleBtn: "Полученные кредиты",
      pageName: "received"
    },
    {
      path: "/accountant/operations/lowcost",
      svgCase: "contracts",
      titleBtn: "Малоценные средства",
      pageName: "lowcost"
    },
  ];
  const navigate = useNavigate();
  const [showDialog,setShowDialog] = useState(false)
  const [pageName,setPageName] = useState("debet")
  const handleNavItemClick = (path:string, newPageName:string) => {
    navigate(path);
    setPageName(newPageName);
    
  };

  const openCreateDialog=()=>{
    setShowDialog(true)
  }
  return (
    <div className="min-h-screen bg-[#EFF2F4]">
    <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]"></h3>
        <div className="flex gap-1 items-center">
          <RangeFilter titleFilter="Дата выдачи" iconInput="calendar"/>
          <DropDown title="Операции" listOfItems={[{label: 'Все', key: 1, enumvalue: 'ALL'}, {label: 'Открыт', key: 2, enumvalue: 'OPEN'}]} name="contractsSelect"/>
          <ButtonComponent titleBtn="Создать" color="bg-lombard-btn-green" clickHandler={openCreateDialog}/>
        </div>
      </div>
      <div className="flex gap-10  ">
        <div className="flex justify-between w-1/6 border-[1px] border-lombard-main-blue/40 rounded-xl h-fit ">
          <ul className="flex flex-col w-full gap-1">
            {navList.map((navItem) => (
              <HeaderNavItem
                titleBtn={navItem.titleBtn}
                svgCase={navItem.svgCase}
                path={navItem.path}
                key={navItem.path}
                onClick={() => handleNavItemClick(navItem.path, navItem.pageName)}
              />
            ))}
          </ul>
        </div>
        <div className="w-5/6">
          <Outlet />
        </div>
      </div>
      {showDialog  && createPortal(<Modals clickHandler={() => setShowDialog(false)} page={pageName} />, document.body)}
    </div>
    
  );
}

export default DebitCreditLayout;
