import { useState } from "react";
import SVGComponent from "../../UI/SVGComponent";
import Confirmation from "../../UI/Confirmation";
import { createPortal } from "react-dom";
import { LocalcollateralItem } from "../../../helpers/API/Schemas";

interface IDottedBtn {
  currentItem: LocalcollateralItem;
  items: {[key:string]: string}[],
  pushNewIndex: () => void,
  deleteIndex: (item: any) => void,
  isValid?: boolean | undefined
}

function DottedBtn({currentItem, items, pushNewIndex, deleteIndex, isValid}: IDottedBtn) {  
  const [openControls, setOpenControls] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  function addItem() {
    pushNewIndex()
    setOpenControls(false);
  }

  const hiddenBtns = 
  <div className="flex flex-col absolute gap-[2px] z-10 left-12 top-0">
    <button type='button' className="bg-lombard-btn-green p-0 m-0 w-[35px] h-[35px] mx-auto" onClick={isValid ? addItem : undefined}>+</button>
    {items.length !== 1 && <button type='button' className="bg-lombard-btn-red p-0 w-[35px] h-[35px] flex justify-center items-center" onClick={() => setShowDeleteDialog(true)}><SVGComponent title="cart" className="w-[28px] h-[24px]"/></button>}
  </div>

  return (
    <div className="translate-y-[23px]">
    <button 
      className="w-[35px] h-[35px] flex justify-center items-center bg-lombard-main-blue self-end mb-[2px]"
      onClick={() => setOpenControls(prev => !prev)}
      type="button"
    >
      <div 
        className={`flex justify-between items-center h-[16px] transition-all duration-300 ${openControls ? 'gap-0' : 'gap-[4px]'}`}
      >
        <span 
          className={`block bg-white transition-all duration-300 ${openControls ? 'rotate-45 translate-x-4 w-[16px] h-[2px]' : 'rounded-full w-[4px] h-[4px]'}`}
        />
        <span 
          className={`block bg-white transition-all duration-300 ${openControls ? 'opacity-0 w-[16px] h-[2px]' : 'rounded-full w-[4px] h-[4px]'}`}
        />
        <span 
          className={`block bg-white transition-all duration-300 ${openControls ? '-rotate-45 -translate-x-4 w-[16px] h-[2px]' : 'rounded-full w-[4px] h-[4px]'}`}
        />
      </div>
    </button>
    {openControls && hiddenBtns}
    {showDeleteDialog && createPortal(<Confirmation handleClose={() => setShowDeleteDialog(false)} handleSave={() => {deleteIndex(currentItem); setShowDeleteDialog(false)}} title="Удалить залог?" textMsg="Вы действительно хотите удалить залог?"/>, document.body)}
    </div>
  );
}

export default DottedBtn;