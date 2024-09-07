import { useState } from "react";
import SVGComponent from "../../UI/SVGComponent";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";
import useActions from "../../../helpers/hooks/useActions";

interface IDottedBtn {
  id: string;
  /* page?: string; */
}

function DottedBtn({id}: IDottedBtn) {  
  const [openControls, setOpenControls] = useState(false);
  const formDepositItems = useAppSelector(state => state.clientStore.depositCommentForm)
  const dispatch = useActions();
  function addItem() {
    let newID = Math.random().toFixed(8);
    while(formDepositItems.map(val => val.id).includes(newID)){
      newID = Math.random().toFixed(8);
    }
    dispatch.addDepositCommentItem(newID);
    setOpenControls(false);
  }
  function deleteItem(id: string) {
    dispatch.deleteDepositItem(id)
  }

  const hiddenBtns = 
  <div className="flex flex-col absolute gap-[2px] z-10 left-12 top-0">
    <button className="bg-lombard-btn-green p-0 m-0 w-[40px] h-[40px] mx-auto" onClick={addItem}>+</button>
    {formDepositItems[0].id !== id && <button className="bg-lombard-btn-red p-0 w-[40px] h-[40px]" onClick={() => deleteItem(id)}><SVGComponent title="cart"/></button>}
  </div>

  return (
    <div className="translate-y-[23px]">
    <button 
      className="w-[40px] h-[40px] flex justify-center items-center bg-lombard-main-blue self-end mb-[2px]"
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
    </div>
  );
}

export default DottedBtn;