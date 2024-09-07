import CustomInput from "../UI/CustomInput";
import DragNDrop from "../UI/DragNDrop";
import DropDown from "../UI/DropDown";
import PassportInputs from "../UI/PassportInputs";
import SVGComponent from "../UI/SVGComponent";
import SwitchComponent from "../UI/SwitchComponent";
import useActions from "../../helpers/hooks/useActions";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { FormEvent } from "react";
import { ApiService } from "../../helpers/API/ApiSerivce";
const regDropDowns = [
  {
    label: "Тип документ",
    name: "passport_type",
    items: [
      { label: "ID Карта РУз", key: 1, enumValue: 'ID_CARD_LOCAL'},
      { label: "Паспорт РУз", key: 2, enumValue: 'PASSPORT_LOCAL' },
      { label: "Биопаспорт РУз", key: 3, enumValue: 'BIO_PASSPORT_LOCAL' },
      { label: "Водительские права РУз", key: 4,  enumValue: 'DRIVER_LICENSE_LOCAL' },
    ],
  },
  {
    label: "Трудовой статус",
    name: "work_capacity",
    items: [
      { label: "Трудоустроенный", key: 1, enumValue: 'EMPLOYED' },
      { label: "Трудоустроенный пенсионер", key: 2, enumValue: 'RETIREE_EMPLOYED' },
      { label: "Пенсионер", key: 3, enumValue: 'RETIREE' },
      { label: "Нетрудоустроенный", key: 4, enumValue: 'INCAPABLE' },
      { label: "Другой", key: 5, enumValue: 'OTHER' },
    ],
  }, 
  {
    label: "Гражданство",
    name: "citizenship_id",
    items: [
      { label: "Узбекистан", key: 1, enumValue: 'Ozb' },
      { label: "Другое", key: 2, enumValue: 'Other' },
    ],
  },
  /* {
    label: "Номер региона",
    name: "region_id",
    items: [
      { label: "Иностранный паспорт", key: 1 },
      { label: "Паспорта РУз", key: 2 },
    ],
  },
  {
    label: "Место рождения",
    name: "birthPlace",
    items: [
      { label: "Tashkent", key: 1 },
      { label: "Urgench", key: 2 },
      { label: "Termez", key: 3 },
    ],
  },
  {
    label: "Место проживания",
    name: "livePlace",
    items: [
      { label: "Tashkent", key: 1 },
      { label: "Urgench", key: 2 },
      { label: "Termez", key: 3 },
    ],
  }, */
];

function GeneralClientInfo() {
  const dispatch = useActions();
  const formValues = useAppSelector(
    (state) => state.clientStore.generalClientForm
  );

  function handleInput(itemData: {
    id?: string;
    title: string;
    value: string | string[] | boolean;
  }) {
    const newValue = { [itemData.title]: itemData.value };
    dispatch.setGeneralClientForm(newValue);
    return {};
  }
  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch.setClientLoading(true);
    const clientDataToPost = {...formValues};
    const nameArr = ['first_name', 'last_name', 'middle_name'];
    formValues.clientName.split(' ').forEach((val, i) => clientDataToPost[nameArr[i]] = val);
    delete clientDataToPost.clientName;
    clientDataToPost.tax_id = '2931323'
    clientDataToPost.type = 'CLIENT';
    console.log(clientDataToPost);
    const random = Math.floor(Math.random() * 10);
    try {
      await ApiService.createCustomer(clientDataToPost)
      if (random % 2) {
        dispatch.setKatmRequest({
          result: "ok",
          styles:
            "text-lombard-btn-green border-lombard-btn-green border-[1px]",
        });
      } else {
        dispatch.setKatmRequest({
          result: "err",
          styles: "text-lombard-btn-red border-lombard-btn-red border-[1px]",
        });
      }
      dispatch.addRegClientStep();
      dispatch.setClientLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="ml-2">
      <form
        className={`bg-white flex flex-col gap-[16px] rounded-2xl  h-[85vh] overflow-y-scroll p-[18px] focus-within:border-lombard-main-blue focus-within:border-2 scroll`}
        id="generalClientInfo"
        onSubmit={submitHandler}
      >
        <div className="flex justify-between gap-[1px]">
          <CustomInput
            type="text"
            name="pin"
            label="JSHIR"
            placeholder="12345678912345"
            required
            maxLength={14}
            handleChange={handleInput}
            value={formValues.pin}
          />
          <i className="self-end flex-none">
            <SVGComponent title="search" className="w-[45px] h-[32px]"/>
          </i>
        </div>
        <CustomInput
          type="text"
          name="clientName"
          label="ФИО"
          required
          placeholder="Фамилия Имя Отчество"
          handleChange={handleInput}
          value={formValues.clientName}
        />
        <div className="flex justify-between items-center">
          <CustomInput
            type="date"
            name="birth_date"
            label="Дата рождения"
            value={formValues.birth_date}
            handleChange={handleInput}            
            required
          />
        </div>
        <PassportInputs
          name="clientPassport"
          handleChange={handleInput}
          seriesVal={formValues.passport_series}
          passNum={formValues.passport_number}
          required
        />
        <CustomInput
          type="phone"
          name="phone_number"
          label="Номер телефона"
          placeholder="+998 (__) ___-__-__"
          required
          handleChange={handleInput}
          value={formValues.phone_number}
        />
        <DragNDrop multiple />
        <div>
          <p className="text-black text-[14px] font-bold mb-2">
            Дата выдачи паспорта и дата истечения его срока
          </p>
          <div className="flex gap-2">
            <CustomInput
              type="date"
              name="passport_issue_date"
              handleChange={handleInput}
              value={formValues.passport_issue_date}
              required
            />
            <CustomInput
              type="date"
              name="passport_expire_date"
              handleChange={handleInput}
              value={formValues.passport_expire_date}
              required
            />
          </div>
        </div>
        <CustomInput
          name="passport_issue_place"
          type="text"
          required
          handleChange={handleInput}
          value={formValues.passport_issue_place}
          label="Место выдачи паспорта"
        />
        <CustomInput
          name="address_reg"
          type="text"
          handleChange={handleInput}
          value={formValues.address_reg}
          label="Прописка по паспорту"
          required
        />
        <div className="flex flex-col justify-between gap-y-[8px]">
          <p className="font-bold text-black text-[14px]">Пол</p>
          <SwitchComponent
            inputName="gender"
            selectedDefaultTitle="Женский"
            selectedStyles="text-white bg-[#304F74]"
            unselectedTitle="Мужской"
            unselectedStyles="bg-[#fff] text-black border-[#D2DBE1]"
            inputHandler={handleInput}
            currentSelect={formValues.gender}
          />
        </div>
        <CustomInput
          name="region_id"
          type="number"
          handleChange={handleInput}
          value={formValues.region_id}
          label="Номер региона"
          required
        />
        <CustomInput
          name="district_id"
          type="number"
          handleChange={handleInput}
          value={formValues.district_id}
          label="Номер района"
          required
        />        
        <CustomInput
          name="income_amount"
          type="text"
          handleChange={handleInput}
          value={formValues.income_amount}
          label="Доходы"
          required
        />
        <ul className="flex flex-col justify-center gap-y-[10px]">
          {regDropDowns.map((dropDown) => (
            <li key={dropDown.label}>
              <DropDown
                title="Выбрать"
                required={true}
                triggerType="click"
                listOfItems={dropDown.items}
                label={dropDown.label}
                name={dropDown.name}
                handleSelect={handleInput}
                value={formValues[dropDown.name]}
              />
            </li>
          ))}
        </ul>        
      </form>
    </div>
  );
}

export default GeneralClientInfo;
