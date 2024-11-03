import {  columnsForLowCost, dataLowCost } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";

function Lowcost() {
  return ( 
    <>
      <div className="">
        <DataTable columns={columnsForLowCost} data={dataLowCost} pagination />

      </div>
    </>  
  );
}

export default Lowcost;