import { columnsKatmDialog, dataKatmDialog } from "../../../helpers/fnHelpers";
import CustomInput from "../../UI/CustomInput";
import PassportInputs from "../../UI/PassportInputs";
import DragNDrop from "../../UI/DragNDrop";
import SVGComponent from "../../UI/SVGComponent";
import ButtonComponent from "../../UI/ButtonComponent";
import KATMRequests from "./KATMRequests";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";

function KATMBrowseContent() {
  const currentKATM = useAppSelector(state => state.katmStore.katmSelected);
  console.log(currentKATM);

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px] ">
        <ButtonComponent titleBtn="О клиенте" color="bg-white" className="text-lombard-text-black"/>
      </div>
      <div className="pl-2 flex bg-[#EFF2F4]">
        <div
          className={`bg-white flex flex-col gap-3 rounded-2xl px-2 py-6 border-2`}
        >
          <div className="flex justify-between">
            <CustomInput
              type="text"
              name="JSHIR"
              label="JSHIR"
              placeholder="12345678912345"
            />
            <i className="self-end flex-none">
              <SVGComponent title="search" />
            </i>
          </div>
          <CustomInput
            type="text"
            name="clientName"
            label="ФИО"
            required
            placeholder="ФИО"
          />
          <div className="flex justify-between items-center">
            <CustomInput
              type="date"
              name="birthdate"
              label="Дата рождения"
              required={true}
            />
          </div>
          <PassportInputs name="clientPassport" />
          <CustomInput
            type="phone"
            name="clientPhone"
            label="Номер телефона"
            placeholder="+998 (__) ___-__-__"
          />
          <DragNDrop multiple />
        </div>
        <KATMRequests columns={columnsKatmDialog} data={dataKatmDialog}/>        
      </div>
    </>
  );
}

export default KATMBrowseContent;
