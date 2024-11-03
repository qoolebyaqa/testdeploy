import { useForm } from "react-hook-form";
import ButtonComponent from "../UI/ButtonComponent";
import DropDown from "../UI/DropDown";
import { parseFilters } from "../../helpers/fnHelpers";

function NotificationFilters({
  setFilters,
  activeFilter,
}: {
  setFilters: (arg: any) => Promise<void>;
  activeFilter: string;
}) {
  const appliedFilters = parseFilters(activeFilter);
  const {
    handleSubmit,
    watch,
    control,
    formState: {},
  } = useForm({ mode: "onChange" });

  
  const status = watch("status");
  const channel = watch("channel");

  const isDisabled = !status && !channel;

  return (
    <form
      className="flex gap-4 items-end mt-4"
      onSubmit={handleSubmit(setFilters)}
    >
      <DropDown
        name="status"
        title="Статус"
        value={appliedFilters.status}
        listOfItems={[
          { label: "Ожидание", key: 1, enumvalue: "PENDING" },
          { label: "Отправляется", key: 2, enumvalue: "SENDING" },
          { label: "Отправлено", key: 3, enumvalue: "SENT" },
          { label: "Ошибка", key: 4, enumvalue: "FAILED" },
        ]}
        control={control}
      />
      <DropDown
        name="channel"
        title="Способ отправки"
        value={appliedFilters.channel}
        listOfItems={[
          { label: "SMS", key: 1, enumvalue: "SMS" },
          { label: "Telegram", key: 2, enumvalue: "TELEGRAM" },
          { label: "E-mail", key: 3, enumvalue: "EMAIL" },
        ]}
        control={control}
      />
      <ButtonComponent
        color={`${isDisabled ? 'bg-lombard-btn-grey' : 'bg-lombard-main-blue'}`}
        titleBtn="Применить"
        className={`${isDisabled ? 'text-black' : 'text-white'} h-[32px]`}
        submit
      />
    </form>
  );
}

export default NotificationFilters;
