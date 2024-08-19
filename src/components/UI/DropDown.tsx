import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import SVGComponent from "./SVGComponent";
import { useState } from "react";

interface ISelect {
  label: string;
  key: number;
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
  id
}: {
  title: string;
  triggerType?: string;
  listOfItems: ISelect[];
  className?: string;
  label?: string;
  name: string;
  value?: string
  handleSelect?: ({id, title, value}: {id: string, title:string, value: string}) => {}
  id?: string
}) {
  const [selected, setSelected] = useState(title);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const newSelect = listOfItems.find(
      (item: ISelect) => item?.key?.toString() === e.key
    )?.label;
    if (newSelect) {
      setSelected(newSelect.toString());
      handleSelect && handleSelect({title: name ? name : '' , id: id ? id : '', value: newSelect});
    }
  };
  const menuProps = {
    items: listOfItems,
    onClick: handleMenuClick,
  };

  return (
    <div className="flex flex-col gap-[6px] justify-center text-black text-[14px] grow">
      <label htmlFor={name} className="font-bold text-black text-[14px]">
        {label}
      </label>
      <Dropdown
        menu={menuProps}
        trigger={triggerType === "hover" ? ["hover"] : ["click"]}
      >
        <Button className={`flex justify-between  ${className}`}>
          {value || selected}
          <i>
            <SVGComponent title="arrow" />
          </i>
        </Button>
      </Dropdown>
    </div>
  );
}

export default DropDown;
