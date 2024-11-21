import ButtonComponent from "../UI/ButtonComponent";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import KATMreqPOPup from "./KATMreqPOPup";
import DialogComponent from "../UI/DialogComponent";
import AboutClient from "../Clients/AboutClient";

function NewClientBtns({ formId }: { formId?: string }) {
  const [showDialog, setShowDialog] = useState("");
  const [isOpenModal, setIsModalOpen] = useState(false) 
  const stepState = useAppSelector(state => state.clientStore.stepState)
  const clientLoading = useAppSelector(
    (state) => state.clientStore.clientLoading
  );
  const katmResponse = useAppSelector((state) => state.clientStore.katmRequest);
  useEffect(() => {
    if (katmResponse.result === "err") setShowDialog("katmReq");
  }, [katmResponse]);


  const openAboutClient = () =>{
    setIsModalOpen(true)
  }

  console.log(stepState)

  const buttons =
  stepState.step !== 'initial'
      ? [
          {
            title: "Подтвердить",
            color: "bg-lombard-btn-green",
            submit: true,
            form: stepState.step,
            handler: () => {},
            shouldBeDisabled: katmResponse.result === "err",
          },
          {
            title: "СМС",
            color: "bg-lombard-btn-yellow",
            handler: () => {
              setShowDialog("sms");
            },
            shouldBeDisabled: katmResponse.result === "err",
          },
          {
            title: "Печать",
            color: "bg-lombard-btn-yellow",
            handler: () => {},
          },
        ]
      : [
          {
            title: "Подтвердить",
            color: "bg-lombard-btn-green",
            form: formId || "someID",
            submit: true,
            handler: () => {},
            shouldBeDisabled: clientLoading,
          },
        ];

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 text-[18px] h-[60px]">
        {!stepState.id ? (
          <h3 className="text-black font-extrabold">Создание клиента</h3>
        ) : (
          <div className="bg-[#EFF2F4] flex justify-between items-center px-3 gap-x-2">
            <ButtonComponent
              titleBtn="О клиенте"
              clickHandler={openAboutClient}
              color="bg-white"
              className="text-lombard-text-black border-lombard-borders-grey border-[1px]"
            />
            <ButtonComponent
              titleBtn="Запросы на КАТМ"
              color="bg-white"
              className={katmResponse.styles}
              clickHandler={() => setShowDialog("katmReq")}
            />
          </div>
        )}
        <div className="flex gap-1 items-center">
          {buttons.map((btn) => (
            <ButtonComponent
              key={btn.title}
              titleBtn={btn.title}
              color={btn.color}
              clickHandler={btn.handler}
              form={btn.form}
              submit={btn.submit}
              disabled={btn.shouldBeDisabled}
            />
          ))}
        </div>
        {showDialog === "sms" &&
          createPortal(
            <DialogComponent closeHandler={() => setShowDialog("")}>
              <div className="w-[280px] flex flex-col gap-y-[10px]">
                <p className="mb-1.5 font-bold text-[#3B3B3B] border-b-2 border-lombard-borders-grey">
                  Отправить СМС
                </p>
                <p className="font-bold text-black">Номер телефона</p>
                <p className="font-normal text-[#3B3B3B] border-2 border-[D2DBE1] border-solid rounded-[12px] p-[10px]">
                  +998 (99) 088-80-60
                </p>
                <div className="flex justify-end mt-5 gap-[6px]">
                  <ButtonComponent
                    color="bg-lombard-btn-grey"
                    className="text-lombard-text-black"
                    titleBtn="Отмена"
                    clickHandler={() => setShowDialog("")}
                  />
                  <ButtonComponent
                    color="bg-lombard-btn-green"
                    titleBtn="Отправить"
                    clickHandler={() => setShowDialog("")}
                  />
                </div>
              </div>
            </DialogComponent>,
            document.body
          )}
        {showDialog === "katmReq" &&
          createPortal(
            <KATMreqPOPup clickHandler={() => setShowDialog("")} />,
            document.body
          )}
      {isOpenModal  && createPortal(<AboutClient closeHandler={() => setIsModalOpen(false)}  />, document.body)}

      </div>
    </>
  );
}

export default NewClientBtns;
