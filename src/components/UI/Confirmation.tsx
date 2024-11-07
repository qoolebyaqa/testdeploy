import ButtonComponent from "./ButtonComponent"
import DialogComponent from "./DialogComponent"

export interface IConfirmation {
  title: string
  textMsg: string
  colorReverse?: boolean | undefined
  handleClose:() => void
  handleSave:() => void
}

function Confirmation ({handleClose,handleSave, title, textMsg, colorReverse}:IConfirmation) {
  return(
    <>
      <DialogComponent closeHandler={handleClose}>
        <div className="w-[400px]  flex flex-col gap-y-[10px]">
          <div className="text-black font-extrabold text-[18px] border-b-[1px] mb-2 pb-2">
            {title}
          </div>
          <div className="my-6 text-center">
            {textMsg}
          </div>

          <div className="flex justify-center">
            <ButtonComponent
              color={`${colorReverse ? 'bg-lombard-btn-red' : 'bg-lombard-btn-green'}`}
              titleBtn="Да"
              clickHandler={handleSave}
              className="w-full mr-2"
            />
            <ButtonComponent
              color={`${colorReverse ? 'bg-lombard-btn-grey' : 'bg-lombard-btn-red'}`}
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

export default Confirmation