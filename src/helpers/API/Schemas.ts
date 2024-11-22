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

export interface IProduct {
  "id": number,
  "name": string,
  "description": string,
  "loan_term": string,
  "repayment_schedule_type": "LOMBARD" | "ANNUITY" | "DIFFERENTIAL",
  "is_active": boolean,
  "valid_from_date": string,
  "valid_till_date": string,
  "branch_id": number
}

export interface ICollateralType {
  "id": number,
  "name": string,
  "isActive": true,
  "formulaType": string,
  "attributes": []
}

export interface ICollateralPriceList {
  "id": number,
  "collateral_type_id": number,
  "attribute_values": null | [],
  "market_price": number,
  "estimated_price_min": number,
  "estimated_price_max": number,
  "valid_from": [
    number,
    number,
    number
  ],
  "created_at": string,
  "created_by": number,
  "updated_at": null | string,
  "updated_by": null | string
}

export type DistrictDTO = {
  id: number,
  name: string
} 
export interface IRegion {
  id: number,
  name: string,
  districts: DistrictDTO[]
}