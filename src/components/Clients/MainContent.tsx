import ButtonComponent from "../UI/ButtonComponent";
import { getColumnsForClients, getFilter } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useNavigate } from "react-router";
import useActions from "../../helpers/hooks/useActions";
import { useCallback, useEffect, useState } from "react";
import { IDataClientType } from "../../helpers/types";
import { ApiService } from "../../helpers/API/ApiSerivce";
import Filters from "../UI/Filters";
import ClientFilters from "./ClientFilters";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";

const supportedFilterList: any = [
  { name: "first_name", type: "text", label: "Имя" },
  { name: "fio", type: "text", label: "ФИО" },
  { name: "last_name", type: "text", label: "Фамилия" },
  { name: "pin", type: "text", label: "ПИНФЛ" },
  { name: "passport", type: "text", label: "Паспорт" },
  { name: "phone_number", type: "number", label: "Номер телефона" },
  {
    name: "type",
    type: "dropdown",
    label: "Тип",
    items: [
      { label: "Потенциальный клиент", key: 1, enumvalue: "LEAD" },
      { label: "Клиент", key: 2, enumvalue: "CLIENT" },
      { label: "Сотрудник", key: 3, enumvalue: "EMPLOYEE" },
    ],
  },
];

function MainContent() {
  const navigate = useNavigate();
  const dispatch = useActions();
  const isSearchApplied = useAppSelector(state => state.globalStore.isSearchApplied)
  const globalSearchValue = useAppSelector(state => state.globalStore.globalSearchValue)
  const triggerUpdate = useAppSelector(state => state.globalStore.trigerUpdate)
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [externalFilters, setExternalFilters] = useState("");
  const [tblHeaderFilter, setTblHeaderFilter] = useState('');
  const [currestSort, setCurrentSort] = useState("");

   useEffect(() => {
    dispatch.setAuthLoading(false);
    return () => {
      dispatch.setGlobalSearchValue('');
      dispatch.setIsSearchApplied(false);
    }
  }, []);

  const setClients = (arr: any) => {
    dispatch.setClientsList(arr);
  };

  function selectClientHandler(...args: IDataClientType[]) {
    navigate(`/clients/${args[0].id}`);
  }

  const columnsForClients = useCallback(() => {
    return getColumnsForClients(setCurrentSort, currestSort, setTblHeaderFilter);
  }, [currestSort]);

  async function filterSubmit(formData: any) {
    setTblHeaderFilter('')
    setExternalFilters(getFilter(formData));
    setShowFilterDialog(false);
  }

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Клиенты</h3>
        <div className="flex gap-2 items-center justify-center">
          <Filters
            filters={
              <ClientFilters
                setFilters={filterSubmit}
                activeFilter={externalFilters}
                clearFilters={() => {setExternalFilters(""); setShowFilterDialog(false)}}
              />
            }
            isVisible={showFilterDialog}
            setVisibility={setShowFilterDialog}
            activeFilter={tblHeaderFilter}
            setTblHeaderFilter={setTblHeaderFilter}
            setExternalFilters={setExternalFilters}
            supportedFilters={supportedFilterList}
            activeFilterValue={externalFilters}
          />
          <ButtonComponent
            titleBtn="Создать"
            color="bg-lombard-btn-green"
            clickHandler={() => navigate("/new-client")}
          />
        </div>
      </div>
      <DataTable
        columns={columnsForClients()}
        pagination
        selectHandler={selectClientHandler}
        endPoint={isSearchApplied ? ApiService.searchCustomers : ApiService.getCustomers}
        triggerUpdate={triggerUpdate}
        searchVal={globalSearchValue}
        sortStr={currestSort}
        setDataToState={setClients}
        settedFilters={externalFilters}
      />
    </>
  );
}

export default MainContent;
