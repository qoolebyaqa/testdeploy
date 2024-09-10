import { useState } from "react";
import NewClientBtns from "../../NewClient/NewClientBtns";
import GeneralClientInfo from "../../NewClient/GeneralClientInfo";
import DepositDetails from "../../NewClient/DepositDetails/DepositDetails";
import { useAppSelector } from "../../../helpers/hooks/useAppSelector";

function ClientBrowse() {
  const currentClient = useAppSelector(
    (state) => state.clientStore.clientChoosenOne
  );
  const [formValues, setFormValues] = useState<{[key:string]: string}>(currentClient ? currentClient : {gender: 'MALE'})
  console.log(currentClient);

  const valueChangeHandler = (inputValue: {id?: string, title:string, value: string | string[]}) => {   
    setFormValues(prev => ({...prev, [inputValue.title]: Array.isArray(inputValue.value) ? inputValue.value[0] : inputValue.value})) 
  }
  return (
    <div className="bg-lombard-bg-inactive-grey ">
      <NewClientBtns />
      <div className="flex p-2 mx-auto justify-center">
        <GeneralClientInfo inputsValues={formValues} handleInput={valueChangeHandler}/>
        <DepositDetails />
      </div> 
    </div>
  );
}

export default ClientBrowse;
