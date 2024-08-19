import { TableColumnsType } from "antd";
import { IDataClientType, IDataContractType, IDataEmployeeType, IDataFilialType, IDataKatmType, IKatmDialogType, ISeekDayDialogType, ISMSDataType } from "./types";
import SVGComponent from "../components/UI/SVGComponent";
import { Checkbox } from "antd";

export function Copier<T extends { index?: number; key?: number }>(obj: T): T[] {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    const obj1 = { ...obj };
    obj1.index = i + 1;
    obj1.key = i + 1;
    arr.push(obj1);
  }
  return arr;
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

///SMS
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
  {
    title: () => <Checkbox />,
    dataIndex: "checkbox",
    render: () => <Checkbox />,

  },
];
export const itemSMS = {
  key: 1,
  index: 1,
  id: 1,
  phoneN: "+998 (99) 088-80-60",
  dateTime: "01.01.2024 09:08",
  SMSConent: "UzLombard. по номеру договора 9/24827 118911000 оплачено. Основная сумма: 11500000, процент: 391000",
  status: 'Отправлено',
  checkbox: <Checkbox onChange={() => {}} />
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
    dataIndex: "status",
  },
  {
    title: "Должность",
    dataIndex: "position",
  },
  {
    title: "Ставка",
    dataIndex: "workterm",
  },
  {
    title: "Пользватель",
    dataIndex: "role",
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
  },
  {
    title: "Действия",
    dataIndex: "actionsEmployee",
  },
]
export const itemEmployee = {
  key: 1,
  index: 1,
  login: "Rushana-adm",
  name: "Narmuratova Rushana Maxmatmurodovna",
  position: "Директор",
  status: "Актив",
  workterm: 1,
  role: "Админ",
  fprint: 10,
  language: "English",
  seekdays: "Воскресенье",
  grade: 5,
  actionsEmployee: null
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
  {
    title: "Действия",
    dataIndex: "actions",
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
  generalSum: 17420,
  actions: 'yes/no'
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
    dataIndex: "clientID",
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
    title: "Дата рождения",
    dataIndex: "dateBirth",
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
  key: 1,
  index: 1,
  clientID: "14",
  name: "Zukhriddinov Jamoliddin Azimjonovich",
  jshir: "123456789012345",
  passport: "AD 1234567",
  phoneN: "+998 (__) ___-__-__",
  dateBirth: "01.01.2024",
  sum: 50000000,
  status: "-",
};
export const dataClients: IDataClientType[] = Copier(itemClient);

///contracts
export const columnsForContracts: TableColumnsType<IDataContractType> = [
  {
    title: titleWIthIcon('№'),
    dataIndex: "index",
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: titleWIthIcon("Договор"),
    dataIndex: "contract",
    sorter: (_a, _b) => 0,
  },
  {
    title: titleWIthIcon("ФИО"),
    dataIndex: "name",
    sorter: (_a, _b) => 0,
  },
  {
    title: "Дата выдачи",
    dataIndex: "releaseDate",
  },
  {
    title: "Сумма",
    dataIndex: "sum",
  },
  {
    title: "Продления",
    dataIndex: "prolongationDate",
  },
  {
    title: "Данные паспорта",
    dataIndex: "passprotInfo",
  },
  {
    title: "№ ячейки",
    dataIndex: "cellNumber",
  },
];
export const itemContract = {
  key: 1,
  index: 1,
  contract: "10/5505",
  name: "Narmuratova Rushana Maxmatmurodovna",
  releaseDate: "20.03.2024",
  sum: 500000,
  prolongationDate: "11.09.2025",
  passprotInfo: "AA 4948750 01.04.2014 G’allaorol TIIB Marjonbuloq SHMB",
  cellNumber: "-",
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