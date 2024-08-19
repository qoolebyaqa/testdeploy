import ButtonComponent from "../UI/ButtonComponent";
import DataTable from "../UI/DataTable";
import { columnsForKATM, dataKATM } from "../../helpers/fnHelpers";
import DropDown from "../UI/DropDown";
import CustomInput from "../UI/CustomInput";
import { IDataKatmType } from "../../helpers/types";
import useActions from "../../helpers/hooks/useActions";
import { useNavigate } from "react-router";
import { useState } from "react";
import Delete from "../UI/Delete";
import { createPortal } from "react-dom";

function KatmContent() {
  const dispatch = useActions()
  const navigate = useNavigate();

  function selectKATMHandler(...args: IDataKatmType[]) {
    dispatch.setKatmSelectedOne(args[0]);
    navigate(`/katm/browse=${args[0].index}`)
  }

  const [showDialog, setShowDialog] = useState(false);

  return (
  <>
    <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
      <h3 className="text-black font-extrabold text-[18px]">КАТМ запросы</h3>
      <div className="flex gap-2 items-center">
        <DropDown title="Все" listOfItems={[{ key: 1, label: 'Заключён' }, { key: 2, label: 'Отменён' }, { key: 3, label: 'Все' }]} triggerType="click" name="katmType" className="w-[170px]" />
        <CustomInput type="date" name="katmDateRequest" defaultValue={new Date().toLocaleString()} />
        <ButtonComponent color="bg-white" className="text-lombard-btn-red h-8 font-semibold" titleBtn="Очистить фильтр ✕" />
        <ButtonComponent titleBtn="Применить" color="bg-lombard-main-blue" />
        <ButtonComponent titleBtn="Удалить" color="bg-lombard-btn-red" clickHandler={() => setShowDialog(true)} />
        {showDialog && createPortal(<Delete clickHandler={() => setShowDialog(false)}/>, document.body)}
      </div>
    </div>
    <DataTable columns={columnsForKATM} data={dataKATM} selectHandler={selectKATMHandler}/>
  </>
  );
}

export default KatmContent;