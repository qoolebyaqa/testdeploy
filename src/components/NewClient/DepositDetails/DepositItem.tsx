import { createPortal } from "react-dom";
import CustomInput from "../../UI/CustomInput";
import DialogComponent from "../../UI/DialogComponent";
import DropDown from "../../UI/DropDown";
import SVGComponent from "../../UI/SVGComponent";
import DepositCharacteristics from "./DepositCharacteristics";
import DottedBtn from "./DottedBtn";
import { useState } from "react";
import { motion } from "framer-motion";

function DepositItem({item}:{item: {[key:string]: string}}) {  
  const [showDialog, setShowDialog] = useState(false);
  return ( <motion.li className="flex mt-5" animate={{x: [-100, 100, 50, 0]}} transition={{duration: 0.3}}>
    <div className="w-5/12 mr-2">
      <div className="flex gap-1 items-center">
        <DropDown
          title="Выбрать"
          className="flex h-[41px]"
          listOfItems={[
            { label: "Золото", key: 1 },
            { label: "Серебро", key: 2 },
          ]}
          label="Тип залога"
          name="typeDeposit"
          triggerType="click"
        />
        <button className="self-end p-0 m-0 flex max-w-[280px] overflow-hidden text-lg" onClick={() => setShowDialog(true)}><i>
          <SVGComponent title="message" />
        </i>{item.comments && <p className="text-black py-2">{item.comments}</p>}
        </button>
      </div>
    </div>
    <div className="grow mr-12">
      <div className="flex gap-1">
        <CustomInput type="number" label="Цена" name="price" /> 
        <DottedBtn id={item.id} />
      </div>
    </div>    
    {showDialog && createPortal( <DialogComponent closeHandler={() => setShowDialog(false)}>
      <DepositCharacteristics closeHandler={() => setShowDialog(false)} id={item.id}/>
    </DialogComponent>, document.body)}
  </motion.li> );
}

export default DepositItem;