import { ConfigProvider, Table } from "antd";
import type { TableColumnsType, TablePaginationConfig, TableProps } from "antd";
import { DataTableType } from "../../../src/helpers/types";
import { toDefineItemsPerPage } from "../../helpers/fnHelpers";
import { useEffect, useState } from "react";
import { SorterResult } from "antd/es/table/interface";

export interface IDataTable {
  columns: TableColumnsType;
  data?: DataTableType[]
  selectHandler?: (...args: any[]) => void;
  classes?: string;
  pagination?: boolean;
  endPoint?: (page: number, size: number, sort?:string, filters?: string) => Promise<any>;
  setDataToState?: (arr: any[]) => any,
  settedFilters?: string,
  rowClasses?: (record: any) => string, 
  sortStr?: string,
  tableSize?: 'small' | 'large' | 'middle',
  triggerUpdate?: boolean
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'] | null;
  sortStr?: any;
  settedFilters?: string;
}

function DataTable({
  columns,
  data,
  selectHandler,
  classes,
  pagination,
  endPoint,
  setDataToState,
  settedFilters,
  sortStr,
  tableSize,
  rowClasses,
  triggerUpdate
}: IDataTable) {

  const [results, setResults] = useState<DataTableType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 14,
    }
  });
  const fetchData = async () => {
    setLoading(true);
    try {
    if(tableParams.pagination?.current && tableParams.pagination?.pageSize) {
      const response = endPoint && await endPoint(
        tableParams.pagination?.current - 1, 
        tableParams.pagination?.pageSize,
        sortStr,
        settedFilters
      );
      const dataWithIndexes = response.data.content.map((val: any, index: number) =>{ 
        val.index = (response.data.pageable.page * response.data.pageable.size) + index + 1   
      return val
      })
      setResults(dataWithIndexes);
      setDataToState && setDataToState(response.data.content);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data.pageable.total_elements,
        },
      });
      }
    } catch (err){
      console.log(err)
    } finally {      
      setLoading(false);
    }
  };

  const handleTableChange: TableProps<DataTableType>['onChange'] = (pagination) => {
    setTableParams(prev => ({
      ...prev, pagination,
    }));
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setResults([]);
    }
  };


   useEffect(() => {!data && fetchData()}, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    sortStr,
    settedFilters,
    triggerUpdate
  ]);

  const pageSizeToPagination = tableParams.pagination?.pageSize && tableParams.pagination?.total && tableParams.pagination?.total > tableParams.pagination?.pageSize ?
  tableParams.pagination?.pageSize : tableParams.pagination?.total
  return (
    <div
      className={`px-3 ${pagination ? "bg-[#EFF2F4]" : ""} h-full  relative`}
    >
      <ConfigProvider
        theme={{
          components: {
            Table: {
              rowHoverBg: "#F4F5FF",
            },
            Pagination: {
              itemActiveBg: '#304f74'
            }
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={results || data}
          onChange={handleTableChange}
          rowKey={record => (record as any).id}
          loading={loading}
          size={tableSize}
          rowClassName={rowClasses}
          pagination={
            pagination
              ? {
                  pageSize: pageSizeToPagination,
                  position: ["bottomLeft"],
                  showSizeChanger: true,
                  pageSizeOptions: tableParams.pagination?.total ? toDefineItemsPerPage(tableParams.pagination?.total) : [],
                  locale: { items_per_page: `из ${tableParams.pagination?.total}` },
                  className: "flex justify-start w-full",
                  total: tableParams.pagination?.total,
                  current: tableParams.pagination?.current
                }
              : false
          }
          className={`drop-shadow-md hover:cursor-pointer ${
            classes ? classes : ""
          }`}
          bordered
          onRow={(record) => {
            return { onClick: () => selectHandler && selectHandler(record) };
          }}
        />
      </ConfigProvider>
    </div>
  );
}

export default DataTable;
