
import { useState } from "react";
import DetailedRegistration from "./DetailedRegistration";
import GeneralUserInfo from "./GeneralUserInfo";
import NewEmployeeAccessBtns from "./NewEmployeeAccessBtns";
import { userFormValue } from "../../helpers/validator";
import FilesContainer from "./FilesContainer";
import DayOffSection from "./DayOffSection";

function NewEmployeeContent({currentUser, etag}: {currentUser?: any, etag?: string}) {
  const [generalUserForm, setgeneralUserForm] = useState<userFormValue>(currentUser ? currentUser : {})
 

  const valueChangeHandler = (inputValue: {id?: string, title:string, value: string | string[]}) => {   
    setgeneralUserForm(prev => ({...prev, [inputValue.title]: Array.isArray(inputValue.value) ? inputValue.value[0] : inputValue.value})) 
  }

  return (
    <>
      <NewEmployeeAccessBtns generalFormValues={generalUserForm}/>         
      <div className="flex bg-[#EFF2F4] justify-center gap-2 py-2">
        <GeneralUserInfo formValues={generalUserForm} existEmployee={etag}/>
        <DetailedRegistration onInputChange={valueChangeHandler} /* formValues={formValues} *//>        
        <div className="flex flex-col gap-2">        
          <FilesContainer />
          <DayOffSection />
        </div>
      </div>
    </>
  );
}

export default NewEmployeeContent;
