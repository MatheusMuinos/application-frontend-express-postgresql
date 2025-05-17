import { useState } from 'react';
import { login } from '../api/auth';
import useAuth from '../hooks/useAuth';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await login(username, senha);
      if (res.token) {
        setToken(res.token);
        navigate('/dashboard');
      } else {
        setMsg({ type: 'error', text: res.message || 'Login inválido.' });
      }
    } catch {
      setMsg({ type: 'error', text: 'Erro ao logar.' });
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome de usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Entrar</button>
      </form>
      {loading && <Loading />}
      {msg && <Message type={msg.type} text={msg.text} />}
      <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
    </div>
  );
}