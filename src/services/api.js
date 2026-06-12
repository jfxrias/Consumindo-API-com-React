import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080'
} );

// Seu token estático fornecido
const TOKEN_ESTATICO = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWJyaWVsIiwiaWF0IjoxNzgxMjg5OTY5LCJleHAiOjE3ODEzNzYzNjl9.lwYSVyMm8k0HFf6_v1BxChN4Y7PmMyjd47onjVboRzk";

// Configuração para enviar o token em todas as requisições
api.defaults.headers.common['Authorization'] = `Bearer ${TOKEN_ESTATICO}`;

export default api;
