import * as yup from 'yup';
import { ICollateralAttribute } from './API/Schemas';

export type passWordPower = {
  newPass?: string | undefined,
  repeatNewPass?: string | undefined,
}

export const passWordPowerSchema = yup.object().shape({
  newPass: yup
    .string()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .matches(/[0-9]/, 'Пароль должен включать хотя бы одну цифру')
    .matches(/[a-zA-Zа-яА-ЯёЁ]/, 'Пароль должен включать хотя бы одну букву')
    .test('length', 'Длина пароля не может быть короче 8 символов', (val) => val!.toString().length > 7),
  repeatNewPass: yup
    .string()
    .required()
    .oneOf([yup.ref('newPass')], 'Пароли должны совпадать'),
}) 

export type clientFormValue = {
  id?: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  pin?: string,
  birth_date?: string,
  passport_series?: string,
  passport_number?: string,
  passport_issue_date?: string,
  passport_expire_date?: string,
  passport_issue_place?: string,
  address_reg?: string,
  gender?: string,
  region_id?: string,
  district_id?: string,
  citizenship_id?: string,
  work_capacity?: string,
  passport_type?: string,
  income_amount?: string,
  tax_id?: string,
  type?: string,
  middle_name?: string
}

export const clientFormSchema = yup.object().shape({
  id: yup.string(),
  last_name: yup.string().required('Заполните имя клиента'),
  first_name: yup.string().required('Заполните фамилию клиента'),
  phone_number: yup.string().typeError('Заполните номер телефона клиента').test('length', 'Введите действительный телефонный номер', (val:string | undefined) => val?.toString().length === 12).required('Заполните номер телефона клиента'),
  pin: yup.string().test('length', 'Введите действительный ПИНФЛ', (val) => val ? val!.toString().length > 13 : true),
  birth_date: yup.string(),
  passport_series: yup.string().required('Укажите серию паспорта')
  .matches(/^[a-zA-Z]+$/, 'Введите действительную серию паспорта'),
  passport_number: yup.string().typeError('Укажите номер паспорта').required('Укажите номер паспорта'),
  passport_issue_date: yup.string(),
  passport_expire_date: yup.string(),
  passport_issue_place: yup.string(),
  address_reg: yup.string(),
  gender: yup.string(),
  region_id: yup.string(),
  district_id: yup.string(),
  citizenship_id: yup.string(),
  work_capacity: yup.string(),
  passport_type: yup.string().required('Выберите тип подтвержающего документа'),
  income_amount: yup.string(),
  tax_id: yup.string(),
  type: yup.string(),
  middle_name: yup.string()
});

export type userFormValue = {
  id?: string,
  first_name: string,
  last_name: string,
  type?: string,
  language: string,
  login: string,
  phone_number: string,
  role_id: string,
  middle_name?: string
}

export const userFormSchema = yup.object().shape({
  id: yup.string(),
  first_name: yup.string().required('Укажите имя'),
  last_name: yup.string().required('Укажите фамилию'),
  middle_name: yup.string(),
  type: yup.string(),
  language: yup.string().required('Укажите родной язык пользователя'),
  login: yup.string().required('Присвойте пользователю логин'),
  phone_number: yup.string().typeError('Заполните номер телефона клиента').test('length', 'Введите действительный телефонный номер', (val:string | undefined) => val?.toString().length === 12).required('Заполните номер телефона клиента'),
  role_id: yup.string().required('Укажите роль пользователя'),
});


export const sendQueueReqSchema = yup.object().shape({
  template_id: yup.string().required(),
  group_id: yup.string().required(),
})

export type QueueReq = {
  template_id: string,
  group_id: string,
  scheduled_at?: string,
/*   recipient_type: 'GROUP' | 'CLIENT' | 'ALL', */
}

export const productSchema = yup.object().shape({
  loan_product_id: yup.string().required('Выберите тип продукта')
})

export const collateralSchema = yup.object().shape({
  collateralType: yup.string().required('Выберите тип залога')
})

export const collateralPriceSchema = (min: number, max:number) => yup.object().shape({
  price: yup.number().typeError('Цена должна быть указана').required('Цена должна быть указана').
  test('limits',  `Допустимо значение в пределах ${min}-${max}`, val => min <= val && max >= val)
})


export const collateralAttributesSchema = (attributes: ICollateralAttribute[]) => yup.object().shape({
  ...attributes.reduce((acc: any, {id}: {id: number}) => {acc[id] = yup.string().required('Укажите характеристику'); return acc}, {}),
  comments: yup.string().required('Добавьте описание/комментарии')
})

export const confirmationsSwitchersSchema = yup.object().shape({
  confirmCollateral: yup.boolean().required('Подтвердите').test('isFalsy',  'Подтвердите', val => val),
  confirmAcceptance: yup.boolean().required('Подтвердите').test('isFalsy',  'Подтвердите', val => val)
})


export const cardSchema = yup.object().shape({
  type: yup.string().required('Выберите тип выдачи'),
  bank_id: yup.string().required('Код банка обязателен'),
  bank_account_number: yup.string().required('Номер счета обязателен'),
  card_number: yup.string().required('Номер карты обязателен'),
  amount_card: yup.string(),
  amount_cash: yup.string(),
  loan_amount: yup.number(),
  creditPercentage: yup.string(),
  dateIssue: yup.string(),
  datePayment: yup.string()
});

export const complexSchema = yup.object().shape({
  type: yup.string().required('Выберите тип выдачи'),
  bank_id: yup.string().required('Код банка обязателен'),
  bank_account_number: yup.string().required('Номер счета обязателен'),
  card_number: yup.string().required('Номер карты обязателен'),
  amount_card: yup.string().required('Укажите сумму на карту'),
  amount_cash: yup.string().required('Укажите сумму наличными'),
  loan_amount: yup.number(),
  creditPercentage: yup.string(),
  dateIssue: yup.string(),
  datePayment: yup.string()
});

export const cashNonSchema = yup.object().shape({
  type: yup.string(),
  bank_id: yup.string(),
  bank_account_number: yup.string(),
  card_number: yup.string(),
  amount_card: yup.string(),
  amount_cash: yup.string(),
  loan_amount: yup.number(),
  creditPercentage: yup.string(),
  dateIssue: yup.string(),
  datePayment: yup.string()
});