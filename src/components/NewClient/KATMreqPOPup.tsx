import { columnsForKATMrequestDialog, dataKATMrequestDialog } from "../../helpers/fnHelpers";
import ButtonComponent from "../UI/ButtonComponent";
import DataTable from "../UI/DataTable";
import DialogComponent from "../UI/DialogComponent";
import { useNavigate } from "react-router";

function KATMreqPOPup({ clickHandler }: { clickHandler: () => void }) {
  const navigate = useNavigate()
  return (
    <>
      <DialogComponent closeHandler={clickHandler}>
        <div className="w-[900px] flex flex-col gap-y-[10px]">
          <div className="flex justify-between border-b-2 border-lombard-borders-grey">
          <h2 className="text-lombard-text-black font-bold">Запросы на КАТМ</h2>
         <div className="flex gap-x-[10px] mb-2">
           <ButtonComponent titleBtn={"Печать"} color="bg-lombard-btn-yellow" />
           <ButtonComponent titleBtn={"Перейти в КАТМ"} color="bg-lombard-main-blue" clickHandler={()=> {navigate('/katm')}}/>
         </div>
          </div>
          <DataTable columns={columnsForKATMrequestDialog} data={dataKATMrequestDialog} />
        </div>
      </DialogComponent>
    </>
  )
}


export default KATMreqPOPup;