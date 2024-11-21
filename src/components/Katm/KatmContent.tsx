import ButtonComponent from "../UI/ButtonComponent";
import DataTable from "../UI/DataTable";
import { columnsForKATM, dataKATM } from "../../helpers/fnHelpers";
import { IDataKatmType } from "../../helpers/types";
import useActions from "../../helpers/hooks/useActions";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Checkbox } from "antd";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import SVGComponent from "../UI/SVGComponent";
import Confirmation from "../UI/Confirmation";

function KatmContent() {
  const dispatch = useActions();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const selectedRowKeys = useAppSelector(
    (state) => state.katmStore.katmSelected
  );
  const input = useRef<HTMLInputElement>(null);

  function selectKATMHandler(...args: IDataKatmType[]) {
    dispatch.setKATMChoosenOne(args[0]);
    navigate(`/katm/${args[0].index}`);
  }
  function handleClick() {
    if (input.current) {
      input.current.click();
    }
  }

  const checkbox = {
    title: () => (
      <Checkbox
        onChange={() => dispatch.setAllKATMSelect()}
        checked={!!selectedRowKeys.length}
      />
    ),
    key: "select",
    render: (_: string, record: IDataKatmType) => (
      <div className="flex justify-center items-center gap-[10px]">
        <button onClick={(e) => {e.stopPropagation(); handleClick()}}>
          <SVGComponent title="uploadFile" />
        </button>
        <input type="file" ref={input} style={{ display: "none" }}  onClick={(e) => e.stopPropagation()}/>
        <Checkbox
          onChange={() => dispatch.setOneKatmSelect(record.key)}
          onClick={(e) => e.stopPropagation()}
          checked={selectedRowKeys.includes(record.key)}
        />
      </div>
    ),
  };

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">КАТМ запросы</h3>
        <div className="flex gap-2 items-center">
          <ButtonComponent titleBtn="Применить" color="bg-lombard-main-blue" />
          <ButtonComponent
            titleBtn="Удалить"
            color="bg-lombard-btn-red"
            clickHandler={() => setShowDialog(true)}
          />
        </div>
      </div>
      <DataTable
        columns={[...columnsForKATM, checkbox]}
        data={dataKATM}
        selectHandler={selectKATMHandler}
        classes="customCssTable"
        pagination
      />
      {showDialog &&
        createPortal(<Confirmation handleClose={() => setShowDialog(false)} handleSave={() => {}} title="Удалить?" textMsg="Вы действительно хотите удалить?"/>,
          document.body
        )}
    </>
  );
}

export default KatmContent;
