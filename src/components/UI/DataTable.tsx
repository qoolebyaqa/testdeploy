import { ConfigProvider, Table } from "antd";
import type {  TableColumnsType, TableProps } from "antd";
import { IDataClientType, IDataContractType, IDataEmployeeType, IDataFilialType, IdataKATMrequestDialog, IDataKatmType, IKatmDialogType, ISMSDataType } from "../../../src/helpers/types";
import { toDefineItemsPerPage } from "../../helpers/fnHelpers";
import { useEffect, useState } from "react";

export interface IDataTable {
  columns: TableColumnsType, 
  data: IDataContractType[] | IDataEmployeeType[] | IDataClientType[] | IDataKatmType[] | ISMSDataType[] | IDataFilialType[] | IdataKATMrequestDialog[] | IKatmDialogType[],
  selectHandler?: (...args: any[]) => void,
  classes?: string,
  pagination?: boolean,
  endPoint?: (page:number, size:number) => void
}

function DataTable({columns, data, selectHandler, classes, pagination}: IDataTable) {
  const [quantityPerPage, setQuantityPerPage] = useState(14); 
  const onChange: TableProps<IDataContractType | IDataEmployeeType | IDataClientType | IDataKatmType | ISMSDataType | IDataFilialType | IdataKATMrequestDialog | IKatmDialogType>["onChange"] = (pagination, sorter) => {
    console.log("params", pagination, sorter);
    setQuantityPerPage(Number(pagination.pageSize));
  };
  useEffect(() => {
    setQuantityPerPage(data.length < 14 ? data.length : 14);
  }, [data.length]);
  return (
    <div className={`px-3 ${pagination ? 'bg-[#EFF2F4]' : ''} h-full  relative`}>
    <ConfigProvider theme={{
      components: {
        Table: {
          rowHoverBg: "#F4F5FF"
        }
      }
    }}>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={pagination ? { pageSize: quantityPerPage, position: ["bottomCenter"], showSizeChanger: true, pageSizeOptions: toDefineItemsPerPage(data.length), locale: {"items_per_page": `из ${data.length}`}} : false}
        className={`drop-shadow-md hover:cursor-pointer ${classes ? classes : ''}`}
        bordered
        onRow={(record) => {return {onClick: () => selectHandler && selectHandler(record)}}}
      />
    </ConfigProvider>
    </div>
  );
}

export default DataTable;
