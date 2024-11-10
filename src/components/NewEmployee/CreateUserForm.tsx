import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userFormSchema, userFormValue } from "../../helpers/validator";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import ButtonComponent from "../UI/ButtonComponent";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { useState } from "react";

function CreateUserForm({
  formValues,
  etag,
}: {
  formValues: userFormValue;
  etag?: string;
}) {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange", resolver: yupResolver(userFormSchema), defaultValues: {
    last_name: formValues.last_name,
    first_name: formValues.first_name,
    id: formValues.id,
    language: formValues.language,
    login: formValues.login,
    middle_name: formValues.middle_name || '',
    phone_number: formValues.phone_number,
    role_id: formValues.role_id,
    type: formValues.type
  } });

  const handleSubmitUser = async (formData: userFormValue) => {
    if(!isDirty) {
      return
    }
    const userDataToPost = { ...formData };
    userDataToPost.type = "INTERNAL";
    try {
      setLoading(true);
      if (etag) {
        userDataToPost.id = formValues.id
        const updatedUser = await ApiService.updateUser(userDataToPost, etag);
        console.log(updatedUser)
        reset(userDataToPost)
      } else {
        try {
          const createdUser = await ApiService.createUser(userDataToPost);
          reset(userDataToPost)
          console.log(createdUser);
        } catch (err) {
          console.log(err);
        }
      }
      console.log(userDataToPost);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="flex flex-col gap-2 my-4"
      onSubmit={handleSubmit(handleSubmitUser)}
    >
      <div className="flex justify-between items-center border-b-2 pb-2 border-lombard-borders-grey">
        <h4 className="text-black">Профиль</h4>
        <ButtonComponent
          className={`${isValid && isDirty ? 'bg-lombard-btn-green text-white' : 'bg-lombard-btn-grey text-black' }`}
          titleBtn="Сохранить"
          submit
          disabled={loading}
        />
      </div>
      <CustomInput
        type="text"
        name="last_name"
        placeholder="Фамилия"
        label="ФИО"
        control={control}
        errorMsg={errors.last_name?.message}
      />
      <CustomInput
        type="text"
        name="first_name"
        control={control}
        placeholder="Имя"
        errorMsg={errors.first_name?.message}
      />
      <CustomInput
        type="text"
        name="middle_name"
        placeholder="Отчество"
        control={control}
        errorMsg={errors.middle_name?.message}
      />
      <CustomInput
        label="Номер телефона"
        type="phone"
        name="phone_number"
        placeholder="998 (99) 123-45-67"
        control={control}
        errorMsg={errors.phone_number?.message}
      />
      <CustomInput
        type="text"
        name="login"
        label="Логин"
        control={control}
        errorMsg={errors.login?.message}
      />
      <DropDown
        title="Выбрать"
        listOfItems={[
          { label: "Пользователь", key: 1, enumvalue: "OPERATOR" },
          { label: "Бухгалтер", key: 2, enumvalue: "ACCOUNTANT" },
          { label: "Админ", key: 3, enumvalue: "ADMIN" },
        ]}
        label="Роль"
        name="role_id"
        control={control}
        errorMsg={errors.role_id?.message}
      />
      <DropDown
        title="Выбрать"
        listOfItems={[
          { label: "Узбекский", key: 1, enumvalue: "UZ" },
          { label: "Русский", key: 2, enumvalue: "RU" },
        ]}
        label="Родной язык"
        name="language"
        control={control}
        errorMsg={errors.language?.message}
      />
      {/*  <div className="flex flex-col justify-between gap-[6px]">
      <p className="font-bold text-black text-[14px]">Пол</p>
      <SwitchComponent
        inputName="sex"
        selectedDefaultTitle="Женский"
        selectedStyles="text-white bg-[#304F74]"
        unselectedTitle="Мужской"
        unselectedStyles="bg-[#fff] text-black border-[#D2DBE1]"
        inputHandler={dispatch.setNewEmployeeGender}
        currentSelect={gender}
      />
    </div> */}
    </form>
  );
}

export default CreateUserForm;
