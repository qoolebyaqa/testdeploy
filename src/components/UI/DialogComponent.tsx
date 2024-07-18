import ButtonComponent from "./ButtonComponent";
import CustomInput from "./CustomInput";
import SVGComponent from "./SVGComponent";

function DialogComponent({closeHandler}:{closeHandler: () => void}) {
  return ( <div className="w-full h-full absolute flex justify-center items-center bg-gradient-to-b from-lombard-text-black to-transparent">
    <form className=" bg-white w-[340px] h-[462px] p-[40px] rounded-xl">
      <CustomInput label="Логин" type="text" name="login" required/>
      <p className="py-[32px] font-bold text-black">Отправить пароль</p>
      <CustomInput label="По почте" type="email" name="email" placeholder="example@mail.com"/>
      <CustomInput label="По номеру телефона" type="phone" name="phone" placeholder="+998 (__)___-__-__"/>
      <div className="flex flex-col gap-2">
        <ButtonComponent color="bg-lombard-btn-green" titleBtn="Отправить"/>
        <ButtonComponent color="bg-lombard-btn-grey" titleBtn="Отменить"/>
      </div>
      <button className="relative rounded-full bottom-[410px] left-[310px] bg-white" type="button" onClick={closeHandler}><SVGComponent title="x"/></button>
    </form>
  </div> );
}

export default DialogComponent;