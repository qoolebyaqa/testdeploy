import ButtonComponent from "../UI/ButtonComponent"
import DialogComponent from "../UI/DialogComponent"

export interface IConfirmation {
  handleClose:() => void
  handleSave:() => void
}

function ConfirmatioModal ({handleClose,handleSave}:IConfirmation) {
  return(
    <>
      <DialogComponent closeHandler={handleClose}>
        <div className="w-[400px]  flex flex-col gap-y-[10px]">
          <div className="text-black font-extrabold text-[18px] border-b-[1px] mb-2 pb-2">
            Подтвердить
          </div>
          <div className="my-6 text-center">
            Вы действительно хотите создать?
          </div>

          <div className="flex justify-center">
            <ButtonComponent
              color="bg-lombard-btn-green"
              titleBtn="Да"
              clickHandler={handleSave}
              className="w-full mr-2"
            />
            <ButtonComponent
              color="bg-lombard-btn-red"
              titleBtn="Нет"
              clickHandler={handleClose}
              className="w-full"
            />
          </div>
        </div>
      </DialogComponent>
    </>
  )
}

export default ConfirmatioModal