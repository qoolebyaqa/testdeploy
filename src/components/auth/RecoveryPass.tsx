import { useState } from "react";
import SVGComponent from "../UI/SVGComponent";
import ButtonComponent from "../UI/ButtonComponent";
import { motion } from "framer-motion";
import CustomInput from "../UI/CustomInput";
import ConfirmationCode from "./ConfirmationCode";
import { ApiService } from "../../helpers/API/ApiSerivce";
import useActions from "../../helpers/hooks/useActions";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import ErrorMessage from "../UI/ErrorMessage";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passWordPower, passWordPowerSchema } from "../../helpers/validator";

function RecoveryPass({ showRecoveryPass, restoreStep }: { showRecoveryPass: () => void, restoreStep?: number }) {
  const [recoveryPassStep, setRecoveryPassStep] = useState(restoreStep || 0);
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [token, setToken] = useState('');
  const [passInputs, setPassInputs] = useState({newPass: '', repeatNewPass: ''})
  const [phoneNumber, setPhoneNumber] = useState({phone_number: ''});
  const errorStateMsg = useAppSelector((state) => state.auth.authError);
  const dispatch = useActions();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange",
    resolver: yupResolver(passWordPowerSchema),
  })

  const handleSetPassSubmit = async (formData: passWordPower) => {    
    try {
      if(formData.newPass && formData.repeatNewPass){
        await ApiService.setNewPass(token, formData.newPass, formData.repeatNewPass);
        window.location.href = '/'
      }
    } catch (err) {
      console.log(err);
      dispatch.setAuthError('Password must be confirmed by the same value');
    }
  }
  const phoneHandler = (inputValue: {id?: string, title:string, value: string | string[]}) => {   
    setPhoneNumber(prev => ({...prev, [inputValue.title]: Array.isArray(inputValue.value) ? inputValue.value[0] : inputValue.value}))
  }
  const valueChangeHandler = (inputValue: {id?: string, title:string, value: string | string[]}) => {   
    setPassInputs(prev => ({...prev, [inputValue.title]: inputValue.value})) 
  }

  async function verifyOTP() {
    try {
      const response = await ApiService.verifyOTP(phoneNumber.phone_number, Number(code.join('')));
      setToken(response.data.token)
      setRecoveryPassStep(3)
    } catch (err) {
      console.log(err);
      dispatch.setAuthError('Please try another code')
    }
  }

  async function setNewPass() {
    try {
      await ApiService.setNewPass(token, passInputs.newPass, passInputs.repeatNewPass);
      window.location.href = '/'
    } catch (err) {
      console.log(err);
      dispatch.setAuthError('Password must be confirmed by the same value');
    }
  }

  const clearPageAfterTimeOut = () => {
    setRecoveryPassStep(0);
    showRecoveryPass();
    window.location.href = '/'
  }

  return (
    <>
    {errorStateMsg && (createPortal(<ErrorMessage
          shownMessage={errorStateMsg}
          setShownMessage={(msg) => dispatch.setAuthError(msg)}
        />, document.body)        
      )}
    <div
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
          {recoveryPassStep === 3
            ? "Установите пароль"
            : recoveryPassStep === 0 ? "Введите номер телефона" 
            : recoveryPassStep === 1 ? "Для восстановления пароля Вам будет отправлена ссылка" 
            :  'Введите код из СМС'}
        </p>
        {recoveryPassStep === 3 ? (
          <form 
            onSubmit={handleSubmit(handleSetPassSubmit)}
            id="setPassword"
            className="py-4 px-[2px]">
            <CustomInput
              type="password"
              label="Новый пароль"
              name="newPass"
              className="bg-white"
              labelStyles="text-white mt-[6px]"
              placeholder="********"
              handleChange={valueChangeHandler}
              control={control}
              errorMsg={errors.newPass?.message}
            />
            <CustomInput
              type="password"
              label="Повторить новый пароль"
              name="repeatNewPass"
              className="bg-white"
              labelStyles="text-white mt-[6px]"
              placeholder="********"
              handleChange={valueChangeHandler}
              control={control}
              errorMsg={errors.repeatNewPass?.message}
            />
          </form>
        ) : recoveryPassStep === 2 ? <ConfirmationCode code={code} setCode={setCode} clearFn={clearPageAfterTimeOut}/> : (
          <motion.div
            className="text-center rounded-2xl py-10 px-2 overflow-hidden h-[140px]"
            animate={recoveryPassStep === 1 ? { height: [180, 180, 190, 210], border: '1px solid white' } : { height: [160], border: "none"}}
          >
            <motion.div animate={recoveryPassStep === 1 ? { y: [0, -40, -80, -120] } : { y: [-120, -80, -40, 0] } }>
            <CustomInput
              label="Номер телефона"
              type="phone"
              name="phone_number"
              placeholder="998 (__) ___-__-__"
              labelStyles="text-white text-left"
              className="bg-black text-white w-full"
              value={phoneNumber.phone_number}
              handleChange={phoneHandler}
              required
            />
              <motion.div
                className="bg-lombard-btn-green w-[100px] h-[100px] rounded-full mx-auto mt-20 text-[68px] flex items-center justify-center"
                animate={recoveryPassStep === 1 && { scale: [1, 1.3, 1.2, 1] }}
              >
                <SVGComponent title="achivement" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
      {recoveryPassStep === 1 ? (
        <>
        <button
          className="authButton text-white font-bold"
          onClick={() => setRecoveryPassStep(2)}
        >
          Авторизация
        </button>        
        <ButtonComponent
          color="bg-lombard-btn-grey"
          titleBtn="Закрыть"
          className="bg-lombard-text-black"
          clickHandler={() => {setRecoveryPassStep(0); showRecoveryPass()}}
        />
        </>
      ) : (
        <>
          {recoveryPassStep === 2 || recoveryPassStep === 3? (
            <ButtonComponent
              color="bg-lombard-btn-green"
              titleBtn="Подтвердить"
              disabled={recoveryPassStep === 2 && code.filter(item => !!item).length < 6}
              clickHandler={recoveryPassStep === 2 ? verifyOTP : setNewPass}
              form={recoveryPassStep !== 2 ? 'setPassword' : ''} 
            />
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <ButtonComponent
                  color="bg-lombard-btn-green"
                  titleBtn="Восстановить"
                  clickHandler={() => setRecoveryPassStep(2)}
                  disabled={phoneNumber.phone_number.length < 12}
                />
                <ButtonComponent
                  color="bg-lombard-btn-grey"
                  titleBtn="Запросить код"
                  className="bg-lombard-main-blue"
                  clickHandler={() => setRecoveryPassStep(1)}
                  disabled={phoneNumber.phone_number.length < 12}
                />
                <ButtonComponent
                  color="bg-lombard-btn-grey"
                  titleBtn="Закрыть"
                  className="bg-lombard-text-black"
                  clickHandler={showRecoveryPass}
                />
              </div>
            </>
          )}
        </>
      )}
    </div></>
  );
}

export default RecoveryPass;
