import { Table } from "antd";
import CollapseWrapper from "../UI/CollapseWrapper";
import CustomInput from "../UI/CustomInput";
import DropDown from "../UI/DropDown";
import {
  columnsSeekDaysDialog,
  dataSeekDaysDialog,
} from "../../helpers/fnHelpers";

function DayOffSection() {
  return (
    <div className="h-[55vh]">
      <CollapseWrapper title="Дни отдыха" page="newEmployee">
        <div className="flex mb-6 gap-4">
          <DropDown
            label="Начало"
            name="startDay"
            listOfItems={[
              { label: "Воскресенье", key: 1 },
              { label: "Суббота", key: 2 },
            ]}
          />
          <CustomInput
            name="activationDay"
            type="date"
            label="День активации"
          />
        </div>
        <Table
          columns={columnsSeekDaysDialog}
          dataSource={dataSeekDaysDialog}
          pagination={false}
          className="drop-shadow-2xl hover:cursor-pointer h-[240px]"
          bordered
        />
      </CollapseWrapper>
    </div>
  );
}

export default DayOffSection;
