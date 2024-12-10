import { Switch } from "antd";
import { useEffect, useState } from "react";
import ValidationError from "./ValidationError";
import { Controller } from "react-hook-form";

interface IUsualSwitchProps {
  title: string;
  className?: string;
  name: string;
  onSwitchChange?: (checked: boolean) => void;
  shouldBeDisabled?: boolean | undefined;
  errorMsg?: string;
  control?: any;
  defaultSelected?: boolean | undefined
}

function UsualSwitch({
  title,
  name,
  className,
  onSwitchChange,
  shouldBeDisabled,
  errorMsg,
  control,
  defaultSelected,
}: IUsualSwitchProps) {
  const [turnOn, setTurnOn] = useState(defaultSelected);
  const onChange = (checked: boolean) => {
    setTurnOn(checked);
    if (onSwitchChange) {
      onSwitchChange(checked);
    }
  };
  
  useEffect(() => {
    setTurnOn(defaultSelected);
  }, [defaultSelected]);
  
  if (control) {
    return (
      <div className={`flex flex-col mr-4 ${className ? className : ""}`}>
        <div className="flex">
          <Controller
            name={name}
            disabled={shouldBeDisabled}
            control={control}
            render={({ field }) => {
              const handleSwitch = (val: any) => {
                field.onChange(val);
                onChange(val);
              };
              return (
                <Switch onChange={handleSwitch} disabled={shouldBeDisabled} checked={turnOn} />
              );
            }}
          />
          <p
            className={`${
              !turnOn ? "text-lombard-borders-grey" : "text-lombard-text-black"
            } font-bold text-sm mx-2`}
          >
            {title}
          </p>
        </div>
        <ValidationError errMsg={errorMsg} />
      </div>
    );
  } else {
    return (
      <div className={`flex flex-col mr-4 ${className ? className : ""}`}>
        <div className="flex">
          <label htmlFor={name}/>
          <Switch onChange={onChange} disabled={shouldBeDisabled} />
          <p
            className={`${
              !turnOn ? "text-lombard-borders-grey" : "text-lombard-text-black"
            } font-bold text-sm mx-2`}
          >
            {title}
          </p>
        </div>
        <ValidationError errMsg={errorMsg} />
      </div>
    );
  }
}

export default UsualSwitch;
