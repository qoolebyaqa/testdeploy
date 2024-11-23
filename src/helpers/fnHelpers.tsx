import { TableColumnsType } from "antd";
import {
  IDataClientType,
  IDataContractType,
  IDataEmployeeType,
  IDataFilialType,
  IDataKatmType,
  IKatmDialogType,
  ISeekDayDialogType,
  ISMSDataType,
  ICashDebitType,
  IReceivedType,
  ILowCostType,
  NOTIFICATION_STATUS,
  IFileSlide,
  IBase64Slide,
} from "./types";
import SVGComponent from "../components/UI/SVGComponent";
import i18next from '../i18n.js'
import store from "../store/index.js";
import { clientActions } from "../store/client.js";

export function generateBreads(stepName:string | null, maxStep: number) {
  const breadsArr = [{id: 0, step: 'initial', title: 'Создание клиента'}, {id: 1, step: 'hold', title: 'Договор'}, {id: 2, step: 'collateral', title: 'Залог'}, {id: 3, step: 'credit', title: 'Выдача кредита'}, {id: 4, step: 'deal_info', title: 'Данные сделки'}];
  const mappedArr = stepName ? breadsArr.slice(0, maxStep + 1) : breadsArr

      return <div className="flex">
      {mappedArr.map(crumb => (
        <p className="hover:cursor-pointer" key={crumb.title} onClick={(e) => {e.stopPropagation(); store.dispatch(clientActions.setStepState({id: crumb.id, step: crumb.step}))}}> / {crumb.title}</p>))}
      </div>
}

export function nonSpacedNonSymbols(value: string, withSpaces: boolean = false) {
  return withSpaces ? value.replace(/[^\w\s]/g, '') : value.replace(/[^\w]/g, '')
} 

export function nonNumberUpperCaseValue(value: string) {
  return value.replace(/[0-9]/, '').toUpperCase()
} 

export function convertDataToList4DropDown(data: any[]) {
  return data.map(val => ({label: val.name, key: val.id, enum: val.id}))
}

export const filteredObject = (formData: {}) => Object.entries(formData).reduce((acc:any, [key, value]) => {
  if (value !== "") {
      acc[key] = value;
  }
  return acc;
}, {});

export async function convertSlides(
  slides: IFileSlide[]
): Promise<IBase64Slide[]> {
  async function fetchBlobFromUrl(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    return response.blob();
  }
  function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
  const base64SlidesPromise = slides.map(async (slide) => {
    const blob = await fetchBlobFromUrl(slide.fileUrl);
    const base64 = await blobToBase64(blob);
    return {
      fileId: slide.fileId,
      fileUrl: slide.fileUrl,
      fileData: base64,
    } as IBase64Slide;
  });

  return Promise.all(base64SlidesPromise);
}
export function Copier<T extends { index?: number; key?: number; id: number }>(
  obj: T,
  quantity?: number
): T[] {
  const arr = [];
  let n = quantity ? quantity : 100;
  for (let i = 0; i < n; i++) {
    const obj1 = { ...obj };
    obj1.index = i + 1;
    obj1.key = i + 1;
    obj1.id = i + 1;
    arr.push(obj1);
  }
  return arr;
}

export function getFilter(obj: any) {
  let totalFilter = "";
  for (let item in obj) {
    if (obj[item]) {
      totalFilter += `&${item}=${obj[item]}`;
    }
  }
  return totalFilter;
}

export function parseFilters(filterValue: string) {
  const filterArr = filterValue
    .slice(1)
    .split("&")
    .map((val) => val.split("="));
  return Object.fromEntries(filterArr);
}

export function getSort(currentSortQuery: string, field: string) {
  if (currentSortQuery.includes(field)) {
    if (currentSortQuery.includes("asc")) {
      return `sort=${field}:desc`;
    }
    return "";
  } else {
    return `sort=${field}:asc`;
  }
}

export function getUserNav(user: string) {
  if (user === "ADMIN") {
    return [
      { titleBtn: "Сотрудники", svgCase: "employees", path: "/employees" },
      { titleBtn: "Рассылка", svgCase: "sms", path: "/sms" },
      { titleBtn: "Управления", svgCase: "filials", path: "/filials" },
      { titleBtn: "Мониторинг", svgCase: "sms", path: "/monitoring" },
    ];
  }
  if (user === "ACCOUNTANT") {
    return [
      {
        path: "/accountant/operations/debet",
        svgCase: "operation",
        titleBtn: "Операции",
        cashRoot: "operations",
      },
      { path: "/accountant/bills", svgCase: "bills", titleBtn: "Счета" },
      { path: "/accountant/deals", svgCase: "bills", titleBtn: "Сделки" },
      {
        path: "/accountant/proccess",
        svgCase: "proccess",
        titleBtn: "Процессы",
      },
      { path: "/accountant/reports", svgCase: "reports", titleBtn: "Отчёты" },
      {
        path: "/accountant/monitoring",
        svgCase: "filials",
        titleBtn: "Управления",
      },
    ];
  }
  return [
    { titleBtn: 'navigation.operator.clients', svgCase: "clients", path: "/clients", },
    { titleBtn: "navigation.operator.contracts", svgCase: "contracts", path: "/contracts" },
    { titleBtn: "navigation.operator.katm", svgCase: "KATM", path: "/katm" },
    { titleBtn: "navigation.operator.messaging", svgCase: "sms", path: "/sms" },
  ];
}

export async function convertTo64(file: Blob) {
  try {
    const reader = new FileReader();
    const result = await new Promise<string | ArrayBuffer | null>(
      (resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      }
    );

    return result;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

const classesForSortIcon = "flex justify-around gap-4 items-center";
const titleWIthIcon = (
  title: string,
  setSort?: any,
  currentSort?: string,
  key?: string
) => {
  const sort =
    typeof currentSort === "string" && key && getSort(currentSort, key);
  const handleClick = () => {
    setSort(sort);
  };
  return (
    <div className={classesForSortIcon}>
      <p>{title}</p>
      <button onClick={handleClick} className="p-0">
        <SVGComponent
          title="sortArrows"
          color={`${key && currentSort?.includes(key) ? "green" : "#D2DBE1"}`}
        />
      </button>
    </div>
  );
};

///mockData:
///Filials
export const columnsForFilials: TableColumnsType<IDataFilialType> = [
  {
    title: "№",
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: "Филиал",
    dataIndex: "filial",
    sorter: (_a, _b) => 0,
  },
  {
    title: "Директор",
    dataIndex: "director",
    sorter: (_a, _b) => 0,
  },
  {
    title: "Бухгалтер",
    dataIndex: "accountant",
  },
  {
    title: "Сотрудник внутреннего контроля",
    dataIndex: "intController",
  },
  {
    title: "Местоположение",
    dataIndex: "location",
  },
  {
    title: "Номер телефона",
    dataIndex: "phoneN",
  },
  {
    title: "МФО номер банка ломбарда",
    dataIndex: "MFO",
  },
  {
    title: "Название банка ломбарда",
    dataIndex: "bankName",
  },
  {
    title: "Счет ломбарда",
    dataIndex: "iban",
  },
  {
    title: "Лимит кассы",
    dataIndex: "limitCash",
  },
  {
    title: "Реквизиты ломбарда",
    dataIndex: "detailsAcc",
  },
  {
    title: "ФИО нотариуса",
    dataIndex: "notarius",
  },
  {
    title: "Реквизиты АТК сверка залогов",
    dataIndex: "ATK",
  },
];
const itemFilial = {
  key: 1,
  id: 1,
  index: 1,
  filial: "Мирабад",
  director: "Каримов Р.",
  accountant: "Норкузиева И.",
  intController: "Алижонов А.",
  location: "г. Жиззах, ул. Кассоблик 5",
  phoneN: "+998 (99) 088-80-60",
  MFO: "00440",
  bankName: "Узсаноаткурилишбанк АТБ Жиззах БХО",
  iban: "20216055454064064045",
  limitCash: 1000000,
  detailsAcc: "209 652 903",
  notarius: "Абдурахмонов С.А.",
  ATK: "Максимум Ломбард",
};
export const dataFilials: IDataFilialType[] = Copier(itemFilial);

///notification
export const columnsForSMS = (
  list: ISMSDataType[],  
  setTblHeaderFilter: any
): TableColumnsType<ISMSDataType> => [
  {
    title: "№",
    key: "index",
    dataIndex: "index",
    render: (_text, _record, index) => `${index + 1}`,
  },
  {
    title: "ID",
    key: "id",
    dataIndex: "id",
  },
  {
    title: "Номер телефона",
    dataIndex: "recipient_address",
    key: "recipient_address",
  },
  {
    title: "Тип",
    dataIndex: "channel",
    key: "channel",
    onHeaderCell: (record) => {
      return {
        onDoubleClick: (e) => {e.stopPropagation(); setTblHeaderFilter(record.key)},
      };
    },
  },
  {
    title: "Дата и время",
    dataIndex: "scheduled_at",
    key: "scheduled_at",
  },
  {
    title: `СМС (общий: ${list.length}, отправлено: ${
      list.filter((val) => val.status === "SENT").length
    }, Ожидание: ${list.filter((val) => val.status === "PENDING").length})`,
    dataIndex: "message",
    key: "message",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    onHeaderCell: (record) => {
      return {
        onDoubleClick: (e) => {e.stopPropagation(); setTblHeaderFilter(record.key)},
      };
    },
    render: (status: "SENT" | "FAILED" | "PENDING" | "SENDING") => {
      const cellStyles = (status: string) => {
        switch (status) {
          case "SENT":
            return "text-lombard-btn-green";
          case "FAILED":
            return "text-lombard-btn-red";
          case "PENDING":
            return "text-lombard-btn-yellow";
          case "SENDING":
            return "text-lombard-main-blue";
          default:
            return "";
        }
      };
      return (
        <div className={cellStyles(status)}>{NOTIFICATION_STATUS[status]}</div>
      );
    },
  },
  {
    title: "Шаблон",
    dataIndex: "template_id",
    key: "template_id",
  },
];

///employees
export const columnsForEmployees: TableColumnsType<IDataEmployeeType> = [
  {
    title: "№",
    key: "index",
    dataIndex: "index",
    render: (_text, _record, index) => `${index + 1}`,
  },
  {
    title: titleWIthIcon("Логин"),
    key: "login",
    dataIndex: "login",
    sorter: true,
  },
  {
    title: titleWIthIcon("ФИО"),
    key: "firstName",
    dataIndex: "first_name",
    render: (_text, record) =>
      `${record.first_name} ${record.last_name} ${record.middle_name || ""}`,
    sorter: true,
  },
  {
    title: "Статус",
    key: "state",
    dataIndex: "state",
  },
  {
    title: "Должность",
    key: "job_title",
    dataIndex: "job_title",
  },
  {
    title: "Ставка",
    key: "workterm",
    dataIndex: "workterm",
  },
  {
    title: "Пользватель",
    key: "role_id",
    dataIndex: "role_id",
  },
  {
    title: "Отпечаток пальца",
    key: "fprint",
    dataIndex: "fprint",
  },
  {
    title: "Язык",
    key: "language",
    dataIndex: "language",
  },
  {
    title: "Выходные",
    key: "seekdays",
    dataIndex: "seekdays",
  },
  {
    title: "Оценка",
    key: "grade",
    dataIndex: "grade",
  },
];

///katm
export const columnsForKATM: TableColumnsType<IDataKatmType> = [
  {
    title: titleWIthIcon("№"),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("Дата и время"),
    dataIndex: "time",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("ФИО"),
    dataIndex: "name",
    sorter: (_a, _b) => 0,
  },
  {
    title: "Статус",
    dataIndex: "status",
  },
  {
    title: "Отменить",
    dataIndex: "cancel",
  },
  {
    title: "Номер регистрации",
    dataIndex: "regN",
  },
  {
    title: "Должность",
    dataIndex: "Position",
  },
  {
    title: "Основная сумма",
    dataIndex: "generalSum",
  },
];
export const itemKATM = {
  key: 1,
  id: 1,
  index: 1,
  time: "54",
  name: "Zukhriddinov Jamoliddin Azimjonovich",
  status: "10/5505",
  cancel: "отмена",
  regN: "14",
  Position: "Оператор",
  generalSum: 17420,
};
export const dataKATM: IDataKatmType[] = Copier(itemKATM);

///main(clients)
export const getColumnsForClients = (
  setSort: any,
  currentSort: string,
  setTblHeaderFilter?: any
): TableColumnsType<IDataClientType> => [
  {
    title: "№",
    key: "index",
    dataIndex: "index",
  },
  {
    title: titleWIthIcon(i18next.t('clients.columns.id'), setSort, currentSort, "id"),
    key: "id",
    dataIndex: "id",
  },
  {
    title: titleWIthIcon(i18next.t('clients.columns.fio'), setSort, currentSort, "first_name"),
    key: "first_name",
    dataIndex: "first_name",
    onHeaderCell: setTblHeaderFilter? (record) => {
      return {
        onDoubleClick: (e) => {e.stopPropagation(); setTblHeaderFilter(record.key)},
      };
    }: undefined,
    render: (_text, record) =>
      `${record.first_name} ${record.last_name} ${record.middle_name || ""}`,
  },
  {
    title: i18next.t('clients.columns.jshir'),
    key: "pinfl",
    dataIndex: "pin",
    onHeaderCell: setTblHeaderFilter? (record) => {
      return {
        onDoubleClick: (e) => {e.stopPropagation(); setTblHeaderFilter(record.key)},
      };
    }: undefined,
  },
  {
    title: i18next.t('clients.columns.passport'),
    key: "passport",
    dataIndex: "passport_series",
    onHeaderCell: setTblHeaderFilter? (record) => {
      return {
        onDoubleClick: (e) => {e.stopPropagation(); setTblHeaderFilter(record.key)},
      };
    }: undefined,
    render: (_text, record) =>
      `${record.passport_series || ""} ${record.passport_number || "-"}`,
  },
  {
    title: i18next.t('clients.columns.phone'),
    key: "phone_number",
    dataIndex: "phone_number",
    onHeaderCell: setTblHeaderFilter? (record) => {
      return {
        onDoubleClick: (e) => {e.stopPropagation(); setTblHeaderFilter(record.key)},
      };
    }: undefined,
  },
  {
    title: i18next.t('clients.columns.birthday'),
    key: "birth_date",
    dataIndex: "birth_date",
  },
  {
    title: i18next.t('clients.columns.sum'),
    key: "sum",
    dataIndex: "sum",
  },
  {
    title: i18next.t('clients.columns.status'),
    key: "status",
    dataIndex: "status",
  },
];

///contracts
export const getColumnsForContracts = (): TableColumnsType<IDataContractType> => [
  {
    title: titleWIthIcon("№"),
    dataIndex: "index",
    key: "index"
  },
  {
    title: titleWIthIcon("id"),
    dataIndex: "agreement_id",
    key: "agreement_id"
  },
  {
    title: titleWIthIcon("Статус договора"),
    dataIndex: "loan_status",
    key: "loan_status"
  },
  {
    title: 'ФИО клиента',
    key: "first_name",
    dataIndex: "first_name",
    render: (_text, record) =>
      `${record.first_name} ${record.last_name} ${record.middle_name || ""}`,
  },
  {
    title: "Номер телефона",
    dataIndex: "phone_number",
    key: "phone_number"
  },
  {
    title: "Сумма договора",
    dataIndex: "loan_amount",
    key: "loan_amount"
  },
  {
    title: "Условия",
    dataIndex: "loan_term",
    key: "loan_term"
  },
  {
    title: "Дата выпуска",
    dataIndex: "issue_date",
    key: "issue_date"
  },
  {
    title: "Дата окончания",
    dataIndex: "due_date",
    key: "due_date"
  },
  {
    title: "Тип графика",
    dataIndex: "repayment_schedule_type",
    key: "repayment_schedule_type"
  },
  {
    title: "ID аккаунта",
    dataIndex: "loan_account_id",
    key: "loan_account_id"
  },
  {
    title: "ID аккаунта interest",
    dataIndex: "interest_account_id",
    key: "interest_account_id"
  },
  {
    title: "ID аккаунта overdue",
    dataIndex: "overdue_account_id",
    key: "overdue_account_id"
  },
  {
    title: "ID аккаунта liquidation",
    dataIndex: "liquidation_account_id",
    key: "liquidation_account_id"
  },
  {
    title: "Филиал",
    dataIndex: "branch_id",
    key: "branch_id"
  },
  {
    title: "ПИНФЛ",
    dataIndex: "pin",
    key: "pin"
  },
  {
    title: 'Паспорт',
    key: "passport_series",
    dataIndex: "passport_series",
    render: (_text, record) =>
      `${record.passport_series || ""} ${record.passport_number || "-"}`,
  }
];

///KATMRequests short dialog
export const columnsKatmDialog: TableColumnsType<IKatmDialogType> = [
  {
    title: titleWIthIcon("ID"),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("День"),
    dataIndex: "day",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Номер №"),
    dataIndex: "docN",
    sorter: (_a, _b) => 0,
  },
  {
    title: "Статус",
    dataIndex: "status",
  },
];
export const itemKatmDialog = {
  key: 1,
  id: 1,
  index: 1,
  day: "16.03.2024",
  docN: "24071000017",
  status: "-1",
};
export const dataKatmDialog: IKatmDialogType[] = Copier(itemKatmDialog);

///seekdays short dialog
export const columnsSeekDaysDialog: TableColumnsType<ISeekDayDialogType> = [
  {
    title: titleWIthIcon("№"),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("День"),
    dataIndex: "day",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Месяц"),
    dataIndex: "month",
    sorter: (_a, _b) => 0,
  },
  {
    title: "Год",
    dataIndex: "year",
  },
  {
    title: "Основание",
    dataIndex: "reason",
  },
  {
    title: "День активации",
    dataIndex: "dateOfChange",
  },
];
export const itemSeekDaysDialog = {
  key: 1,
  index: 1,
  id: 1,
  day: "1, 2, 6, 12, 14, 28, 29",
  month: "Февраль",
  year: "2024",
  reason: "День отдыха",
  dateOfChange: "01.05.2024",
};
export const dataSeekDaysDialog: ISeekDayDialogType[] =
  Copier(itemSeekDaysDialog);

//katm modal
export const columnsForKATMrequestDialog: TableColumnsType<IKatmDialogType> = [
  {
    title: titleWIthIcon("ID"),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("День"),
    dataIndex: "day",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Номер №"),
    dataIndex: "docN",
    sorter: (_a, _b) => 0,
  },
  {
    title: "Статус",
    dataIndex: "status",
  },
];
export const itemKATMrequestDialog = {
  key: 1,
  id: 1,
  index: 1,
  day: "16.03.2024",
  docN: "24071000017",
  status: "-1",
};
export const dataKATMrequestDialog: IKatmDialogType[] = Copier(
  itemKATMrequestDialog,
  2
);

//cashDebit
export const columnsForCashDebit: TableColumnsType<IDataKatmType> = [
  {
    title: titleWIthIcon("№"),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("День"),
    dataIndex: "time",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("ФИО"),
    dataIndex: "name",
    sorter: (_a, _b) => 0,
  },
  {
    title: "Основание",
    dataIndex: "base",
  },
];
export const itemCashDebit = {
  key: 1,
  index: 1,
  id: 1,
  time: "01.01.2024",
  name: "Zukhriddinov Jamoliddin Azimjonovich",
  base: "TEST",
};
export const dataCashDebit: ICashDebitType[] = Copier(itemCashDebit);

//cashCredit
export const columnsForCashCredit: TableColumnsType<IDataKatmType> = [
  {
    title: titleWIthIcon("№"),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("Номер регистрации"),
    dataIndex: "index",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("День"),
    dataIndex: "time",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("ФИО"),
    dataIndex: "name",
    sorter: (_a, _b) => 0,
  },
  {
    title: "Основание",
    dataIndex: "base",
  },
];
export const itemCashCredit = {
  key: 1,
  index: 1,
  id: 1,
  time: "01.01.2024",
  name: "Zukhriddinov Jamoliddin Azimjonovich",
  base: "TEST",
};
export const dataCashCredit: ICashDebitType[] = Copier(itemCashCredit);

//recieved
export const columnsForReceived: TableColumnsType<IDataKatmType> = [
  {
    title: titleWIthIcon("№"),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("Дата договора"),
    dataIndex: "dateOfContract",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Дата кредитования"),
    dataIndex: "dateOfCredit",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Срок окончания кредита"),
    dataIndex: "creditExpirationDate",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Сумма кредита"),
    dataIndex: "creditAmount",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Годовой процент (%)"),
    dataIndex: "annual",
    sorter: (_a, _b) => 0,
  },
  {
    title: "Цель кредита",
    dataIndex: "purposeOfCredit",
  },
];
export const itemReceived = {
  key: 1,
  index: 1,
  id: 1,
  dateOfContract: "01.01.2024",
  dateOfCredit: "01.01.2024",
  creditExpirationDate: "01.01.2024",
  creditAmount: 1000000000,
  annual: 22,
  purposeOfCredit: "AANSNDH№10",
};
export const dataReceived: IReceivedType[] = Copier(itemReceived);

//Low Cost
export const columnsForLowCost: TableColumnsType<IDataKatmType> = [
  {
    title: titleWIthIcon("№"),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("Дата "),
    dataIndex: "dateOfContract",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Названия предмета"),
    dataIndex: "nameOfItem",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Единица измерения"),
    dataIndex: "measurmentUnit",
    sorter: (_a, _b) => 0,
  },
];
export const itemLowCost = {
  key: 1,
  index: 1,
  id: 1,
  dateOfContract: "01.01.2024",
  nameOfItem: "Названия предмета",
  measurmentUnit: "01.01.2024",
};
export const dataLowCost: ILowCostType[] = Copier(itemLowCost);
