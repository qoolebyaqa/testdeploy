function PassportInputs({name} : {name: string}) {
  return ( 
  <div className="flex flex-col gap-[8px] justify-center text-black text-[14px]">
    <label htmlFor={name} className="font-bold text-black">
      Серия и номер паспорта
    </label>
    <div className="flex justify-end  h-[41px]">
      <input
        type="text"
        name={name}
        id={name+'1'}
        placeholder="AA"
        required
        maxLength={2}
        className="border-[1px] rounded-md border-lombard-borders-grey placeholder:text-lombard-borders-grey w-10 mr-2 px-[8px]"
      />
      <input
        type="text"
        name={name}
        id={name+'2'}
        placeholder="123456789"
        required
        className="border-[1px] rounded-md border-lombard-borders-grey placeholder:text-lombard-borders-grey px-[11px] w-11/12"
      />
    </div>
  </div> );
}

export default PassportInputs;