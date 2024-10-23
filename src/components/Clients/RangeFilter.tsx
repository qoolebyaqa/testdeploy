import { useState } from "react";
import SVGComponent from "../UI/SVGComponent";
import { DatePicker, Slider } from "antd";
import CustomInput from "../UI/CustomInput";
import type { Dayjs } from 'dayjs';

function RangeFilter({
  titleFilter,
  iconInput,
}: {
  titleFilter?: string;
  iconInput: string;
}) {
  const [visible, setVisible] = useState(false);
  const [dateValues, setDateValues] = useState<string[]>([]);

  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";

  return (
    <div className="h-[60px] flex items-center relative">
      {iconInput !== "arrow" && titleFilter && (<>
        <CustomInput name={titleFilter} type="text" placeholder={titleFilter} value={dateValues.join('-')} onClick={() => setVisible(true)} className="relative z-10 h-[34px] w-[220px] left-[0px] text-xs"/>
        <div className="absolute z-30 h-[22px] right-[10px]"><SVGComponent title={iconInput} /></div>
        <RangePicker
          onOpenChange={() => setVisible(false)}
          open={visible}
          onChange={(_dates: null | (Dayjs | null)[], dateStrings: string[]) => {setVisible(false); setDateValues(dateStrings)}}
          format={dateFormat}
          width={0}
          separator={''}
          style={{ width: "1px", height: '0px', position: "absolute"}}
        /></>
      )}
      {!titleFilter && (
        <button className="bg-white rounded-md h-[32px] p-1">
          <i><SVGComponent title={iconInput} /></i>
        </button>
      )}
      {iconInput === "arrow" && (
        <>
          <button
            className="flex bg-white text-black rounded-md h-[32px] text-[14px] py-1"
            onClick={() => {
              setVisible((prev) => !prev);
            }}
          >
            {titleFilter}
            <i>
              <SVGComponent title={iconInput} />
            </i>
          </button>
          {visible && (
            <div className="relative top-2 z-10">
              <div className="h-[60px] w-[100px] absolute bg-lombard-borders-grey rounded-md border-2 border-lombard-text-black top-4 -right-2">
                <Slider range defaultValue={[20, 50]} className="absolute h-[60px] w-[100px] top-4" /* onChange={onChange} onChangeComplete={onChangeComplete} *//>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RangeFilter;
