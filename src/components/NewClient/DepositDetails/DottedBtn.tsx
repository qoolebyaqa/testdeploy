import { useState } from "react";
import SVGComponent from "../../UI/SVGComponent";

interface IDottedBtn {
  id: string;
  items: {[key:string]: string}[],
  pushNewIndex: () => void,
  deleteIndex: (id: string) => void
}

function DottedBtn({id, items, pushNewIndex, deleteIndex}: IDottedBtn) {  
  const [openControls, setOpenControls] = useState(false);
  
  function addItem() {
    pushNewIndex()
    setOpenControls(false);
  }
  function deleteItem(id: string) {
    deleteIndex(id)
  }

  const hiddenBtns = 
  <div className="flex flex-col absolute gap-[2px] z-10 left-12 top-0">
    <button className="bg-lombard-btn-green p-0 m-0 w-[40px] h-[40px] mx-auto" onClick={addItem}>+</button>
    {items[0].id !== id && <button className="bg-lombard-btn-red p-0 w-[40px] h-[40px]" onClick={() => deleteItem(id)}><SVGComponent title="cart"/></button>}
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