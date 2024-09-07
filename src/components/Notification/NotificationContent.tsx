import ButtonComponent from "../UI/ButtonComponent";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import DataTable from "../UI/DataTable";
import { useState } from "react";
import { createPortal } from "react-dom";
import { columnsForSMS } from "../../helpers/fnHelpers";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import Sms from "../UI/Sms";
import { Checkbox } from "antd";
import { ISMSDataType } from "../../helpers/types";
import useActions from "../../helpers/hooks/useActions";

function NotificationContent() {
  const [showDialog, setShowDialog] = useState(false);
  const dataSMS = useAppSelector(state => state.smsStore.allSMS);
  const selectedRowKeys = useAppSelector(state => state.smsStore.selectedSMS);
  const dispatch = useActions();
  const checkbox =  {
    title: () => <Checkbox onChange={() => dispatch.setAllSelect()} checked={!!selectedRowKeys.length}/>,
    key: 'select',
    render: (_: string, record: ISMSDataType) => <Checkbox onChange={() => dispatch.setSelectOneSms(record.key)} checked={selectedRowKeys.includes(record.key)}/>    
  }
  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Уведомления</h3>
        <div className="flex gap-2 items-center">
          <DropDown title="СМС" listOfItems={[{ key: 1, label: 'Отправлено' }, { key: 2, label: 'Ошибка' }, { key: 3, label: 'Ожидание' }]} triggerType="click" name="smsStatus" className="w-[170px]" />
          <CustomInput type="date" name="smsSelector" defaultValue={new Date().toLocaleString()} />
          <DropDown title="Все" listOfItems={[{ key: 1, label: 'Все' }]} triggerType="click" name="smsStatus1" className="w-[170px]" />
          <ButtonComponent titleBtn="Применить" color="bg-lombard-main-blue" />
          {selectedRowKeys.length > 0 && <ButtonComponent titleBtn="Удалить" color="bg-lombard-btn-red" />}
          {selectedRowKeys.length > 0 && <ButtonComponent titleBtn="Переотправить" color="bg-lombard-btn-yellow" />}
          {selectedRowKeys.length > 0 && <ButtonComponent titleBtn="Отменить" color="bg-lombard-btn-grey" className="text-lombard-text-black" />}
          <ButtonComponent titleBtn="Отправить СМС" color="bg-lombard-btn-green" clickHandler={() => setShowDialog(true)} />
        </div>
      </div>
      {showDialog && createPortal(<Sms clickHandler={() => setShowDialog(false)} page={"notification"} />, document.body)}
      <DataTable columns={[...columnsForSMS, checkbox]} data={dataSMS} classes="customCssTable" pagination/>
    </>
  );
}

export default NotificationContent;
