import { DatePicker } from "antd";
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SVGComponent from "./SVGComponent";
import { ChangeEvent, useState } from "react";

interface ICustomInput {
  id?: string;
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
  labelStyles?: string;
  value?: string;
  maxLength?: number;
  handleChange?: ({id, title, value}: {id?: string, title:string, value: string | string[]}) => void | {}
  onClick?: () => void;
  onBlur?: () => void;
}

function CustomInput({
  id,
  type,
  name,
  label,
  required,
  placeholder,
  defaultValue,
  className,
  labelStyles,
  value,
  maxLength,
  handleChange,
  onClick,
  onBlur
}: ICustomInput) {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY", "DD.MM.YY"];
  dayjs.extend(customParseFormat);

  const [inputVal, setInputVal] = useState('')

  function hanlderChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    setInputVal(event.target.value)
    handleChange && handleChange({id: id? id : '', title: name, value: event.target.value})
  }
  const handleDate = (_date:Dayjs, dateString: string | string[]) => {
    handleChange && handleChange({id: id? id : '', title: name, value: dateString})
  };
  return (
    <div className={`flex flex-col gap-[8px] ${type === 'textarea' ? '' : label ? "justify-center" : "justify-end" } text-black text-[14px] grow`}>
      {type === "date" ? (
        <>
          {label && <label htmlFor={name} className={`font-bold ${labelStyles}`}>
            {label}
          </label>}
          <DatePicker
            format={dateFormatList}
            className={className}
            suffixIcon={
              <i>
                <SVGComponent title="calendar" />
              </i>
            }
            onChange={handleDate}
            placeholder="Выберите дату"
            value={value ? dayjs(value, dateFormatList[0]) : null}
            required={required}
          />
        </>
      ) : type === "textarea" ? (
        <>
        {label && <label htmlFor={name} className={`font-bold ${labelStyles ? labelStyles : ''}`}>
          {label}
        </label>}
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
          className={`px-[11px] py-[4px] border-[1px] border-lombard-borders-grey rounded-md placeholder:text-lombard-borders-grey ${
            className ? className : ""
          }`}
          onClick={onClick}
          onChange={hanlderChange}
          onBlur={onBlur}
          value={value? value : inputVal}
          maxLength={maxLength}
        />
      </>
      ) : (
        <>
          {label && <label htmlFor={name} className={`font-bold ${labelStyles ? labelStyles : ''}`}>
            {label}
          </label>}
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required={required}
            className={`h-[32px] px-[11px] py-[4px] border-[1px] border-lombard-borders-grey rounded-md placeholder:text-lombard-borders-grey ${
              className ? className : ""
            }`}
            onClick={onClick}
            onChange={hanlderChange}
            onBlur={onBlur}
            value={value? value : inputVal}
            maxLength={maxLength}
            onWheel={type === 'number' ? (e: React.WheelEvent<HTMLInputElement>) => (e.target as HTMLInputElement).blur():() => {}}
          />
        </>
      )}
    </div>
  );
}

export default CustomInput;
