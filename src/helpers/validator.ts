import * as yup from 'yup';

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
  phone_number: number,
  pin?: number | string,
  birth_date?: string,
  passport_series?: string,
  passport_number?: number,
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
  income_amount?: number | string,
  tax_id?: string,
  type?: string,
  middle_name?: string
}

export const clientFormSchema = yup.object().shape({
  id: yup.string(),
  last_name: yup.string().required('Заполните имя клиента'),
  first_name: yup.string().required('Заполните фамилию клиента'),
  phone_number: yup.number().typeError('Заполните номер телефона клиента').test('length', 'Введите действительный телефонный номер', (val:number | undefined) => val?.toString().length === 12).required('Заполните номер телефона клиента'),
  pin: yup.string(),
  birth_date: yup.string(),
  passport_series: yup.string().required('Укажите серию паспорта'),
  passport_number: yup.number().required('Укажите номер паспорта'),
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
  name: string,
  type: string,
  language: string,
  login: string,
  phone_number: string,
  role_id: string,
  passport_series?: string,
  passport_number?: number,
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
  income_amount?: number | string,
  tax_id?: string,
  middle_name?: string
}

export const userFormSchema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required('Заполните ФИО'),
  type: yup.string().required('Укажите тип пользователя'),
  language: yup.string().required('Укажите родной язык пользователя'),
  login: yup.string().required('Присвойте пользователю логин'),
  phone_number: yup.string().required('Заполните номер телефона'),
  role_id: yup.string().required('Укажите роль пользователя'),
  passport_series: yup.string(),
  passport_number: yup.number(),
  passport_issue_date: yup.string(),
  passport_expire_date: yup.string(),
  passport_issue_place: yup.string(),
  address_reg: yup.string(),
  gender: yup.string(),
  region_id: yup.string(),
  district_id: yup.string(),
  citizenship_id: yup.string(),
  work_capacity: yup.string(),
  passport_type: yup.string(),
  income_amount: yup.string(),
  tax_id: yup.string(),
  middle_name: yup.string()
});


export const sendQueueReqSchema = yup.object().shape({
  template_id: yup.string().required(),
})

export type QueueReq = {
  template_id: string,
  scheduled_at?: string,
/*   recipient_type: 'GROUP' | 'CLIENT' | 'ALL', */
}
