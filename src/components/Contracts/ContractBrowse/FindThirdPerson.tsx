import ButtonComponent from "../../UI/ButtonComponent";
import DialogComponent from "../../UI/DialogComponent";
import SVGComponent from "../../UI/SVGComponent";
import { useCallback, useState } from "react";
import { getColumnsForClients } from "../../../helpers/fnHelpers";
import { ApiService } from "../../../helpers/API/ApiSerivce";
import DataTable from "../../UI/DataTable";


export interface IModals {
  handleClick: () => void
}

function FindThirdPerson ({handleClick}:IModals)  {
  const [currestSort, setCurrentSort] = useState("");
  
  const columnsForClients = useCallback(() => {
    return getColumnsForClients(setCurrentSort, currestSort);
  }, [currestSort]);


    
    return(
      <>
        <DialogComponent closeHandler={handleClick}>
          <div className="flex flex-col gap-y-[10px]">
          <div className="flex justify-between">
              <div className="flex relative">
                <input
                  type="search"
                  placeholder="Поиск"
                  className="text-black px-2 placeholder:text-lombard-text-black bg-lombard-bg-inactive-grey h-[40px]  rounded-md"
                />
                <button className="p-0 m-0 mr-2">
                  <i>
                    <SVGComponent title="search" className="w-[57px] h-[40px]"/>
                  </i>
                </button>
                <ButtonComponent
                  color="bg-lombard-btn-grey"
                  className="text-lombard-text-black"
                  titleBtn="История"
                />
              </div>
              <ButtonComponent
                color="bg-lombard-btn-green"
                titleBtn="Создать клиента"
                clickHandler={handleClick}
              />
            </div>              
              <DataTable
                columns={columnsForClients()}
                pagination
                selectHandler={() => {}}
                endPoint={ApiService.getCustomers}
                sortStr={currestSort}
                tableSize="small"
              />
            
          </div>
        </DialogComponent>
      </>
    )
  } 

export default FindThirdPerson;
