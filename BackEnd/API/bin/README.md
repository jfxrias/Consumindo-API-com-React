# 📝 API Blocos de Anotações

API REST com autenticação JWT Bearer, desenvolvida em Java + Spring Boot.

---

## 🛠️ Tecnologias

- Java 17
- Spring Boot 3.2.5
- Spring Security + JWT (jjwt 0.11.5)
- Spring Data JPA + Hibernate
- PostgreSQL
- Swagger / OpenAPI (springdoc)

---

## ▶️ Como Rodar no STS

1. **Clone ou importe o projeto**
   - File → Import → Existing Maven Projects → selecione a pasta `anotacoes-api`

2. **Configure o banco**
   - Abra o pgAdmin ou DBeaver
   - Execute o arquivo `script.sql`

3. **Configure o application.properties**
   ```properties
   spring.datasource.password=SUA_SENHA_AQUI
   ```

4. **Rode a aplicação**
   - Clique com botão direito na classe `AnotacoesApiApplication.java`
   - Run As → Spring Boot App

5. **Acesse o Swagger:**
   - http://localhost:8080/swagger-ui.html

---

## 🔗 Endpoints

### Usuários (públicos)

| Método | URL                    | Descrição               |
|--------|------------------------|-------------------------|
| POST   | /usuarios/cadastro     | Cadastra novo usuário   |
| POST   | /usuarios/login        | Login — retorna o token |

### Blocos (requerem Bearer Token)

| Método | URL           | Descrição                        |
|--------|---------------|----------------------------------|
| GET    | /blocos       | Lista blocos do usuário logado   |
| GET    | /blocos/{id}  | Busca bloco por ID               |
| POST   | /blocos       | Cria novo bloco                  |
| PUT    | /blocos/{id}  | Atualiza bloco                   |
| DELETE | /blocos/{id}  | Deleta bloco                     |

---

## 🔐 Como usar a autenticação

### 1. Cadastre um usuário
```json
POST /usuarios/cadastro
{
  "login": "joao@email.com",
  "senha": "123456"
}
```

### 2. Faça login
```json
POST /usuarios/login
{
  "login": "joao@email.com",
  "senha": "123456"
}
```
Resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tipo": "Bearer",
  "idUsuario": 1,
  "login": "joao@email.com"
}
```

### 3. Use o token nas próximas requisições
```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

## ⚛️ Integração com React

```javascript
// Login
const response = await fetch('http://localhost:8080/usuarios/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ login: 'joao@email.com', senha: '123456' })
});
const data = await response.json();
localStorage.setItem('token', data.token);

// Requisição autenticada
const token = localStorage.getItem('token');
const blocos = await fetch('http://localhost:8080/blocos', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

---

## 📁 Estrutura de Arquivos

```
src/main/java/br/com/serratec/anotacoes/
├── AnotacoesApiApplication.java
├── config/
│   ├── SecurityConfig.java     ← CORS + JWT + regras de acesso
│   └── SwaggerConfig.java      ← Documentação OpenAPI
├── controller/
│   ├── UsuarioController.java  ← /usuarios/login e /usuarios/cadastro
│   └── BlocoController.java    ← /blocos (CRUD)
├── dto/
│   ├── LoginRequestDTO.java
│   ├── LoginResponseDTO.java
│   ├── UsuarioCadastroDTO.java
│   ├── UsuarioResponseDTO.java
│   ├── BlocoInserirDTO.java
│   └── BlocoResponseDTO.java
├── exception/
│   └── GlobalExceptionHandler.java
├── model/
│   ├── Usuario.java
│   └── Bloco.java
├── repository/
│   ├── UsuarioRepository.java
│   └── BlocoRepository.java
├── security/
│   ├── JwtUtil.java               ← Gera e valida tokens
│   ├── JwtAuthorizationFilter.java ← Intercepta e valida Bearer
│   └── UserDetailsServiceImpl.java ← Carrega usuário do banco
└── service/
    ├── UsuarioService.java
    └── BlocoService.java
```
