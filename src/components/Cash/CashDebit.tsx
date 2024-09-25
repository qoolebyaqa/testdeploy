import { Table } from "antd";
import { columnsForKATMrequestDialog, dataKATMrequestDialog } from "../../helpers/fnHelpers";

function CashDebet() {
  return (     
    <Table
    columns={columnsForKATMrequestDialog}
    dataSource={dataKATMrequestDialog}
    className="w-10/12 drop-shadow-2xl hover:cursor-pointer"
    bordered
    onRow={(_record) => {
      return { onClick: () => {} };
    }}
  /> );
}

export default CashDebet;