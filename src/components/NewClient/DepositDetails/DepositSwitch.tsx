import { Switch } from "antd";


function DepositSwitch({title, className}:{title: string, className?: string}) {

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className={`flex ${className ? className : ''}`}>
      <p className="text-gray-600 font-bold text-sm mx-2">{title}</p>
      <Switch onChange={onChange} />
    </div>
  );
}

export default DepositSwitch;
