import ButtonComponent from "../UI/ButtonComponent";
import SVGComponent from "../UI/SVGComponent";
import CustomInput from "../UI/CustomInput";
import SwitchComponent from "../UI/SwitchComponent";
import { useState } from "react";
import { createPortal } from "react-dom";
import DialogComponent from "../UI/DialogComponent";

function GeneralUserInfo() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="w-[280px] flex flex-col gap-4">
      <div className="bg-white rounded-2xl px-2 py-6">
        <div className="relative">
          <img src="/defaultAvatarFemale.png" alt="avatar" />
          <SVGComponent title="editPhoto" />
        </div>
        <CustomInput type="text" name="name" label="ФИО" required />
        <CustomInput type="text" name="id" label="ID" />
        <p className="font-bold text-black">Статус</p>
        <SwitchComponent inputName="role" selectedDefaultTitle="Активный" selectedStyles="bg-[#148F00]" unselectedTitle="Не активный" unselectedStyles="bg-white text-black border-[#D2DBE1]"/>
      </div>
      <div className="flex flex-col gap-2 bg-white p-3 rounded-2xl">
        <p className="font-bold text-black">Настройки доступа</p>
        <ButtonComponent
          titleBtn="Логин и пароль"
          color="bg-lombard-btn-green"
          className="w-full"
          clickHandler={() => {
            console.log(showDialog, 'clicked');
            setShowDialog(true)}}
        />
        <ButtonComponent
          titleBtn="Отпечаток пальца"
          color="bg-lombard-main-blue"
          className="w-full"
        />
        {showDialog && createPortal(<DialogComponent closeHandler={() => setShowDialog(false)}/>, document.body)}
      </div>
    </div>
  );
}

export default GeneralUserInfo;
