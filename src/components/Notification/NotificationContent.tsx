import ButtonComponent from "../UI/ButtonComponent";
import DataTable from "../UI/DataTable";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { columnsForSMS, getFilter } from "../../helpers/fnHelpers";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import Sms from "../UI/Sms";
import { Checkbox } from "antd";
import { ISMSDataType } from "../../helpers/types";
import useActions from "../../helpers/hooks/useActions";
import { ApiService } from "../../helpers/API/ApiSerivce";
import Filters from "../UI/Filters";
import NotificationFilters from "./NotificationFilters";
import Confirmation from "../UI/Confirmation";

function NotificationContent() {
  const [showSendSmsDialog, setShowSendSmsDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [externalFilters, setExternalFilters] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReSubmitDialog, setShowReSubmitDialog] = useState(false);
  const selectedRowKeys = useAppSelector((state) => state.smsStore.selectedSMS);
  const allSms = useAppSelector((state) => state.smsStore.allSMS);
  const dispatch = useActions();

  const columns = useCallback(() => {
    return columnsForSMS(allSms);
  }, [allSms]);
  const setSMS = (arr: any) => {
    dispatch.setAllSmsList(arr);
  };

  async function filterSubmit(formData: any) {
    setExternalFilters(getFilter(formData));
    setShowFilterDialog(false);
  }

  const supportedFilterList: any = [
    {
      name: "status",
      type: "dropdown",
      label: "Статус",
      items: [
        { label: "Ожидание", key: 1, enumvalue: "PENDING" },
        { label: "Отправляется", key: 2, enumvalue: "SENDING" },
        { label: "Отправлено", key: 3, enumvalue: "SENT" },
        { label: "Ошибка", key: 4, enumvalue: "FAILED" },
      ],
    },
    {
      name: "channel",
      type: "dropdown",
      label: "Способ отправки",
      items: [
        { label: "SMS", key: 1, enumvalue: "SMS" },
        { label: "Telegram", key: 2, enumvalue: "TELEGRAM" },
        { label: "E-mail", key: 3, enumvalue: "EMAIL" },
      ],
    },
  ];

  const classesForStatuses = (record: any) => {
    switch (record.status) {
      case "SENT":
        return "sent-green";
      case "FAILED":
        return "failed-red";
      case "PENDING":
        return "scheduled-yellow";
      case "SENDING":
        return "progress-blue";
      default:
        return "";
    }
  };

  const handleDelete = async () => {
    try {
      const idsToDelete = selectedRowKeys.map((elem) => elem.id);
      await ApiService.deleteFromQueue(idsToDelete);
    } catch (err) {
      console.log(err);
    } finally {      
      setShowDeleteDialog(false);
    }
  };

  const handleResubmit = async () => {
    try {
      const idsToResend = selectedRowKeys.map((elem) => elem.id);
      await ApiService.retrySendQueue(idsToResend);
    } catch (err) {
      console.log(err);
    } finally {
      setShowReSubmitDialog(false);
    }
  };

  const checkbox = {
    title: () => (
      <Checkbox
        onChange={() => dispatch.setAllSelect()}
        checked={!!selectedRowKeys.length}
      />
    ),
    key: "select",
    render: (_: string, record: ISMSDataType) => (
      <Checkbox
        onChange={() => dispatch.setSelectOneSms(record)}
        checked={!!selectedRowKeys.find((elem) => elem.id === record.id)}
      />
    ),
  };
  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Уведомления</h3>
        <div className="flex gap-2 items-center">
          <Filters
            filters={
              <NotificationFilters
                setFilters={filterSubmit}
                activeFilter={externalFilters}
              />
            }
            isVisible={showFilterDialog}
            setVisibility={setShowFilterDialog}
            activeFilter={externalFilters}
            clearFilters={() => setExternalFilters("")}
            supportedFilters={supportedFilterList}
            isDisabled
          />
          {selectedRowKeys.length > 0 &&
            selectedRowKeys.filter((elem) => elem.status === "SENT").length ===
              0 && (
              <ButtonComponent
                titleBtn="Отменить"
                color="bg-lombard-main-blue"
                clickHandler={() => setShowDeleteDialog(true)}
              />
            )}
          {selectedRowKeys.length > 0 &&
            selectedRowKeys.filter((elem) => elem.status === "SENDING")
              .length === 0 &&
            selectedRowKeys.filter((elem) => elem.status === "PENDING")
              .length === 0 && (
              <ButtonComponent
                titleBtn="Переотправить"
                color="bg-lombard-btn-yellow"
                clickHandler={() => setShowReSubmitDialog(true)}
              />
            )}

          <ButtonComponent
            titleBtn="Отправить СМС"
            color="bg-lombard-btn-green"
            clickHandler={() => setShowSendSmsDialog(true)}
          />
        </div>
      </div>
      <DataTable
        columns={[...columns(), checkbox]}
        rowClasses={classesForStatuses}
        endPoint={ApiService.getQueue}
        classes="customCssTable"
        pagination
        setDataToState={setSMS}
        settedFilters={externalFilters}
      />
      {showSendSmsDialog &&
        createPortal(
          <Sms closeHandler={() => setShowSendSmsDialog(false)} />,
          document.body
        )}
      {showDeleteDialog &&
        createPortal(
          <Confirmation
            handleClose={() => setShowDeleteDialog(false)}
            handleSave={handleDelete}
            title="Отменить?"
            textMsg="Вы уверены, что хотите отменить отправку уведомления?"
            colorReverse
          />,
          document.body
        )}
      {showReSubmitDialog &&
        createPortal(
          <Confirmation
            handleClose={() => setShowReSubmitDialog(false)}
            handleSave={handleResubmit}
            title="Переотправить?"
            textMsg="Вы уверены, что хотите переотправить выбранные уведомления?"
          />,
          document.body
        )}
    </>
  );
}

export default NotificationContent;
