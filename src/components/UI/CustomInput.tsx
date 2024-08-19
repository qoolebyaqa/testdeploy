import { DatePicker } from "antd";
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
  handleChange?: ({id, title, value}: {id: string, title:string, value: string}) => {}
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
  handleChange,
  onClick,
  onBlur
}: ICustomInput) {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  dayjs.extend(customParseFormat);

  const [inputVal, setInputVal] = useState('')

  function hanlderChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    setInputVal(event.target.value)
    handleChange && handleChange({id: id? id : '', title: name, value: event.target.value})
  }
  return (
    <div className={`flex flex-col gap-[8px] ${label ? "justify-center" : "justify-end"} text-black text-[14px] grow`}>
      {type === "date" ? (
        <>
          {label && <label htmlFor={name} className={`font-bold ${labelStyles}`}>
            {label}
          </label>}
          <DatePicker
            defaultValue={defaultValue && dayjs(defaultValue, dateFormatList[0])}
            format={dateFormatList}
            suffixIcon={
              <i>
                <SVGComponent title="calendar" />
              </i>
            }
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
            className={`h-[41px] px-[11px] py-[4px] border-[1px] border-lombard-borders-grey rounded-md placeholder:text-lombard-borders-grey ${
              className ? className : ""
            }`}
            onClick={onClick}
            onChange={hanlderChange}
            onBlur={onBlur}
            value={value? value : inputVal}
            onWheel={type === 'number' ? (e: React.WheelEvent<HTMLInputElement>) => (e.target as HTMLInputElement).blur():() => {}}
          />
        </>
      )}
    </div>
  );
}

export default CustomInput;
