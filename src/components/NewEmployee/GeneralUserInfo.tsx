import ButtonComponent from "../UI/ButtonComponent";
import SVGComponent from "../UI/SVGComponent";
import CustomInput from "../UI/CustomInput";
/* import SwitchComponent from "../UI/SwitchComponent"; */
import { useState } from "react";
import { createPortal } from "react-dom";
import DialogComponent from "../UI/DialogComponent";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { ApiService } from "../../helpers/API/ApiSerivce";
/* import { useForm } from "react-hook-form";
import { userFormSchema } from "../../helpers/validator";
import { yupResolver } from "@hookform/resolvers/yup"; */
import DropDown from "../UI/DropDown";

interface IGeneralUserInfo {
  formValues: {[key:string]: string}
  existEmployee?: boolean
  onInputChange: ({id, title, value}: {id?: string, title:string, value: string | string[]}) => void
}

function GeneralUserInfo({onInputChange, formValues, existEmployee}:IGeneralUserInfo) {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const gender = useAppSelector(
    (state) => state.employeeStore.newEmployeeGender
  );

  /* const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange",
    resolver: yupResolver(userFormSchema),
  }); */

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
          <img src={gender === 'FEMALE' ? '/defaultAvatarFemale.png': '/defaultAvatarMale.png'} alt="avatar" className="w-full"/>
          <SVGComponent title="editPhoto" />
        </div> 
        <div className="flex flex-col gap-2">
          {/* <label htmlFor='FIO' className="font-bold text-black text-[14px]">
            ФИО
          </label> */}
          <div className="flex flex-col gap-4 my-2">   
            <CustomInput
              type="text"
              name="first_name"
              placeholder="Фамилия"
              handleChange={onInputChange}
              value={formValues.first_name}
            />        
            <CustomInput
              type="text"
              name="last_name"
              placeholder="Имя"
              handleChange={onInputChange}
              value={formValues.last_name}
            />
            <CustomInput
              type="text"
              name="middle_name"
              placeholder="Отчество"
              handleChange={onInputChange}
              value={formValues.middle_name}
            />          
            <CustomInput
              label="Номер телефона"
              type="phone"
              name="phone_number"
              placeholder="998 (99) 123-45-67"
              required
              value={formValues.phone_number}
              handleChange={onInputChange}
            />
            <CustomInput type="text" name="login" label="Логин" required handleChange={onInputChange} value={formValues.login} />
            <DropDown
                title="Выбрать"
                listOfItems={[
                  { label: "Пользователь", key: 1, enumvalue: "OPERATOR" },
                  { label: "Бухгалтер", key: 2, enumvalue: "ACCOUNTANT" },
                  { label: "Админ", key: 3, enumvalue: "ADMIN" },
                ]}
                label="Роль"
                name="role_id"
                handleSelect={onInputChange}
                value={formValues.role_id}
              />             
              <DropDown
                  title="Выбрать"
                  listOfItems={[
                    { label: "Узбекский", key: 1, enumvalue: "UZ" },
                    { label: "Русский", key: 2, enumvalue: "RU" },
                  ]}
                  label="Родной язык"
                  name="language"
                  handleSelect={onInputChange}
                  value={formValues.language}
                />  
           {/*  <div className="flex flex-col justify-between gap-[6px]">
              <p className="font-bold text-black text-[14px]">Пол</p>
              <SwitchComponent
                inputName="sex"
                selectedDefaultTitle="Женский"
                selectedStyles="text-white bg-[#304F74]"
                unselectedTitle="Мужской"
                unselectedStyles="bg-[#fff] text-black border-[#D2DBE1]"
                inputHandler={dispatch.setNewEmployeeGender}
                currentSelect={gender}
              />
            </div> */}
          </div>
        </div>        
      </div>
      <div className="flex gap-2 bg-white p-3 rounded-2xl">
        <p className="font-bold text-black">Настройки доступа</p>
        <ButtonComponent
          titleBtn={<SVGComponent title="userAcces"/>}
          disabled={!existEmployee}
          color="bg-lombard-btn-green"
          clickHandler={() => {
            console.log(showDialog, "clicked");
            setShowDialog(true);
          }}
        />
        <ButtonComponent
          titleBtn={<SVGComponent title="userFP"/>}
          color="bg-lombard-main-blue"
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
