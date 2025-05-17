import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

export default function AuthRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}