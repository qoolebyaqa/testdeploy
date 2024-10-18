import ButtonComponent from "../../UI/ButtonComponent";
import GeneralClientInfo from "../../NewClient/GeneralClientInfo";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";
import ContractCollapsesList from "./ContractCollapsesList";
import { createPortal } from "react-dom";
import AboutClient from "../../Clients/AboutClient"
import { useState } from "react";
import ConfirmatioModal from "../../Modals/Confirmation";

function ContractBrowse() {
  const currentContract = useAppSelector(
    (state) => state.contractStore.contractChoosenOne
  );
  console.log(currentContract);

  const [isOpenModal,setIsModalOpen] = useState(false) 
  const [isOpenConfirmation,setOpenConfirmation] = useState(false) 

  const buttons = [
    { title: "Подтвердить", color: "bg-lombard-btn-green", func:openConfirmation },
    { title: "Перезаключение", color: "bg-lombard-main-blue" },
    { title: "Продление", color: "bg-lombard-main-blue" },
    { title: "СМС", color: "bg-lombard-btn-yellow" },
    { title: "Печать", color: "bg-lombard-btn-yellow" },
  ];

  const openAboutClient = () =>{
    setIsModalOpen(true)
  }

  function openConfirmation(){
    setOpenConfirmation(true)
  }

  return (
    <div className="bg-lombard-bg-inactive-grey">
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <ButtonComponent
          titleBtn="О клиенте"
          color="bg-white"
          className="text-lombard-text-black border-lombard-borders-grey border-[1px]"
          clickHandler={openAboutClient}
        />
        <div className="flex gap-2 items-center">
          {buttons.map((btn) => (
            <ButtonComponent
              color={btn.color}
              titleBtn={btn.title}
              key={btn.title}
              clickHandler={btn?.func}
            />
          ))}
        </div>
      </div>
        <div className="flex p-2 mx-auto justify-center">
          <GeneralClientInfo inputsValues={{}}/>
          <ContractCollapsesList />
        </div>

      {isOpenModal  && createPortal(<AboutClient closeHandler={() => setIsModalOpen(false)}  />, document.body)}
      {isOpenConfirmation  && createPortal(<ConfirmatioModal handleClose={() => setOpenConfirmation(false)} handleSave={()=>{}} />, document.body)}

      </div>
  );
}

export default ContractBrowse;
