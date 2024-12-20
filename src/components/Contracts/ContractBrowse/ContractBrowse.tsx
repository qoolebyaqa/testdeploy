import ButtonComponent from "../../UI/ButtonComponent";
import GeneralClientInfo from "../../NewClient/GeneralClientInfo";
import ContractCollapsesList from "./ContractCollapsesList";
import { createPortal } from "react-dom";
import AboutClient from "../../Clients/AboutClient";
import { useState } from "react";
import ConfirmatioModal from "../../UI/Confirmation";
import { useLoaderData } from "react-router";

function ContractBrowse() {
  const { client, etag, docList }: any = useLoaderData();

  const [isOpenModal, setIsModalOpen] = useState(false);
  const [isOpenConfirmation, setOpenConfirmation] = useState(false);

  const buttons = [
    {
      title: "Подтвердить",
      color: "bg-lombard-btn-green",
      func: openConfirmation,
    },
    { title: "Перезаключение", color: "bg-lombard-main-blue" },
    { title: "Продление", color: "bg-lombard-main-blue" },
    { title: "СМС", color: "bg-lombard-btn-yellow" },
    { title: "Печать", color: "bg-lombard-btn-yellow" },
  ];

  const openAboutClient = () => {
    setIsModalOpen(true);
  };

  function openConfirmation() {
    setOpenConfirmation(true);
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
          <GeneralClientInfo
            inputsValues={client}
            etag={etag}
            docList={docList}
            shouldDisableForm
          />
          <ContractCollapsesList client={client} />
      </div>

      {isOpenModal &&
        createPortal(
          <AboutClient closeHandler={() => setIsModalOpen(false)} />,
          document.body
        )}
      {isOpenConfirmation &&
        createPortal(
          <ConfirmatioModal
            handleClose={() => setOpenConfirmation(false)}
            handleSave={() => {}}
            title="Подтвердить"
            textMsg="Вы действительно хотите создать?"
          />,
          document.body
        )}
    </div>
  );
}

export default ContractBrowse;
