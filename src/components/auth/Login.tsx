import { FormEvent } from "react";
import SVGComponent from "../UI/SVGComponent";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useActions from "../../helpers/hooks/useActions";

function Login({showRecoveryPass}: {showRecoveryPass: () => void}) {
  const navigate = useNavigate();
  const dispatch = useActions()

  function handleAuthSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch.setAuthentificated()
    navigate("/")
  }

  return (
    <form
    onSubmit={handleAuthSubmit} 
    className="authForm h-[647px] flex flex-col justify-around w-[420px] rounded-[40px] p-[48px] bg-transparent/55 backdrop-blur-[90px] mb-80">
      <h3 className="text-[24px] text-center font-bold text-white">Авторизация в систему</h3>
      <div className="overflow-hidden">
        <p className="text-center text-white">сканируйте отпечаток пальца</p>
        <SVGComponent title={"fprint"}/>
        <motion.div className="h-[14px] rounded-md w-5/12 bg-gradient-to-b from-lombard-btn-green mx-auto"
        animate={{y: [0, -75, -200, -75, 0]}}
        transition={{repeat: Infinity, duration: 2, repeatDelay: 0, ease: "linear", bounce: 0}}/>
        <p className="text-center text-gray-400">или</p>
      </div>
      <div>
        <div className="border-2 border-white rounded-md relative flex items-center">
          <label htmlFor="login"/>
          <input type="text" name="login" id="login" placeholder="Логин" className="h-[56px] w-full bg-white/30 px-4"/>
          <i className="absolute right-2"><SVGComponent title={"loginKey"}/></i>
        </div>
        <div className="border-2 border-white my-4 rounded-md relative flex items-center">
          <label htmlFor="password"/>
          <input type="password" name="password" id="password" placeholder="Пароль" className="h-[56px] w-full bg-white/30 rounded-md px-4"/>
          <i className="absolute right-2"><SVGComponent title={"passKey"}/></i>
        </div>
      </div>
      <button className="authButton text-white font-bold">Войти</button>
      <p className="text-lombard-bg-inactive-grey underline text-center hover:cursor-pointer" onClick={showRecoveryPass}>Забыли пароль?</p>
    </form>
    
  );
}

export default Login;
