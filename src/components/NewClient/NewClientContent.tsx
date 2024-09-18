import { useState } from "react";
import DepositDetails from "./DepositDetails/DepositDetails";
import GeneralClientInfo from "./GeneralClientInfo";
import NewClientBtns from "./NewClientBtns";

function NewClientContent({currentClient, etag}:{currentClient?: any, etag?:string}) {
  const [formValues, setFormValues] = useState<{[key:string]: string}>(currentClient ? currentClient : {gender: 'MALE'})

  const valueChangeHandler = (inputValue: {id?: string, title:string, value: string | string[]}) => {   
    setFormValues(prev => ({...prev, [inputValue.title]: Array.isArray(inputValue.value) ? inputValue.value[0] : inputValue.value})) 
  }
  return (
    <div className="bg-lombard-bg-inactive-grey ">
      <NewClientBtns formId={currentClient && currentClient.id} />
      <div className="flex p-2 mx-auto justify-center">
        <GeneralClientInfo inputsValues={formValues} handleInput={valueChangeHandler} formId={currentClient && currentClient.id} etag={etag}/>
        <DepositDetails />
      </div> 
    </div>
  );
}

export default NewClientContent;
