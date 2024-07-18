import { TableColumnsType } from "antd";
import ButtonComponent from "../UI/ButtonComponent";
import RangeFilter from "./RangeFilter";
import { IDataClientType, IDataContractType } from "../../helpers/types";
import { CopierClient } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useNavigate } from "react-router";
import SVGComponent from "../UI/SVGComponent";

function MainContent() {
  const navigate = useNavigate();
  const classesForSortIcon = "flex justify-center gap-2";

  const titleWIthIcon = (title:string) => <div className={classesForSortIcon}><p>{title}</p><SVGComponent title="sortArrows"/></div>;

  const columnsForClients: TableColumnsType<IDataContractType> = [
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
      title: "Номер договора",
      dataIndex: "contractN",
    },
    {
      title: "Сумма займа",
      dataIndex: "sum",
    },
    {
      title: "Процентная ставка",
      dataIndex: "percentageRage",
    },
    {
      title: "Срок займа в днях/месяцах",
      dataIndex: "dealTime",
    },
    {
      title: "Дата выдачи",
      dataIndex: "issueDate",
    },
  ];
  const item = {
    key: 1,
    index: 1,
    clientID: "54",
    name: "Zukhriddinov Jamoliddin Azimjonovich",
    contractN: "10/5505",
    sum: 500000,
    percentageRage: "14",
    dealTime: "24",
    issueDate: "24.03.2024",
  };
  const dataClients: IDataClientType[] = CopierClient(item);

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Клиенты</h3>
        <div className="flex gap-2 items-center">
          <RangeFilter titleFilter="Дата выдачи" iconInput="calendar"/>
          <RangeFilter titleFilter="Продления" iconInput="calendar"/>
          <RangeFilter titleFilter="Сумма" iconInput="arrow" />
          <RangeFilter iconInput="filters" />
          <ButtonComponent titleBtn="Применить" color="bg-lombard-main-blue" />
          <ButtonComponent titleBtn="Создать" color="bg-lombard-btn-green" clickHandler={() => navigate('/new-client')}/>
        </div>
      </div>
      <DataTable columns={columnsForClients} data={dataClients}/>
    </>
  );
}

export default MainContent;
