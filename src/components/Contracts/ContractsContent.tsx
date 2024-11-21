/* import ButtonComponent from "../UI/ButtonComponent"; */
import { getColumnsForContracts } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useNavigate } from "react-router";
import RangeFilter from "../Clients/RangeFilter";
import useActions from "../../helpers/hooks/useActions";
import { IDataContractType } from "../../helpers/types";
import { useCallback } from "react";
import { ApiService } from "../../helpers/API/ApiSerivce";

function ContractsContent() {
  const dispatch = useActions();
  const navigate = useNavigate();

  function selectContractHandler(...args: IDataContractType[]) {
    dispatch.setContractChoosenOne(args[0]);
    navigate(`/contracts/${args[0].index}`);
  }

  const setContracts = (arr:any) => {
    dispatch.setContractsList(arr);
  }

  const columnsForContracts = useCallback(() => {
    return getColumnsForContracts();
  }, []);

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Договоры</h3>
        <div className="flex gap-1 items-center">
          <RangeFilter iconInput="filters" />
        </div>
      </div>
      <DataTable
        columns={columnsForContracts()}
        pagination
        selectHandler={selectContractHandler}
        endPoint={ApiService.getPaginatenPOs}
        setDataToState={setContracts}
      />
    </>
  );
}

export default ContractsContent;
