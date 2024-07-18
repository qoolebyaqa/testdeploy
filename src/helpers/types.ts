import { ReactNode } from "react";
import store from "../store";

export type GlobalStateType = ReturnType<typeof store.getState>;

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
  contractN: string,
  sum: number,
  percentageRage: string,
  dealTime: string,
  issueDate: string,
}

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