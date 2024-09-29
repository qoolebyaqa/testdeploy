import ButtonComponent from "../UI/ButtonComponent";
import { columnsForContracts } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useNavigate } from "react-router";
import RangeFilter from "../Clients/RangeFilter";
import DropDown from "../UI/DropDown";
import useActions from "../../helpers/hooks/useActions";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { IDataContractType } from "../../helpers/types";

function ContractsContent() {
  const dataContracts = useAppSelector(state => state.contractStore.allContracts);
  const dispatch = useActions();
  const navigate = useNavigate();

  function selectContractHandler (...args: IDataContractType[]) {
    dispatch.setContractChoosenOne(args[0]);
    navigate(`/contracts/browse=${args[0].index}`)
  }


  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Договоры</h3>
        <div className="flex gap-1 items-center">
          <RangeFilter titleFilter="Дата выдачи" iconInput="calendar"/>
          <RangeFilter titleFilter="Продления" iconInput="calendar"/>
          <RangeFilter titleFilter="Сумма" iconInput="arrow" />
          <DropDown title="Все договоры" listOfItems={[{label: 'Закрыт', key: 1, enumvalue: 'CLOSED'}, {label: 'Открыт', key: 2, enumvalue: 'OPEN'}]} triggerType='click' name="contractsSelect"/>
          <ButtonComponent color="bg-white" className="text-lombard-btn-red h-8 font-semibold" titleBtn="Очистить фильтр ✕"/>
          <RangeFilter iconInput="filters" />
          <ButtonComponent titleBtn="Применить" color="bg-lombard-main-blue" />
          <ButtonComponent titleBtn="Создать" color="bg-lombard-btn-green" clickHandler={() => {}}/>
        </div>
      </div>
      <DataTable columns={columnsForContracts} data={dataContracts} pagination selectHandler={selectContractHandler}/>
    </>
  );
}

export default ContractsContent;
