# API Transações Bancárias - Frontend

Este projeto é o **frontend** de uma aplicação de transações bancárias, desenvolvido com **React + TypeScript + Vite**.  
Permite que usuários se cadastrem, façam login, visualizem, criem, editem, excluam e transfiram valores entre contas, consumindo uma API backend Express + PostgreSQL.

---

## 🚀 Funcionalidades

- Cadastro de usuário
- Login com autenticação JWT
- Criação de transações (entrada, saída, transferência)
- Edição e exclusão de transações
- Transferência entre usuários via ID
- Interface responsiva e centralizada
- Mensagens de erro e sucesso amigáveis
- Proteção de rotas (Dashboard só acessível logado)

---

## 📁 Estrutura de Pastas

```
src/
  api/           # Funções para comunicação com a API backend
  components/    # Componentes reutilizáveis (mensagens, loading, rotas protegidas)
  contexts/      # Contexto de autenticação
  hooks/         # Hooks customizados
  pages/         # Páginas principais (Login, Cadastro, Dashboard)
  routes/        # Definição das rotas da aplicação
  styles/        # Arquivos CSS globais e responsivos
  App.tsx        # Componente principal
  main.tsx       # Ponto de entrada da aplicação
public/
  favicon.ico    # Ícone da aba do navegador
.env             # Variáveis de ambiente
```

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node)
- Backend da aplicação rodando (Express + PostgreSQL).  
  O endereço da API deve estar configurado na variável de ambiente `VITE_API_URL`.

---

## 🛠️ Instalação

1. **Clone este repositório e instale as dependências:**

   ```bash
   git clone <url-do-repositorio>
   cd application-frontend-express-postgresql
   npm install
   ```

2. **Configuração das variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto (ou edite o existente) e defina a URL do backend:

   ```
   VITE_API_URL=https://seu-backend.vercel.app
   ```
---

## ▶️ Como rodar o projeto

Para rodar em modo desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

---

## 🏗️ Build para produção

Para gerar os arquivos otimizados para produção:

```bash
npm run build
```

Para testar o build localmente:

```bash
npm run preview
```

---


## ❓ Dúvidas Frequentes

**1. O frontend não conecta com o backend!**  
Verifique se a variável `VITE_API_URL` está correta e o backend está online.

**2. Como rodar em produção?**  
Faça o build (`npm run build`) e sirva a pasta `dist/` com um servidor estático (Vercel, Netlify, etc).

---

## 📄 Desenvolvimento

Desenvolvido por Matheus Sarno Muiños. Este projeto é livre para uso acadêmico e pessoal.

---

**Desenvolvido usando React, TypeScript e Vite.**
