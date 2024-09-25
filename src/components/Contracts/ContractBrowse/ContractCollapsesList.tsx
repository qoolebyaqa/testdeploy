import { Table } from "antd";
import CollapseWrapper from "../../UI/CollapseWrapper";
import { columnsForContracts, dataContracts } from "../../../helpers/fnHelpers";
import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import DottedBtn from "../../NewClient/DepositDetails/DottedBtn";
import { useState } from "react";

function ContractCollapsesList() {
  const [paymentOptions, setPaymentOptions] = useState([{ id: Math.random().toFixed(8) }]);
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

  return (
    <div className="flex flex-col gap-3 pr-4 w-4/5">
      <CollapseWrapper title="Договоры">
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
      <CollapseWrapper title="Данные сделки">
        <></>
      </CollapseWrapper>
      <CollapseWrapper title="Оплата">
        <div className="flex flex-col gap-[8px] pb-12">
          <div className="flex flex-row gap-[10px] justify-start items-start w-[600px]">
            <CustomInput
              type={"date"}
              name={"calendar"}
              label="Дата оплаты"
              className="h-[41px]"
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
                { label: "Наличные", key: 1, enumValue: "CASH" },
                { label: "Перечисление", key: 2, enumValue: "CARD" },
              ]}
              name={"type of payment"}
              label="Тип оплаты"
              className="h-[41px]"
              handleSelect={handleAddDataInputsToID}
              id={item.id}
            />
            <CustomInput
              type="number"
              name={"amount of payment"}
              label="Сумма оплаты"
              placeholder="16 000 000"
              className="  placeholder:text-[#3B3B3B]"
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
    </div>
  );
}

export default ContractCollapsesList;
