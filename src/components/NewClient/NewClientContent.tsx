import DepositDetails from "./DepositDetails/DepositDetails";
import GeneralClientInfo from "./GeneralClientInfo";
import NewClientBtns from "./NewClientBtns";

function NewClientContent() {
  return (
    <div className="bg-lombard-bg-inactive-grey ">
      <NewClientBtns />
      <div className="flex p-2 h-svh max-w-[1520px] mx-auto">
        <GeneralClientInfo />
        <DepositDetails />
      </div> 
    </div>
  );
}

export default NewClientContent;
