
import { FormEvent, useState } from "react";
import DetailedRegistration from "./DetailedRegistration";
import GeneralUserInfo from "./GeneralUserInfo";
import NewEmployeeBtns from "./NewEmployeeBtns";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { useNavigate } from "react-router";
import useActions from "../../helpers/hooks/useActions";

function NewEmployeeContent({currentUser, etag}: {currentUser?: any, etag?: string}) {
  const [formValues, setFormValues] = useState<{[key:string]: string}>(currentUser ? currentUser : {gender: 'MALE'})
  const [etagState, setEtagState] = useState(etag || '')
  const navigate = useNavigate();
  const dispatch = useActions();
  dispatch.setClientChoosenOne(currentUser);
  console.log(currentUser)

  const valueChangeHandler = (inputValue: {id?: string, title:string, value: string | string[]}) => {   
    setFormValues(prev => ({...prev, [inputValue.title]: Array.isArray(inputValue.value) ? inputValue.value[0] : inputValue.value})) 
  }

  const handleSubmitUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, name, login, phone_number, language, job_title, role_id, filial_id } = formValues
    const userDataToPost:any = { id, name, login, phone_number, language, job_title, role_id, filial_id };
    userDataToPost.type = 'INTERNAL'
    try {
      if (etagState) {
        await ApiService.updateUser(userDataToPost, etagState);
        navigate('/employees')
      } else {
        const createdUser = await ApiService.createUser(userDataToPost);
        const userResponse = await ApiService.getUser(createdUser.data.id);
        valueChangeHandler({title: "id", value: createdUser.data.id})
        setEtagState(userResponse.headers.etag.slice(2).replaceAll("\\", ""))
      }
      console.log(userDataToPost)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <NewEmployeeBtns />         
      <form className="flex bg-[#EFF2F4] justify-center gap-5 py-2" id="userForm" onSubmit={handleSubmitUser}>
        <GeneralUserInfo onInputChange={valueChangeHandler} formValues={formValues} existEmployee={!!etagState}/>
        <DetailedRegistration onInputChange={valueChangeHandler} formValues={formValues}/>
      </form>
    </>
  );
}

export default NewEmployeeContent;
