import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import DepositSwitch from "./DepositSwitch";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";
import DepositItem from "./DepositItem";
import Deal from "./Deal";
import CollapseWrapper from "../../UI/CollapseWrapper";
import DealInfo from "./DealInfo";
import { useState } from "react";
import { createPortal } from "react-dom";
import DealInfoPopup from "./DealInfoPopup";

function DepositDetails() {
  const formDepositItems = useAppSelector(state => state.clientStore.depositCommentForm)
  const clientRegStep = useAppSelector(state => state.clientStore.regClientStep);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex flex-col gap-3 pr-4">
      <CollapseWrapper title="Договор" page="newClient" notActive={clientRegStep < 1}>
        <Deal />
      </CollapseWrapper>
      <CollapseWrapper title="Залог" page="newClient" notActive={clientRegStep < 2}>
        <ul>
          {formDepositItems.map(item =>
            <DepositItem item={item} key={item.id} />
          )}
        </ul>
        <div className="flex items-center my-5">
          <div className="flex gap-6">
            <CustomInput
              name="priceRate"
              type="number"
              placeholder="12345678912345"
              label="Оценочная стоимость залога"
            />
            <CustomInput
              name="cellN"
              type="text"
              placeholder="10/3277"
              label="№ ячейки"
              className="w-[45%]"
              labelStyles="w-[45%]"
            />
          </div>
          <div className="flex self-end h-[31px] translate-x-[-30%]">
            <DepositSwitch title="Залог" />
            <DepositSwitch title="Согласие" />
          </div>
        </div>
      </CollapseWrapper>
      <CollapseWrapper title="Выдача кредита" page="newClient" notActive={clientRegStep < 3}>
        <div className="flex gap-2  my-5">
          <CustomInput
            type="date"
            name="dateIssue"
            label="Дата выдачи"
          />
          <CustomInput
            type="date"
            name="datePayment"
            label="Дата оплаты"
          />
          <CustomInput
            type="number"
            name="creditSumTo"
            label="Сумма кредита, процент"
            placeholder="20 000 000"
          />
          <CustomInput
            type="text"
            name="creditPercentage"
            placeholder="22%"
            className="w-1/4"
          />
          <DropDown
            title="Выбрать"
            listOfItems={[
              { label: "Наличные", key: 1 },
              { label: "Перечисление", key: 2 },
            ]}
            triggerType="click"
            name="creditType"
            label="Тип выдачи"
            className="h-[41px]"
          />
        </div>
        <div className="bg-lombard-bg-inactive-grey flex h-[95px] my-2 rounded-lg gap-3 px-3">
          <CustomInput
            type="number"
            name="bankCode"
            label="Код Банка"
            placeholder="0"
          />
          <CustomInput
            type="number"
            name="accountN"
            label="Номер счета"
            placeholder="0"
          />
          <CustomInput
            type="number"
            name="cardN"
            label="Номер карты"
            placeholder="0"
          />
        </div>
      </CollapseWrapper>
      <CollapseWrapper title="Данные сделки" page="newClient" handleClick={() => setShowDialog(true)} notActive={clientRegStep < 4}>
        <DealInfo />
      </CollapseWrapper>
      {showDialog && createPortal(<DealInfoPopup clickHandler={() => setShowDialog(false)} />, document.body)}
    </div>
  );
}

export default DepositDetails;
