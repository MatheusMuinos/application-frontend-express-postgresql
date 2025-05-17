import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter';
import './styles/form-layout.css';
import './styles/responsive.css';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
