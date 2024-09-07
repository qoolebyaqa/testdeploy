import { Outlet, useNavigate } from "react-router";
import HeaderMainNav from "../components/HeaderMainNav/HeaderMainNav";
import { useEffect, useState } from "react";
import { ApiService } from "../helpers/API/ApiSerivce";
import useActions from "../helpers/hooks/useActions";
import { useAppSelector } from "../helpers/hooks/useAppSelector";
import Loader from "../components/UI/Loader";

function RootLayout() {
  const dispatch = useActions();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const accessTKN = useAppSelector(state => state.auth.access_token);
  async function fetchRefreshTKN() {  
    const refreshToken = localStorage.getItem('rt')
    setLoading(true);
    if(refreshToken) {
      try {
        const result = await ApiService.refreshToken(refreshToken);
        if(result.status === 200) {
          dispatch.setCurToken(result.data.access_token)
          localStorage.setItem('rt', result.data.refresh_token);
          /* const clients = await ApiService.getCustomers();
          console.log(clients.data); */
          setLoading(false);
        }
      } catch (error) {
        console.log('Refresh is rejected', error)
        localStorage.removeItem('rt')
        navigate('/auth');
      }  
    } else {
      navigate('/auth');
    }
  }
  useEffect(() => {    
    !accessTKN && fetchRefreshTKN();
  }, [])
  if(loading) {
    return (<Loader />)
  }
  return (
    <>
      <HeaderMainNav />
      <main className="w-[99vw]">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
