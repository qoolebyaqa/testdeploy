import ButtonComponent from "../UI/ButtonComponent";
import RangeFilter from "./RangeFilter";
import { columnsForClients, dataClients } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useNavigate } from "react-router";

function MainContent() {
  const navigate = useNavigate();
 

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Клиенты</h3>
        <div className="flex gap-2 items-center">
          <RangeFilter titleFilter="Статус" iconInput="arrow" />
          <RangeFilter titleFilter="Сумма" iconInput="arrow" />
          <ButtonComponent color="bg-white" className="text-lombard-btn-red h-8 font-semibold" titleBtn="Очистить фильтр ✕"/>
          <RangeFilter iconInput="filters" />
          {/* <ButtonComponent titleBtn="Применить" color="bg-lombard-main-blue" /> */}
          <ButtonComponent titleBtn="Создать" color="bg-lombard-btn-green" clickHandler={() => navigate('/new-client')}/>
        </div>
      </div>
      <DataTable columns={columnsForClients} data={dataClients}/>
    </>
  );
}

export default MainContent;
