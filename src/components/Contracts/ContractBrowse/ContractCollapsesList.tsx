import { Table } from "antd";
import CollapseWrapper from "../../UI/CollapseWrapper";
import { columnsForContracts, dataContracts } from "../../../helpers/fnHelpers";
import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import DottedBtn from "../../NewClient/DepositDetails/DottedBtn";

function ContractCollapsesList() {
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
        <div className="flex flex-col gap-[8px] pb-2">
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
          <div className="flex flex-row gap-[10px]">
            <DropDown
              title={"Наличные"}
              listOfItems={[
                { label: "Золото", key: 1 },
                { label: "МТО", key: 2 },
              ]}
              name={"type of payment"}
              label="Тип оплаты"
              className="h-[41px]"
            />
            <CustomInput
              type="number"
              name={"amount of payment"}
              label="Сумма оплаты"
              placeholder="16 000 000"
              className="  placeholder:text-[#3B3B3B]"
            />
            <div className="mt-[5.5px]">
              <DottedBtn id={"payment"} />
            </div>
          </div>
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
