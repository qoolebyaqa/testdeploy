import { columnsForFilials } from "../../helpers/fnHelpers";
import ButtonComponent from "../UI/ButtonComponent";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import DataTable from "../UI/DataTable";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { IDataFilialType } from "../../helpers/types";
import { useNavigate } from "react-router";
import useActions from "../../helpers/hooks/useActions";
function FilialsContent() {
  const dataFilials = useAppSelector(state => state.filialStore.allFilials);
  const dispatch = useActions();
  const navigate = useNavigate();

  function selectFilialHandler (...args: IDataFilialType[]) {
    dispatch.setFilialSelectedOne(args[0]);
    navigate(`/filials/browse=${args[0].index}`)
  }


  return (
  <>
    <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
      <h3 className="text-black font-extrabold text-[18px]">Филиалы</h3>
      <div className="flex gap-2 items-center">
        <CustomInput type="date" name="filialsSelector" defaultValue={new Date().toLocaleString()}/>
        <DropDown title="Все" listOfItems={[{key: 1, label: 'MU'}, {key: 2, label: 'YA'}, {key: 3, label: 'Все'}]} triggerType="click" name="katmType" className="w-[170px]"/>
        <ButtonComponent titleBtn="Добавить филиал" color="bg-lombard-btn-green" />
      </div>
    </div>
    <DataTable columns={columnsForFilials} data={dataFilials} selectHandler={selectFilialHandler}/>
  </> 
   );
}

export default FilialsContent;