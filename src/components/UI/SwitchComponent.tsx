import { useState } from "react";
import { Controller } from "react-hook-form";
interface ISwitchProps {
  selectedDefaultTitle: string;
  selectedStyles: string;
  unselectedTitle: string;
  unselectedStyles: string;
  inputHandler?: ({
    id,
    title,
    value,
  }: {
    id?: string;
    title: string;
    value: string | string[];
  }) => void;
  inputName: string;
  currentSelect?: string;
  control?: any;
}

function SwitchComponent({
  selectedDefaultTitle,
  selectedStyles,
  unselectedTitle,
  unselectedStyles,
  inputName,
  inputHandler,
  currentSelect,
  control,
}: ISwitchProps) {
  const [isActive, setIsActive] = useState(currentSelect === "FEMALE"); //todo: delete after register in form

  function handler(newValue: string, bool: boolean) { //todo: delete after register in form
    if (inputHandler) {
      inputHandler({ title: "gender", value: newValue });
    }
    setIsActive(bool);
  }
  if (control) {
    return (
      <>
        <div>
          <label htmlFor={inputName}>
            <Controller
              name={inputName}
              control={control}
              render={({ field: { onChange } }) => {
                const handleSwitch = (newGender: string) => {
                  onChange(newGender);
                  inputHandler &&
                    inputHandler({ title: "gender", value: newGender });
                };
                const isActive = currentSelect === "FEMALE";
                return (
                  <>
                    <input
                      type="hidden"
                      name={inputName}
                      id={inputName}
                      value={isActive ? "MALE" : "FEMALE"}
                      onChange={(e) => onChange(e.target.value)}
                    />
                    <div className="flex justify-center w-full">
                      <button
                        className={`rounded-l-xl w-2/4 ${
                          isActive ? unselectedStyles : selectedStyles
                        }`}
                        onClick={() => handleSwitch("MALE")}
                        type="button"
                      >
                        {unselectedTitle}
                      </button>
                      <button
                        className={`rounded-r-xl w-2/4 ${
                          isActive ? selectedStyles : unselectedStyles
                        }`}
                        onClick={() => handleSwitch("FEMALE")}
                        type="button"
                      >
                        {selectedDefaultTitle}
                      </button>
                    </div>
                  </>
                );
              }}
            />
          </label>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="hidden">
          <label htmlFor={inputName}>
            <input
              type="checkbox"
              name={inputName}
              id={inputName}
              checked={isActive}
              onChange={() => {}}
            />
            <input
              type="checkbox"
              name={inputName}
              id={inputName + "1"}
              checked={!isActive}
              onChange={() => {}}
            />
          </label>
        </div>
        <div className="flex justify-center w-full">
          <button
            className={`rounded-l-xl w-2/4 ${
              isActive ? selectedStyles : unselectedStyles
            }`}
            onClick={() => handler("FEMALE", true)}
            type="button"
          >
            {selectedDefaultTitle}
          </button>
          <button
            className={`rounded-r-xl w-2/4 ${
              !isActive ? selectedStyles : unselectedStyles
            }`}
            onClick={() => handler("MALE", false)}
            type="button"
          >
            {unselectedTitle}
          </button>
        </div>
      </>
    );
  }
}

export default SwitchComponent;
