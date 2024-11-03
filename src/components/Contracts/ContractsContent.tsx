/* import ButtonComponent from "../UI/ButtonComponent"; */
import { columnsForContracts } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useNavigate } from "react-router";
import RangeFilter from "../Clients/RangeFilter";
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
          <RangeFilter iconInput="filters" />
        </div>
      </div>
      <DataTable columns={columnsForContracts} data={dataContracts} pagination selectHandler={selectContractHandler}/>
    </>
  );
}

export default ContractsContent;
