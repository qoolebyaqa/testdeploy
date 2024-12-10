import CollapseWrapper from "../../UI/CollapseWrapper";
import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import DottedBtn from "../../NewClient/DepositDetails/DottedBtn";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FindThirdPerson from "./FindThirdPerson";
import DataTable from "../../UI/DataTable";
import { ApiService } from "../../../helpers/API/ApiSerivce";
import { getColumnsForContracts } from "../../../helpers/fnHelpers";
import { useSearchParams } from "react-router-dom";
import DepositDetails from "../../NewClient/DepositDetails/DepositDetails";
import { IDataContractType } from "../../../helpers/types";
import useActions from "../../../helpers/hooks/useActions";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";
import Loader from "../../UI/Loader";

function ContractCollapsesList({ client }: { client: any }) {
  const [paymentOptions, setPaymentOptions] = useState([
    { id: Math.random().toFixed(8) },
  ]);
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedContract, setSelectedContract] =
    useState<null | IDataContractType>(null);
  const [currestSort, setCurrentSort] = useState("");
  const stepState = useAppSelector((state) => state.clientStore.stepState);
  const dispatch = useActions();
  const loadingPO = useAppSelector((state) => state.contractStore.loadingPO);

  function selectContractHandler(...args: IDataContractType[]) {
    if(searchParams.get('po') !== args[0].id.toString()) {
      dispatch.setLoadingPo(true);
      setSearchParams({ po: args[0].id.toString() });
    }
  }

  useEffect(() => {
    async function getPO() {
      try {
        const PoNumber = searchParams.get("po");
        if (PoNumber) {
          const PO = await ApiService.getPO(PoNumber);
          dispatch.setLoadingPo(false);
          setSelectedContract(PO.data);
          dispatch.setContractChoosenOne(PO.data);
          PO.data.status === "HOLD"
            ? dispatch.setStepState({ id: 2, step: "collateral", maxStep: 2 })
            : PO.data.status === "CONFIRMED"
            ? dispatch.setStepState({ id: 3, step: "deposit", maxStep: 3 })
            : dispatch.setStepState({ id: 4, step: "deal_info", maxStep: 4 });
        }
      } catch (err) {
        console.log(err);
      } finally {        
        dispatch.setLoadingPo(false);
      }
    }
    getPO();
  }, [searchParams.get('po')]);

  function pushIndexToPaymentOptions() {
    let newID = Math.random().toFixed(8);
    while (paymentOptions.map((val) => val.id).includes(newID)) {
      newID = Math.random().toFixed(8);
    }
    setPaymentOptions((prev) => [...prev, { id: newID }]);
  }
  function deleteFromPaymentOptions(id?: string | number) {
    const filtredIndexes = paymentOptions.filter((item) => item.id !== id);
    setPaymentOptions(filtredIndexes);
  }

  function handleAddDataInputsToID(inputData: {
    [key: string]: string | string[];
  }) {
    const dataToAdd = { [inputData.title as string]: inputData.value };
    const updatedPaymentOptions = paymentOptions.map((item) =>
      item.id === inputData.id ? { ...item, ...dataToAdd } : item
    );
    setPaymentOptions(updatedPaymentOptions);
  }

  function handleOpenThirdPeople() {
    setIsModalOpen(true);
  }

  const columnsForContracts = useCallback(() => {
    const filterContracts = [
      "index",
      "id",
      "status",
      "loan_amount",
      "issue_date",
      "due_date",
      "loan_term",
    ];
    return getColumnsForContracts(setCurrentSort, currestSort).filter((item) =>
      filterContracts.includes(item.key as string)
    );
  }, [currestSort]);

  const classesForSelectedContract = (record: any) => {
    if(record.id == searchParams.get('po')) {
      return 'row-active'
    } return ''
  }

  return (
    <div className="flex flex-col gap-3 pr-4 w-2/3">
      <CollapseWrapper title="Договоры">
        <DataTable
          endPoint={ApiService.getPaginatenPOs}
          columns={columnsForContracts()}
          tableSize="small"
          settedFilters={`&customer_id=${client.id}`}
          sortStr={currestSort}
          selectHandler={selectContractHandler}
          rowClasses={classesForSelectedContract}
        />
      </CollapseWrapper>
      {loadingPO  && <Loader />} 
      <DepositDetails selectedContract={selectedContract} />
      <CollapseWrapper
        title="Оплата"
        page="contract"
        handleClick={handleOpenThirdPeople}
        contractNumber={selectedContract?.id}
        notActive={stepState.maxStep < 5}
        shouldBeSelected={stepState.id === 5}
        handleBlockSelect={
          !(stepState.maxStep < 4)
            ? () => dispatch.setStepState({ id: 5, step: "payment" })
            : undefined
        }
      >
        <div className="flex flex-col gap-[8px] pb-12">
          <div className="flex flex-row gap-[10px] justify-start items-start w-[600px]">
            <CustomInput type={"date"} name={"calendar"} label="Дата оплаты" />
            <CustomInput
              type="number"
              name={"offered bills"}
              label="Рекомендуемая сумма:"
              placeholder="20 000 000"
              className="bg-[#EFF2F4] placeholder:text-[#3B3B3B]"
            />
            <CustomInput
              type="number"
              name={"amount of payment"}
              label="Сумма оплаты "
              placeholder="16 000 000"
              className=" placeholder:text-[#C31328] placeholder:font-bold"
            />
          </div>
          {paymentOptions.map((item) => (
            <div className="flex flex-row gap-[10px] mr-12" key={item.id}>
              <DropDown
                title={"Выбрать"}
                listOfItems={[
                  { label: "Наличные", key: 1, enumvalue: "CASH" },
                  { label: "C карты UzCard", key: 2, enumvalue: "UZCARD" },
                  { label: "C карты HUMO", key: 2, enumvalue: "HUMOCARD" },
                ]}
                name={"type of payment"}
                label="Тип оплаты"
                className="h-[41px]"
                handleSelect={handleAddDataInputsToID}
              />
              <CustomInput
                type="number"
                name={"amount of payment"}
                label="Сумма оплаты"
                placeholder="16 000 000"
                className=" placeholder:text-[#3B3B3B] h-[41px]"
                handleChange={handleAddDataInputsToID}
                id={item.id}
              />
              <div className="mt-[5.5px]">
                <DottedBtn
                  currentItem={item}
                  deleteIndex={deleteFromPaymentOptions}
                  items={paymentOptions}
                  pushNewIndex={pushIndexToPaymentOptions}
                />
              </div>
            </div>
          ))}
        </div>
      </CollapseWrapper>
      <CollapseWrapper
        title="Выписка"
        contractNumber={selectedContract?.id}
        notActive={stepState.maxStep < 5}
        shouldBeSelected={stepState.id === 6}
        handleBlockSelect={
          !(stepState.maxStep < 4)
            ? () => dispatch.setStepState({ id: 6, step: "receipt" })
            : undefined
        }
      >
        <DataTable
          endPoint={ApiService.getPaginatenPOs}
          columns={columnsForContracts()}
          tableSize="small"
          settedFilters={`&customer_id=${client.id}`}
        />
      </CollapseWrapper>

      {isOpenModal &&
        createPortal(
          <FindThirdPerson handleClick={() => setIsModalOpen(false)} />,
          document.body
        )}
    </div>
  );
}

export default ContractCollapsesList;
