import DialogComponent from "../UI/DialogComponent";
import ButtonComponent from "./ButtonComponent";

function Delete({clickHandler, deleteConfirm}: {clickHandler: () => void, deleteConfirm?: () => void}) {
    return (
    <>
        <DialogComponent closeHandler={clickHandler}>
            <div className="w-[340px] flex flex-col gap-y-[10px]">
                <p className="mb-1.5 font-bold text-[#3B3B3B] text-[22px] border-b-2 border-lombard-borders-grey">Удалить?</p>
                <p className="text-[18px] text=[#3B3B3B] font-normal">Вы действительно хотите удалить?</p>
                <div className="flex justify-end mt-5 gap-[6px]">
                    <ButtonComponent color="bg-lombard-btn-grey" className="text-lombard-text-black" titleBtn="Отмена" clickHandler={clickHandler} />
                    <ButtonComponent color="bg-lombard-btn-red" titleBtn="Удалить" clickHandler={deleteConfirm} />
                </div>
            </div>
        </DialogComponent>
    </>
    )
}

export default Delete
