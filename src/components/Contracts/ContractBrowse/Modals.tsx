import useActions from "../../../helpers/hooks/useActions";
import ButtonComponent from "../../UI/ButtonComponent";
import DialogComponent from "../../UI/DialogComponent";
import SVGComponent from "../../UI/SVGComponent";
import { useEffect, useState } from "react";
import { columnsForClients } from "../../../helpers/fnHelpers";
import { ApiService } from "../../../helpers/API/ApiSerivce";
import { Table } from "antd";


export interface IModals {
  page: string,
  handleClick: () => void
}

function Modals ({page,handleClick}:IModals)  {
    const dispatch = useActions();
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
      if (!localStorage.getItem("rt")) {
        window.location.href = "/auth";
        return;
      }
      try {
        const response = await ApiService.getCustomers();
        if (response.status === 401) {
          window.location.href = "/auth";
        } else {
          const processedClients = response.data.content
            .map((item: any, index:number) => ({
              ...item,
              key: item.id,
              index: index + 1,
              name: `${item.first_name} ${item.last_name} ${item.middle_name || ""}`,
              passport: `${item.passport_series} ${item.passport_number}`.toUpperCase(),
              sum: "-",
            }))
            .sort((a:any, b:any) => a.index - b.index);

          setClients(processedClients);

          
        }
      } catch (err) {
        console.error("Clients loading error:", err);
      }
    };

    useEffect(() => {
      fetchClients();
    }, []);

    useEffect(() => {dispatch.setClientsList(clients); dispatch.setAuthLoading(false)},[])


  if(page==="payment"){
    
    return(
      <>
        <DialogComponent closeHandler={handleClick}>
          <div className="w-[1200px]  flex flex-col gap-y-[10px]">
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
            
            <div className="flex flex-row gap-x-[30px] overflow-auto min-h-[30vh]">
              <Table
                columns={columnsForClients}
                dataSource={clients}
                pagination={false}
                size="small"
                virtual
                scroll={{ y: 400 }}
                className="hover:cursor-pointer"
                bordered
                onRow={(_record) => {
                  return { onClick: () => {} };
                }}
              />
            </div>
            
          </div>
        </DialogComponent>
      </>
    )
  } 
}

export default Modals;
