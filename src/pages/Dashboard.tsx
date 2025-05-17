import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { fetchTransactions, createTransaction, updateTransaction, deleteTransaction } from '../api/auth';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('income');
  const [receiverUserId, setReceiverUserId] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editDescricao, setEditDescricao] = useState('');
  const [editValor, setEditValor] = useState('');
  const [editTipo, setEditTipo] = useState('income');
  const [editReceiverUserId, setEditReceiverUserId] = useState('');

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
      const payload: any = {
        description: descricao,
        amount: Number(valor),
        type: tipo
      };
      if (tipo === 'transfer') {
        payload.receiverUserId = receiverUserId;
      }
      const res = await createTransaction(token!, payload);
      if (res.error || (res.message && res.message !== "Transação criada com sucesso!")) {
        setMsg({ type: 'error', text: res.error || res.message });
      } else {
        setMsg({ type: 'success', text: 'Transação criada!' });
        setDescricao('');
        setValor('');
        setTipo('income');
        setReceiverUserId('');
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

  // Função para iniciar edição
  function startEdit(item: any) {
    setEditId(item.id);
    setEditDescricao(item.description || item.descricao);
    setEditValor(String(item.amount || item.valor));
    setEditTipo(item.type || item.tipo);
    setEditReceiverUserId(item.receiverUserId || '');
  }

  // Função para cancelar edição
  function cancelEdit() {
    setEditId(null);
    setEditDescricao('');
    setEditValor('');
    setEditTipo('income');
    setEditReceiverUserId('');
  }

  // Função para salvar edição
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const payload: any = {
        description: editDescricao,
        amount: Number(editValor),
        type: editTipo
      };
      if (editTipo === 'transfer') {
        payload.receiverUserId = editReceiverUserId;
      }
      const res = await updateTransaction(token!, editId!, payload);
      if (res.error || (res.message && res.message !== "Transação atualizada com sucesso!")) {
        setMsg({ type: 'error', text: res.error || res.message });
      } else {
        setMsg({ type: 'success', text: 'Transação atualizada!' });
        cancelEdit();
        load();
      }
    } catch {
      setMsg({ type: 'error', text: 'Erro ao atualizar transação.' });
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Área Logada</h2>
      <button onClick={logout}>Logout</button>
      <form onSubmit={editId ? handleUpdate : handleCreate}>
        <input
          placeholder="Descrição"
          value={editId ? editDescricao : descricao}
          onChange={e => editId ? setEditDescricao(e.target.value) : setDescricao(e.target.value)}
          required
        />
        <input
          placeholder="Valor"
          value={editId ? editValor : valor}
          onChange={e => editId ? setEditValor(e.target.value) : setValor(e.target.value)}
          required
        />
        <select value={editId ? editTipo : tipo} onChange={e => editId ? setEditTipo(e.target.value) : setTipo(e.target.value)} required>
          <option value="income">Entrada</option>
          <option value="expense">Saída</option>
          <option value="transfer">Transferência</option>
        </select>
        {}
        {(editId ? editTipo : tipo) === 'transfer' && (
          <input
            type="number"
            placeholder="ID do usuário de destino"
            value={editId ? editReceiverUserId : receiverUserId}
            onChange={e => editId ? setEditReceiverUserId(e.target.value) : setReceiverUserId(e.target.value)}
            required
          />
        )}
        <button type="submit" disabled={loading}>{editId ? 'Salvar' : 'Adicionar'}</button>
        {editId && <button onClick={cancelEdit} disabled={loading}>Cancelar</button>}
      </form>
      {loading && <Loading />}
      {msg && <Message type={msg.type} text={msg.text} />}
      <ul>
        {transactions.map((item: any) => (
          <li key={item.id}>
            {item.description || item.descricao} - {item.amount || item.valor} - {item.type || item.tipo}
            <button onClick={() => handleDelete(item.id)} disabled={loading}>Excluir</button>
            <button onClick={() => startEdit(item)} disabled={loading}>Editar</button>
          </li>
        ))}
      </ul>
      {editId && (
        <form onSubmit={handleUpdate} className="form-container">
          <h3>Editar Transação</h3>
          <input
            placeholder="Descrição"
            value={editDescricao}
            onChange={e => setEditDescricao(e.target.value)}
            required
          />
          <input
            placeholder="Valor"
            value={editValor}
            onChange={e => setEditValor(e.target.value)}
            required
          />
          <select value={editTipo} onChange={e => setEditTipo(e.target.value)} required>
            <option value="income">Entrada</option>
            <option value="expense">Saída</option>
            <option value="transfer">Transferência</option>
          </select>
          {editTipo === 'transfer' && (
            <input
              type="number"
              placeholder="ID do usuário de destino"
              value={editReceiverUserId}
              onChange={e => setEditReceiverUserId(e.target.value)}
              required
            />
          )}
          <button type="submit" disabled={loading}>Salvar</button>
          <button type="button" onClick={cancelEdit} disabled={loading}>Cancelar</button>
        </form>
      )}
    </div>
  );
}