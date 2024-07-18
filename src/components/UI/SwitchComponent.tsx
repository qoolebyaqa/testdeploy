import { useState } from "react";
interface ISwitchProps {
  selectedDefaultTitle: string, 
  selectedStyles: string, 
  unselectedTitle: string, 
  unselectedStyles: string,
  inputName: string,
}

function SwitchComponent({selectedDefaultTitle, selectedStyles, unselectedTitle, unselectedStyles, inputName}: ISwitchProps) {
  const [isActive, setIsActive] = useState(true);
  return (
    <>
      <div className="hidden">
        <label htmlFor={inputName}>
          <input type="checkbox" name={inputName} id={inputName} checked={isActive} onChange={() => {}}/>
          <input type="checkbox" name={inputName} id={inputName + '1'} checked={!isActive} onChange={() => {}}/>
        </label>
      </div>
      <div className="flex justify-center w-full">
        <button className={`rounded-l-xl w-2/4 ${isActive ? selectedStyles : unselectedStyles}`} onClick={() => setIsActive(true)}>{selectedDefaultTitle}</button>
        <button className={`rounded-r-xl w-2/4 ${!isActive ? selectedStyles : unselectedStyles}`}  onClick={() => setIsActive(false)}>{unselectedTitle}</button>
      </div>
    </>
  );
}

export default SwitchComponent;
