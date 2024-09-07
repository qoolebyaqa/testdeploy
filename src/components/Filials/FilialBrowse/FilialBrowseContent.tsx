import CustomInput from "../../UI/CustomInput";
import ButtonComponent from "../../UI/ButtonComponent";
import ListOfCollapses from "./ListOfCollapses";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";

function FilialBrowseContent() {
  const currentFilial = useAppSelector(state => state.filialStore.filialChoosenOne);
  const inputs = [
    {
      title: "Директор",
      name: "director",
    },
    {
      title: "Бухгалтер",
      name: "accountant",
    },
    {
      title: "Сотрудник внутреннего контроля",
      name: "intController",
    },
    {
      title: "Местоположение",
      name: "location",
    },
    {
      title: "Номер телефона",
      name: "phoneN",
    },
    {
      title: "МФО номер банка ломбарда",
      name: "MFO",
    },
    {
      title: "Название банка ломбарда",
      name: "bankName",
    },
    {
      title: "Счет ломбарда",
      name: "iban",
    },
    {
      title: "Лимит кассы",
      name: "limitCash",
    },
    {
      title: "Реквизиты ломбарда",
      name: "detailsAcc",
    },
    {
      title: "ФИО нотариуса",
      name: "notarius",
    },
    {
      title: "Реквизиты АТК сверка залогов",
      name: "ATK",
    },
  ];

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Филиалы</h3>
        <div className="flex gap-2 items-center">
          <ButtonComponent
            titleBtn="Отменить изменения"
            color="bg-lombard-btn-grey"
            className="text-lombard-text-black"
          />
          <ButtonComponent 
            titleBtn="Сохранить"
            color="bg-lombard-btn-green"
          />
        </div>
      </div>

      <div className="flex bg-[#EFF2F4] justify-center gap-5">
        <div className="w-[400px] flex flex-col gap-4">
          <div className="bg-white rounded-2xl px-2 py-6">
            {inputs.map((input) => (
              <CustomInput
                type="text"
                name={input.name}
                label={input.title}
                required
                value={currentFilial[input.name]}
                key={input.name}
              />
            ))}
          </div>
        </div>
        <ListOfCollapses />
      </div>
    </>
  );
}

export default FilialBrowseContent;
