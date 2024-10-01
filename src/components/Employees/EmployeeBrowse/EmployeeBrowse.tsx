import { useLoaderData } from "react-router";
import NewEmployeeContent from "../../NewEmployee/NewEmployeeContent";
import useActions from "../../../helpers/hooks/useActions";

function EmployeeBrowse() {
  const data:any = useLoaderData();
  const  dispatch = useActions();
  dispatch.setEmployeeChoosenOne(data.user);
  return ( <NewEmployeeContent currentUser={data.user} etag={data.etag} /> );
}

export default EmployeeBrowse;