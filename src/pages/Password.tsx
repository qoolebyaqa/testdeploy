/* import Authentification from "./Authentification"; */

import { /* useEffect, */ useState } from "react";
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

async function handleSubmit() {
  try {
    await ApiService.getOTP(params.tkn, phone)
  } catch (err) {
    console.log(err);
  }
}

return ( 
    
    <form onSubmit={handleSubmit}>
      <label htmlFor="phone">
      <input type="phone" placeholder="Введите номер телефона" onChange={(e) => setPhone(e.target.value)}/>
      </label>
      <button>Отправить КОД</button>
    </form>
   );
}

export default Password;