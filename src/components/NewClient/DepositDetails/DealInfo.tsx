import { useForm } from "react-hook-form";
import CustomInput from "../../UI/CustomInput";

function DealInfo() {  
  const {
    control,
    /* setValue, */
  } = useForm({
    mode: "onChange"
  });

  return ( <div className="my-4">
    <div className="flex gap-x-4">
      <CustomInput type="date" name="dealDate" label="Дата выдачи" control={control}/>
      <CustomInput type="date" name="dealEndDate" label="Дата окончания" control={control}/>      
      <CustomInput type="date" name="dealNextPaymentDate" label="Дата след. оплаты" control={control}/>
      <CustomInput type="number" name="dealSumNextPayment" label="Сумма след. оплаты" placeholder="20 000 000" control={control}/>
    </div>
    <div className="flex gap-6 justify-between">
      <div className="flex w-2/3">
        <CustomInput type="number" name="creditSum" label='Сумма кредита' placeholder="0" control={control} className="max-w-[200px]"/>
        <CustomInput type="number" name="restSum" label='Остаток' placeholder="0" control={control} className="max-w-[200px]"/>
        <CustomInput type="number" name="percent" label='Процент' placeholder="0" control={control} className="max-w-[200px]"/>
        <CustomInput type="number" name="fees" label='Пеня' placeholder="0" control={control} className="max-w-[200px]"/>
      </div>
      <div className="flex w-1/3 gap-2 justify-end">
        <CustomInput type="number" name="percentRate" label='Процентная ставка' placeholder="0" control={control} className="max-w-[180px]"/>
        <CustomInput type="number" name="delayRate" label='Ставка просрочки' placeholder="0" control={control} className="max-w-[180px]"/>
      </div>
    </div>
  </div> );
}

export default DealInfo;