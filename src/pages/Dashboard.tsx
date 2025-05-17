import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { fetchTransactions, createTransaction, deleteTransaction } from '../api/auth';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  async function load() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetchTransactions(token!);
      if (res.error) setMsg({ type: 'error', text: res.error });
      else setTransactions(res);
    } catch {
      setMsg({ type: 'error', text: 'Erro ao buscar transações.' });
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, [token]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await createTransaction(token!, { descricao, valor });
      if (res.error) setMsg({ type: 'error', text: res.error });
      else {
        setMsg({ type: 'success', text: 'Transação criada!' });
        setDescricao('');
        setValor('');
        load();
      }
    } catch {
      setMsg({ type: 'error', text: 'Erro ao criar transação.' });
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await deleteTransaction(token!, id);
      if (res.error) setMsg({ type: 'error', text: res.error });
      else {
        setMsg({ type: 'success', text: 'Transação removida!' });
        load();
      }
    } catch {
      setMsg({ type: 'error', text: 'Erro ao remover transação.' });
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Área Logada</h2>
      <button onClick={logout}>Logout</button>
      <form onSubmit={handleCreate}>
        <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
        <input placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} required />
        <button type="submit" disabled={loading}>Adicionar</button>
      </form>
      {loading && <Loading />}
      {msg && <Message type={msg.type} text={msg.text} />}
      <ul>
        {transactions.map((item: any) => (
          <li key={item.id}>
            {item.descricao} - {item.valor}
            <button onClick={() => handleDelete(item.id)} disabled={loading}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}