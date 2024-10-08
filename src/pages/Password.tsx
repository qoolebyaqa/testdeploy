/* import Authentification from "./Authentification"; */

import { /* useEffect, */ FormEvent, useState } from "react";
/* import CustomInput from "../components/UI/CustomInput"; */
import { useLoaderData } from "react-router";
import { ApiService } from "../helpers/API/ApiSerivce";

function Password() {
  /* useEffect(()=> {
    setTimeout(() => {window.location.href = '/'}, 20000)
  }, []) */
/*   <h1 className="w-screen h-screen flex items-center justify-center text-3xl">На Ваш телефон отправлен код для сброса пароля, можете закрыть эту страницу. <Authentification recoveryPass="recovery" restoreStep={2}/> </h1> */
const [phone, setPhone] = useState(''); 
const params:any = useLoaderData();

async function handleSubmit(e:FormEvent) {
  e.preventDefault();
  try {
    await ApiService.getOTP(params.tkn, phone)
  } catch (err) {
    console.log(err);
  }
}

return ( 
    <div className="bg-black w-screen h-screen flex items-center justify-center">
    <form onSubmit={handleSubmit}>
      <p className="font-extrabold text-xl w-[300px] text-center mb-4">Введите номер телефона для отправки кода</p>
      <label htmlFor="phone">
      <input type="phone" placeholder="Введите номер телефона" onChange={(e) => setPhone(e.target.value)}/>
      </label>
      <button disabled={!phone}>Отправить КОД</button>
    </form>
    </div>
   );
}

export default Password;