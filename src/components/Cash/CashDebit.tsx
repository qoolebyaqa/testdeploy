
import { columnsForCashDebit, dataCashDebit } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";

function CashDebet() {
  return (   
    <>
      <div className="">
        <DataTable columns={columnsForCashDebit} data={dataCashDebit} pagination />

      </div>
    </>  
  );
}

export default CashDebet;