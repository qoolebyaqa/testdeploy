
export enum ROLE_ENUM {
  USER = 'Сотрудник',
  ADMIN = 'Админ',
  ACCOUNTANT = 'Бухгалтер'
} 

export interface IDataContractType {
  key: React.Key;
  index: number;
  contract: string,
  name: string,
  jshir: string,
  passport: string,
  phoneN: string,
  contractStatus: string,
  sum: number,
}

export interface IDataClientType {
  key: React.Key,
  index: number,
  id: string,
  first_name: string,
  last_name: string,
  middle_name?: string,
  pin: string,
  passport: string,
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
  name: string,
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
};
