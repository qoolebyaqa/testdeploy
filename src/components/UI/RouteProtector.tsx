import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';

interface IRouteProtector {
  children: ReactNode,
  allowedRoles: string[]
}

export function RouteProtector({ children, allowedRoles }: IRouteProtector) {
  const currentUserRole = useAppSelector(state => state.auth.currentUser.role_id)
  const location = useLocation();

  if (currentUserRole && !allowedRoles.includes(currentUserRole)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}