import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import SVGComponent from './SVGComponent';
import { useState } from 'react';

interface ISelect  {
  label: string, key: number
}

function DropDown({title, triggerType="hover", listOfItems}: {title: string, triggerType?: string, listOfItems: ISelect[]}) {
  const [selected, setSelected] = useState(title);
  
  const handleMenuClick: MenuProps['onClick'] = (e) => {    
    const newSelect = listOfItems.find((item:ISelect) => item?.key?.toString() === e.key)?.label;      
    setSelected(newSelect!.toString())     
  };
  const menuProps = {
    items: listOfItems,
    onClick: handleMenuClick,
  };


  return ( 
    <Dropdown menu={menuProps} trigger={triggerType === "hover" ? ["hover"] : ["click"]}>
      <Button className='flex justify-between'>
          {selected}
          <i><SVGComponent title='arrow'/></i>
      </Button>
    </Dropdown>
   );
}

export default DropDown;