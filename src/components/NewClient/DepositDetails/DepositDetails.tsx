import { ReactNode } from "react";
import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import DepositSwitch from "./DepositSwitch";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";
import DepositItem from "./DepositItem";
import Deal from "./Deal";

interface DepositFrameProps {
  title: string;
  contractN?: string;
  children: ReactNode;
  /* step: number; */
}

export const DepositFrame: React.FC<DepositFrameProps> = ({
  title,
  contractN,
  /* step, */
  children,
}) => {
  return (
    <div
      className={`mx-4 bg-white rounded-2xl w-full p-[18px] font-bold text-black focus-within:border-lombard-main-blue focus-within:border-2`}
    >
      <div className="flex justify-between border-b-[1px]">
        <h3 className="py-4 text-[18px]">{title}</h3>
        {contractN && (
          <p className="text-[#D2DBE1] font-medium text-[14px]">
            Договор № <b className="text-[black] font-bold text-[15px]">{contractN}</b>
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

function DepositDetails() {
  const formDepositItems = useAppSelector(state => state.clientStore.depositCommentForm)

  return (
    <div className="flex flex-col gap-3 w-[80vw] pr-4">
      <DepositFrame title="Договоры" contractN="10/2998">
        <Deal />
      </DepositFrame>
      <DepositFrame title="Залог" contractN="10/2998" /* step={1} */>
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
      </DepositFrame>
      <DepositFrame title="Выдача кредита" /* step={2} */ contractN="10/2998">
        <div className="flex gap-2  my-5">
          <CustomInput
            type="date"
            name="dateIssue"
            label="Дата выдачи"
            defaultValue={new Date().toLocaleDateString()}
          />
          <CustomInput
            type="date"
            name="datePayment"
            label="Дата оплаты"
            defaultValue={new Date().toLocaleDateString()}
          />
          <CustomInput
            type="number"
            name="creditSum"
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
        <div className="bg-lombard-borders-grey flex h-[95px] my-2 rounded-lg gap-3 px-3">
          <CustomInput
            type="number"
            name="bank1"
            label="Банк"
            placeholder="0"
          />
          <CustomInput
            type="number"
            name="bank2"
            label="Банк"
            placeholder="0"
          />
          <CustomInput
            type="number"
            name="bank3"
            label="UzCard/Humo"
            placeholder="0"
          />
          <CustomInput
            type="number"
            name="bank4"
            label="Наличные"
            placeholder="0"
          />
        </div>
      </DepositFrame>
    </div>
  );
}

export default DepositDetails;
