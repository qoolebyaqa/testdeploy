import { columnsForReceived, dataReceived } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";

function Received() {
  return ( 
    <>
      <div className="">
        <DataTable columns={columnsForReceived} data={dataReceived} pagination />

      </div>
    </> 
   );
}

export default Received;