import { ReactNode } from "react";

export interface IDataContractType {
  key: React.Key;
  index: number;
  contract: string;
  name: string;
  releaseDate: string;
  sum: number;
  prolongationDate: string;
  passprotInfo: string;
  cellNumber: string;
}

export interface IDataClientType {
  key: number,
  index: number,
  clientID: string,
  name: string,
  jshir: string,
  passport: string,
  phoneN: string,
  dateBirth: string,
  sum: number,
  status: string,
}

export interface IDataKatmType {
  key: number,
  index: number,
  time: string,
  name: string,
  status: string,
  cancel: string,
  regN: string,
  Position: string,
  generalSum: number,
  actions: string,
}
export interface ISMSDataType {
  key: React.Key,
  index: number,
  id: number,
  phoneN: string,
  dateTime: string,
  SMSConent: string,
  status: string,
  checkbox: ReactNode
}

export interface IDataFilialType {
    key: number,
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
  key: React.Key,
  index: number,
  login: string,
  name: string,
  status: string,
  position: string,
  workterm: number,
  role: string,
  fprint: number,
  language: string,
  seekdays: string,
  grade: number,
  actionsEmployee: ReactNode | null
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