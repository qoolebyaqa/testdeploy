import { ChangeEvent  } from "react";

interface IPassportInputs {
  name: string;
  handleChange?: ({id, title, value}: {id?: string, title:string, value: string | string[]}) => void;
  seriesVal?: string
  passNum?: string
  required?: boolean
}

function PassportInputs({name, handleChange, seriesVal, passNum, required} : IPassportInputs) {
  function hanlderChange(event: ChangeEvent<HTMLInputElement>, field: string) {
    (handleChange && event.target.value.length < 8) && handleChange({title: field, value: event.target.value})
  }
  return ( 
  <div className="flex flex-col gap-[8px] justify-center text-black text-[14px]">
    <label htmlFor={name} className="font-bold text-black">
      Серия и номер паспорта
    </label>
    <div className="flex justify-end  h-[32px]">
      <input
        type="text"
        name={name}
        id={name+'1'}
        placeholder="AA"
        required={required}
        maxLength={2}
        value={seriesVal ? seriesVal : ''}
        className="border-[1px] rounded-md border-lombard-borders-grey placeholder:text-lombard-borders-grey w-10 mr-2 px-[8px]"
        onChange={(e) => hanlderChange(e, 'passport_series')}
      />
      <input
        type="number"
        name={name}
        id={name+'2'}
        placeholder="123456789"
        required={required}
        value={passNum ? passNum : ''}
        className="border-[1px] rounded-md border-lombard-borders-grey placeholder:text-lombard-borders-grey px-[11px] w-11/12"
        onChange={(e) => hanlderChange(e, 'passport_number')}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) => (e.target as HTMLInputElement).blur()}
      />
    </div>
  </div> );
}

export default PassportInputs;