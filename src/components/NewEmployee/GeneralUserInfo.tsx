import ButtonComponent from "../UI/ButtonComponent";
import SVGComponent from "../UI/SVGComponent";
import CustomInput from "../UI/CustomInput";
import SwitchComponent from "../UI/SwitchComponent";
import { useState } from "react";
import { createPortal } from "react-dom";
import DialogComponent from "../UI/DialogComponent";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { ApiService } from "../../helpers/API/ApiSerivce";

interface IGeneralUserInfo {
  formValues: {[key:string]: string}
  existEmployee?: boolean
  onInputChange: ({id, title, value}: {id?: string, title:string, value: string | string[]}) => void
}

function GeneralUserInfo({onInputChange, formValues, existEmployee}:IGeneralUserInfo) {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const gender = useAppSelector(state => state.employeeStore.newEmployeeGender);

  const resetPass = async () => {
    setLoading(true);
    await ApiService.getLinktoReset(formValues.login);
    setShowDialog(false)    
    setLoading(false);
  }
  return (
    <div className="w-[280px] flex flex-col gap-4">
      <div className="bg-white rounded-2xl px-2 py-6">
        <div className="relative">
          <img src={gender === 'FEMALE' ? '/defaultAvatarFemale.png': '/defaultAvatarMale.png'} alt="avatar" />
          <SVGComponent title="editPhoto" />
        </div>
        <CustomInput type="text" name="name" label="ФИО" required handleChange={onInputChange} value={formValues.name}/>
        <CustomInput type="text" name="login" label="Логин" required handleChange={onInputChange} value={formValues.login} />
        <p className="font-bold text-black">Статус</p>
        <SwitchComponent
          inputName="role"
          selectedDefaultTitle="Активный"
          selectedStyles="bg-[#148F00]"
          unselectedTitle="Не активный"
          unselectedStyles="bg-white text-black border-[#D2DBE1]"
        />
      </div>
      <div className="flex flex-col gap-2 bg-white p-3 rounded-2xl">
        <p className="font-bold text-black">Настройки доступа</p>
        <ButtonComponent
          titleBtn="Логин и пароль"
          disabled={!existEmployee}
          color="bg-lombard-btn-green"
          className="w-full"
          clickHandler={() => {
            console.log(showDialog, "clicked");
            setShowDialog(true);
          }}
        />
        <ButtonComponent
          titleBtn="Отпечаток пальца"
          color="bg-lombard-main-blue"
          className="w-full"
          disabled={!existEmployee}
        />
        {showDialog &&
          createPortal(
            <DialogComponent closeHandler={() => setShowDialog(false)}>
              <div className="w-[280px]">
                <CustomInput label="Логин" type="text" name="login" required value={formValues.login}/>
                <p className="py-[24px] font-bold text-black">
                  Отправить пароль
                </p>
                <CustomInput
                  label="По номеру телефона"
                  type="phone"
                  name="phone"
                  value={formValues.phone_number}
                />
                <div className="flex flex-col gap-2 mt-8">
                  <ButtonComponent
                    color="bg-lombard-btn-green"
                    titleBtn="Отправить"
                    clickHandler={resetPass}
                    disabled={loading}
                  />
                  <ButtonComponent
                    color="bg-lombard-btn-grey"
                    titleBtn="Отменить"
                    clickHandler={() => setShowDialog(false)}
                    disabled={loading}
                  />
                </div>
              </div>
            </DialogComponent>,
            document.body
          )}
      </div>
    </div>
  );
}

export default GeneralUserInfo;
