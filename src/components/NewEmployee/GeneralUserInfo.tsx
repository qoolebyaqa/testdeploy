import SVGComponent from "../UI/SVGComponent";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import CreateUserForm from "./CreateUserForm";
import { userFormValue } from "../../helpers/validator";

interface IGeneralUserInfo {
  formValues: userFormValue
  existEmployee?: string
}

function GeneralUserInfo({formValues, existEmployee}:IGeneralUserInfo) {
  
  const gender = useAppSelector(
    (state) => state.employeeStore.newEmployeeGender
  );


  return (
    <div className="w-[280px] flex flex-col gap-4">
      <div className="bg-white rounded-2xl p-2">
        <div className="relative">
          <img src={gender === 'FEMALE' ? '/defaultAvatarFemale.png': '/defaultAvatarMale.png'} alt="avatar" className="w-full"/>
          <SVGComponent title="editPhoto" />
        </div> 
        <CreateUserForm formValues={formValues} etag={existEmployee}/>     
      </div>
    </div>
  );
}

export default GeneralUserInfo;
