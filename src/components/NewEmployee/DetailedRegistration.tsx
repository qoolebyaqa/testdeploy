import useActions from "../../helpers/hooks/useActions";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import PassportInputs from "../UI/PassportInputs";
import SwitchComponent from "../UI/SwitchComponent";
import FilesContainer from "./FilesContainer";

const regDropDowns = [
  {
    label: "Должность",
    name: "position",
    items: [
      { label: "Директор", key: 1 },
      { label: "Бухгалтер", key: 2 },
      { label: "Специалист", key: 3 },
    ],
  },
  {
    label: "Ставка",
    name: "workterm",
    items: [
      { label: "0.25", key: 1 },
      { label: "0.5", key: 2 },
      { label: "1", key: 3 },
    ],
  },
  {
    label: "Пользователь",
    name: "role",
    items: [
      { label: "Пользователь", key: 1 },
      { label: "Админ", key: 2 },
    ],
  },
  {
    label: "Выходные дни",
    name: "seekday",
    items: [
      { label: "Воскресенье", key: 1 },
      { label: "Суббота", key: 2 },
      { label: "Суббота, Воскресенье", key: 3 },
    ],
  },
  {
    label: "Оценка",
    name: "rate",
    items: [
      { label: "5", key: 1 },
      { label: "4", key: 2 },
      { label: "3", key: 3 },
    ],
  },
  {
    label: "Филиалы",
    name: "filials",
    items: [
      { label: "MU", key: 1 },
      { label: "MA", key: 2 },
      { label: "YA", key: 3 },
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
    label: "Гражданство",
    name: "birthPlace",
    items: [
      { label: "Узбекистан", key: 1 },
      { label: "Экспат", key: 2 },
    ],
  },
];

function DetailedRegistration() {
  const dispatch = useActions();
  return (
    <div className="p-[16px] flex gap-[5px] bg-white rounded-2xl">
      <div className="flex flex-col gap-y-[14px] pt-[10px]">
        <div className="flex gap-4 px-2">
          <CustomInput
            type="date"
            name="birthdate"
            label="Дата рождения"
            defaultValue={new Date().toLocaleDateString()}
            required={true}
          />
          <PassportInputs name="employeePassport" />
        </div>
        <div className="flex flex-col justify-between px-2 gap-[6px]">
          <p className="font-bold text-black text-[14px]">Пол</p>
          <SwitchComponent
            inputName="sex"
            selectedDefaultTitle="Мужской"
            selectedStyles="text-white bg-[#304F74]"
            unselectedTitle="Женский"
            unselectedStyles="bg-[#fff] text-black border-[#D2DBE1]"
            inputHandler={dispatch.setNewEmployeeGender}
          />
        </div>
        <div className="px-2 flex flex-col gap-y-[12px]">
          <CustomInput
            label="Номер телефона"
            type="phone"
            name="phone"
            placeholder="+998 (99) 123-45-67"
            required
          />
          <CustomInput
            label="Место проживания"
            type="text"
            name="address"
            placeholder="район ____, ул. ____, д.__, кв.__"
            required
          />
        </div>
        <ul className="flex flex-col justify-center px-2 gap-y-[14px]">
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
      <FilesContainer />
    </div>
  );
}

export default DetailedRegistration;
