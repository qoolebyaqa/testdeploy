import useActions from "../../helpers/hooks/useActions";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import PassportInputs from "../UI/PassportInputs";
import SwitchComponent from "../UI/SwitchComponent";
import DayOffSection from "./DayOffSection";
import FilesContainer from "./FilesContainer";

interface IGeneralUserInfo {
  formValues: { [key: string]: string };
  onInputChange: ({
    id,
    title,
    value,
  }: {
    id?: string;
    title: string;
    value: string | string[];
  }) => void;
}
const regDropDowns = [
  {
    label: "Родной язык",
    name: "language",
    items: [
      { label: "Узбекский", key: 1, enumValue: "UZ" },
      { label: "Русский", key: 2, enumValue: "RU" },
    ],
  },
  {
    label: "Должность",
    name: "job_title",
    items: [
      { label: "Директор", key: 1, enumValue: "DIRECTOR" },
      { label: "Бухгалтер", key: 2, enumValue: "ACCOUNTANT" },
      { label: "Специалист", key: 3, enumValue: "SPECIALIST" },
    ],
  },
  {
    label: "Пользователь",
    name: "role_id",
    items: [
      { label: "Пользователь", key: 1, enumValue: "USER" },
      { label: "Админ", key: 2, enumValue: "ADMIN" },
    ],
  },
  {
    label: "Филиалы",
    name: "filial_id",
    items: [
      { label: "Мирабад", key: 1, enumValue: 1 },
      { label: "Чиланзар", key: 2, enumValue: 2 },
      { label: "Юнусабад", key: 3, enumValue: 3 },
    ],
  },
  /* {
    label: "Ставка",
    name: "workterm",
    items: [
      { label: "0.25", key: 1 },
      { label: "0.5", key: 2 },
      { label: "1", key: 3 },
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
    name: "citizenship_id",
    items: [
      { label: "Узбекистан", key: 1 },
      { label: "Экспат", key: 2 },
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
  }, */
];

function DetailedRegistration({ onInputChange, formValues }: IGeneralUserInfo) {
  const dispatch = useActions();
  const gender = useAppSelector(
    (state) => state.employeeStore.newEmployeeGender
  );
  return (
    <div>
      <div className="flex  h-[38vh] mx-2 mb-4 bg-white rounded-2xl px-2 border-2">
        <div className="flex flex-col gap-y-[14px] pt-[10px] overflow-y-scroll scroll p-2">
          <div className="flex gap-4 px-2">
            <CustomInput
              type="date"
              name="birth_date"
              label="Дата рождения"
              value={formValues.birth_date}
              handleChange={onInputChange}
            />
            <PassportInputs
              name="employeePassport"
              handleChange={onInputChange}
              seriesVal={formValues.passport_series}
              passNum={formValues.passport_number}
            />
          </div>
          <div className="flex flex-col justify-between px-2 gap-[6px]">
            <p className="font-bold text-black text-[14px]">Пол</p>
            <SwitchComponent
              inputName="sex"
              selectedDefaultTitle="Женский"
              selectedStyles="text-white bg-[#304F74]"
              unselectedTitle="Мужской"
              unselectedStyles="bg-[#fff] text-black border-[#D2DBE1]"
              inputHandler={dispatch.setNewEmployeeGender}
              currentSelect={gender}
            />
          </div>
          <div className="px-2 flex flex-col gap-y-[12px]">
            <CustomInput
              label="Номер телефона"
              type="phone"
              name="phone_number"
              placeholder="998 (99) 123-45-67"
              required
              value={formValues.phone_number}
              handleChange={onInputChange}
            />
            <CustomInput
              label="Место проживания"
              type="text"
              name="address"
              placeholder="район ____, ул. ____, д.__, кв.__"
              value={formValues.address}
              handleChange={onInputChange}
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
                  handleSelect={onInputChange}
                  value={formValues[dropDown.name]}
                  required
                />
              </li>
            ))}
          </ul>
        </div>
        <FilesContainer />
      </div>
      <DayOffSection />
    </div>
  );
}

export default DetailedRegistration;
