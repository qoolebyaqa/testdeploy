import { FormEvent, useState } from "react";
import SVGComponent from "../UI/SVGComponent";
import ButtonComponent from "../UI/ButtonComponent";
import { motion } from "framer-motion";
import CustomInput from "../UI/CustomInput";
import ConfirmationCode from "./ConfirmationCode";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { useLoaderData } from "react-router";

function RecoveryPass({ showRecoveryPass, restoreStep }: { showRecoveryPass: () => void, restoreStep?: number }) {
  const [recoveryPassStep, setRecoveryPassStep] = useState(restoreStep || 0);
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [passInputs, setPassInputs] = useState({newPass: '', repeatNewPass: ''})
  const OTP: any = useLoaderData();
  console.log(OTP);
  function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const valueChangeHandler = (inputValue: {id?: string, title:string, value: string | string[]}) => {   
    setPassInputs(prev => ({...prev, [inputValue.title]: inputValue.value})) 
  }

  async function verifyOTP() {
    try {
      /* await ApiService.verifyOTP(OTP.data.token, Number(code.join(''))); */
      setRecoveryPassStep(3)
    } catch (err) {
      console.log(err);
    }
  }

  async function setNewPass() {
    try {
      console.log(passInputs)
      /* await ApiService.setNewPass(OTP.data.token, passInputs.newPass, passInputs.repeatNewPass); */
      window.location.href = '/'
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleAuthSubmit}
      className="mx-auto h-[647px] flex flex-col justify-around w-[420px] rounded-[40px] p-[48px] bg-black text-white"
    >
      <div className="flex justify-center">
        <SVGComponent title="lock" />
      </div>
      <div>
        <h3 className="text-[24px] text-center font-bold">
          Восстановить доступ
        </h3>
        <p className="text-center my-6">
          {recoveryPassStep === 2
            ? "Введите новый пароль"
            : recoveryPassStep === 0 || recoveryPassStep === 1 ? "для восстановления пароля вам будет отправлена ссылка по" 
            : recoveryPassStep === 3 ? "для подтверждения вам отправлен код на номер" : ''}
        </p>
        {recoveryPassStep === 3 ? (
          <div className="py-4 px-[2px]">
            <CustomInput
              type="password"
              label="Новый пароль"
              name="newPass"
              className="bg-white"
              labelStyles="text-white mt-[6px]"
              placeholder="********"
              handleChange={valueChangeHandler}
            />
            <CustomInput
              type="password"
              label="Повторить новый пароль"
              name="repeatNewPass"
              className="bg-white"
              labelStyles="text-white mt-[6px]"
              placeholder="********"
              handleChange={valueChangeHandler}
            />
          </div>
        ) : recoveryPassStep === 2 ? <ConfirmationCode code={code} setCode={setCode}/> : (
          <motion.div
            className="text-center rounded-2xl border-[1px] border-lombard-btn-grey py-10 overflow-hidden h-[140px]"
            animate={recoveryPassStep === 1 && { height: [180, 180, 190, 210] }}
          >
            <motion.div animate={recoveryPassStep === 1 && { y: [0, -40, -80, -100] }}>
              <p>Номеру телефона</p>
              <strong>+998 (99) 08*-**-60</strong>
              <motion.div
                className="bg-lombard-btn-green w-[100px] h-[100px] rounded-full mx-auto mt-16 text-[68px] flex items-center justify-center"
                animate={recoveryPassStep === 1 && { scale: [1, 1.3, 1.2, 1] }}
              >
                <SVGComponent title="achivement" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
      {recoveryPassStep === 1 ? (
        <button
          className="authButton text-white font-bold"
          onClick={() => setRecoveryPassStep(2)}
        >
          Авторизация
        </button>
      ) : (
        <>
          {recoveryPassStep === 2 || recoveryPassStep === 3? (
            <ButtonComponent
              color="bg-lombard-btn-green"
              titleBtn="Подтвердить"
              clickHandler={recoveryPassStep === 2 ? verifyOTP : setNewPass}
            />
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <ButtonComponent
                  color="bg-lombard-btn-green"
                  titleBtn="Отправить"
                  clickHandler={() => setRecoveryPassStep(1)}
                />
                <ButtonComponent
                  color="bg-lombard-btn-grey"
                  titleBtn="Отменить"
                  className="text-black"
                  clickHandler={showRecoveryPass}
                />
              </div>
            </>
          )}
        </>
      )}
    </form>
  );
}

export default RecoveryPass;
