import ButtonComponent from "../UI/ButtonComponent";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import useActions from "../../helpers/hooks/useActions";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Sms from "../UI/Sms";
import KATMreqPOPup from "./KATMreqPOPup";
import { useNavigate } from "react-router";

function NewClientBtns() {
  const [showDialog, setShowDialog] = useState("");
  const navigate = useNavigate();
  const regStep = useAppSelector((state) => state.clientStore.regClientStep);
  const clientLoading = useAppSelector((state) => state.clientStore.clientLoading);
  const katmResponse = useAppSelector((state) => state.clientStore.katmRequest);
  const dispatch = useActions();
  useEffect(() => {
    if (katmResponse.result === "err") setShowDialog("katmReq");
  }, [katmResponse]);

  const buttons =
    regStep !== 0
      ? [
          {
            title: "Подтвердить",
            color: "bg-lombard-btn-green",
            submit: false,
            form: "",
            handler: () => {
              if (regStep === 4) {
                dispatch.clearNewClientFormData();
                navigate('/');
              } else {
                dispatch.addRegClientStep();
              }
            },
            shouldBeDisabled: katmResponse.result === "err",
          },
          {
            title: "Отменить",
            color: "bg-lombard-btn-red",
            handler: () => {
              dispatch.reduceRegClientStep();
            },
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
            form: "generalClientInfo",
            submit: true,
            handler: () => {},
            shouldBeDisabled: clientLoading,
          },
        ];

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 text-[18px] h-[60px]">
        {regStep === 0 ? (
          <h3 className="text-black font-extrabold">Создание клиента</h3>
        ) : (
          <div className="bg-[#EFF2F4] flex justify-between items-center px-3 gap-x-2">
            <ButtonComponent
              titleBtn="О клиенте"
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
            <Sms clickHandler={() => setShowDialog("")} page={"client"} />,
            document.body
          )}
        {showDialog === "katmReq" &&
          createPortal(
            <KATMreqPOPup clickHandler={() => setShowDialog("")} />,
            document.body
          )}
      </div>
    </>
  );
}

export default NewClientBtns;
