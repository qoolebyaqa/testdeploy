import { ISelect } from "../components/UI/DropDown"

export enum ROLE_ENUM {
  OPERATOR = 'roles.operator',
  ADMIN = 'roles.admin',
  ACCOUNTANT = 'roles.accountant'
} 

export enum NOTIFICATION_STATUS {
  SENT = 'Отправлено',
  FAILED = 'Ошибка',
  SENDING = 'Отправляется',
  PENDING = 'Запланировано',
}

export type FileData = {
  file: any
}

export type SupportedFilters = {
  name: string,
  type: string,
  label: string,
  items?: ISelect[]
}

export interface IFileSlide {fileId: string, fileUrl: string}
export interface IBase64Slide {fileId: string, fileUrl: string, fileData: string}

export type DataTableType = IDataContractType
  | IDataEmployeeType
  | IDataClientType
  | IDataKatmType
  | ISMSDataType
  | IDataFilialType
  | IdataKATMrequestDialog
  | IKatmDialogType
  | ICashDebitType
  | IReceivedType
  | ILowCostType

export interface IDataContractType {
  key: React.Key;
  index: number;
  agreement_id: string,
  loan_status: string,
  first_name: string,
  last_name: string,
  middle_name?: string,
  phone_number: string,
  loan_amount: string,
  due_date: string,
  issue_date: string,
  repayment_schedule_type: string,
  loan_account_id: string,
  loan_term: string,
  interest_account_id: string,
  overdue_account_id: string,
  liquidation_account_id: string,
  branch_id: string,
  pin: number,
  passport_series: string,
  passport_number: number
}

export interface IDataClientType {
  key: React.Key,
  index: number,
  id: string,
  first_name: string,
  last_name: string,
  middle_name?: string,
  pin: string,
  passport_series: string,
  passport_number: string,
  phone_number: string,
  birth_date: string,
  sum: number,
  status: string,
}

export interface IDataKatmType {
  key: React.Key,
  index: number,
  time: string,
  name: string,
  status: string,
  cancel: string,
  regN: string,
  Position: string,
  generalSum: number
}
export interface ISMSDataType {
  key: React.Key,
  index: number,
  id: number,
  phoneN: string,
  dateTime: string,
  SMSConent: string,
  status: string
}

export interface IDataFilialType {
  key: React.Key,
  index: number,
  filial: string,
  director: string,
  accountant: string,
  intController: string,
  location: string,
  phoneN: string,
  MFO: string,
  bankName: string,
  iban: string,
  limitCash: number,
  detailsAcc: string,
  notarius: string,
  ATK: string,
};

export interface IDataEmployeeType {
  id?: Number,
  key: React.Key,
  index: number,
  login: string,
  first_name: string,
  last_name: string,
  middle_name: string,
  state: string,
  job_title: string,
  workterm: number,
  role_id: string,
  fprint: number,
  language: string,
  seekdays: string,
  grade: number
};

export interface IKatmDialogType {
  key: React.Key,
  index: number,
  day: string,
  docN: string,
  status: string
}

export interface ISeekDayDialogType {
  key: React.Key,
  index: number,
  day: string,
  month: string,
  year: string,
  reason: string,
  dateOfChange: string
}
export interface IdataKATMrequestDialog {
  key: React.Key,
  index: number,
  id: number,
  status: string,
  regN: string,
  Position: string,
  generalSum: string
}

export interface ICashDebitType {
  key: React.Key,
  index: number,
  time: string,
  name: string,
  base: string,
}
export interface IReceivedType {
  key: React.Key,
  index: number,
  dateOfContract: string,
  dateOfCredit: string,
  creditExpirationDate: string,
  creditAmount: number,
  annual: number,
  purposeOfCredit:string,
}
export interface ILowCostType {
  key: React.Key,
  index: number,
  dateOfContract: string,
  nameOfItem: string,
  measurmentUnit: string,
}
