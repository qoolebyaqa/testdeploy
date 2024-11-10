import { useForm } from "react-hook-form";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import ButtonComponent from "../UI/ButtonComponent";
import { useState } from "react";

function DayOffSection() {
  const [loading, _setLoading] = useState(false);

  const {
    control,
    formState: { isValid, isDirty },
  } = useForm({ mode: "onChange" });

  return (
    <div className="pt-[10px] bg-white rounded-2xl px-2">
      <div className="flex justify-between items-center border-b-2 pb-2 border-lombard-borders-grey">
        <h4 className="text-black">Профиль</h4>
        <ButtonComponent
          className={`${
            isValid && isDirty
              ? "bg-lombard-btn-green text-white"
              : "bg-lombard-btn-grey text-black"
          }`}
          titleBtn="Сохранить"
          submit
          disabled={loading}
        />
      </div>
      <form className="flex items-center mb-6 gap-4">
        <div className="w-1/2">
          <DropDown
            label="Начало"
            name="startDay"
            control={control}
            listOfItems={[
              { label: "Воскресенье", key: 1 },
              { label: "Суббота", key: 2 },
            ]}
          />
        </div>
        <CustomInput
          name="activationDay"
          type="date"
          control={control}
          label="День активации"
        />
      </form>
    </div>
  );
}

export default DayOffSection;
