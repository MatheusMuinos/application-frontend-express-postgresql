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
    <div className="page-bg">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Seu nome de usuário</label>
        <input
          id="username"
          placeholder="Digite seu nome de usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label htmlFor="senha">Sua senha</label>
        <input
          id="senha"
          placeholder="Digite sua senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Logar</button>
        {loading && <Loading />}
        {msg && <Message type={msg.type} text={msg.text} />}
        <div className="form-footer">
          Ainda não tem conta?
          <Link to="/register">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
}