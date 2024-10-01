import { Switch } from "antd";
import { useState } from "react";


function UsualSwitch({title, className, switchFirst}:{title: string, className?: string, switchFirst?: boolean}) {
  const [turnOn, setTurnOn] = useState(false);
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    if(checked) setTurnOn(true)
    if(!checked) setTurnOn(false)
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
