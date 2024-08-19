import { Table, TableColumnsType } from "antd";
import { motion } from "framer-motion";
import { IKatmDialogType, ISeekDayDialogType } from "../../helpers/types";
import SVGComponent from "./SVGComponent";
import { useState } from "react";
import ButtonComponent from "./ButtonComponent";

export interface ITableControl {
  columns: TableColumnsType, 
  data: IKatmDialogType[] | ISeekDayDialogType[],
  selectHandler?: (...args: any[]) => void
}
export interface ICollagseTable {
  tableControl: ITableControl,
  height: number,
  title: string,
  svg?: string
}

function CollapseTable({ tableControl, height, title, svg }: ICollagseTable) {
  const [showTable, setShowTable] = useState(true);
  
  const animationVariantsTable = {open: { height: [height, 0] }, closed: { height: [0, height] }}
  const animationVariantsBtn = {open: { rotate: [85, 0] }, closed: { rotate: [0, 85] }}

  return ( <div className="mx-2 bg-white rounded-2xl  px-2 border-2">
    <div className="text-black font-extrabold text-[18px] flex justify-between border-b-[1px] mb-2">
          <h3 className="py-4">{title}</h3>
          <div className="flex self-center">
            {svg ? <button><SVGComponent title={svg} /></button> : <ButtonComponent color="bg-lombard-btn-green" titleBtn="Добавить" />}            
            <motion.button 
            onClick={() => setShowTable(prev => !prev)}
            variants={animationVariantsBtn}
            animate={showTable ? 'open' : 'closed'}
            ><SVGComponent title="arrow" /></motion.button>
          </div>
        </div>
    <motion.div animate={!showTable ? 'open' : 'closed'} variants={animationVariantsTable} className="overflow-hidden">
      <Table
        columns={tableControl.columns}
        dataSource={tableControl.data}
        pagination={false}
        virtual scroll={{ y: height - 80}}
        className="drop-shadow-2xl hover:cursor-pointer"
        bordered
        onRow={(record) => {
          return { onClick: () => tableControl.selectHandler && tableControl.selectHandler(record) };
        }}
      />
    </motion.div>
    </div>
   );
}

export default CollapseTable;