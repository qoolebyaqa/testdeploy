import { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import ValidationError from "./ValidationError";

interface IPassportInputs {
  name: string;
  handleChange?: ({
    id,
    title,
    value,
  }: {
    id?: string;
    title: string;
    value: string | string[];
  }) => void;
  seriesVal?: string;
  passNum?: string;
  required?: boolean;
  control?: any;
  errorMsg?: string | undefined;
}

function PassportInputs({
  name,
  handleChange,
  seriesVal,
  passNum,
  required,
  control,
  errorMsg
}: IPassportInputs) {
  function hanlderChange(event: ChangeEvent<HTMLInputElement>, field: string) {
    handleChange &&
      event.target.value.length < 8 &&
      handleChange({ title: field, value: event.target.value });
  }
  if (control) {
    return (
      <div className="flex flex-col gap-[8px] justify-center text-black text-[14px]">
        <label htmlFor={name} className="font-bold text-black">
          Серия и номер паспорта
        </label>
        <ValidationError errMsg={errorMsg}/>
        <div className="flex justify-end  h-[32px]">
          <Controller
            name="passport_series"
            control={control}
            defaultValue={seriesVal}
            render={({ field }) => {
              const handleOnChange = (value: string) => {
                field.onChange(value);
                handleChange &&
                  handleChange({ title: "passport_series", value: value });
              };
              return (
                <input
                  type="text"
                  name="passport_series"
                  id={name + "1"}
                  placeholder="AA"
                  required={required}
                  maxLength={2}
                  value={
                    seriesVal !== undefined ? seriesVal : field.value || ""
                  }
                  className="border-[1px] rounded-md border-lombard-borders-grey placeholder:text-lombard-borders-grey w-10 mr-2 px-[8px]"
                  onChange={(e) => handleOnChange(e.target.value)}
                />
              );
            }}
          />
          <Controller
            name="passport_number"
            control={control}
            defaultValue={passNum}
            render={({ field }) => {
              const handleOnChange = (value: string) => {
                field.onChange(value);
                handleChange &&
                  handleChange({ title: "passport_number", value: value });
              };
              return (
                <input
                  type="number"
                  name="passport_number"
                  id={name + "2"}
                  placeholder="123456789"
                  required={required}
                  value={passNum ? passNum : ""}
                  className="border-[1px] rounded-md border-lombard-borders-grey placeholder:text-lombard-borders-grey px-[11px] w-11/12"
                  onChange={(e) => handleOnChange(e.target.value)}
                  onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                    (e.target as HTMLInputElement).blur()
                  }
                />
              );
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-[8px] justify-center text-black text-[14px]">
        <label htmlFor={name} className="font-bold text-black">
          Серия и номер паспорта
        </label>
        <div className="flex justify-end  h-[32px]">
          <input
            type="text"
            name="passport_series"
            id={name + "1"}
            placeholder="AA"
            required={required}
            maxLength={2}
            value={seriesVal ? seriesVal : ""}
            className="border-[1px] rounded-md border-lombard-borders-grey placeholder:text-lombard-borders-grey w-10 mr-2 px-[8px]"
            onChange={(e) => hanlderChange(e, "passport_series")}
          />
          <input
            type="number"
            name="passport_number"
            id={name + "2"}
            placeholder="123456789"
            required={required}
            value={passNum ? passNum : ""}
            className="border-[1px] rounded-md border-lombard-borders-grey placeholder:text-lombard-borders-grey px-[11px] w-11/12"
            onChange={(e) => hanlderChange(e, "passport_number")}
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              (e.target as HTMLInputElement).blur()
            }
          />
        </div>
      </div>
    );
  }
}

export default PassportInputs;
