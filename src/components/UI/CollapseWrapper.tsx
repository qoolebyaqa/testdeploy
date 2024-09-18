import { motion } from "framer-motion";
import SVGComponent from "./SVGComponent";
import { ReactNode, useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";



export interface ICollapseWrapper {
  title: string,
  page?: string,
  children: ReactNode;
  notActive?: boolean;
  handleClick?: () => void
}

const CollapseWrapper: React.FC<ICollapseWrapper> = ({ title, page, children, notActive, handleClick }) => {
  const [showTable, setShowTable] = useState(true);
  const animationVariantsTable = {open: { height: ['auto', 0] }, closed: { height: [0, 'auto'] }}
  const animationVariantsBtn = {open: { rotate: [85, 0] }, closed: { rotate: [0, 85] }}
  useEffect(() => {
    setShowTable(!notActive);
  }, [notActive]);

  return ( <div className={`mx-2 bg-white rounded-2xl px-2 border-2 transition-all duration-100 ${page==='newClient' ? 'focus-within:border-lombard-main-blue focus-within:border-4': ''}`}>
    <div className="text-black font-extrabold text-[18px] flex justify-between border-b-[1px] mb-2">
          <div className="flex items-center gap-2">
            <h3 className={`p-4 ${notActive ? 'text-lombard-borders-grey' : ''}`}>{title}</h3>
            {(handleClick && page === 'newClient' && !notActive) && <ButtonComponent titleBtn="График погашения" clickHandler={handleClick} color="bg-lombard-main-blue" />}
          </div>
          <div className="flex self-center">
            {page === 'filial' && <ButtonComponent color="bg-lombard-btn-green" titleBtn="Добавить" clickHandler={handleClick} />}
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