import { useForm } from "react-hook-form";
import ButtonComponent from "../UI/ButtonComponent";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import { parseFilters } from "../../helpers/fnHelpers";

function ClientFilters({
  setFilters,
  activeFilter
}: {
  setFilters: (arg: any) => Promise<void>;
  activeFilter: string
}) {
  const appliedFilters = parseFilters(activeFilter);
  const {
    handleSubmit,
    control,
    watch,
    formState: {},
  } = useForm({ mode: "onChange" });

  const firstName = watch("first_name");
  const phoneNumber = watch("phone_number");
  const type = watch("type");
  const pinfl = watch("pinfl");
  const passport = watch("passport");

  const isDisabled = !firstName && !phoneNumber && !type && !pinfl && !passport;

  return (
    <form
      className="flex gap-4 items-end mt-4 flex-col"
      onSubmit={handleSubmit(setFilters)}
    >
      <CustomInput name="first_name" type="text" control={control} containedLabel="Фамилия" value={appliedFilters.first_name}/>
      <CustomInput name="last_name" type="text" control={control} containedLabel="Имя" value={appliedFilters.last_name}/>
      <CustomInput name="pinfl" type="text" control={control} containedLabel="ПИНФЛ" value={appliedFilters.pinfl}/>
      <CustomInput name="passport" type="text" control={control} containedLabel="Паспорт" value={appliedFilters.passport}/>
      <CustomInput name="phone_number" type="number" control={control} containedLabel="Номер телефона" value={appliedFilters.phone_number}/>
      <DropDown name="type" control={control} containedLabel="Тип" value={appliedFilters.type} listOfItems={[
        { label: "Потенциальный клиент", key: 1, enumvalue: 'LEAD'}, 
        { label: "Клиент", key: 2, enumvalue: 'CLIENT'}, 
        { label: "Сотрудник", key: 3, enumvalue: 'EMPLOYEE'}
        ]}/>
      <ButtonComponent
        color={`${isDisabled ? 'bg-lombard-btn-grey' : 'bg-lombard-main-blue'}`}
        titleBtn="Применить"
        className={`${isDisabled ? 'text-black' : 'text-white'} h-[32px]`}
        submit
      />
    </form>
  );
}

export default ClientFilters;
