
import { useLoaderData } from "react-router";
import NewClientContent from "../../NewClient/NewClientContent";
import useActions from "../../../helpers/hooks/useActions";

function ClientBrowse() {
  const data:any = useLoaderData();
  const dispatch = useActions();
  dispatch.setClientChoosenOne(data.client);
  return (
    <NewClientContent currentClient={data.client} etag={data.etag}/>
  );
}

export default ClientBrowse;
