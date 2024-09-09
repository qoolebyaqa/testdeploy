import ButtonComponent from "../../UI/ButtonComponent";
import GeneralClientInfo from "../../NewClient/GeneralClientInfo";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";
import ContractCollapsesList from "./ContractCollapsesList";

function ContractBrowse() {
  const currentContract = useAppSelector(
    (state) => state.contractStore.contractChoosenOne
  );
  console.log(currentContract);

  const buttons = [
    { title: "Подтвердить", color: "bg-lombard-btn-green" },
    { title: "Перезаключить", color: "bg-lombard-main-blue" },
    { title: "Продлить", color: "bg-lombard-main-blue" },
    { title: "СМС", color: "bg-lombard-btn-yellow" },
    { title: "Печать", color: "bg-lombard-btn-yellow" },
  ];

  return (
    <div className="bg-lombard-bg-inactive-grey">
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <ButtonComponent
          titleBtn="О клиенте"
          color="bg-white"
          className="text-lombard-text-black border-lombard-borders-grey border-[1px]"
        />
        <div className="flex gap-2 items-center">
          {buttons.map((btn) => (
            <ButtonComponent
              color={btn.color}
              titleBtn={btn.title}
              key={btn.title}
            />
          ))}
        </div>
      </div>
        <div className="flex p-2 mx-auto justify-center">
          <GeneralClientInfo inputsValues={{}}/>
          <ContractCollapsesList />
        </div>
      </div>
  );
}

export default ContractBrowse;
