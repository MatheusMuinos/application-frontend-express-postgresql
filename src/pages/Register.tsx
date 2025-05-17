import { useState } from 'react';
import { register } from '../api/auth';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await register(username, email, password);
      if (res.message && res.message !== 'User registered successfully') {
        setMsg({ type: 'error', text: res.message });
      } else {
        setMsg({ type: 'success', text: 'Cadastro realizado!' });
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch {
      setMsg({ type: 'error', text: 'Erro ao cadastrar.' });
    }
    setLoading(false);
  };

  return (
    <div className="page-bg">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <label htmlFor="username">Nome de usuário</label>
        <input
          id="username"
          placeholder="Digite seu nome de usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          placeholder="Digite seu e-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Cadastrar</button>
        {loading && <Loading />}
        {msg && <Message type={msg.type} text={msg.text} />}
        <div className="form-footer">
          Já tem conta?
          <Link to="/login">Entrar</Link>
        </div>
      </form>
    </div>
  );
}