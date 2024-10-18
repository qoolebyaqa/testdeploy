import { Table } from "antd";
import CollapseWrapper from "../../UI/CollapseWrapper";
import { columnsForContracts, dataContracts } from "../../../helpers/fnHelpers";
import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import DottedBtn from "../../NewClient/DepositDetails/DottedBtn";
import Modals from "./Modals";
import { useState } from "react";
import { createPortal } from "react-dom";

function ContractCollapsesList() {
  const [paymentOptions, setPaymentOptions] = useState([{ id: Math.random().toFixed(8) }]);
  const [isOpenModal,setIsModalOpen] = useState(false)
  function pushIndexToPaymentOptions() {
    let newID = Math.random().toFixed(8);
    while(paymentOptions.map(val => val.id).includes(newID)){
      newID = Math.random().toFixed(8);
    }
    setPaymentOptions(prev => ([...prev, {id: newID}]))
  }
  function deleteFromPaymentOptions(id:string) {
    const filtredIndexes = paymentOptions.filter(item => item.id !== id)
    setPaymentOptions(filtredIndexes);
  }

  function handleAddDataInputsToID(inputData:{[key:string]: string | string[]}) {
    const dataToAdd = {[inputData.title as string]: inputData.value}
    const updatedPaymentOptions = paymentOptions.map((item) => 
    item.id === inputData.id ? {...item, ...dataToAdd} : item);
    setPaymentOptions(updatedPaymentOptions)
    console.log(paymentOptions)
  }

  function handleOpenThirdPeople(){
    setIsModalOpen(true)
    console.log("CollapseWrapper");
    
  }

  return (
    <div className="flex flex-col gap-3 pr-4 w-4/5">
      <CollapseWrapper title="Договоры">
        <Table
          columns={columnsForContracts}
          dataSource={dataContracts}
          pagination={false}
          size="small"
          virtual
          scroll={{ y: 260 - 60 }}
          className="hover:cursor-pointer"
          bordered
          onRow={(_record) => {
            return { onClick: () => {} };
          }}
        />
      </CollapseWrapper>
      <CollapseWrapper title="Залог">
        <></>
      </CollapseWrapper>
      <CollapseWrapper title="Данные сделки">
        <></>
      </CollapseWrapper>
      <CollapseWrapper title="Оплата" page="contract" handleClick={handleOpenThirdPeople}>
        <div className="flex flex-col gap-[8px] pb-12">
          <div className="flex flex-row gap-[10px] justify-start items-start w-[600px]">
            <CustomInput
              type={"date"}
              name={"calendar"}
              label="Дата оплаты"
            />
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
          {paymentOptions.map(item => 
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
              <DottedBtn id={item.id} deleteIndex={deleteFromPaymentOptions} items={paymentOptions} pushNewIndex={pushIndexToPaymentOptions}/>
            </div>
          </div>
          )}          
        </div>
      </CollapseWrapper>
      <CollapseWrapper title="Выписка">
        <Table
          columns={columnsForContracts}
          dataSource={dataContracts}
          pagination={false}
          size="small"
          virtual
          scroll={{ y: 160 - 60 }}
          className="drop-shadow-2xl hover:cursor-pointer"
          bordered
          onRow={(_record) => {
            return { onClick: () => {} };
          }}
        />
      </CollapseWrapper>

      {isOpenModal  && createPortal(<Modals handleClick={() => setIsModalOpen(false)} page={"payment"} />, document.body)}
    </div>
  );
}

export default ContractCollapsesList;
