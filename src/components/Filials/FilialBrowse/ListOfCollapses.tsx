import { Table } from "antd";
import { columnsSeekDaysDialog, dataSeekDaysDialog } from "../../../helpers/fnHelpers";
import CollapseWrapper from "../../UI/CollapseWrapper";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modals from "./Modals";

function ListOfCollapses() {
  const [showDialog, setShowDialog] = useState('');
  const tables = [
    { title: "Дни отдыха", controls: {columns: columnsSeekDaysDialog, data: dataSeekDaysDialog, selectHandler: (_record: {}) => {}}, showDialog: () => setShowDialog('seekDays')},
    { title: "Кредитные продукты", controls: {columns: columnsSeekDaysDialog, data: dataSeekDaysDialog, selectHandler: (_record: {}) => {} }, showDialog: () => setShowDialog('creditProducts')},
    { title: "Параметры залогов", controls: {columns: columnsSeekDaysDialog, data: dataSeekDaysDialog, selectHandler: (_recorda: {}) => {} }, showDialog: () => setShowDialog('parametersPledge')},
    { title: "Счета филиалов", controls: {columns: columnsSeekDaysDialog, data: dataSeekDaysDialog, selectHandler: (_record: {}) => {} }, showDialog: () => setShowDialog('budgetFilials')}
  ];

  return (
    <ul className="w-3/5 list-none flex flex-col gap-2">
      {tables.map(table => 
        <li key={table.title}>
          <CollapseWrapper title={table.title} page="filial" handleClick={table.showDialog}>          
            <Table
              columns={table.controls.columns}
              dataSource={table.controls.data}
              pagination={false}
              virtual scroll={{ y: 240 - 80}}
              className="drop-shadow-2xl hover:cursor-pointer h-[240px]"
              bordered
              onRow={(record) => {
                return { onClick: () => table.controls.selectHandler && table.controls.selectHandler(record) };
              }}
            />
          </CollapseWrapper>
          {showDialog === 'seekDays' && createPortal(<Modals clickHandler={() => setShowDialog('')} page={"day"} />, document.body)}
          {showDialog === 'creditProducts' && createPortal(<Modals clickHandler={() => setShowDialog('')} page={"product"} />, document.body)}
          {showDialog === 'parametersPledge' && createPortal(<Modals clickHandler={() => setShowDialog('')} page={"pledge"} />, document.body)}
          {showDialog === 'budgetFilials' && createPortal(<Modals clickHandler={() => setShowDialog('')} page={"filial"} />, document.body)}
        </li>
      )}
    </ul>
  );
}

export default ListOfCollapses;
