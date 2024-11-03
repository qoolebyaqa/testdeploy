import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ValidationError from "./ValidationError";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import SVGComponent from "./SVGComponent";

interface ITimeDate {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  labelStyles?: string;
  value?: string;
  handleChange?: ({id, title, value}: {id?: string, title:string, value: string | string[]}) => void | {}
  errorMsg?: string | undefined;
  control?: any;
}

const TimeDatePicker = ({
  name,
  label,
  required,
  className,
  labelStyles,
  handleChange,
  errorMsg,
  control
}: ITimeDate) => {
  const dateFormatList = ["ddd, DD MMM YYYY HH:mm:ss [GMT]"]
  dayjs.extend(customParseFormat);
    
  return (
    <div className={`flex flex-col gap-[8px] ${label ? "justify-center" : "justify-end" } text-black text-[14px] grow`}>
      {label && <label htmlFor={name} className={`font-bold ${labelStyles}`}>
        {label}
      </label>}
      <ValidationError errMsg={errorMsg}/>
      <Controller
        name={name}
        control={control}
        render={({field}) => {              
          const handleDateChange = (value:string) => {
            const formattedDate = dayjs(value).unix() * 1000
            field.onChange(formattedDate);
            handleChange && handleChange({title: name, value: value });
          };
          return (
            <DatePicker
              format={dateFormatList}
              className={className}
              showTime
              suffixIcon={
                <i>
                  <SVGComponent title="calendar" />
                </i>
              }
              onChange={handleDateChange}
              placeholder="dd/mm/yyyy"
              // @ts-ignore
              value={dayjs(field.value)}
              required={required}
            />
          )
        }}/> 
      </div>
  )
}

export default TimeDatePicker;