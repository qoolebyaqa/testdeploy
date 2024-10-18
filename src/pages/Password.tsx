/* import Authentification from "./Authentification"; */

import { useEffect } from "react";

function Password() {
  useEffect(()=> {
    setTimeout(() => {window.location.href = '/'}, 20000)
  }, [])
  return ( 
    <h1 className="w-screen h-screen flex items-center justify-center text-3xl">На Ваш телефон отправлен код для сброса пароля, можете закрыть эту страницу. {/* <Authentification recoveryPass="recovery" restoreStep={2}/> */} </h1>
    
   );
}

export default Password;