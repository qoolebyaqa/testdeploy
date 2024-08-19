import ButtonComponent from "../UI/ButtonComponent";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import useActions from "../../helpers/hooks/useActions";
import { useState } from "react";
import { createPortal } from "react-dom";
import Sms from "../UI/Sms";

function NewClientBtns() {
  const [showDialog, setShowDialog] = useState(false);
  const regStep = useAppSelector(state => state.clientStore.regClientStep)
  const dispatch = useActions();
  const buttons = regStep === 1 ? [
    { title: "Сохранить", color: "bg-lombard-btn-green" },
    { title: "Продлить", color: "bg-lombard-main-blue" },
    { title: "Пересмотр", color: "bg-lombard-main-blue" },
    { title: "Закрыть договор", color: "bg-lombard-btn-red" },
    { title: "СМС", color: "bg-lombard-btn-yellow", handler: () => {setShowDialog(true)}},
    { title: "Печать", color: "bg-lombard-btn-yellow", handler: () => {} },
  ] : [{ title: "Подтвердить", color: "bg-lombard-btn-green", handler: () => {dispatch.setRegClientStep(1)} }]

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 text-[18px] h-[60px]">
        <h3 className="text-black font-extrabold">Создание клиента</h3>
        <div className="flex gap-1 items-center">
          {buttons.map((btn) => (
            <ButtonComponent
              key={btn.title}
              titleBtn={btn.title}
              color={btn.color}
              clickHandler={btn.handler}
            />
          ))}
        </div>
        {showDialog && createPortal( <Sms clickHandler={() => setShowDialog(false)} page={"client"}/>, document.body)}
      </div> 
    </>
  );
}

export default NewClientBtns;
