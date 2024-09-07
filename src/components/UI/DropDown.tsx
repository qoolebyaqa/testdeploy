import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import SVGComponent from "./SVGComponent";
import { useState } from "react";

interface ISelect {
  label: string;
  enumValue?: string | number;
  key: number;
}

interface IDropDownProps {
  title?: string;
  triggerType?: string;
  listOfItems: ISelect[];
  className?: string;
  label?: string;
  name: string;
  value?: string
  handleSelect?: ({id, title, value}: {id: string, title:string, value: string}) => {} | void
  id?: string;
  required?: boolean
}

function DropDown({
  title,
  triggerType = "hover",
  listOfItems,
  className,
  label,
  name,
  value,
  handleSelect,
  id,
  required
}: IDropDownProps ) {
  const [selected, setSelected] = useState(title);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const newSelect = listOfItems.find(
      (item: ISelect) => item?.key?.toString() === e.key
    )?.label;
    const newSelectedEnum = listOfItems.find(
      (item: ISelect) => item?.key?.toString() === e.key
    )?.enumValue;
    if (newSelect) {
      setSelected(newSelect.toString());
      if(newSelectedEnum) 
      handleSelect && handleSelect({title: name ? name : '' , id: id ? id : '', value: newSelectedEnum.toString()});
    }
  };
  const menuProps = {
    items: listOfItems,
    onClick: handleMenuClick,
  };

  return (
    <div className="flex flex-col justify-center text-black text-[14px] grow">
      <label htmlFor={name} className="font-bold text-black text-[14px]">
        {label}
        {required && <input name={name} id={name} value={selected === title ? '' : selected} className="w-1 h-1 p-0 m-4 text-white" required onChange={() => {}}/>}
      </label>
      <Dropdown
        menu={menuProps}
        trigger={triggerType === "hover" ? ["hover"] : ["click"]}
      >
        <Button className={`flex justify-between  ${className}`}>
          {listOfItems.find(val => val.enumValue === value)?.label || selected}
          <i>
            <SVGComponent title="arrow" />
          </i>
        </Button>
      </Dropdown>      
    </div>
  );
}

export default DropDown;
