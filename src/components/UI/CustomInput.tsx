import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SVGComponent from "./SVGComponent";
import { ChangeEvent } from "react";
import ValidationError from "./ValidationError";
import { Controller } from "react-hook-form";
// @ts-nocheck
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
  onBlur?: any;
  errorMsg?: string | undefined;
  control?: any;
  showTime?: boolean | undefined;
  containedLabel?: string;
  isDisabled?: boolean
}

const CustomInput = ({
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
  onBlur,
  errorMsg,
  control,
  showTime,
  containedLabel,
  isDisabled
}: ICustomInput) => {
  const dateFormatList = ["DD/MM/YYYY", "YYYY-MM-DD"]
  dayjs.extend(customParseFormat);


  function hanlderChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    handleChange && handleChange({id: id? id : '', title: name, value: event.target.value})
  }

  if(control) {
    
  return (
    <div className={`flex flex-col gap-[8px] ${type === 'textarea' ? '' : label ? "justify-center" : "justify-end" } text-black text-[14px] grow`}>
      {type === "date" && control ? (
        <>
          {label && <label htmlFor={name} className={`font-bold ${labelStyles}`}>
            {label}
          </label>}
          <ValidationError errMsg={errorMsg}/>
          <Controller
            name={name}
            control={control}
            render={({field}) => {              
              const handleDateChange = (value:string) => {
                const formattedDate = dayjs(value, 'ddd, DD MMM YYYY HH:mm:ss [GMT]', 'en', true).format('YYYY-MM-DD');
                field.onChange(formattedDate);
                handleChange && handleChange({title: name, value: value });
              };
              return (
                <>{containedLabel && <label className="w-fit relative top-[16px] left-2 text-[10px]  rounded-xl bg-white px-[4px]">{containedLabel}</label>}
                  <DatePicker
                    format={dateFormatList}
                    className={className}
                    showTime={showTime}
                    suffixIcon={
                      <i>
                        <SVGComponent title="calendar" />
                      </i>
                    }
                    onChange={handleDateChange}
                    placeholder="dd/mm/yyyy"
                    // @ts-ignore
                    value={value ? dayjs(value, 'YYYY-MM-DD') : field.value ? dayjs(field.value, 'DD/MM/YYYY') : ''}
                    required={required}
                    disabled={isDisabled}
                  />
                </>
              )
            }}/>          
        </>
      ) : type === "textarea" ? (
        <>
        {label && <label htmlFor={name} className={`font-bold ${labelStyles ? labelStyles : ''}`}>
          {label}
        </label>}
        <ValidationError errMsg={errorMsg}/>
        <Controller
            name={name}
            control={control}
            defaultValue={value}
            render={({field}) => {              
              const handleInputChange = (value:string) => {
                field.onChange(value);
                handleChange && handleChange({title: name, value: value });
              };
              return ( 
              <>              
                {containedLabel && <label className="w-fit relative top-[16px] left-2 text-[10px]  rounded-xl bg-white px-[4px]">{containedLabel}</label>}
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
                  onChange={(e) => handleInputChange(e.target.value)}
                  onBlur={onBlur}
                  value={field.value}
                  maxLength={maxLength}
                  disabled={isDisabled}
                />
              </>
            )}}/>         
      </>
      ) : (
        <>
          {label && <label htmlFor={name} className={`font-bold ${labelStyles ? labelStyles : ''}`}>
            {label}
          </label>}
          <ValidationError errMsg={errorMsg}/>
          <Controller
            name={name}
            control={control}
            defaultValue={value}
            render={({field}) => {              
              const handleInputChange = (value:string) => {
                field.onChange(value);
                handleChange && handleChange({title: name, value: value });
              };
              return (
                <>
                  {containedLabel && <label className="w-fit relative top-[16px] left-2 text-[10px]  rounded-xl bg-white px-[4px]">{containedLabel}</label>}
                  <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    required={required}
                    className={`h-[32px] px-[11px] py-[4px] border-[1px] border-lombard-borders-grey rounded-md placeholder:text-lombard-borders-grey ${
                      className ? className : ""
                    }`}
                    autoComplete="off"
                    onClick={onClick}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={onBlur}
                    value={field.value}
                    maxLength={maxLength}
                    disabled={isDisabled}
                    onWheel={type === 'number' ? (e: React.WheelEvent<HTMLInputElement>) => (e.target as HTMLInputElement).blur():() => {}}
                  />
                  </>
              )}}/>          
        </>
      )}
    </div>
  );

  } else {
    
  return (
    <div className={`flex flex-col gap-[8px] ${type === 'textarea' ? '' : label ? "justify-center" : "justify-end" } text-black text-[14px] grow`}>
      {type === "date" ? (
        <div className="relative">
          {label && <label htmlFor={name} className={`font-bold ${labelStyles}`}>
            {label}
          </label>}
          <ValidationError errMsg={errorMsg}/>
          {containedLabel && <label className="w-fit absolute bottom-6 left-2 text-[10px]  rounded-xl bg-white px-[4px]">{containedLabel}</label>}
          
            <DatePicker
              format={dateFormatList}
              className={className}
              suffixIcon={
                <i>
                  <SVGComponent title="calendar" />
                </i>
              }
              onChange={hanlderChange}
              placeholder="Выберите дату"
              value={null}
              required={required}
            /> 
        </div>
      ) : type === "textarea" ? (
        <div className="relative">
        {label && <label htmlFor={name} className={`font-bold ${labelStyles ? labelStyles : ''}`}>
          {label}
        </label>}
        {containedLabel && <label className="w-fit absolute bottom-6 left-2 text-[10px]  rounded-xl bg-white px-[4px]">{containedLabel}</label>}

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
          value={value? value : ''}
          maxLength={maxLength}
        />
      </div>
      ) : (
        <div className="relative flex flex-col">
          {label && <label htmlFor={name} className={`font-bold ${labelStyles ? labelStyles : ''}`}>
            {label}
          </label>}
          {containedLabel && <label className="w-fit absolute bottom-6 left-2 text-[10px]  rounded-xl bg-white px-[4px]">{containedLabel}</label>}

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
            autoComplete="off"
            onClick={onClick}
            onChange={hanlderChange}
            onBlur={onBlur}
            value={value? value : ''}
            maxLength={maxLength}
            onWheel={type === 'number' ? (e: React.WheelEvent<HTMLInputElement>) => (e.target as HTMLInputElement).blur():() => {}}
          />
        </div>
      )}
    </div>
  );
  }
}

export default CustomInput;
