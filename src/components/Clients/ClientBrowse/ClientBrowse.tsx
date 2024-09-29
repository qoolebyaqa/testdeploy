
import { useLoaderData } from "react-router";
import NewClientContent from "../../NewClient/NewClientContent";

function ClientBrowse() {
  const data:any = useLoaderData();
  console.log(data);
  return (
    <NewClientContent currentClient={data.client} etag={data.etag}/>
  );
}

export default ClientBrowse;
