import ButtonComponent from "../../UI/ButtonComponent"
import DialogComponent from "../../UI/DialogComponent"
import { useState } from "react";
import { createPortal } from "react-dom";
import KATMreqPOPup from "../KATMreqPOPup";
import DataTable from "../../UI/DataTable";
import { columnsForKATMrequestDialog, dataKATMrequestDialog,  } from "../../../helpers/fnHelpers";



function DealInfoPopup({ clickHandler }: { clickHandler: () => void }) {
    const [showDialog, setShowDialog] = useState(false);
    return (
        <>
            <DialogComponent closeHandler={clickHandler}>
                <div className="w-[1200px] flex flex-col gap-y-[10px]">
                    <div className="flex justify-between border-b-2 border-lombard-borders-grey">
                        <p className=" font-bold text-[#3B3B3B] text-[20px]">График погашения - Тип ломбард</p>
                        <div className="flex gap-[10px] mb-2">
                            <ButtonComponent color="bg-lombard-btn-green" className="text-lombard-text-white" titleBtn="Скачать" clickHandler={clickHandler} />
                            <ButtonComponent color="bg-lombard-btn-yellow" titleBtn="Печать" clickHandler={() => setShowDialog(true)} />
                        </div>
                    </div>
                    {showDialog && createPortal(<KATMreqPOPup clickHandler={() => setShowDialog(false)} />, document.body)}
                    <DataTable columns={columnsForKATMrequestDialog} data={dataKATMrequestDialog}/>
                </div>
            </DialogComponent>
        </>
    )
}

export default DealInfoPopup
