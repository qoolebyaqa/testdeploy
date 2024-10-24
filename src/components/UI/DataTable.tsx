import { ConfigProvider, Table } from "antd";
import type { GetProp, TableColumnsType, TablePaginationConfig, TableProps } from "antd";
import { DataTableType } from "../../../src/helpers/types";
import { toDefineItemsPerPage } from "../../helpers/fnHelpers";
import { useEffect, useState } from "react";
import { SorterResult } from "antd/es/table/interface";

enum SORT_DIRECTIONS {
  ascend='asc',
  descend="desc"
}

export interface IDataTable {
  columns: TableColumnsType;
  data?: DataTableType[]
  selectHandler?: (...args: any[]) => void;
  classes?: string;
  pagination?: boolean;
  endPoint?: (page: number, size: number, sortField: any, sortDirection: string) => Promise<any>;
  setDataToState?: (arr: any[]) => any 
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'] | null;
  sortOrder?: any;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

function DataTable({
  columns,
  data,
  selectHandler,
  classes,
  pagination,
  endPoint,
  setDataToState
}: IDataTable) {

  const [results, setResults] = useState<DataTableType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 14,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    if(tableParams.pagination?.current && tableParams.pagination?.pageSize) {
      const response = endPoint && await endPoint(
        tableParams.pagination?.current - 1, 
        tableParams.pagination?.pageSize,
        tableParams.sortField,
        tableParams.sortOrder
      );
      setResults(response.data.content);
      setDataToState && setDataToState(response.data.content);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data.pageable.total_elements,
        },
      });

    }
  };

  const handleTableChange: TableProps<DataTableType>['onChange'] = (pagination, filters, sorter) => {
    console.log(sorter)
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order ? SORT_DIRECTIONS[sorter.order] : null,
      sortField: Array.isArray(sorter) ? undefined : sorter.order ? sorter.columnKey : null
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setResults([]);
    }
  };


   useEffect(() => {!data && fetchData()}, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
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
          loading={loading}
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
