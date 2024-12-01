import { useForm } from "react-hook-form";
import ButtonComponent from "../UI/ButtonComponent";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import { parseFilters } from "../../helpers/fnHelpers";

function ContractFilters({
  setFilters,
  activeFilter,
  clearFilters
}: {
  setFilters: (arg: any) => Promise<void>;
  activeFilter: string;
  clearFilters: () => void;
}) {
  const appliedFilters = parseFilters(activeFilter);
  const {
    handleSubmit,
    control,
    watch,
    formState: {},
  } = useForm({ mode: "onChange" });

  const branchId = watch("branch_id");
  const customerId = watch("customer_id");
  const loadProductId = watch("loan_product_id");
  const issueDateFrom = watch("issue_date_from");
  const issueDateTo = watch("issue_date_to");
  const status = watch("status");

  const isDisabled = !branchId && !customerId && !loadProductId && !issueDateFrom && !issueDateTo  && !status;

  return (
    <form
      className="flex gap-4 items-end mt-4 flex-col"
      onSubmit={handleSubmit(setFilters)}
    >
      <CustomInput name="branch_id" type="number" control={control} containedLabel="ID Филиала" value={appliedFilters.branch_id}/>
      <CustomInput name="customer_id" type="number" control={control} containedLabel="ID Клиента" value={appliedFilters.customer_id}/>
      <CustomInput name="loan_product_id" type="number" control={control} containedLabel="ID продукта соглашения" value={appliedFilters.loan_product_id}/>
      {/* <CustomInput name="issue_date_from" type="date" control={control} containedLabel="Дата со" value={appliedFilters.issue_date_from}/> */}
      {/* <CustomInput name="issue_date_to" type="date" control={control} containedLabel="Дата по" value={appliedFilters.issue_date_to}/> */}
      <DropDown name="status" control={control} containedLabel="Статус" value={appliedFilters.status} listOfItems={[
        { label: "Активно", key: 1, enumvalue: "ACTIVE" },
        { label: "В ожидании", key: 2, enumvalue: "HOLD" },
        { label: "Подтверждёно", key: 3, enumvalue: "CONFIRMED" },
        { label: "Выпущено", key: 3, enumvalue: "ISSUED" },
        { label: "Погашено", key: 3, enumvalue: "REPAID" },
        { label: "Просрочено", key: 3, enumvalue: "OVERDUE" },
        { label: "По умолчанию", key: 3, enumvalue: "DEFAULTED" },
        { label: "РЕСТРУКТУРИЗИРОВАННЫЙ", key: 3, enumvalue: "RESTRUCTURED" },
        ]}/>
      <div className="flex gap-2">
        <ButtonComponent
          color={`${isDisabled ? 'bg-lombard-btn-grey' : 'bg-lombard-main-blue'}`}
          titleBtn="Применить"
          className={`${isDisabled ? 'text-black' : 'text-white'} h-[32px]`}
          submit
        />
        <ButtonComponent      
          color={`${!isDisabled ? 'bg-lombard-btn-grey' : 'bg-lombard-main-blue'}`}
          titleBtn="Сбросить"
          className={`${!isDisabled ? 'text-black' : 'text-white'} h-[32px]`}
          clickHandler={clearFilters}
        />
      </div>
    </form>
  );
}

export default ContractFilters;
