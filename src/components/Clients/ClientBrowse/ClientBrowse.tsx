
import { useLoaderData } from "react-router";
import NewClientContent from "../../NewClient/NewClientContent";

function ClientBrowse() {
  const data:any = useLoaderData();
  return (
    <NewClientContent currentClient={data.client} etag={data.etag}/>
  );
}

export default ClientBrowse;
