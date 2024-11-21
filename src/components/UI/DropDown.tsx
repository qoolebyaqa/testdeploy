import { Select } from "antd";
import SVGComponent from "./SVGComponent";
import { Controller } from "react-hook-form";
import { clientFormValue } from "../../helpers/validator";
import ValidationError from "./ValidationError";

interface ISelect {
  label: string;
  enumvalue?: string | number;
  key: number;
  additionalInfo?: {}
}

interface IDropDownProps {
  title?: string;
  listOfItems: ISelect[];
  className?: string;
  label?: string;
  containedLabel?: string;
  name: string;
  value?: string;
  control?: any;
  errorMsg?: string;
  isDisabled?: boolean;
  handleSelect?: ({
    id,
    title,
    value,
  }: {
    id?: string;
    title: string;
    value: string | string[];
  }) => void | {};
}

const DropDown = ({
  title,
  listOfItems,
  className,
  label,
  containedLabel,
  name,
  value,
  control,
  errorMsg,
  isDisabled,
  handleSelect,
}: IDropDownProps) => {
  const handleOnChange = (value: string) => {
    handleSelect && handleSelect({ title: name, value: value });
  };

  if (control) {
    return (
      <div
        className={`w-full flex flex-col justify-center text-black text-[14px] grow relative ${
          label ? "gap-2" : ""
        } ${
          containedLabel ? "mt-6" : ""
        }`}
      >
        {label && <label
          htmlFor={name}
          className="font-bold text-black text-[14px] relative"
        >
          {label}
        </label>} 
        <ValidationError errMsg={errorMsg}/>
        <Controller
          name={name as keyof clientFormValue}
          control={control}
          defaultValue={value}
          disabled={isDisabled}
          render={({ field }) => {
            const handleOnChange = (value:string) => {
              field.onChange(value);
              handleSelect && handleSelect({title: name, value: value });
            };
            return (
              <>
              {containedLabel && <label className="w-fit absolute z-10 bottom-6 left-2 text-[10px]  rounded-xl bg-white px-[4px]">{containedLabel}</label>}
                <Select
                  disabled={isDisabled}
                  onChange={handleOnChange}
                  value={field.value}
                  placeholder={title}
                  suffixIcon={<SVGComponent title="arrow"/>}
                >
                  {listOfItems.map((select) => (
                    <Select.Option value={select.enumvalue} key={select.key}>
                      {select.label}
                    </Select.Option>
                  ))}
                </Select>
              </>
            );
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`min-w-40 flex flex-col justify-center text-black text-[14px] grow relative ${
          label ? "gap-2" : ""
        }`}
      >
        <label
          htmlFor={name}
          className="font-bold text-black text-[14px] relative"
        >
          {label}
        </label>
        {containedLabel && <label className="w-fit absolute z-10 bottom-6 left-2 text-[10px] rounded-xl bg-white px-[4px]">{containedLabel}</label>}
        <Select
          onChange={handleOnChange}
          value={value}
          placeholder={title}
          className={className}
          suffixIcon={<SVGComponent title="arrow"/>}
        >
          {listOfItems.map((select) => (
            <Select.Option value={select.enumvalue} key={select.key}>
              {select.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
};

export default DropDown;
