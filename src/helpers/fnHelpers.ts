import { IDataClientType, IDataContractType, IDataEmployeeType } from "./types";

export const regDropDowns = [
  {
    label: "Должность", 
    name: "position",
    items: [{label: 'Директор', key: 1}, {label: 'Бухгалтер', key: 2}, {label: 'Специалист', key: 3}]
  },
  {
    label: "Ставка",
    name: "workterm",
    items: [{label: '0.25', key: 1}, {label: '0.5', key: 2}, {label: '1', key: 3}]
  },
  {
    label: "Пользователь", 
    name: "role",
    items: [{label: 'Пользователь', key: 1}, {label: 'Админ', key: 2}]
  },
  {
    label: "Выходные дни", 
    name: "seekday",
    items: [{label: 'Воскресенье', key: 1}, {label: 'Суббота', key: 2}, {label: 'Суббота, Воскресенье', key: 3}]
  },
  {
    label: "Оценка", 
    name: "rate",
    items: [{label: '5', key: 1}, {label: '4', key: 2}, {label: '3', key: 3}]
  },
  {
    label: "Филиалы", 
    name: "filials",
    items: [{label: 'MU', key: 1}, {label: 'MA', key: 2}, {label: 'YA', key: 3}]
  },
  {
    label: "Место рождения", 
    name: "birthPlace",
    items: [{label: 'Tashkent', key: 1}, {label: 'Urgench', key: 2}, {label: 'Termez', key: 3}]
  },
  {
    label: "Гражданство", 
    name: "birthPlace",
    items: [{label: 'Узбекистан', key: 1}, {label: 'Экспат', key: 2}]
  }
]

export function CopierContract(obj: IDataContractType) {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    const obj1 = { ...obj };
    obj1.index = i + 1;
    obj1.key = i + 1;
    arr.push(obj1);
  }
  return arr;
}

export function CopierClient(obj: IDataClientType) {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    const obj1 = { ...obj };
    obj1.index = i + 1;
    obj1.key = i + 1;
    arr.push(obj1);
  }
  return arr;
}
export function CopierEmployee(obj: IDataEmployeeType) {
  const arr = [];
  for (let i = 0; i < 60; i++) {
    const obj1 = { ...obj };
    obj1.index = i + 1;
    obj1.key = i + 1;
    arr.push(obj1);
  }
  return arr;
}

export function toDefineItemsPerPage(length: number) {
  if (length < 50) {
    return new Array(length).fill(0).map((_item, index) => index+1)
  }
  if (length < 101) {
    return new Array(length/10).fill(0).map((_item, index) => (index+1)*10)
  }
  else {
    return new Array(length/100).fill(0).map((_item, index) => (index+1)*100)
  } 
}
