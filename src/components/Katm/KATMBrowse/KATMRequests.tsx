import DragNDrop from "../../UI/DragNDrop";
import CollapseTable, { ITableControl } from "../../UI/CollapseTable";

function KATMRequests({ columns, data, selectHandler }: ITableControl) {
  const tableControl = {selectHandler, columns, data};
  return (
    <div className="w-4/5">
      <CollapseTable tableControl={tableControl} height={240} title="КАТМ запросы" svg="refreshArrows"/>
      <div className="m-2 bg-white rounded-2xl  p-2 h-[400px] text-black border-2">
      <h3 className="py-4  font-extrabold border-b-[1px] mb-2">Загрузить справку</h3>
        <DragNDrop />
      </div>
    </div>
  );
}

export default KATMRequests;
