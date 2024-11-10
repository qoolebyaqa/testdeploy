import { FormEvent, useEffect, useState } from "react";
import SVGComponent from "../UI/SVGComponent";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ApiService } from "../../helpers/API/ApiSerivce";
import useActions from "../../helpers/hooks/useActions";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import ErrorMessage from "../UI/ErrorMessage";
import { toast,ToastContainer } from "react-toastify";

function Login({ showRecoveryPass }: { showRecoveryPass: () => void }) {
  const [user, setUser] = useState({ login: "", password: "" });
  const accessTKN = useAppSelector((state) => state.auth.access_token);
  const [loading, setLoading] = useState(false);
  const errorStateMsg = useAppSelector((state) => state.auth.authError);
  const dispatch = useActions();
  const navigate = useNavigate();
  useEffect(() => {
    !accessTKN || !localStorage.getItem('rt') ? fetchRefreshTKN() : navigate("/");
  }, []);
  async function fetchRefreshTKN() {
    const refreshToken = localStorage.getItem("rt");
    dispatch.setAuthLoading(true);
    if (refreshToken) {
      try {
        const result = await ApiService.refreshToken(refreshToken);
        dispatch.setCurToken(result.data.access_token);
        localStorage.setItem("rt", result.data.refresh_token);
        navigate("/");
      } catch (error) {
        console.log("Refresh is rejected", error);
        localStorage.removeItem('rt');
        dispatch.setAuthLoading(false)
      }
    } else {
      console.log('aga')
      dispatch.setAuthLoading(false)
      return;
    }
  }
  async function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (user.login !== "" || user.password !== "") {
      try {
        setLoading(true);
        const result = await ApiService.login(user.login, user.password);
        if (result.status === 200) {
          dispatch.setCurToken(result.data.access_token);
          localStorage.setItem("rt", result.data.refresh_token);
          navigate("/");
          dispatch.setAuthLoading(true)
        }
      } catch (error: any) {
        dispatch.setAuthError(error.response.data.message);
        dispatch.setAuthLoading(false)
      } finally {
        setLoading(false);
      }
    }
  }
  const [resetPass,setResetPass]=useState(false)
  async function getUserNumber() {
    showRecoveryPass()
    setResetPass(true)
  }
  const [fingerPrintState,setFingerPrintState]=useState(false)
  const [inputBorder,setInputBorder]=useState(false)
  
  async function openFingerPrint(){
    if(user.login!==""){
      setFingerPrintState(true)
      setResetPass(false)
      
      try{
        setLoading(true);
        const result = await ApiService.preLogin(user.login)
        preLoginAgent(result.data)
      }catch(error:any){
        console.log(error);
      }finally {
        setLoading(false);
      }
      setInputBorder(false)
    }else{
      toast.error("Пожалуйста, введите свой логин")
      setInputBorder(true)
      console.log(inputBorder);
      
    }
  }

  const [showMoreTimeBtn,setShowMoreTimeBtn]=useState(false)
  async function preLoginAgent(data:any){
    try{
      const response = await fetch("http://localhost:9090/api/v1/verify", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          mode:'no-cors'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        setShowMoreTimeBtn(true)
      }
    
      const processdate = await response.json();
      if(processdate.success){
        loginWithFinger(processdate)
      }else{
        toast.error("Отпечаток пальца пользователя не найден")
      }
      
    }catch(error:any){
      console.log(error);
      setShowMoreTimeBtn(true)
      toast.error(error.toString())
    }
  }

  async function loginWithFinger(data:any){
    try{

      const response = await ApiService.loginWithFingerPrint(data.result,data.id)
      console.log(response);
      if (response.status === 200) {
        dispatch.setCurToken(response.data.access_token);
        localStorage.setItem("rt", response.data.refresh_token);
        navigate("/");
        dispatch.setAuthLoading(true)
      }
      
    }catch(error){
      console.log(error);
      
    }
  }

  return (
    <>
      <ToastContainer/>
      {errorStateMsg && (
        <ErrorMessage
          shownMessage={errorStateMsg}
          setShownMessage={(msg) => dispatch.setAuthError(msg)}
        />
      )}
      <form
        onSubmit={handleAuthSubmit}
        className={fingerPrintState?'hidden': `  authForm h-[647px] flex flex-col justify-around w-[420px] rounded-[40px] p-[48px] bg-transparent/55 backdrop-blur-[90px] mb-80  `}

      >
        <fieldset disabled={loading}>
          <h3 className="text-[24px] text-center font-bold text-white mb-20">
            Авторизация в систему
          </h3>
          
          <div>
            <div className={`border-2 border-white  rounded-md relative flex items-center ${inputBorder?'border-red-600':''}`}>
              <label htmlFor="login" />
              <input
                type="text"
                name="login"
                id="login"
                placeholder="Логин"
                className={`h-[56px] w-full ${user.login !== '' ? 'bg-white/80' : 'bg-white/30'}   px-4`}
                value={user.login}
                onChange={(e) => setUser({ ...user, login: e.target.value })}
              />
              <i className="absolute right-2">
                <SVGComponent title={"loginKey"} />
              </i>
            </div>
            <div className="border-2 border-white my-4 rounded-md relative flex items-center">
              <label htmlFor="password" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                className={`h-[56px] w-full px-4 ${user.password !== '' ? 'bg-gray-50/95' : 'bg-white/30'}`}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <i className="absolute right-2">
                <SVGComponent title={"passKey"} />
              </i>
            </div>
          </div>
          <div className="flex flex-col ">
            <button className="authButton text-white font-bold mb-10">Войти</button>
            <div className="flex justify-between flex-col">
              <button
                type="button"
                className="text-lombard-bg-inactive-grey underline text-center"
                onClick={openFingerPrint}
              >
                Авторизация по отпечатку пальца
              </button>
              <button
                type="button"
                className="text-lombard-bg-inactive-grey underline text-center"
                onClick={getUserNumber}
              >
                Забыли пароль?
              </button>
             
            </div>
          </div>
        </fieldset>
      </form>
      <div className={resetPass?`hidden`:`authForm w-[420px] rounded-[40px] p-[48px] bg-transparent/55 backdrop-blur-[90px] mb-80`}>
        <div className="overflow-hidden ">
              <p className="text-center text-white">
                сканируйте отпечаток пальца
              </p>
              <SVGComponent title={"fprint"} />
              <motion.div
                className="h-[14px] rounded-md w-5/12 bg-gradient-to-b from-lombard-btn-green mx-auto"
                animate={{ y: [0, -75, -200, -75, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  repeatDelay: 0,
                  ease: "linear",
                  bounce: 0,
                }}
              />
          </div>
            <div className="flex flex-col justify-center">
              
              <button
                type="button"
                className="text-lombard-bg-inactive-grey underline text-center"
                onClick={()=>{setFingerPrintState(false); setShowMoreTimeBtn(false)}}
              >
                Вернуться на страницу авторизации
              </button>
              {
                showMoreTimeBtn && (
                  <button
                    type="button"
                    className="text-lombard-bg-inactive-grey underline text-center"
                    onClick={openFingerPrint}
                  >
                    Попробуйте еще раз
                  </button>
                )
              }
            </div>
      </div>

    </>
  );
}

export default Login;
