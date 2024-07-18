import { TableColumnsType } from "antd";
import ButtonComponent from "../UI/ButtonComponent";
import { IDataContractType } from "../../helpers/types";
import { CopierContract } from "../../helpers/fnHelpers";
import DataTable from "../UI/DataTable";
import { useNavigate } from "react-router";
import SVGComponent from "../UI/SVGComponent";
import RangeFilter from "../Main/RangeFilter";

function ContractsContent() {
  const navigate = useNavigate();
  const classesForSortIcon = "flex justify-center gap-2";

  const titleWIthIcon = (title:string) => <div className={classesForSortIcon}><p>{title}</p><SVGComponent title="sortArrows"/></div>;

  const columnsForContracts: TableColumnsType<IDataContractType> = [
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
  const item = {
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
  const dataContracts: IDataContractType[] = CopierContract(item);

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Договоры</h3>
        <div className="flex gap-1 items-center">
          <RangeFilter titleFilter="Дата выдачи" iconInput="calendar"/>
          <RangeFilter titleFilter="Продления" iconInput="calendar"/>
          <RangeFilter titleFilter="Сумма" iconInput="arrow" />
          <RangeFilter iconInput="filters" />
          <ButtonComponent titleBtn="Применить" color="bg-lombard-main-blue" />
          <ButtonComponent titleBtn="Создать" color="bg-lombard-btn-green" clickHandler={() => navigate('/new-client')}/>
        </div>
      </div>
      <DataTable columns={columnsForContracts} data={dataContracts}/>
    </>
  );
}

export default ContractsContent;
