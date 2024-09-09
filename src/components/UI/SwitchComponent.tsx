import { useState } from "react";
interface ISwitchProps {
  selectedDefaultTitle: string, 
  selectedStyles: string, 
  unselectedTitle: string, 
  unselectedStyles: string,
  inputHandler?: ({id, title, value}: {id?: string, title:string, value: string | string[]}) => void,
  inputName: string,
  currentSelect?: string
}

function SwitchComponent({selectedDefaultTitle, selectedStyles, unselectedTitle, unselectedStyles, inputName, inputHandler, currentSelect}: ISwitchProps) {
  const [isActive, setIsActive] = useState(currentSelect === 'FEMALE');

  function handler (newValue: string, bool: boolean) {
    if(inputHandler) {
      inputHandler({title: 'gender', value: newValue})
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
      <div className="flex justify-center w-full">
        <button className={`rounded-l-xl w-2/4 ${isActive ? selectedStyles : unselectedStyles}`} onClick={() => handler('FEMALE', true)} type="button">{selectedDefaultTitle}</button>
        <button className={`rounded-r-xl w-2/4 ${!isActive ? selectedStyles : unselectedStyles}`}  onClick={() => handler('MALE', false)} type="button">{unselectedTitle}</button>
      </div>
    </>
  );
}

export default SwitchComponent;
