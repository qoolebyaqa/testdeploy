import CustomInput from "../UI/CustomInput";
import DragNDrop from "../UI/DragNDrop";
import DropDown from "../UI/DropDown";
import PassportInputs from "../UI/PassportInputs";
import SVGComponent from "../UI/SVGComponent";
import SwitchComponent from "../UI/SwitchComponent";
import useActions from "../../helpers/hooks/useActions";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { FileData } from "../../helpers/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { clientFormSchema, clientFormValue } from "../../helpers/validator";
import { useRef } from "react";
import { nonNumberValue } from "../../helpers/fnHelpers";

const regDropDowns = [
  {
    label: "Трудовой статус",
    name: "work_capacity",
    items: [
      { label: "Трудоустроенный", key: 1, enumvalue: "EMPLOYED" },
      {
        label: "Трудоустроенный пенсионер",
        key: 2,
        enumvalue: "RETIREE_EMPLOYED",
      },
      { label: "Пенсионер", key: 3, enumvalue: "RETIREE" },
      { label: "Нетрудоустроенный", key: 4, enumvalue: "INCAPABLE" },
      { label: "Другой", key: 5, enumvalue: "OTHER" },
    ],
  },
  {
    label: "Гражданство",
    name: "citizenship_id",
    items: [
      { label: "Узбекистан", key: 1, enumvalue: "OZB" },
      { label: "Другое", key: 2, enumvalue: "OTHER" },
    ],
  },
];

interface IGeneralClientInfo {
  formId?: string;
  etag?: string;
  inputsValues: { [key: string]: string };
  handleInput?: ({
    id,
    title,
    value,
  }: {
    id?: string;
    title: string;
    value: string | string[];
  }) => void;
  docList?: any[];
}
function GeneralClientInfo({
  formId,
  etag,
  inputsValues,
  handleInput,
  docList,
}: IGeneralClientInfo) {
  const dispatch = useActions();
  const clientIdRef = useRef(inputsValues.id);
  const clientEtagRef = useRef(etag);

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(clientFormSchema) });

  function checkTypePerson() {
    const requiredFieldsForClient = [
      "first_name",
      "last_name",
      "phone_number",
      "pin",
      "birth_date",
      "passport_series",
      "passport_number",
      "passport_issue_date",
      "passport_expire_date",
      "passport_issue_place",
      "address_reg",
      "gender",
      "region_id",
      "district_id",
      "citizenship_id",
      "work_capacity",
      "passport_type",
    ];

    const requiredFieldsForLead = ["first_name", "last_name", "phone_number"];
    const hasAllFields = (fields: string[]) =>
      fields.every((field) => inputsValues[field]);

    if (hasAllFields(requiredFieldsForClient)) {
      return "CLIENT";
    }
    if (hasAllFields(requiredFieldsForLead)) {
      return "LEAD";
    }
    return "";
  }
  const submitHandler = async (formData: clientFormValue) => {
    dispatch.setClientLoading(true);
    const clientDataToPost = { ...formData };
    clientDataToPost.tax_id = "2931323";
    clientDataToPost.type = checkTypePerson();
    const random = Math.floor(Math.random() * 10);
    try {
      if (clientEtagRef.current) {
        clientDataToPost.id = inputsValues.id;
        await ApiService.updateCustomer(clientDataToPost, clientEtagRef.current);
        console.log("UPDATED:", clientDataToPost);
      } else {
        console.log("SUBMITTED:", clientDataToPost);
        await ApiService.createCustomer(clientDataToPost);
        if (random % 2) {
          dispatch.setKatmRequest({
            result: "ok",
            styles:
              "text-lombard-btn-green border-lombard-btn-green border-[1px]",
          });
        } else {
          dispatch.clearRegStep();
          dispatch.setKatmRequest({
            result: "err",
            styles: "text-lombard-btn-red border-lombard-btn-red border-[1px]",
          });
        }
      }
      dispatch.addRegClientStep();
    } catch (err) {
      console.log(err);
    }
    dispatch.setClientLoading(false);
  };

  async function isValid() {
    return await trigger([
      "first_name",
      "last_name",
      "phone_number",
      "passport_series",
      "passport_number",
      "passport_type",
    ]);
  }
  async function uploadAfterSubmit(fileData: FileData) {
    dispatch.setClientLoading(true);
    const clientDataToPost = { ...inputsValues };
    clientDataToPost.tax_id = "2931323";
    clientDataToPost.type = checkTypePerson();
    if (!clientIdRef.current) {
      try {
        const response = await ApiService.createCustomer(clientDataToPost);
        clientIdRef.current  = response.data.id
        const etagMatch = String(response.headers.etag).match(/"(.*)"/);
        if(etagMatch && etagMatch[1]) {
          clientEtagRef.current = etagMatch[1] 
        };
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const formData = new FormData();
      formData.append("file", fileData.file);
      const uploadedFile = await ApiService.addDocument(formData, clientIdRef.current);
      dispatch.setClientLoading(false);
      return uploadedFile.data;
    } catch (err) {
      console.log(err);
      dispatch.setClientLoading(false);
    }
  }
  return (
    <div className="ml-2">
      <form
        className={`bg-white flex flex-col gap-[16px] rounded-2xl  h-[85vh] overflow-y-scroll p-[18px] focus-within:border-lombard-main-blue focus-within:border-2 scroll`}
        id={formId || "someID"}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex justify-between gap-x-[1px]">
          <CustomInput
            control={control}
            type="number"
            name="pin"
            label="JSHIR"
            placeholder="12345678912345"
            maxLength={14}
            handleChange={handleInput}
            value={inputsValues.pin}
            errorMsg={errors.pin?.message}
          />
          <i className="self-end flex-none">
            <SVGComponent title="search" className="w-[45px] h-[32px]" />
          </i>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="FIO" className="font-bold text-black text-[14px]">
            ФИО
          </label>
          <div className="flex gap-2 mb-1">
            <CustomInput
              control={control}
              type="text"
              name="first_name"
              placeholder="Фамилия"
              handleChange={handleInput}
              value={inputsValues.first_name}
              modificator={nonNumberValue}
              errorMsg={errors.first_name?.message}
            />
            <CustomInput
              control={control}
              type="text"
              name="last_name"
              placeholder="Имя"
              handleChange={handleInput}
              modificator={nonNumberValue}
              value={inputsValues.last_name}
              errorMsg={errors.last_name?.message}
            />
          </div>
          <CustomInput
            control={control}
            type="text"
            name="middle_name"
            placeholder="Отчество"
            handleChange={handleInput}
            modificator={nonNumberValue}
            value={inputsValues.middle_name}
          />
        </div>
        <div className="flex justify-between items-center">
          {/* <CustomInput
            type="date"
            name="birth_date"
            label="Дата рождения"
            value={inputsValues.birth_date}
            handleChange={handleInput}
            control={control}
          /> */}
        </div>
        <PassportInputs
          control={control}
          name="clientPassport"
          handleChange={handleInput}
          seriesVal={inputsValues.passport_series}
          passNum={inputsValues.passport_number}
          errorMsg={
            errors.passport_series?.message || errors.passport_number?.message
          }
        />
        <CustomInput
          control={control}
          type="number"
          name="phone_number"
          maxLength={12}
          label="Номер телефона"
          placeholder="998 (__) ___-__-__"
          handleChange={handleInput}
          value={inputsValues.phone_number}
          errorMsg={errors.phone_number?.message}
        />
        <DropDown
          listOfItems={[
            { label: "ID Карта РУз", key: 1, enumvalue: "ID_CARD_LOCAL" },
            { label: "Паспорт РУз", key: 2, enumvalue: "PASSPORT_LOCAL" },
            { label: "Биопаспорт РУз", key: 3, enumvalue: "BIO_PASSPORT_LOCAL"},
            { label: "Водительские права РУз", key: 4, enumvalue: "DRIVER_LICENSE_LOCAL" },
          ]}
          name="passport_type"
          label="Тип документа"
          handleSelect={handleInput}
          control={control}
          value={inputsValues.passport_type}
          errorMsg={
            errors.passport_type?.message
          }
          title="Выбрать"
        />
        <DragNDrop
          multiple
          uploadFile={uploadAfterSubmit}
          isValid={isValid}
          docList={docList}
          clientId={inputsValues.id}
        />
        <div>
          <p className="text-black text-[14px] font-bold mb-2">
            Дата выдачи паспорта и дата истечения его срока
          </p>
          <div className="flex gap-2">
            <CustomInput
              type="date"
              name="passport_issue_date"
              handleChange={handleInput}
              value={inputsValues.passport_issue_date}
              control={control}
            />
            <CustomInput
              type="date"
              name="passport_expire_date"
              handleChange={handleInput}
              value={inputsValues.passport_expire_date}
              control={control}
            />
          </div>
        </div>
        <CustomInput
          control={control}
          name="passport_issue_place"
          type="text"
          handleChange={handleInput}
          value={inputsValues.passport_issue_place}
          label="Место выдачи паспорта"
        />
        <CustomInput
          control={control}
          name="address_reg"
          type="text"
          handleChange={handleInput}
          value={inputsValues.address_reg}
          label="Прописка по паспорту"
        />
        <div className="flex flex-col justify-between gap-y-[8px]">
          <p className="font-bold text-black text-[14px]">Пол</p>
          <SwitchComponent
            control={control}
            inputName="gender"
            selectedDefaultTitle="Женский"
            selectedStyles="text-white bg-[#304F74]"
            unselectedTitle="Мужской"
            unselectedStyles="bg-[#fff] text-black border-[#D2DBE1]"
            inputHandler={handleInput}
            currentSelect={inputsValues.gender}
          />
        </div>
        <CustomInput
          control={control}
          name="region_id"
          type="number"
          handleChange={handleInput}
          value={inputsValues.region_id}
          label="Номер региона"
        />
        <CustomInput
          control={control}
          name="district_id"
          type="number"
          handleChange={handleInput}
          value={inputsValues.district_id}
          label="Номер района"
        />
        <CustomInput
          control={control}
          name="income_amount"
          type="text"
          handleChange={handleInput}
          value={inputsValues.income_amount}
          label="Доходы"
        />
        <ul className="flex flex-col justify-center gap-y-[10px]">
          {regDropDowns.map((dropDown) => (
            <li key={dropDown.label}>
              <DropDown
                title="Выбрать"
                listOfItems={dropDown.items}
                label={dropDown.label}
                name={dropDown.name}
                handleSelect={handleInput}
                control={control}
                value={inputsValues[dropDown.name]}
                key={dropDown.label}
                errorMsg={
                  errors[dropDown.name as keyof clientFormValue]?.message
                }
              />
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default GeneralClientInfo;
