import DepositDetails from "./DepositDetails/DepositDetails";
import GeneralClientInfo from "./GeneralClientInfo";
import NewClientBtns from "./NewClientBtns";

function NewClientContent() {
  return (
    <div className="bg-lombard-bg-inactive-grey ">
      <NewClientBtns />
      <div className="flex p-2 mx-auto justify-center">
        <GeneralClientInfo />
        <DepositDetails />
      </div> 
    </div>
  );
}

export default NewClientContent;
