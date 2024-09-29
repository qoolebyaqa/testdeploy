import { TableColumnsType } from "antd";
import { IDataClientType, IDataContractType, IDataEmployeeType, IDataFilialType, IDataKatmType, IKatmDialogType, ISeekDayDialogType, ISMSDataType } from "./types";
import SVGComponent from "../components/UI/SVGComponent";

export function Copier<T extends { index?: number; key?: number }>(obj: T, quantity?: number): T[] {
  const arr = [];
  let n = quantity ? quantity : 100
    for (let i = 0; i < n; i++) {
      const obj1 = { ...obj };
      obj1.index = i + 1;
      obj1.key = i + 1;
      arr.push(obj1);
    } 
  return arr;
}

export function getUserNav(user:string) {
  if(user === 'ADMIN') {
    return [
      { titleBtn: "Сотрудники", svgCase: "employees", path: "/employees" },
      { titleBtn: "Рассылка", svgCase: "sms", path: "/sms" },
      { titleBtn: "Управления", svgCase: "filials", path: "/filials" },
      { titleBtn: "Мониторинг", svgCase: "sms", path: "/monitoring" },
    ]
  }
  if (user === 'ACCOUNTANT') {
    return [
      { path: "/accountant/operations/debet", svgCase: "filials", titleBtn: "Операции", cashRoot: 'operations' },
      { path: "/accountant/bills", svgCase: "filials", titleBtn: "Счета"  },
      { path: "/accountant/deals", svgCase: "filials", titleBtn: "Сделки" },
      { path: "/accountant/proccess", svgCase: "filials", titleBtn: "Процессы" },
      { path: "/accountant/reports", svgCase: "filials", titleBtn: "Отчёты" },
      { path: "/accountant/monitoring", svgCase: "filials", titleBtn: "Управления" },
    ];
  } return [
      { titleBtn: "Клиенты", svgCase: "contracts", path: "/clients" },
      { titleBtn: "Договоры", svgCase: "contracts", path: "/contracts" },
      { titleBtn: "КАТМ", svgCase: "KATM", path: "/katm" },
      { titleBtn: "Рассылка", svgCase: "sms", path: "/sms" },
    ]
}

export function toDefineItemsPerPage(length: number) {
  if (length < 50) {
    return new Array(length).fill(0).map((_item, index) => index + 1)
  }
  if (length < 101) {
    return new Array(length / 10).fill(0).map((_item, index) => (index + 1) * 10)
  }
  else {
    return new Array(length / 100).fill(0).map((_item, index) => (index + 1) * 100)
  }
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
    console.error('Error reading file:', error);
    throw error;
  }
}


const classesForSortIcon = "flex justify-around";
const titleWIthIcon = (title: string) => <div className={classesForSortIcon}><p>{title}</p><SVGComponent title="sortArrows" /></div>;

///mockData:
///Filials
export const columnsForFilials: TableColumnsType<IDataFilialType> = [
  {
    title: titleWIthIcon('№'),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("Филиал"),
    dataIndex: "filial",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Директор"),
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
  index: 1,
  filial: "Мирабад",
  director: "Каримов Р.",
  accountant: "Норкузиева И.",
  intController: 'Алижонов А.',
  location: "г. Жиззах, ул. Кассоблик 5",
  phoneN: "+998 (99) 088-80-60",
  MFO: "00440",
  bankName: 'Узсаноаткурилишбанк АТБ Жиззах БХО',
  iban: '20216055454064064045',
  limitCash: 1000000,
  detailsAcc: '209 652 903',
  notarius: 'Абдурахмонов С.А.',
  ATK: 'Максимум Ломбард',
};
export const dataFilials: IDataFilialType[] = Copier(itemFilial);

///notification
export const columnsForSMS: TableColumnsType<ISMSDataType> = [
  {
    title: titleWIthIcon('№'),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon('ID'),
    dataIndex: "id",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: titleWIthIcon("Номер телефона"),
    dataIndex: "phoneN",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("Дата и время"),
    dataIndex: "dateTime",
    sorter: (_a, _b) => 0,
  },
  {
    title: "СМС (общий: 402, отправлено: 402, Ожидание: 0)",
    dataIndex: "SMSConent",
  },
  {
    title: "Статус",
    dataIndex: "status",
  },
];
export const itemSMS = {
  key: 1,
  index: 1,
  id: 1,
  phoneN: "+998 (99) 088-80-60",
  dateTime: "01.01.2024 09:08",
  SMSConent: "UzLombard. по номеру договора 9/24827 118911000 оплачено. Основная сумма: 11500000, процент: 391000",
  status: 'Отправлено'
};
export const dataSMS: ISMSDataType[] = Copier(itemSMS);

///employees
export const columnsForEmployees: TableColumnsType<IDataEmployeeType> = [
  {
    title: "№",
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: "Логин",
    dataIndex: "login",
  },
  {
    title: "ФИО",
    dataIndex: "name",
  },
  {
    title: "Статус",
    dataIndex: "state",
  },
  {
    title: "Должность",
    dataIndex: "job_title",
  },
  {
    title: "Ставка",
    dataIndex: "workterm",
  },
  {
    title: "Пользватель",
    dataIndex: "role_id",
  },
  {
    title: "Отпечаток пальца",
    dataIndex: "fprint",
  },
  {
    title: "Язык",
    dataIndex: "language",
  },
  {
    title: "Выходные",
    dataIndex: "seekdays",
  },
  {
    title: "Оценка",
    dataIndex: "grade",
  }
]
export const itemEmployee = {
  key: 1,
  index: 1,
  login: "Rushana-adm",
  name: "Narmuratova Rushana Maxmatmurodovna",
  job_title: "Директор",
  state: "Актив",
  workterm: 1,
  role_id: "Админ",
  fprint: 10,
  language: "English",
  seekdays: "Воскресенье",
  grade: 5,
};
export const dataEmployees: IDataEmployeeType[] = Copier(itemEmployee);

///katm
export const columnsForKATM: TableColumnsType<IDataKatmType> = [
  {
    title: titleWIthIcon('№'),
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
  index: 1,
  time: "54",
  name: "Zukhriddinov Jamoliddin Azimjonovich",
  status: "10/5505",
  cancel: 'отмена',
  regN: "14",
  Position: "Оператор",
  generalSum: 17420
};
export const dataKATM: IDataKatmType[] = Copier(itemKATM);

///main(clients)
export const columnsForClients: TableColumnsType<IDataClientType> = [
  {
    title: titleWIthIcon('№'),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("ID Клиента"),
    dataIndex: "id",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("ФИО клиента"),
    dataIndex: "name",
    sorter: (_a, _b) => 0,
  },
  {
    title: "ПИНФЛ",
    dataIndex: "pin",
  },
  {
    title: "Паспорт",
    dataIndex: "passport",
  },
  {
    title: "Номер телефона",
    dataIndex: "phone_number",
  },
  {
    title: "Дата рождения",
    dataIndex: "birth_date",
  },
  {
    title: "Сумма займа",
    dataIndex: "sum",
  },
  {
    title: "Статус",
    dataIndex: "status",
  },
];
export const itemClient = {
  key: 15,
  index: 2,
  id: "14",
  first_name: "Jamoliddin Azimjonovich",
  last_name: "Zukhriddinov",
  middle_name: "Azimjonovich",
  pin: "123456789012345",
  passport: "AD 1234567",
  phone_number: "+998 (__) ___-__-__",
  birth_date: "01.01.2024",
  sum: 50000000,
  status: "-",
  expire_date: '89348',
  gg: 'something'
};
export const dataClients: IDataClientType[] = Copier(itemClient, 1);

///contracts
export const columnsForContracts: TableColumnsType<IDataContractType> = [
  {
    title: titleWIthIcon('№'),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("Номер договора"),
    dataIndex: "contract",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("ФИО клиента"),
    dataIndex: "name",
    sorter: (_a, _b) => 0,
  },
  {
    title: "ПИНФЛ",
    dataIndex: "jshir",
  },
  {
    title: "Паспорт",
    dataIndex: "passport",
  },
  {
    title: "Номер телефона",
    dataIndex: "phoneN",
  },
  {
    title: "Статус договора",
    dataIndex: "contractStatus",
  },
  {
    title: "Сумма",
    dataIndex: "sum",
  },
];
export const itemContract = {
  key: 1,
  index: 1,
  contract: "10/5505",
  name: "Narmuratova Rushana Maxmatmurodovna",
  jshir: "20.03.2024",
  passport: 'AD 5484456',
  phoneN: "+998 90 123 45 67",
  contractStatus: "-",
  sum: 500000,
};
export const dataContracts: IDataContractType[] = Copier(itemContract);

///KATMRequests short dialog
export const columnsKatmDialog: TableColumnsType<IKatmDialogType> = [
  {
    title: titleWIthIcon('ID'),
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
  }
];
export const itemKatmDialog = {
  key: 1,
  index: 1,
  day: "16.03.2024",
  docN: "24071000017",
  status: "-1"
};
export const dataKatmDialog: IKatmDialogType[] = Copier(itemKatmDialog);

///seekdays short dialog 
export const columnsSeekDaysDialog: TableColumnsType<ISeekDayDialogType> = [
  {
    title: titleWIthIcon('№'),
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
  }
];
export const itemSeekDaysDialog = {
  key: 1,
  index: 1,
  day: '1, 2, 6, 12, 14, 28, 29',
  month: "Февраль",
  year: "2024",
  reason: "День отдыха",
  dateOfChange: '01.05.2024'
};
export const dataSeekDaysDialog: ISeekDayDialogType[] = Copier(itemSeekDaysDialog);

//katm modal
export const columnsForKATMrequestDialog: TableColumnsType<IKatmDialogType> = [
  {
    title: titleWIthIcon('ID'),
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
  }
];
export const itemKATMrequestDialog = {
  key: 1,
  index: 1,
  day: "16.03.2024",
  docN: "24071000017",
  status: "-1"
};
export const dataKATMrequestDialog: IKatmDialogType[] = Copier(itemKATMrequestDialog, 2);
