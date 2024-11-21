import { motion } from "framer-motion";
import SVGComponent from "./SVGComponent";
import { ReactNode, useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import UsualSwitch from "./UsualSwitch";



export interface ICollapseWrapper {
  title: string,
  page?: string,
  children: ReactNode;
  notActive?: boolean;
  handleClick?: () => void;
  handleBlockSelect?: () => void;
  shouldBeSelected?: boolean | undefined
}

const CollapseWrapper: React.FC<ICollapseWrapper> = ({ title, page, children, notActive, handleClick, handleBlockSelect, shouldBeSelected }) => {
  const [showTable, setShowTable] = useState(true);
  const animationVariantsTable = {open: { height: ['auto', 0] }, closed: { height: [0, 'auto'] }}
  const animationVariantsBtn = {open: { rotate: [85, 0] }, closed: { rotate: [0, 85] }}
  useEffect(() => {
    setShowTable(!notActive);
  }, [notActive]);

  const handleThirdPartyPaymentChange = (checked: boolean) => {
    if (checked&&!!handleClick) {
      handleClick()
    }
  };

  return ( <div className={`mx-2 bg-white rounded-2xl px-2 border-2 transition-all duration-100 ${shouldBeSelected ? 'border-lombard-main-blue border-4': ''}`} onClick={(e) => {e.stopPropagation(); handleBlockSelect && handleBlockSelect()}}>
    <div className="text-black font-extrabold text-[18px] flex justify-between border-b-[1px] mb-2">
          <div className="flex items-center gap-2">
            <h3 className={`p-4 ${notActive ? 'text-lombard-borders-grey' : ''}`}>{title}</h3>
            {(handleClick && page === 'newClient' && !notActive) && <ButtonComponent titleBtn="График погашения" clickHandler={handleClick} color="bg-lombard-main-blue" />}
            {(page === 'contract' && !notActive) && <UsualSwitch title="Платит третье лицо" switchFirst={true} onSwitchChange={handleThirdPartyPaymentChange}/>}
          </div>
          <div className="flex self-center">
            {page === 'filial' || page === 'newEmployee' && <ButtonComponent color="bg-lombard-btn-green" titleBtn="Добавить" clickHandler={handleClick} />}
            {page === 'newClient' && <p className="text-[#D2DBE1] font-medium text-[14px]">Договор № <b className="text-[black] font-bold text-[15px]">10/29983</b></p> }                
            <motion.button 
            onClick={() => setShowTable(prev => !prev)}
            variants={animationVariantsBtn}
            animate={showTable ? 'open' : 'closed'}
            disabled={notActive}
            type="button"
            ><SVGComponent title="arrow" /></motion.button>
          </div>
        </div>
    <motion.div animate={!showTable ? 'open' : 'closed'} variants={animationVariantsTable} className="overflow-hidden">
      {children}
    </motion.div>
    </div>
   );
}

export default CollapseWrapper;