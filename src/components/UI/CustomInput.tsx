import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SVGComponent from "./SVGComponent";

interface ICustomInput {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
  labelStyles?: string;
  value?: string;
  onChange?: () => void;
  onClick?: () => void;
  onBlur?: () => void;
}

function CustomInput({
  type,
  name,
  label,
  required,
  placeholder,
  defaultValue,
  className,
  labelStyles,
  value,
  onChange,
  onClick,
  onBlur
}: ICustomInput) {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  dayjs.extend(customParseFormat);
  return (
    <div className="flex flex-col gap-1 justify-center text-black text-[14px]">
      {type === "date" ? (
        <>
          {label && <label htmlFor={name} className={`font-bold ${labelStyles}`}>
            {label}
          </label>}
          <DatePicker
            defaultValue={dayjs(defaultValue, dateFormatList[0])}
            format={dateFormatList}
            suffixIcon={
              <i>
                <SVGComponent title="calendar" />
              </i>
            }
          />
        </>
      ) : (
        <>
          {label && <label htmlFor={name} className={`font-bold ${labelStyles}`}>
            {label}
          </label>}
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required={required}
            className={`h-[31px] px-[11px] py-[4px] border-[1px] border-lombard-borders-grey rounded-md placeholder:text-lombard-borders-grey ${
              className ? className : ""
            }`}
            onClick={onClick}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        </>
      )}
    </div>
  );
}

export default CustomInput;
