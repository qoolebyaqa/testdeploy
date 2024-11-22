import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import UsualSwitch from "../../UI/UsualSwitch";
import DepositItem from "./DepositItem";
import Deal from "./Deal";
import CollapseWrapper from "../../UI/CollapseWrapper";
import DealInfo from "./DealInfo";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DealInfoPopup from "./DealInfoPopup";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";
import useActions from "../../../helpers/hooks/useActions";
import { ApiService } from "../../../helpers/API/ApiSerivce";
import { ICollateralPriceList, ICollateralType } from "../../../helpers/API/Schemas";
import { convertDataToList4DropDown } from "../../../helpers/fnHelpers";

function DepositDetails() {
  const [formDepositItems, setFormDepositItems] = useState([
    { id: Math.random().toFixed(8) },
  ]);
  const stepState = useAppSelector((state) => state.clientStore.stepState);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [showDialog, setShowDialog] = useState(false);
  const [contractNumber, setContractNumber] = useState<null | number>(null)
  const dispatch = useActions();
  const [collateralTypes, setCollateralTypes] = useState<ICollateralType[] | []>([]);
  const [_collateralPriceLists, setCollateralPriceLists] = useState<ICollateralPriceList[] | []>([])

  useEffect(() => {
    async function getCollateral() {
      const collateralTypeList = await ApiService.getCollateralTypes();
      setCollateralTypes(collateralTypeList.data.content)
      const collateralPriceList = await ApiService.getCollateralPriceList();
      await ApiService.getCollaterals();
      setCollateralPriceLists(collateralPriceList.data)
      /* await ApiService.createCollateralPriceList({
        name: 'TestPrices List',
        market_price: 1500000,
        collateral_type_id: 2,
        attribute_values: {},
        estimated_price_min: 1000000,
        estimated_price_max: 1200000,
        valid_from: '2024-10-31'
      }) */
    }
    getCollateral();
  }, []);

  function pushIndexToDepositItems() {
    let newID = Math.random().toFixed(8);
    while (formDepositItems.map((val) => val.id).includes(newID)) {
      newID = Math.random().toFixed(8);
    }
    setFormDepositItems((prev) => [...prev, { id: newID }]);
  }
  function deleteFromDepositItems(id: string) {
    const filtredIndexes = formDepositItems.filter((item) => item.id !== id);
    setFormDepositItems(filtredIndexes);
  }

  function handleAddDataInputsToID(inputData: {
    [key: string]: string | string[];
  }) {
    const updatedFormDepositItems = formDepositItems.map((item) =>
      item.id === inputData.id ? { ...item, ...inputData } : item
    );
    setFormDepositItems(updatedFormDepositItems);
  }

  const paymentTypeChangeHandler = (inputValue: {
    id?: string;
    title: string;
    value: string | string[];
  }) => {
    setFormValues((prev) => ({
      ...prev,
      [inputValue.title]: Array.isArray(inputValue.value)
        ? inputValue.value[0]
        : inputValue.value,
    }));
  };

  const additionalFields =
    formValues.creditType !== "CASH" ? (
      <div className="bg-lombard-bg-inactive-grey flex flex-col rounded-lg p-3 my-2">
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
          />
        </div>
        {formValues.creditType === "COMPLEX" && (
          <div className="flex gap-3">
            <CustomInput
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
            />
          </div>
        )}
      </div>
    ) : (
      <></>
    );

  return (
    <div className="flex flex-col gap-3 pr-4">
      <CollapseWrapper
        contractNumber={contractNumber}
        title="Договор"
        page="newClient"
        notActive={stepState.maxStep < 1}
        shouldBeSelected={stepState.id === 1}
        handleBlockSelect={
          !(stepState.maxStep < 1)
            ? () => dispatch.setStepState({id: 1, step: "hold" })
            : undefined
        }
      >
        <Deal setContractNumber={setContractNumber}/>
      </CollapseWrapper>
      <CollapseWrapper
        contractNumber={contractNumber}
        title="Залог"
        page="newClient"
        notActive={stepState.maxStep < 2}
        shouldBeSelected={stepState.id === 2}
        handleBlockSelect={
          !(stepState.maxStep < 2)
            ? () => dispatch.setStepState({id: 2, step: "collateral" })
            : undefined
        }
      >
        <ul>
          {formDepositItems.map((item) => (
            <DepositItem
              item={item}
              key={item.id}
              formDepositItems={formDepositItems}
              pushNewIndex={pushIndexToDepositItems}
              deleteIndex={deleteFromDepositItems}
              submitInputData={handleAddDataInputsToID}
              collateralTypes={convertDataToList4DropDown(collateralTypes)}
            />
          ))}
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
      <CollapseWrapper
        contractNumber={contractNumber}
        title="Выдача кредита"
        page="newClient"
        notActive={stepState.maxStep < 3}  
        shouldBeSelected={stepState.id === 3}      
        handleBlockSelect={
          !(stepState.maxStep < 3)
            ? () => dispatch.setStepState({id: 3, step: "deposit" })
            : undefined
        }
      >
        <div className="flex gap-2  my-5">
          <CustomInput type="date" name="dateIssue" label="Дата выдачи" />
          <CustomInput type="date" name="datePayment" label="Дата оплаты" />
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
              { label: "Наличные", key: 1, enumvalue: "CASH" },
              { label: "На карту", key: 2, enumvalue: "CARD" },
              { label: "Смешанная", key: 3, enumvalue: "COMPLEX" },
            ]}
            name="creditType"
            label="Тип выдачи"
            handleSelect={paymentTypeChangeHandler}
          />
        </div>
        {additionalFields}
      </CollapseWrapper>
      <CollapseWrapper
        contractNumber={contractNumber}
        title="Данные сделки"
        page="newClient"
        handleClick={() => setShowDialog(true)}
        shouldBeSelected={stepState.id === 4}
        notActive={stepState.maxStep < 4}        
        handleBlockSelect={
          !(stepState.maxStep < 4)
            ? () => dispatch.setStepState({id: 4, step: "deal_info" })
            : undefined
        }
      >
        <DealInfo />
      </CollapseWrapper>
      {showDialog &&
        createPortal(
          <DealInfoPopup clickHandler={() => setShowDialog(false)} />,
          document.body
        )}
    </div>
  );
}

export default DepositDetails;
