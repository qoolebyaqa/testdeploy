import CustomInput from "../UI/CustomInput";
import DragNDrop from "../UI/DragNDrop";
import DropDown from "../UI/DropDown";
import PassportInputs from "../UI/PassportInputs";
import SVGComponent from "../UI/SVGComponent";
import SwitchComponent from "../UI/SwitchComponent";

const regDropDowns = [
  {
    label: "Тип документ",
    name: "docType",
    items: [
      { label: "Иностранный паспорт", key: 1 },
      { label: "Паспорта РУз", key: 2 },
    ],
  },
  {
    label: "Место рождения",
    name: "birthPlace",
    items: [
      { label: "Tashkent", key: 1 },
      { label: "Urgench", key: 2 },
      { label: "Termez", key: 3 },
    ],
  },
  {
    label: "Место проживания",
    name: "livePlace",
    items: [
      { label: "Tashkent", key: 1 },
      { label: "Urgench", key: 2 },
      { label: "Termez", key: 3 },
    ],
  },
  {
    label: "Гражданство",
    name: "birthPlace",
    items: [
      { label: "Узбекистан", key: 1 },
      { label: "Экспат", key: 2 },
    ],
  },
  {
    label: "Место работы",
    name: "workPlace",
    items: [
      { label: "Tashkent", key: 1 },
      { label: "Urgench", key: 2 },
      { label: "Termez", key: 3 },
    ],
  },
];

function GeneralClientInfo() {
  return (
    <div className="w-4/12 ml-2">
      <div className={`bg-white flex flex-col gap-[16px] rounded-2xl  h-[98vh] overflow-y-scroll p-[18px] focus-within:border-lombard-main-blue focus-within:border-2 scroll`}>
        <div className="flex justify-between gap-1">
          <CustomInput type="text" name="JSHIR" label="JSHIR" placeholder="12345678912345"/>        
          <i className="self-end flex-none"><SVGComponent title="search" /></i>
        </div>
        <CustomInput type="text" name="clientName" label="ФИО" required placeholder="ФИО" />
        <div className="flex justify-between items-center">
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
        <div className="px-2">
          <p className="text-black text-[14px] font-bold mb-2">Дата выдачи паспорта и дата истечения его срока</p>
          <div className="flex gap-2">
            <CustomInput type="date" name="releaseDate" defaultValue={new Date().toLocaleString()}/>
            <CustomInput type="date" name="endDate" defaultValue={new Date().toLocaleString()}/>
          </div>      
        </div>  
        <div className="flex flex-col justify-between px-2 gap-y-[8px]">
          <p className="font-bold text-black text-[14px]">Пол</p>
          <SwitchComponent
            inputName="sex"
            selectedDefaultTitle="Мужской"
            selectedStyles="text-white bg-[#304F74]"
            unselectedTitle="Женский"
            unselectedStyles="bg-[#fff] text-black border-[#D2DBE1]"
            inputHandler={() => {}}
          />
        </div>
        <ul className="flex flex-col justify-center px-2 gap-y-[10px]">
          {regDropDowns.map((dropDown) => (
            <li key={dropDown.label}>
              <DropDown
                title="Выбрать"
                triggerType="click"
                listOfItems={dropDown.items}
                label={dropDown.label}
                name={dropDown.name}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GeneralClientInfo;
