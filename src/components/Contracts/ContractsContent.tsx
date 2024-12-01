import { getColumnsForContracts, getFilter } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useNavigate } from "react-router";
import useActions from "../../helpers/hooks/useActions";
import { IDataContractType } from "../../helpers/types";
import { useCallback, useEffect, useState } from "react";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import Filters from "../UI/Filters";
import ContractFilters from "./ContractFilters";

const supportedFilterList: any = [
  { name: "branch_id", type: "number", label: "ID Филиала" },
  { name: "customer_id", type: "number", label: "ID Клиента" },
  { name: "loan_product_id", type: "number", label: "ID продукта соглашения" },
  { name: "issue_date_from", type: "date", label: "Дата со" },
  { name: "issue_date_to", type: "date", label: "Дата по" },
  {
    name: "status",
    type: "dropdown",
    label: "Статус",
    items: [
      { label: "Активно", key: 1, enumvalue: "ACTIVE" },
      { label: "В ожидании", key: 2, enumvalue: "HOLD" },
      { label: "Подтверждёно", key: 3, enumvalue: "CONFIRMED" },
      { label: "Выпущено", key: 4, enumvalue: "ISSUED" },
      { label: "Погашено", key: 5, enumvalue: "REPAID" },
      { label: "Просрочено", key: 6, enumvalue: "OVERDUE" },
      { label: "По умолчанию", key: 7, enumvalue: "DEFAULTED" },
      { label: "РЕСТРУКТУРИЗИРОВАННЫЙ", key: 8, enumvalue: "RESTRUCTURED" },
    ],
  },
];

function ContractsContent() {
  const dispatch = useActions();
  const navigate = useNavigate();
  const isSearchApplied = useAppSelector(state => state.globalStore.isSearchApplied)
  const globalSearchValue = useAppSelector(state => state.globalStore.globalSearchValue)
  const triggerUpdate = useAppSelector(state => state.globalStore.trigerUpdate)
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [externalFilters, setExternalFilters] = useState("");
  const [tblHeaderFilter, setTblHeaderFilter] = useState('');
  const [currestSort, setCurrentSort] = useState("");  

  useEffect(() => {
    return () => {
      dispatch.setGlobalSearchValue('');
      dispatch.setIsSearchApplied(false);
    }
  }, []);

  const setContracts = (arr:any) => {
    dispatch.setContractsList(arr);
  }

  function selectContractHandler(...args: IDataContractType[]) {
    navigate(`/contracts/${args[0].customer_id}?po=${args[0].id}`);
  }

  const columnsForContracts = useCallback(() => {
    return getColumnsForContracts(setCurrentSort, currestSort);
  }, [currestSort]);

  
  async function filterSubmit(formData: any) {
    setTblHeaderFilter('')
    setExternalFilters(getFilter(formData));
    setShowFilterDialog(false);
  }

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Договоры</h3>
        <div className="flex gap-2 items-center">          
        <Filters
            filters={
              <ContractFilters
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
        </div>
      </div>
      <DataTable
        columns={columnsForContracts()}
        pagination
        selectHandler={selectContractHandler}
        endPoint={isSearchApplied ? ApiService.searchPOs : ApiService.getPaginatenPOs}
        triggerUpdate={triggerUpdate}
        searchVal={globalSearchValue}
        sortStr={currestSort}
        setDataToState={setContracts}
        settedFilters={externalFilters}
      />
    </>
  );
}

export default ContractsContent;
