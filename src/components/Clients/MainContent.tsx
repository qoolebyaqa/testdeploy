import ButtonComponent from "../UI/ButtonComponent";
import RangeFilter from "./RangeFilter";
import { columnsForClients } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useNavigate } from "react-router";
import DropDown from "../UI/DropDown";
import useActions from "../../helpers/hooks/useActions";
import { useEffect } from "react";
import { IDataClientType } from "../../helpers/types";
import { ApiService } from "../../helpers/API/ApiSerivce";

function MainContent() {
  const navigate = useNavigate();
  const dispatch = useActions();
  useEffect(() => {dispatch.setAuthLoading(false)},[])

  const setClients = (arr: any) => {
    dispatch.setClientsList(arr)
  }

  function selectClientHandler (...args: IDataClientType[]) {
    navigate(`/clients/browse=${args[0].id}`)
  }
  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Клиенты</h3>
        <div className="flex gap-2 items-center justify-center">
          <DropDown
            title="Статус"
            name="status"
            listOfItems={[              
              { label: "Активный", key: 1, enumvalue: 'ID_CARD_LOCAL'},
              { label: "Не активный", key: 2, enumvalue: 'PASSPORT_LOCAL' }
            ]}
          />
          <RangeFilter titleFilter="Сумма" iconInput="arrow" />
          <ButtonComponent
            color="bg-white"
            className="text-lombard-btn-red h-8 font-semibold"
            titleBtn="Очистить фильтр ✕"
          />
          <RangeFilter iconInput="filters" />
          {/* <ButtonComponent titleBtn="Применить" color="bg-lombard-main-blue" /> */}
          <ButtonComponent
            titleBtn="Создать"
            color="bg-lombard-btn-green"
            clickHandler={() => navigate("/new-client")}
          />
        </div>
      </div>
      <DataTable columns={columnsForClients} pagination selectHandler={selectClientHandler} endPoint={ApiService.getCustomers} setDataToState={setClients}/>
    </>
  );
}

export default MainContent;
