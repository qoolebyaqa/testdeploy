import CustomInput from "../../UI/CustomInput";

function DealInfo() {
  return ( <div className="my-4">
    <div className="flex gap-x-4">
      <CustomInput type="date" name="dealDate" label="Дата выдачи" />
      <CustomInput type="date" name="dealEndDate" label="Дата окончания"/>      
      <CustomInput type="date" name="dealNextPaymentDate" label="Дата след. оплаты"/>
      <CustomInput type="number" name="dealSumNextPayment" label="Сумма след. оплаты" placeholder="20 000 000"/>
    </div>
    <div className="flex gap-x-4">
      <div className="flex">
        <CustomInput type="number" name="creditSum" label='Сумма кредита' placeholder="0"/>
        <CustomInput type="number" name="restSum" label='Остаток' placeholder="0"/>
        <CustomInput type="number" name="percent" label='Процент' placeholder="0"/>
        <CustomInput type="number" name="fees" label='Пеня' placeholder="0"/>
      </div>
      <div className="flex">
        <CustomInput type="number" name="percentRate" label='Процентная ставка' placeholder="0"/>
        <CustomInput type="number" name="delayRate" label='Ставка просрочки' placeholder="0"/>
      </div>
    </div>
  </div> );
}

export default DealInfo;