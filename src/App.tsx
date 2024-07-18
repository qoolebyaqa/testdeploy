import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import { childrenRoutes } from './helpers/routes';
import Authentification from './pages/Authentification';
import { useSelector } from 'react-redux';
import { GlobalStateType } from './helpers/types';

function App() {  
  const authentificated = useSelector((state: GlobalStateType) => state.auth.authentificated);

  const router = createBrowserRouter([
    {
      path: '/auth',
      element: <Authentification />
    },
    {
      path: '/',
      element: <RootLayout authentificated={authentificated}/>,
      children: childrenRoutes,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
