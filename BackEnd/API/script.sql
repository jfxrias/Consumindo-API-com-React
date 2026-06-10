-- ============================================================
--  SCRIPT SQL — API Blocos de Anotações
--  Banco: PostgreSQL
-- ============================================================

-- 1. Cria o banco (rode no pgAdmin ou DBeaver antes de tudo)
CREATE DATABASE anotacoes_db;

-- 2. Conecte ao banco anotacoes_db e rode o restante:

-- ── Tabela de Usuários ────────────────────────────────────────
CREATE TABLE usuario (
    id_usuario    SERIAL PRIMARY KEY,
    login         VARCHAR(100) NOT NULL UNIQUE,
    senha_usuario VARCHAR(255) NOT NULL  -- BCrypt gera hash de ~60 chars
);

-- ── Tabela de Blocos ──────────────────────────────────────────
CREATE TABLE bloco (
    id_bloco   SERIAL PRIMARY KEY,
    texto      VARCHAR(100) NOT NULL,
    id_usuario INTEGER NOT NULL,
    CONSTRAINT fk_bloco_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE   -- Se deletar o usuário, deleta os blocos
);

-- ── Índice para buscas por usuário ────────────────────────────
CREATE INDEX idx_bloco_usuario ON bloco(id_usuario);

-- ============================================================
--  DADOS DE TESTE (opcional)
-- ============================================================

-- ATENÇÃO: A senha abaixo é o hash BCrypt de "123456"
-- Nunca insira senhas em texto plano no banco!
-- Para gerar novos hashes: use a rota POST /usuarios/cadastro

INSERT INTO usuario (login, senha_usuario) VALUES
('joao@email.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
('maria@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
-- senha dos dois usuários de teste: 123456

INSERT INTO bloco (texto, id_usuario) VALUES
('Minha primeira anotação', 1),
('Lembrar de estudar Spring Boot', 1),
('Lista de compras: pão, leite', 2);

-- ============================================================
--  CONSULTAS ÚTEIS PARA VERIFICAR
-- ============================================================

-- Ver todos os usuários (sem a senha)
SELECT id_usuario, login FROM usuario;

-- Ver todos os blocos com o login do dono
SELECT b.id_bloco, u.login, b.texto
FROM bloco b
JOIN usuario u ON b.id_usuario = u.id_usuario
ORDER BY b.id_bloco;

-- Ver blocos de um usuário específico
SELECT * FROM bloco WHERE id_usuario = 1;
