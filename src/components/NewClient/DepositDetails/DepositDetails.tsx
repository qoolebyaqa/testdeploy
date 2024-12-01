import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import UsualSwitch from "../../UI/UsualSwitch";
import DepositItem from "./DepositItem";
import Deal from "./Deal";
import CollapseWrapper from "../../UI/CollapseWrapper";
import DealInfo from "./DealInfo";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import DealInfoPopup from "./DealInfoPopup";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";
import useActions from "../../../helpers/hooks/useActions";
import { ApiService } from "../../../helpers/API/ApiSerivce";
import {
  ICollateralType,
  LocalcollateralItem,
} from "../../../helpers/API/Schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cardSchema, cashNonSchema, complexSchema, confirmationsSwitchersSchema, } from "../../../helpers/validator";
import { toast } from "react-toastify";
import { IDataContractType } from "../../../helpers/types";
import { mockContractData } from "../../../helpers/fnHelpers";

function DepositDetails({createdContract}: {createdContract?: IDataContractType | null}) {
  const [formDepositItems, setFormDepositItems] = useState<
    LocalcollateralItem[]
  >([{ id: Math.random().toFixed(8) }]);
  const stepState = useAppSelector((state) => state.clientStore.stepState);
  const [showDialog, setShowDialog] = useState(false);
  const [contractNumber, setContractNumber] = useState<null | number>(null);
  const [contractData, setContractData] = useState<null | IDataContractType | undefined>(null)
  const dispatch = useActions();
  const [collateralTypes, setCollateralTypes] = useState<
    ICollateralType[] | []
  >([]);
  const [validationIssueSchema, setValidationIssueSchema] = useState<any>(cardSchema);

  useEffect(() => {
    async function getCollateral() {
      if(createdContract) {
        setContractNumber(createdContract.id)
        try {
          const collaterals = await ApiService.getPOCollaterals(`&loan_agreement_id=${createdContract.id}`);
          const convertedCollaterals = collaterals.data.content.map((val:any) => ({
            id: val.id,
            storage_unit_id: val.storageUnitId,
            loan_agreement_id: val.loanAgreementId,
            description: val.description,
            customer_id: val.customerId,
            collateral_type_id: val.collateralTypeId,
            price: {
              id: val.id,
              estimated_value: val.estimatedValue,
              estimated_value_min: val.estimatedValueMin,
              estimated_value_max: val.estimatedValueMax
            },
            attribute_values: val.attributeValues
          }))
          setFormDepositItems(convertedCollaterals)
        } catch (err) {
          console.log(err)
        }
        }
        const collateralTypeList = await ApiService.getCollateralTypes();
        setCollateralTypes(collateralTypeList.data.content);
      /* const collateralPriceList = await ApiService.getCollateralPriceList(); */
     /*  setCollateralPriceLists(collateralPriceList.data.content); */
      /* await ApiService.getCollateralPriceList() */
      /* ApiService.deleteCollateralTypeAttr(2+'', 1+'') */
      /* ApiService.updateCollateralTypeAttr(3+'', 9+'', {
        options: [],
        name: 'quantity',
        data_type: 'DECIMAL',
        is_price_key: true,
        is_required: true
      }) */
      /* await ApiService.updateCollateralPriceList({
        name: 'TestPrices List',
        market_price: 1700000,
        collateral_type_id: 3,
        attribute_values: {

        },
        estimated_price_min: 1500000,
        estimated_price_max: 1900000,
        valid_from: '2024-10-31'
      }, 2) */
    }
    getCollateral();
  }, [createdContract]);

  function pushIndexToDepositItems() {
    let newID = Math.random().toFixed(8);
    while (formDepositItems.map((val) => val.id).includes(newID)) {
      newID = Math.random().toFixed(8);
    }
    setFormDepositItems((prev) => [...prev, { id: newID }]);
  }

  async function deleteFromDepositItems(elem: LocalcollateralItem) {
    console.log(elem)
    const id = elem?.price?.id;
    console.log(formDepositItems)
    try {
      if(id){
        await ApiService.deleteCollateral(id)
        const filtredIndexes = formDepositItems.filter((item) => !item.price || item.price?.id !== id);
        setFormDepositItems(filtredIndexes);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleAddDataInputsToID(inputData: { [key: string]: any }) {
    const updatedFormDepositItems = formDepositItems.map((item) =>
      item.id === inputData.id ? { ...item, ...inputData } : item
    );
    setFormDepositItems(updatedFormDepositItems);
  }

    const totalCost = useMemo(
    () =>
      formDepositItems.reduce((acc, cur) => {
        return cur.price ? acc + cur.price?.estimated_value : acc + 0;
      }, 0),
    [formDepositItems]
  );

  const { control, setValue } = useForm({ mode: "onChange" });

  const {
    control: switcherControl,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(confirmationsSwitchersSchema),
  });

  const {
    control: issuePoControl,
    setValue: issuePoSetValue,
    getValues: issuePoGetValue,
    handleSubmit: issuePoSubmit,
    watch: issuePoWatch,
    formState: { errors: issuePoErrors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationIssueSchema),
  });

  const type = issuePoWatch('type');

  useEffect(() => {
    switch (type) {
      case 'CARD':
        setValidationIssueSchema(cardSchema);
        break;
      case 'COMPLEX':
        setValidationIssueSchema(complexSchema);
        break;
      default:
        setValidationIssueSchema(cashNonSchema)
        break;
    }
  }, [type]);

  const submitAndStepChange = async (_formData:any) => {  
    try {
      /* await ApiService.confirmPo(Number(contractNumber)) */
      setContractData(mockContractData)
      toast.success(`Драфт договора №${contractNumber} подтверждён`);
      dispatch.setStepState({id: 3, step:'deposit', maxStep: 3});
    } catch (err) {
      console.log(err)
    }
  }

  const bankInfoSubmit = async (formData: any) => {
    const {bank_id, bank_account_number, card_number, amount_card, amount_cash, type, loan_amount} = formData; 
    const dataToIssuePO:any = []   
    if(type === 'CARD') {
      dataToIssuePO.push({bank_id, bank_account_number, card_number, type, amount: loan_amount})
    }    
    if(type === 'COMPLEX') {
      dataToIssuePO.push({bank_id, bank_account_number, card_number, amount: amount_card, type: 'CARD'})
      dataToIssuePO.push({amount: amount_cash, type: 'CASH'})
    }
    if(type === 'CASH') {
      dataToIssuePO.push({amount: loan_amount, type})
    }
    try{
     /*  contractNumber && await ApiService.issuePo(contractNumber, {issue_details: dataToIssuePO}) */
      toast.success(`Договор №${contractNumber} выпущен`);
      dispatch.setStepState({id: 4, step:'deal_info', maxStep: 4});

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setValue("cellN", contractNumber?.toString());
    setValue("priceRate", totalCost);
  }, [contractNumber, totalCost]);

  useEffect(() => {
    issuePoSetValue("dateIssue", contractData?.issue_date);
    issuePoSetValue("datePayment", contractData?.due_date);
    contractData?.loan_amount && issuePoSetValue("loan_amount", contractData.loan_amount);
    issuePoSetValue("type", 'CARD');
  }, [contractData]);

  const additionalFields =
    issuePoGetValue('type') !== "CASH" ? (
      <div className="bg-lombard-bg-inactive-grey flex flex-col rounded-lg p-3 my-2">
        <div className="flex gap-3">
          <CustomInput
            type="number"
            name="bank_id"
            label="Код Банка"
            placeholder="0"
            control={issuePoControl}
            errorMsg={issuePoErrors.bank_id?.message as string}
          />
          <CustomInput
            type="number"
            name="bank_account_number"
            label="Номер счета"
            placeholder="0"
            control={issuePoControl}
            errorMsg={issuePoErrors.bank_account_number?.message as string}
          />
          <CustomInput
            type="number"
            name="card_number"
            label="Номер карты"
            placeholder="0"
            control={issuePoControl}
            errorMsg={issuePoErrors.card_number?.message as string}
          />
        </div>
        {issuePoGetValue('type') === "COMPLEX" && (
          <div className="flex gap-3">
            <CustomInput
              type="number"
              name="amount_card"
              label="На карту"
              placeholder="0"
              control={issuePoControl}
              errorMsg={issuePoErrors.amount_card?.message as string}
            />
            <CustomInput
              type="number"
              name="amount_cash"
              label="Наличные"
              placeholder="0"
              control={issuePoControl}
              errorMsg={issuePoErrors.amount_cash?.message as string}
            />
          </div>
        )}
      </div>
    ) : (
      <></>
    );

  return (
    <div className="flex flex-col gap-3">
      {!createdContract && <CollapseWrapper
        contractNumber={contractNumber}
        title="Договор"
        page="newClient"
        notActive={stepState.maxStep < 1}
        shouldBeSelected={stepState.id === 1}
        handleBlockSelect={
          !(stepState.maxStep < 1)
            ? () => dispatch.setStepState({ id: 1, step: "hold" })
            : undefined
        }
      >
        <Deal setContractNumber={setContractNumber} />
      </CollapseWrapper>}
      <CollapseWrapper
        contractNumber={contractNumber}
        title="Залог"
        page="newClient"
        notActive={stepState.maxStep < 2}
        shouldBeSelected={stepState.id === 2}
        handleBlockSelect={
          !(stepState.maxStep < 2)
            ? () => dispatch.setStepState({ id: 2, step: "collateral" })
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
              saveInputData={handleAddDataInputsToID}
              collateralTypes={collateralTypes}
              contractNumber={contractNumber}
            />
          ))}
        </ul>
        <div className="flex items-center my-5">
          <form className="flex gap-6">
            <CustomInput
              name="priceRate"
              type="number"
              placeholder="12345678912345"
              label="Оценочная стоимость залога"
              isDisabled
              control={control}
            />
            <CustomInput
              name="cellN"
              type="number"
              label="№ ячейки"
              className="w-[45%]"
              labelStyles="w-[45%]"
              isDisabled
              control={control}
            />
          </form>
          <form
            className="flex self-end h-[31px] translate-x-[-30%]"
            id="collateral"
            onSubmit={handleSubmit(submitAndStepChange)}
          >
            <UsualSwitch
              title="Залог"
              shouldBeDisabled={!formDepositItems[0] || !formDepositItems[0]?.price}
              name="confirmCollateral"
              control={switcherControl}
              errorMsg={errors.confirmCollateral?.message}
            />
            <UsualSwitch
              title="Согласие"
              name="confirmAcceptance"
              control={switcherControl}
              errorMsg={errors.confirmAcceptance?.message}
            />
          </form>
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
            ? () => dispatch.setStepState({ id: 3, step: "deposit" })
            : undefined
        }
      >
        <form onSubmit={issuePoSubmit(bankInfoSubmit)} id='deposit'>
          <div className="flex gap-2  my-5">
          <CustomInput type="date" name="dateIssue" label="Дата выдачи" control={issuePoControl} isDisabled value={contractData?.issue_date}/>
          <CustomInput type="date" name="datePayment" label="Дата оплаты" control={issuePoControl} isDisabled value={contractData?.due_date}/>
          <CustomInput
            type="number"
            name="loan_amount"
            label="Сумма кредита, процент"
            placeholder="20 000 000"
            control={issuePoControl}
            isDisabled
          />
          <CustomInput
            type="text"
            name="creditPercentage"
            placeholder="22%"
            className="w-1/4"
            control={issuePoControl}
            isDisabled
          />
          <div className="w-60">
          <DropDown
            title="Выбрать"
            listOfItems={[
              { label: "Наличные", key: 1, enumvalue: "CASH" },
              { label: "На карту", key: 2, enumvalue: "CARD" },
              { label: "Смешанная", key: 3, enumvalue: "COMPLEX" },
            ]}
            name="type"
            label="Тип выдачи"
            control={issuePoControl}
            errorMsg={issuePoErrors.type?.message as string}
          /></div>
          </div>
        {additionalFields}
        </form>
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
            ? () => dispatch.setStepState({ id: 4, step: "deal_info" })
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
