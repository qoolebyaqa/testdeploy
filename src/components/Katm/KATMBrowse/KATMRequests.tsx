import CollapseWrapper from "../../UI/CollapseWrapper";
import { Table, TableColumnsType } from "antd";
import { IKatmDialogType, ISeekDayDialogType } from "../../../helpers/types";

export interface ITableControl {
  columns: TableColumnsType, 
  data: IKatmDialogType[] | ISeekDayDialogType[],
  selectHandler?: (...args: any[]) => void
}

function KATMRequests({ columns, data, selectHandler }: ITableControl) {
  const tableControl = {selectHandler, columns, data};
  return (
    <div className="w-4/5">
      <CollapseWrapper title="КАТМ запросы" page="katm">
        <Table
          columns={tableControl.columns}
          dataSource={tableControl.data}
          pagination={false}
          virtual scroll={{ y: 240 - 80}}
          className="drop-shadow-2xl hover:cursor-pointer"
          bordered
          onRow={(record) => {
            return { onClick: () => tableControl.selectHandler && tableControl.selectHandler(record) };
          }}
        />
      </CollapseWrapper>
    </div>
  );
}

export default KATMRequests;
