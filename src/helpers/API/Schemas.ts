export interface ICreateClient {
  pin: string //required for CLIENT and EMPLOYEE
  first_name: string, 
  last_name:string, 
  middle_name?: string,
  birth_date: string //required for CLIENT and EMPLOYEE
  passport_series: string //required for CLIENT and EMPLOYEE
  passport_number: string //required for CLIENT and EMPLOYEE
  phone_number: string, 
  passport_issue_date: string //required for CLIENT and EMPLOYEE
  passport_expire_date: string //required for CLIENT and EMPLOYEE
  passport_issue_place: string //required for CLIENT and EMPLOYEE
  address_reg: string //required for CLIENT and EMPLOYEE
  gender: 'MALE' | 'FEMALE' //required for CLIENT and EMPLOYEE
  passport_type:'ID_CARD_LOCAL' | 'PASSPORT_LOCAL' | 'BIO_PASSPORT_LOCAL' | 'DRIVER_LICENSE_LOCAL'
  work_capacity: 'EMPLOYED' | 'RETIREE_EMPLOYED' | 'RETIREE' | 'INCAPABLE' | 'OTHER'//required for CLIENT and EMPLOYEE
  region_id: number //required for CLIENT and EMPLOYEE
  district_id: number //required for CLIENT and EMPLOYEE
  citizenship_id: string, //required for CLIENT and EMPLOYEE
  income_amount: number //Monthly income amount in tiyin
  type: 'LEAD' | 'CLIENT' | 'EMPLOYEE',
  tax_id: string //required for CLIENT and EMPLOYEE
  email?: string
  address?:string
  work_place?: string 
  job_title_id?: string
  additional_info?: string
}

export interface ICreateUser {
  name: string
  login: string
  phone_number: string
  language: 'UZ' | 'RU' 
  job_title?: string
  role_id: string
  filial_id?:string
  type: 'INTERNAL' | 'EXTERNAL'
  email?: string
}