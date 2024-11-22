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
import { useEffect, useRef } from "react";
import { convertDataToList4DropDown, filteredObject, nonNumberUpperCaseValue } from "../../helpers/fnHelpers";
import { toast} from "react-toastify";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { useNavigate } from "react-router";

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
  docList?: any[];
  handleInput?: any
}
function GeneralClientInfo({
  formId,
  etag,
  inputsValues,
  docList,
  handleInput
}: IGeneralClientInfo) {
  const dispatch = useActions();
  const navigate = useNavigate();
  const clientIdRef = useRef(inputsValues.id);
  const clientEtagRef = useRef(etag);
  const stepState = useAppSelector(state => state.clientStore.stepState)
  const regions = useAppSelector(state => state.clientStore.regionsList);
  const regionAfterGet = regions.find(region => region.id === Number(inputsValues.region_id));
  const districtNameAfterGet = regionAfterGet?.districts.find(district => district.id === Number(inputsValues.district_id))?.name

  const {
    handleSubmit,
    control,
    trigger,
    watch,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({ mode: "onChange", resolver: yupResolver(clientFormSchema), defaultValues: {
    first_name: inputsValues.first_name,
    last_name: inputsValues.last_name,
    middle_name: inputsValues.middle_name || '',
    phone_number: inputsValues.phone_number,
    pin: inputsValues.pin || '',
    birth_date: inputsValues.birth_date || '',
    passport_series: inputsValues.passport_series,
    passport_number: inputsValues.passport_number,
    passport_issue_date: inputsValues.passport_issue_date || '',
    passport_expire_date: inputsValues.passport_expire_date || '', 
    gender: inputsValues.gender || '',
    passport_issue_place: inputsValues.passport_issue_place || '',
    address_reg: inputsValues.address_reg || '',
    region_id: regionAfterGet?.name || '',
    district_id: districtNameAfterGet || '',
    citizenship_id: inputsValues.citizenship_id || '',
    work_capacity: inputsValues.work_capacity || '',
    passport_type: inputsValues.passport_type,
    income_amount: inputsValues.income_amount || '',
    type: inputsValues.type || ''
  } });

  const regionId = watch("region_id");
  console.log(isDirty)
  const districts = !!regions.find(region => String(region.id) === watch('region_id')) ?
  convertDataToList4DropDown(regions.find(region => String(region.id) === watch('region_id'))!.districts) : regionAfterGet ? convertDataToList4DropDown(regionAfterGet?.districts) : []

  const allFieldsFilled = () => {
    const fileds = {...watch()};
    delete fileds.middle_name;
    return Object.keys(fileds).every(field => watch(field as keyof clientFormValue));
  };


  useEffect(() => {
    if (regionId !== regionAfterGet?.name) {
      setValue("district_id", ''); 
    }
    if(allFieldsFilled()) {
      dispatch.setStepState({id: 1, step:'hold', maxStep: 1});
    } else {
      dispatch.setStepState({id: 0, step:'initial', maxStep: 0});
    }
  }, [regionId, setValue]);

  const submitHandler = async (formData: clientFormValue) => {
    if(!isDirty) {    
      if(allFieldsFilled()) {
        toast.info('Вы можете продолжить создание договора')
        dispatch.setStepState({id: 1, step:'hold', maxStep: 1})
      } else {
        toast.error('Для регистрации договора, заполните все поля')
      }
        return
    };
    const clientDataToPost = { ...formData };
    clientDataToPost.tax_id = "2931323";
    clientDataToPost.type = allFieldsFilled() ? 'CLIENT' : 'LEAD';
    try {
      dispatch.setClientLoading(true);
      if (clientEtagRef.current) {
        clientDataToPost.id = inputsValues.id;
        const updatedClient = await ApiService.updateCustomer(filteredObject(clientDataToPost), clientEtagRef.current);
        const etagMatch = String(updatedClient.headers.etag).match(/"(.*)"/);
        if (etagMatch && etagMatch[1]) {
          clientEtagRef.current = etagMatch[1];
        }        
        reset(clientDataToPost)
        toast.success('Данные о клиенте обновлены');
      } else {
        const clientId = await ApiService.createCustomer(filteredObject(clientDataToPost));
        toast.success('Клиент успешно создан');
        navigate(`/clients/${clientId.data.id}`)
        /* if (random % 2) {
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
        } */
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch.setClientLoading(false);
    }
  };

  async function isValidTriggered() {
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
    clientDataToPost.type = allFieldsFilled() ? 'CLIENT' : 'LEAD';
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
      const uploadedFile = await ApiService.addDocument(formData, clientIdRef.current, 'PASSPORT');
      dispatch.setClientLoading(false);
      return uploadedFile.data;
    } catch (err) {
      console.log(err);
      dispatch.setClientLoading(false);
    }
  }
  return (
    <div className='ml-2' onClick={(e) => {e.stopPropagation(); dispatch.setStepState({id: 0, step:'initial'})}}>
      <form
        className={`bg-white flex flex-col gap-[16px] rounded-2xl  h-[85vh] overflow-y-scroll p-[18px] scroll ${stepState.id === 0 ? 'border-lombard-main-blue border-4': ''}`}
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
              modificator={nonNumberUpperCaseValue}
              errorMsg={errors.first_name?.message}
            />
            <CustomInput
              control={control}
              type="text"
              name="last_name"
              placeholder="Имя"
              modificator={nonNumberUpperCaseValue}
              errorMsg={errors.last_name?.message}
            />
          </div>
          <CustomInput
            control={control}
            type="text"
            name="middle_name"
            placeholder="Отчество"
            modificator={nonNumberUpperCaseValue}
          />
        </div>
        <div className="flex justify-between items-center">
          <CustomInput
            type="date"
            name="birth_date"
            label="Дата рождения"
            value={inputsValues.birth_date}
            handleChange={handleInput}
            control={control}
          />
        </div>
        <PassportInputs
          control={control}
          name="clientPassport"
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
          control={control}
          errorMsg={
            errors.passport_type?.message
          }
          title="Выбрать"
        />
        <DragNDrop
          multiple
          uploadFile={uploadAfterSubmit}
          isValid={isValidTriggered}
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
              control={control}
              handleChange={handleInput}
              value={inputsValues.passport_issue_date}
            />
            <CustomInput
              type="date"
              name="passport_expire_date"
              control={control}
              handleChange={handleInput}
              value={inputsValues.passport_expire_date}
            />
          </div>
        </div>
        <CustomInput
          control={control}
          name="passport_issue_place"
          type="text"
          label="Место выдачи паспорта"
          withSpaces
        />
        <CustomInput
          control={control}
          name="address_reg"
          type="text"
          label="Прописка по паспорту"
          withSpaces
        />
        <div className="flex flex-col justify-between gap-y-[8px]">
          <p className="font-bold text-black text-[14px]">Пол</p>
          <SwitchComponent
            control={control}
            inputName="gender"
            inputHandler={handleInput}
            currentSelect={inputsValues.gender}
            selectedDefaultTitle="Женский"
            selectedStyles="text-white bg-[#304F74]"
            unselectedTitle="Мужской"
            unselectedStyles="bg-[#fff] text-black border-[#D2DBE1]"
          />
        </div>
        <DropDown
          control={control}
          name="region_id"
          label="Номер региона"
          listOfItems={!!regions && convertDataToList4DropDown(regions)}
          title="Выбрать"
        />
        <DropDown
          control={control}
          name="district_id"
          title="Выбрать"
          listOfItems={!!regions && districts}
          label="Номер района"
        />
        <CustomInput
          control={control}
          name="income_amount"
          type="text"
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
                control={control}
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
