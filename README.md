# 📝 Blocos de Anotações — Aplicação React

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

---

# 📌 Sobre o Projeto

Este projeto consiste no desenvolvimento de uma **aplicação web em React** para gerenciamento de blocos de anotações pessoais.

A interface consome uma **API REST própria** desenvolvida em Java + Spring Boot, permitindo que cada usuário autenticado crie, visualize, edite e exclua suas próprias anotações de forma segura.

O sistema possui:

- Tela de login com autenticação JWT
- CRUD completo de blocos de anotações
- Filtro de busca por texto
- Modo escuro para acessibilidade
- Validação de inputs em formulários
- Navegação entre telas com React Router
- Requisições HTTP com Axios
- Gerenciamento de estado com Context API

---

# 🎯 Objetivos do Projeto

- Desenvolver interface funcional consumindo API REST
- Utilizar componentes funcionais com Hooks (useState, useEffect, useContext)
- Aplicar React Router para navegação entre telas
- Realizar requisições GET, POST, PUT e DELETE com Axios
- Implementar filtro de busca na listagem de blocos
- Validar inputs de formulários
- Implementar modo escuro para acessibilidade
- Utilizar props para comunicação entre componentes
- Versionar o projeto com Git e GitHub

---

# ⚙️ Tecnologias Utilizadas

<table align="center">
  <tr>

<td align="center">
  <h4>⚛️ Front-End</h4>
  <img src="https://skillicons.dev/icons?i=react,js,css,html" /><br><br>
  <strong>React 18 · JavaScript · CSS · HTML</strong>
</td>

<td width="40"></td>

<td align="center">
  <h4>☕ Back-End (API)</h4>
  <img src="https://skillicons.dev/icons?i=java,spring,postgresql" /><br><br>
  <strong>Java 17 · Spring Boot · PostgreSQL</strong>
</td>

<td width="40"></td>

<td align="center">
  <h4>🧰 Ferramentas</h4>
  <img src="https://skillicons.dev/icons?i=git,github,vscode" /><br><br>
  <strong>Git · GitHub · VS Code</strong>
</td>

  </tr>
</table>

---

# 🧱 Estrutura do Projeto

```txt
src
├── components
│   ├── Header.jsx             ← Barra de navegação com toggle dark mode
│   ├── BlocoCard.jsx          ← Card de exibição de um bloco
│   ├── BlocoForm.jsx          ← Formulário de criação/edição
│   ├── FiltroBloco.jsx        ← Input de busca/filtro
│   └── PrivateRoute.jsx       ← Proteção de rotas autenticadas
├── context
│   └── AuthContext.jsx        ← Contexto de autenticação (useContext)
├── pages
│   ├── Login.jsx              ← Tela de login
│   ├── Cadastro.jsx           ← Tela de cadastro
│   ├── Home.jsx               ← Listagem de blocos + filtro
│   ├── NovoBlocoPage.jsx      ← Tela de criação de bloco
│   └── EditarBlocoPage.jsx    ← Tela de edição de bloco
├── services
│   └── api.js                 ← Configuração do Axios + interceptors
├── styles
│   └── global.css             ← Estilos globais + variáveis dark mode
├── App.jsx                    ← Rotas e estrutura principal
└── main.jsx                   ← Ponto de entrada da aplicação
```

---

# 🖥️ Telas da Aplicação

## 🔑 Login
Autenticação do usuário com validação de campos e armazenamento do token JWT.

---

## 📋 Cadastro
Criação de novo usuário com validação de login e senha mínima de 6 caracteres.

---

## 🏠 Home — Listagem de Blocos
Lista todos os blocos do usuário logado com campo de filtro por texto em tempo real.

---

## ➕ Novo Bloco
Formulário para criação de bloco com validação de texto (máx. 100 caracteres).

---

## ✏️ Editar Bloco
Formulário pré-preenchido para atualização de bloco existente.

---

# 🔀 Rotas da Aplicação

| Rota | Componente | Acesso |
|---|---|---|
| `/` | Login.jsx | Público |
| `/cadastro` | Cadastro.jsx | Público |
| `/home` | Home.jsx | Autenticado |
| `/novo` | NovoBlocoPage.jsx | Autenticado |
| `/editar/:id` | EditarBlocoPage.jsx | Autenticado |

---

# 🔗 Endpoints Consumidos

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/usuarios/login` | Login — recebe token JWT |
| POST | `/usuarios/cadastro` | Cadastro de usuário |
| GET | `/blocos` | Lista blocos do usuário logado |
| POST | `/blocos` | Cria novo bloco |
| PUT | `/blocos/{id}` | Atualiza bloco |
| DELETE | `/blocos/{id}` | Remove bloco |

---

# 📄 Exemplos de Uso

## 🔑 Login

```json
POST /usuarios/login
{
  "login": "joao@email.com",
  "senha": "123456"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tipo": "Bearer",
  "idUsuario": 1,
  "login": "joao@email.com"
}
```

---

## 📝 Criar Bloco

```json
POST /blocos
Authorization: Bearer SEU_TOKEN

{
  "texto": "Minha anotação aqui"
}
```

---

# ⚓ Hooks Utilizados

| Hook | Onde | Para quê |
|---|---|---|
| `useState` | Todas as telas | Controle de estado local (form, lista, dark mode) |
| `useEffect` | Home | Buscar blocos da API ao carregar a tela |
| `useContext` | Componentes | Acessar token e dados do usuário autenticado |
| `useNavigate` | Login, Formulários | Redirecionar após ações |
| `useParams` | EditarBlocoPage | Capturar o ID do bloco pela URL |

---

# 🌙 Modo Escuro

A aplicação possui alternância de tema claro/escuro implementada com variáveis CSS e estado global via Context:

```css
/* Variáveis de tema */
:root {
  --bg: #ffffff;
  --text: #1a2340;
  --card: #f8f5f0;
}

[data-theme="dark"] {
  --bg: #1a2340;
  --text: #f8f5f0;
  --card: #2d3a5c;
}
```

---

# ✅ Validações de Formulário

| Campo | Validação |
|---|---|
| Login | Obrigatório, mínimo 3 caracteres |
| Senha | Obrigatória, mínimo 6 caracteres |
| Texto do bloco | Obrigatório, máximo 100 caracteres |

---

# 🔐 Autenticação JWT

O token é armazenado no `localStorage` e enviado automaticamente em todas as requisições via interceptor do Axios:

```javascript
// services/api.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

# ⚙️ Como Executar o Projeto

## 📥 Clonar o repositório

```bash
git clone https://github.com/jfxrias/anotacoes-react
```

---

## 📂 Entrar na pasta e instalar dependências

```bash
cd anotacoes-react
npm install
```

---

## ▶️ Rodar a aplicação

```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

## ⚙️ Pré-requisito — API rodando

A API REST precisa estar rodando localmente na porta 8080.
A API foi disponibilizada no próprio repositório.

---

# 📦 Dependências Principais

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

---

# 📚 Conceitos Aplicados

- React 18 com componentes funcionais
- Hooks: useState, useEffect, useContext, useNavigate, useParams
- React Router v6 (rotas públicas e protegidas)
- Context API para autenticação global
- Axios com interceptors para JWT
- Requisições GET, POST, PUT e DELETE
- Filtro de lista em tempo real
- Validação de formulários
- Modo escuro com variáveis CSS
- Props para comunicação entre componentes
- Consumo de API REST própria
- Versionamento com Git e GitHub

---

# 👥 Autores

<table align="center">
  <tr>

<td align="center">
  <a href="https://github.com/jfxrias">
    <img src="https://avatars.githubusercontent.com/jfxrias" width="90"/><br>
    <sub><b>João Farias</b></sub>
  </a>
</td>
<td align="center">
  <a href="https://github.com/JpMazzotti">
    <img src="https://avatars.githubusercontent.com/JpMazzotti" width="90"/><br>
    <sub><b>João Pedro Mazzotti</b></sub>
  </a>
</td>

<td align="center">
  <a href="https://github.com/EmmyNeves ">
    <img src="https://avatars.githubusercontent.com/EmmyNeves" width="90"/><br>
    <sub><b>Emily Neves</b></sub>
  </a>
</td>

<td align="center">
  <a href="https://github.com/daviportugall ">
    <img src="https://avatars.githubusercontent.com/daviportugall " width="90"/><br>
    <sub><b>Davi Portugal</b></sub>
  </a>
</td>

  </tr>
</table>

---

# 📌 Status do Projeto

- Aplicação React funcional consumindo API REST própria.

- Autenticação JWT implementada com Context API.

- Modo escuro para acessibilidade.

- Filtro de busca em tempo real.

- Validação de inputs em todos os formulários.

- Versionado com Git e GitHub.
