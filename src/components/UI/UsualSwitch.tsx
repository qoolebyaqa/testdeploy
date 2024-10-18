import { Switch } from "antd";
import { useState } from "react";

interface IUsualSwitchProps {
  title: string;
  className?: string;
  switchFirst?: boolean;
  onSwitchChange?: (checked: boolean) => void;
}

function UsualSwitch({title, className, switchFirst, onSwitchChange}:IUsualSwitchProps) {
  const [turnOn, setTurnOn] = useState(false);
  const onChange = (checked: boolean) => {
    setTurnOn(checked);
    if (onSwitchChange) {
      onSwitchChange(checked);
    }
  };
  if (switchFirst) {
    return (
      <div className={`flex ${className ? className : ''}`}>
      <Switch onChange={onChange} />
      <p className={`${!turnOn ? 'text-lombard-borders-grey' : 'text-lombard-text-black'} font-bold text-sm mx-2`}>{title}</p>
    </div>
    )
  }
  return (
    <div className={`flex ${className ? className : ''}`}>
      <p className={`${!turnOn ? 'text-lombard-borders-grey' : 'text-lombard-text-black'} font-bold text-sm mx-2`}>{title}</p>
      <Switch onChange={onChange} />
    </div>
  );
}

export default UsualSwitch;
