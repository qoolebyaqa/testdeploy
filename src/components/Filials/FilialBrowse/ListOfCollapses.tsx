import { columnsSeekDaysDialog, dataSeekDaysDialog } from "../../../helpers/fnHelpers";
import CollapseTable from "../../UI/CollapseTable";

function ListOfCollapses() {
  const tables = [
    { title: "Дни отдыха", height: 240, controls: {columns: columnsSeekDaysDialog, data: dataSeekDaysDialog, selectHandler: () => {} }},
    { title: "Кредитные продукты", height: 240, controls: {columns: columnsSeekDaysDialog, data: dataSeekDaysDialog, selectHandler: () => {} }},
    { title: "Параметры залогов", height: 240, controls: {columns: columnsSeekDaysDialog, data: dataSeekDaysDialog, selectHandler: () => {} }},
    { title: "Счета филиалов", height: 240, controls: {columns: columnsSeekDaysDialog, data: dataSeekDaysDialog, selectHandler: () => {} }},
  ];

  return (
    <ul className="w-3/5 list-none flex flex-col gap-2">
      {tables.map(table => 
        <li key={table.title}>
          <CollapseTable height={table.height} title={table.title} tableControl={table.controls}/>
        </li>
      )}
    </ul>
  );
}

export default ListOfCollapses;
