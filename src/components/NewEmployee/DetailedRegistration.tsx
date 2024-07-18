import { regDropDowns } from "../../helpers/fnHelpers";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import PassportInputs from "../UI/PassportInputs";
import SwitchComponent from "../UI/SwitchComponent";
import FilesContainer from "./FilesContainer";

function DetailedRegistration() {
  return (
    <div className="px-4 flex bg-white rounded-2xl">
      <div>
        <div className="flex gap-4 px-2">
          <CustomInput
            type="date"
            name="birthdate"
            label="Дата рождения"
            defaultValue={new Date().toLocaleDateString()}
            required={true}
          />
          <PassportInputs name="employeePassport"/>
        </div>
        <div className="flex flex-col justify-between px-2">
          <p className="font-bold text-black text-[14px]">Пол</p>
          <SwitchComponent inputName="sex" selectedDefaultTitle="Мужской" selectedStyles="text-white bg-[#304F74]" unselectedTitle="Женский" unselectedStyles="bg-[#fff] text-black border-[#D2DBE1]"/>
        </div>
        <div className="px-2">
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
        <ul className="flex flex-col justify-center px-2">
          {regDropDowns.map((dropDown) => (
            <li key={dropDown.label} className="flex flex-col text-black">
              <label htmlFor={dropDown.name} className="font-bold">
                {dropDown.label}
              </label>
              <DropDown
                title="Выбрать"
                triggerType="click"
                listOfItems={dropDown.items}
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
