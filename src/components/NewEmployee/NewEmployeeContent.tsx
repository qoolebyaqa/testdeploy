
import DetailedRegistration from "./DetailedRegistration";
import GeneralUserInfo from "./GeneralUserInfo";
import NewEmployeeBtns from "./NewEmployeeBtns";

function NewEmployeeContent() {
  return (
    <>
      <NewEmployeeBtns />         
      <div className="flex bg-[#EFF2F4] justify-center gap-5 h-lvh">
        <GeneralUserInfo />
        <DetailedRegistration />
      </div>
    </>
  );
}

export default NewEmployeeContent;
