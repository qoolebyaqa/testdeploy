import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import { childrenRoutes } from './helpers/routes';
import Authentification from './pages/Authentification';
import { useAppSelector } from './helpers/hooks/useAppSelector';

function App() {  
  const authentificated = useAppSelector(state => state.auth.authentificated);

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
