import { useState } from "react";
interface ISwitchProps {
  selectedDefaultTitle: string, 
  selectedStyles: string, 
  unselectedTitle: string, 
  unselectedStyles: string,
  inputHandler?: (bool: boolean) => void,
  inputName: string,
}

function SwitchComponent({selectedDefaultTitle, selectedStyles, unselectedTitle, unselectedStyles, inputName, inputHandler}: ISwitchProps) {
  const [isActive, setIsActive] = useState(true);

  function handler (newValue: boolean, bool: boolean) {
    if(inputHandler) {
      inputHandler(newValue)
    }
    setIsActive(bool);
  }
  return (
    <>
      <div className="hidden">
        <label htmlFor={inputName}>
          <input type="checkbox" name={inputName} id={inputName} checked={isActive} onChange={() => {}}/>
          <input type="checkbox" name={inputName} id={inputName + '1'} checked={!isActive} onChange={() => {}}/>
        </label>
      </div>
      <div className="flex justify-center w-full gap-[10px]">
        <button className={`rounded-l-xl w-2/4 ${isActive ? selectedStyles : unselectedStyles}`} onClick={() => handler(true, true)}>{selectedDefaultTitle}</button>
        <button className={`rounded-r-xl w-2/4 ${!isActive ? selectedStyles : unselectedStyles}`}  onClick={() => handler(false, false)}>{unselectedTitle}</button>
      </div>
    </>
  );
}

export default SwitchComponent;
