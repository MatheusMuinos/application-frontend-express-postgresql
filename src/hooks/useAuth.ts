import { useContext } from 'react';
import { AuthContext, type AuthContextType } from '../contexts/AuthContext';

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}