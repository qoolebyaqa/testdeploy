import ButtonComponent from "../UI/ButtonComponent";
import RangeFilter from "./RangeFilter";
import { columnsForClients } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useLoaderData, useNavigate } from "react-router";
import DropDown from "../UI/DropDown";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import useActions from "../../helpers/hooks/useActions";
import { useEffect } from "react";
import { IDataClientType } from "../../helpers/types";
import { ApiService } from "../../helpers/API/ApiSerivce";

function MainContent() {
  const navigate = useNavigate();
  const dispatch = useActions();
  const dataClients = useAppSelector(state => state.clientStore.clientsList);
  const clients : any = useLoaderData();
  console.log('loaderData', clients);
  useEffect(() => {dispatch.setClientsList(clients); dispatch.setAuthLoading(false)},[])

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
      <DataTable columns={columnsForClients} data={dataClients} pagination selectHandler={selectClientHandler} endPoint={ApiService.getCustomers}/>
    </>
  );
}

export default MainContent;
