import { useForm } from "react-hook-form";
import ButtonComponent from "../UI/ButtonComponent";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import PassportInputs from "../UI/PassportInputs";
import SwitchComponent from "../UI/SwitchComponent";

interface IGeneralUserInfo {
  formValues?: { [key: string]: string };
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
    label: "Должность",
    name: "job_title",
    items: [
      { label: "Директор", key: 1, enumvalue: "DIRECTOR" },
      { label: "Бухгалтер", key: 2, enumvalue: "ACCOUNTANT" },
      { label: "Специалист", key: 3, enumvalue: "SPECIALIST" },
    ],
  },
  {
    label: "Филиалы",
    name: "filial_id",
    items: [
      { label: "Мирабад", key: 1, enumvalue: 1 },
      { label: "Чиланзар", key: 2, enumvalue: 2 },
      { label: "Юнусабад", key: 3, enumvalue: 3 },
    ],
  },
];

function DetailedRegistration({ onInputChange, formValues }: IGeneralUserInfo) {
  
  const {
    control,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });

  return (
      <div className="flex">
        <form className="flex flex-col gap-y-[14px] pt-[10px]  bg-white rounded-2xl px-2">
          <div className="px-2">
          <div className="flex justify-between items-center border-b-2 pb-2 border-lombard-borders-grey">
            <h4 className="text-black">Анкетные данные</h4>
            <ButtonComponent
              className={`${isValid && isDirty ? 'bg-lombard-btn-green text-white' : 'bg-lombard-btn-grey text-black' }`}
              titleBtn="Сохранить"
              submit
            />
          </div>
          <p className="font-bold text-black">Статус</p>
            <SwitchComponent
              inputName="role"
              control={control}
              selectedDefaultTitle="Активный"
              selectedStyles="bg-[#148F00]"
              unselectedTitle="Не активный"
              unselectedStyles="bg-white text-black border-[#D2DBE1]"
            />
          </div>
          <div className="flex gap-4 px-2">
            <CustomInput
              type="date"
              name="birth_date"
              label="Дата рождения"
              control={control}
              value={formValues?.birth_date}
              handleChange={onInputChange}
              errorMsg={errors.root?.message}
            />
            <PassportInputs
              name="employeePassport"
              handleChange={onInputChange}
              control={control}
              seriesVal={formValues?.passport_series}
              passNum={formValues?.passport_number}
            />
          </div>
          <div className="px-2 flex flex-col gap-y-[12px]">
            <CustomInput
              label="Место проживания"
              type="text"
              name="address"
              placeholder="район ____, ул. ____, д.__, кв.__"
              value={formValues?.address}
              control={control}
              handleChange={onInputChange}
            />
          </div>
          <ul className="flex flex-col justify-center px-2 gap-y-[14px]">
            {regDropDowns.map((dropDown) => (
              <li key={dropDown.label}>
                <DropDown
                  title="Выбрать"
                  listOfItems={dropDown.items}
                  label={dropDown.label}
                  name={dropDown.name}
                  handleSelect={onInputChange}
                  control={control}
                  value={formValues?.[dropDown.name]}
                />
              </li>
            ))}
          </ul>
        </form>
      </div>
  );
}

export default DetailedRegistration;
