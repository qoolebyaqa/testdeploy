import ButtonComponent from "../UI/ButtonComponent";
import { columnsForContracts, dataContracts } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useNavigate } from "react-router";
import RangeFilter from "../Main/RangeFilter";
import DropDown from "../UI/DropDown";

function ContractsContent() {
  const navigate = useNavigate();
  

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Договоры</h3>
        <div className="flex gap-1 items-center">
          <RangeFilter titleFilter="Дата выдачи" iconInput="calendar"/>
          <RangeFilter titleFilter="Продления" iconInput="calendar"/>
          <RangeFilter titleFilter="Сумма" iconInput="arrow" />
          <DropDown title="Все договоры" listOfItems={[{label: '1', key: 1}]} triggerType='click' name="contractsSelect"/>
          <ButtonComponent color="bg-white" className="text-lombard-btn-red h-8 font-semibold" titleBtn="Очистить фильтр ✕"/>
          <RangeFilter iconInput="filters" />
          <ButtonComponent titleBtn="Применить" color="bg-lombard-main-blue" />
          <ButtonComponent titleBtn="Создать" color="bg-lombard-btn-green" clickHandler={() => navigate('/new-client')}/>
        </div>
      </div>
      <DataTable columns={columnsForContracts} data={dataContracts}/>
    </>
  );
}

export default ContractsContent;
