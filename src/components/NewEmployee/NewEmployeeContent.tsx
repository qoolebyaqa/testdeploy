
import { FormEvent, useState } from "react";
import DetailedRegistration from "./DetailedRegistration";
import GeneralUserInfo from "./GeneralUserInfo";
import NewEmployeeBtns from "./NewEmployeeBtns";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { useNavigate } from "react-router";

function NewEmployeeContent() {
  const [formValues, setFormValues] = useState<{[key:string]: string}>({})
  const navigate = useNavigate();

  const valueChangeHandler = (inputValue: {id?: string, title:string, value: string | string[]}) => {   
    setFormValues(prev => ({...prev, [inputValue.title]: Array.isArray(inputValue.value) ? inputValue.value[0] : inputValue.value})) 
  }

  const handleSubmitUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, login, phone_number, language, job_title, role_id, filial_id } = formValues
    const userDataToPost:any = { name, login, phone_number, language, job_title, role_id, filial_id };
    userDataToPost.type = 'INTERNAL'
    try {
      await ApiService.createUser(userDataToPost)
      navigate('/employees')
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      <NewEmployeeBtns />         
      <form className="flex bg-[#EFF2F4] justify-center gap-5 py-2" id="userForm" onSubmit={handleSubmitUser}>
        <GeneralUserInfo onInputChange={valueChangeHandler} formValues={formValues}/>
        <DetailedRegistration onInputChange={valueChangeHandler} formValues={formValues}/>
      </form>
    </>
  );
}

export default NewEmployeeContent;
