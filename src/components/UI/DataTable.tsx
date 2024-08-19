import { Table } from "antd";
import type {  TableColumnsType, TableProps } from "antd";
import { IDataClientType, IDataContractType, IDataEmployeeType, IDataFilialType, IDataKatmType, ISMSDataType } from "../../../src/helpers/types";
import { toDefineItemsPerPage } from "../../helpers/fnHelpers";
import { useState } from "react";

export interface IDataTable {
  columns: TableColumnsType, 
  data: IDataContractType[] | IDataEmployeeType[] | IDataClientType[] | IDataKatmType[] | ISMSDataType[] | IDataFilialType[],
  selectHandler?: (...args: any[]) => void
}

function DataTable({columns, data, selectHandler}: IDataTable) {
  const [quantityPerPage, setQuantityPerPage] = useState(14); 
  const onChange: TableProps<IDataContractType | IDataEmployeeType | IDataClientType | IDataKatmType | ISMSDataType | IDataFilialType>["onChange"] = (pagination, sorter) => {
    console.log("params", pagination, sorter);
    setQuantityPerPage(Number(pagination.pageSize));
  };
  return (
    <div className="px-3 bg-[#EFF2F4] relative">
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{ pageSize: quantityPerPage, position: ["bottomCenter"], showSizeChanger: true, pageSizeOptions: toDefineItemsPerPage(data.length), locale: {"items_per_page": `из ${data.length}`}}}
        className="drop-shadow-md hover:cursor-pointer"
        bordered
        onRow={(record) => {return {onClick: () => selectHandler && selectHandler(record)}}}
      />
    </div>
  );
}

export default DataTable;
