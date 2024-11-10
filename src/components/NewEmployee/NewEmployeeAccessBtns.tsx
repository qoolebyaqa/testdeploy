import { useState } from "react";
import ButtonComponent from "../UI/ButtonComponent";
import SVGComponent from "../UI/SVGComponent";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { createPortal } from "react-dom";
import DialogComponent from "../UI/DialogComponent";
import CustomInput from "../UI/CustomInput";
import { userFormValue } from "../../helpers/validator";
import FingerPrintRegistration from "./FingerPrintRegistration";

function NewEmployeeAccessBtns({
  generalFormValues,
}: {
  generalFormValues?: userFormValue;
}) {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [fingerShowDialog, setFingerShowDialog] = useState(false);

  const resetPass = async () => {
    setLoading(true);
    generalFormValues?.login &&
      (await ApiService.getLinktoReset(generalFormValues?.login));
    setShowDialog(false);
    setLoading(false);
  };

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">
          Регистрация сотрудника
        </h3>
        <div className="flex gap-1 items-center">
          {generalFormValues?.login && (
            <>
              <ButtonComponent
                titleBtn="Удалить"
                className="bg-lombard-btn-red"
              />
              <ButtonComponent
                titleBtn="Печать"
                className="bg-lombard-btn-yellow"
              />
            </>
          )}
          <ButtonComponent
            titleBtn={
              <>
                <SVGComponent title="userAcces" color={`${generalFormValues?.login ? 'white':  '#3B3B3B'}`}/>
                <p className="ml-2">Настройка доступа</p>
              </>
            }
            disabled={!generalFormValues?.login}
            className={`${
              !generalFormValues?.login
                ? "bg-lombard-btn-grey text-black"
                : "bg-lombard-btn-green text-white"
            }`}
            clickHandler={() => {
              setShowDialog(true);
            }}
          />
          <ButtonComponent
            titleBtn={
              <>
                <SVGComponent title="userFP" color={`${generalFormValues?.login ? 'white':  '#3B3B3B'}`}/>
                <p className="ml-2">Отпечатки пальцев</p>
              </>
            }
            className={`${
              !generalFormValues?.login
                ? "bg-lombard-btn-grey text-black"
                : "bg-lombard-main-blue text-white"
            }`}
            disabled={!generalFormValues?.login}
            clickHandler={() => {
              setFingerShowDialog(true);
            }}
          />
        </div>
        {showDialog &&
          createPortal(
            <DialogComponent closeHandler={() => setShowDialog(false)}>
              <div className="w-[280px]">
                <CustomInput
                  label="Логин"
                  type="text"
                  name="login"
                  value={generalFormValues?.login}
                  isDisabled
                />
                <p className="py-[24px] font-bold text-black">
                  Отправить пароль
                </p>
                <CustomInput
                  label="По номеру телефона"
                  type="phone"
                  name="phone"
                  value={generalFormValues?.phone_number}
                  isDisabled
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

        {fingerShowDialog &&
          createPortal(
            <DialogComponent closeHandler={() => setFingerShowDialog(false)}>
              <FingerPrintRegistration />
            </DialogComponent>,
            document.body
          )}
      </div>
    </>
  );
}

export default NewEmployeeAccessBtns;
