import { createPortal } from "react-dom";
import CustomInput from "../../UI/CustomInput";
import DialogComponent from "../../UI/DialogComponent";
import DropDown from "../../UI/DropDown";
import SVGComponent from "../../UI/SVGComponent";
import DepositCharacteristics from "./DepositCharacteristics";
import DottedBtn from "./DottedBtn";
import { useState } from "react";
import { motion } from "framer-motion";

function DepositItem({item, pushNewIndex, deleteIndex, formDepositItems, submitInputData}:{item: {[key:string]: string}, pushNewIndex: () => void, deleteIndex: (id: string) => void, formDepositItems: {[key:string]: string}[], submitInputData: (data: {[key:string]: string | string[]}) => void}) {  
  const [showDialog, setShowDialog] = useState(false);
  const info = `${item.comments} ${item.quality} проба, Общ. гр. ${item.totalWeight}, Чис. гр. ${item.pureWeight}`
  return ( <motion.li className="flex mt-5" animate={{y: [-100, 100, 50, 0]}} transition={{duration: 0.3}}>
    <div className="w-5/12 mr-2">
      <div className="flex gap-1 items-center">
        <DropDown
          title="Выбрать"
          listOfItems={[
            { label: "Золото", key: 1, enumvalue: "GOLD" },
            { label: "Другое", key: 2, enumvalue: "OTHER" },
          ]}
          label="Тип залога"
          name="typeDeposit"
          className="h-[40px]"
        />
        <button className="self-end p-0 m-0 flex max-w-[280px] overflow-hidden text-lg" onClick={() => setShowDialog(true)}><i>
          <SVGComponent title="message" />
        </i>{item.comments && <p className="text-black py-2 text-[10px]">{info}</p>}
        </button>
      </div>
    </div>
    <div className="grow mr-12">
      <div className="flex gap-1">
        <CustomInput type="number" label="Цена" name="price" className="h-[40px]" /> 
        <DottedBtn id={item.id} pushNewIndex={pushNewIndex} deleteIndex={deleteIndex} items={formDepositItems}/>
      </div>
    </div>    
    {showDialog && createPortal( <DialogComponent closeHandler={() => setShowDialog(false)}>
      <DepositCharacteristics closeHandler={() => setShowDialog(false)} id={item.id} submitInputData={submitInputData}/>
    </DialogComponent>, document.body)}
  </motion.li> );
}

export default DepositItem;