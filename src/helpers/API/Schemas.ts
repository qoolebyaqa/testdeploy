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
  passport_type:'ID_CARD_LOCAL' | 'PASSPORT_LOCAL' | 'BIO_PASSPORT_LOCAL' | 'DRIVER_LICENSE_LOCAL' | 'RESIDENT_CARD' | 'MILITARY_ID'
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
export interface ICollateralAttribute {
  "id": number,
  "name": string,
  "dataType": "OPTIONS" | "DECIMAL" | "INTEGER" | "DATE" | "LONG",
  "unit": null | string,
  "options": any,
  "isRequired": boolean,
  "isPriceKey": boolean
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

export type CreateCollateralResp = {
  "id"?: number,
  "estimated_value": number,
  "estimated_value_min": number,
  "estimated_value_max": number
}

export type LocalcollateralItem = {
  id: string,
  storage_unit_id?: number,
  price?: CreateCollateralResp,
  loan_agreement_id?: number,
  description?: string,
  customer_id?: string,
  collateral_type_id?: number,
  attribute_values?: {collateral_type_attribute_id: number, value: string}[]
}


export const mockCollateral = [
  {
    "id": 27,
    "loanAgreementId": 66,
    "customerId": 7003,
    "collateralTypeId": 2,
    "description": "test",
    "estimatedValue": 492000000,
    "estimatedValueMin": 409999999,
    "estimatedValueMax": 492000000,
    "storageUnitId": "1",
    "registrationNumber": null,
    "status": null,
    "dateReceived": "2024-11-30",
    "attributeValues": [
        {
            "collateral_type_attribute_id": 2,
            "value": "585"
        },
        {
            "collateral_type_attribute_id": 6,
            "value": "CHAIN"
        },
        {
            "collateral_type_attribute_id": 3,
            "value": "5"
        },
        {
            "collateral_type_attribute_id": 4,
            "value": "4.1"
        }
    ]
  }
]

mockCollateral.map(val => ({
  id: val.id,
  storage_unit_id: val.storageUnitId,
  loan_agreement_id: val.loanAgreementId,
  description: val.description,
  customer_id: val.customerId,
  collateral_type_id: val.collateralTypeId,
  price: {
    id: val.id,
    estimated_value: val.estimatedValue,
    estimated_value_min: val.estimatedValueMin,
    estimated_value_max: val.estimatedValueMax
  },
  attribute_values: val.attributeValues
}))
/* 
LoanIssueInfo:
      type: object
      required:
        - type
        - amount
        - bank_id
      properties:
        type:
          type: string
          enum:
            - CARD
            - CASH
        amount:
          type: integer
        card_number:
          type: string
        bank_account_number:
          type: string
        bank_id:
          type: integer

          {
    "bank_id": "21321312",
    "bank_account_number": "31232131",
    "card_number": "2321321321",
    "amount_card": "321321321",
    "amount_cash": "321321321321"
}
 */

/* 
          CollateralDTO:
      type: object
      properties:
        id:
          type: integer
        loan_agreement_id:
          type: integer
        customer_id:
          type: integer
        collateral_type_id:
          type: integer
        description:
          type: string
        estimated_value:
          type: integer
        estimated_value_min:
          type: integer
        estimated_value_max:
          type: integer
        storage_unit_id:
          type: string
        registration_number:
          type: string
        status:
          type: string
        date_received:
          type: string
        attribute_values:
          type: array
          items:
            $ref: '#/components/schemas/CCAttributeValueDTO'


            CCAttributeValueDTO:
      required:
        - collateral_type_attribute_id
        - value
      properties:
        collateral_type_attribute_id:
          type: integer
        value:
          type: string

 */