import { useLoaderData } from "react-router";
import NewEmployeeContent from "../../NewEmployee/NewEmployeeContent";

function EmployeeBrowse() {
  const data:any = useLoaderData();
  return ( <NewEmployeeContent currentUser={data.user} etag={data.etag} /> );
}

export default EmployeeBrowse;