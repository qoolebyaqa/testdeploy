import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import UsualSwitch from "../../UI/UsualSwitch";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";
import DepositItem from "./DepositItem";
import Deal from "./Deal";
import CollapseWrapper from "../../UI/CollapseWrapper";
import DealInfo from "./DealInfo";
import { useState } from "react";
import { createPortal } from "react-dom";
import DealInfoPopup from "./DealInfoPopup";

function DepositDetails() {
  const [formDepositItems, setFormDepositItems] = useState([{ id: Math.random().toFixed(8) }]);
  const clientRegStep = useAppSelector(state => state.clientStore.regClientStep);
  const [formValues, setFormValues] = useState<{[key:string]: string}>({})
  const [showDialog, setShowDialog] = useState(false);

  function pushIndexToDepositItems() {
    let newID = Math.random().toFixed(8);
    while(formDepositItems.map(val => val.id).includes(newID)){
      newID = Math.random().toFixed(8);
    }
    setFormDepositItems(prev => ([...prev, {id: newID}]))
  }
  function deleteFromDepositItems(id:string) {
    const filtredIndexes = formDepositItems.filter(item => item.id !== id)
    setFormDepositItems(filtredIndexes);
  }

  function handleAddDataInputsToID(inputData:{[key:string]: string | string[]}) {
    const updatedFormDepositItems = formDepositItems.map((item) => 
    item.id === inputData.id ? {...item, ...inputData} : item);
    setFormDepositItems(updatedFormDepositItems)
  }

  const paymentTypeChangeHandler = (inputValue: {id?: string, title:string, value: string | string[]}) => {   
    setFormValues(prev => ({...prev, [inputValue.title]: Array.isArray(inputValue.value) ? inputValue.value[0] : inputValue.value})) 
  }

  const additionalFields = formValues.creditType !== 'CASH' ? 
      (<div className="bg-lombard-bg-inactive-grey flex flex-col rounded-lg p-3 my-2">
        <div className="flex gap-3">
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
        /></div>
        {formValues.creditType === 'COMPLEX' && <div className="flex gap-3"><CustomInput
          type="number"
          name="toCard"
          label="На карту"
          placeholder="0"
        />
        <CustomInput
          type="number"
          name="byCash"
          label="Наличные"
          placeholder="0"
        /></div>}
      </div>) : <></>

  return (
    <div className="flex flex-col gap-3 pr-4">
      <CollapseWrapper title="Договор" page="newClient" notActive={clientRegStep < 1}>
        <Deal />
      </CollapseWrapper>
      <CollapseWrapper title="Залог" page="newClient" notActive={clientRegStep < 2}>
        <ul>
          {formDepositItems.map(item =>
            <DepositItem item={item} key={item.id} formDepositItems={formDepositItems} pushNewIndex={pushIndexToDepositItems} deleteIndex={deleteFromDepositItems} submitInputData={handleAddDataInputsToID}/>
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
            <UsualSwitch title="Залог" />
            <UsualSwitch title="Согласие" />
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
              { label: "Наличные", key: 1, enumvalue: 'CASH' },
              { label: "На карту", key: 2, enumvalue: 'CARD' },
              { label: "Смешанная", key: 3, enumvalue: 'COMPLEX' },
            ]}
            name="creditType"
            label="Тип выдачи"
            handleSelect={paymentTypeChangeHandler}
          />
        </div>
        {additionalFields}
      </CollapseWrapper>
      <CollapseWrapper title="Данные сделки" page="newClient" handleClick={() => setShowDialog(true)} notActive={clientRegStep < 4}>
        <DealInfo />
      </CollapseWrapper>
      {showDialog && createPortal(<DealInfoPopup clickHandler={() => setShowDialog(false)} />, document.body)}
    </div>
  );
}

export default DepositDetails;
