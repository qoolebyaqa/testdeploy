import CustomInput from "../UI/CustomInput";
import DragNDrop from "../UI/DragNDrop";
import PassportInputs from "../UI/PassportInputs";



function GeneralClientInfo() {
  return (
    <div className="w-[400px] flex flex-col gap-4">
      <div className="bg-white rounded-2xl px-2 py-6">
        <CustomInput type="text" name="clientName" label="ФИО" required placeholder="ФИО"/>
        <div className="flex justify-between items-center">
          <CustomInput type="text" name="JSHIR" label="JSHIR" placeholder="12345678912345" className="w-auto"/>
          <CustomInput
            type="date"
            name="birthdate"
            label="Дата рождения"
            defaultValue={new Date().toLocaleDateString()}
            required={true}
          />
        </div>        
        <PassportInputs name="clientPassport"/>
        <CustomInput type="phone" name="clientPhone" label="Номер телефона" placeholder="+998 (__) ___-__-__" />
        <DragNDrop multiple/>
      </div>
    </div>
  );
}

export default GeneralClientInfo;
