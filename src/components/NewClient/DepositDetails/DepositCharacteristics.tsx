import ButtonComponent from "../../UI/ButtonComponent";
import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import { useState } from "react";

function DepositCharacteristics({
  closeHandler,
  id,
  submitInputData
}: {
  id: string
  closeHandler: () => void;
  submitInputData: (data: {[key:string]: string | string[]}) => void
}) {
  const [depositCommentForm, setDepositCommentForm ] = useState<{[key:string]:string | string[]}>({});
  function submitCharacteristics() {
    const inputsData = {...depositCommentForm}
    inputsData.id = id
    submitInputData(inputsData)
    console.log(inputsData)
    closeHandler();
  }
  function handleInputChange(inputData: {id?: string, title: string, value: string | string[]}) {
    setDepositCommentForm(prev => ({...prev, [inputData.title]: inputData.value}))
    console.log(depositCommentForm)
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="mb-4 font-bold text-black border-b-2 border-lombard-borders-grey">
        Характеристика залога
      </p>
      <div className="flex gap-6">
        <DropDown
          title="Выбрать"
          listOfItems={[
            { label: "Золото", key: 1, enumvalue: "GOLD" },
            { label: "Серебро", key: 2, enumvalue: "SILVER"  },
          ]}
          triggerType="click"
          name="creditType"
          label="Тип"
          value={!Array.isArray(depositCommentForm?.creditType) ? depositCommentForm?.creditType : ''}
          handleSelect={handleInputChange}
        />
        <DropDown
          title="Выбрать"
          listOfItems={[
            { label: "583", key: 1, enumvalue: "583" },
            { label: "585", key: 2, enumvalue: "585" },
          ]}
          triggerType="click"
          name="quality"
          label="Проба"
          value={!Array.isArray(depositCommentForm?.quality) ? depositCommentForm?.quality : ''}
          handleSelect={handleInputChange}
        />
        <CustomInput
          type="number"
          name="totalWeight"
          label="Общ. Грам"
          placeholder="0"
          value={!Array.isArray(depositCommentForm?.totalWeight) ? depositCommentForm?.totalWeight : ''}
          handleChange={handleInputChange}
        />
        <CustomInput
          type="number"
          name="pureWeight"
          label="Чис. Грам"
          placeholder="0"
          value={!Array.isArray(depositCommentForm?.pureWeight) ? depositCommentForm?.pureWeight : ''}
          handleChange={handleInputChange}
        />
      </div>
      <CustomInput
        type="textarea"
        name="comments"
        label="Комментарии"
        placeholder="Комментарии"
        className="h-[105px]"
        value={!Array.isArray(depositCommentForm?.comments) ? depositCommentForm?.comments : ''}
        handleChange={handleInputChange}
      />
      <div className="flex self-end gap-2">
        <ButtonComponent
          titleBtn="Отмена"
          color="bg-lombard-btn-grey"
          className="text-lombard-text-black"
          clickHandler={closeHandler}
        />
        <ButtonComponent
          titleBtn="Сохранить"
          color="bg-lombard-btn-green"
          clickHandler={submitCharacteristics}
        />
      </div>
    </div>
  );
}

export default DepositCharacteristics;
