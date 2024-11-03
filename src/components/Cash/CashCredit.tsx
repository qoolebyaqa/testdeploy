import { columnsForCashCredit, dataCashCredit } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";

function CashCredit() {
  return (     
    <>
      <div className="">
        <DataTable columns={columnsForCashCredit} data={dataCashCredit} pagination />
      </div>
    </>  
  );
}

export default CashCredit;