import ButtonComponent from "../../UI/ButtonComponent";
import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import useActions from "../../../helpers/hooks/useActions";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";

function DepositCharacteristics({
  closeHandler,
  id
}: {
  id: string
  closeHandler: () => void;
}) {
  const dispatch = useActions();
  const depositCommentForm = useAppSelector(
    (state) => state.clientStore.depositCommentForm.find(item => item.id === id)
  );
  return (
    <div className="flex flex-col gap-2">
      <p className="mb-4 font-bold text-black border-b-2 border-lombard-borders-grey">
        Характеристика залога
      </p>
      <div className="flex gap-6">
        <DropDown
          title="Выбрать"
          listOfItems={[
            { label: "Золото", key: 1 },
            { label: "МТО", key: 2 },
          ]}
          triggerType="click"
          name="creditType"
          label="Тип"
          className="h-[41px]"
          value={depositCommentForm?.creditType}
          handleSelect={dispatch.setDepositCommentForm}
          id={id}
        />
        <DropDown
          title="Выбрать"
          listOfItems={[
            { label: "583", key: 1 },
            { label: "585", key: 2 },
          ]}
          triggerType="click"
          name="quality"
          label="Проба"
          className="h-[41px]"
          value={depositCommentForm?.quality}
          handleSelect={dispatch.setDepositCommentForm}
          id={id}
        />
        <CustomInput
          type="number"
          name="totalWeight"
          label="Общ. Грам"
          placeholder="0"
          value={depositCommentForm?.totalWeight}
          handleChange={dispatch.setDepositCommentForm}
          id={id}
        />
        <CustomInput
          type="number"
          name="pureWeight"
          label="Чис. Грам"
          placeholder="0"
          value={depositCommentForm?.pureWeight}
          handleChange={dispatch.setDepositCommentForm}
          id={id}
        />
      </div>
      <CustomInput
        type="textarea"
        name="comments"
        label="Комментарии"
        placeholder="Комментарии"
        className="h-[105px]"
        value={depositCommentForm?.comments}
        handleChange={dispatch.setDepositCommentForm}
        id={id}
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
          clickHandler={closeHandler}
        />
      </div>
    </div>
  );
}

export default DepositCharacteristics;
