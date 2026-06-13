import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'http://localhost:8080/categories'; 

export default function Admin() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#fde047'); 
  const [editingId, setEditingId] = useState(null);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const presetColors = [
    { name: 'Amarelo', hex: '#fde047' },
    { name: 'Vermelho', hex: '#f87171' },
    { name: 'Rosa', hex: '#f472b6' },
    { name: 'Azul', hex: '#38bdf8' },
    { name: 'Verde', hex: '#4ade80' },
    { name: 'Roxo', hex: '#a78bfa' }
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (err) {
      setError('Erro ao carregar as categorias da API.');
    }
  };

  const validateForm = () => {
    if (!categoryName.trim()) {
      setError('O nome da categoria não pode estar vazio.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const categoryData = { name: categoryName, color: categoryColor };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, categoryData);
        setSuccess('Categoria atualizada com sucesso!');
      } else {
        await axios.post(API_URL, categoryData);
        setSuccess('Categoria criada com sucesso!');
      }
      
      setCategoryName('');
      setCategoryColor('#fde047');
      setEditingId(null);
      fetchCategories();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Erro ao salvar os dados na API.');
    }
  };

  const handleEditClick = (category) => {
    setEditingId(category.id);
    setCategoryName(category.name);
    setCategoryColor(category.color);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir esta categoria?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setSuccess('Categoria excluída com sucesso!');
        fetchCategories();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Erro ao deletar a categoria.');
      }
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="card p-4 shadow-sm">
        <header className="mb-4 text-center">
          <h1 className="h3">Painel Administrator</h1>
        </header>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="alert">{success}</div>}

        <div className="mb-4">
          <input
            type="search"
            className="form-control"
            aria-label="Filtrar categorias"
            placeholder="🔍 Buscar categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ul className="list-group mb-4">
          {filteredCategories.map((category) => (
            <li 
              key={category.id} 
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span className="d-flex align-items-center gap-2 fw-bold">
                <span 
                  style={{ 
                    width: '18px', 
                    height: '18px', 
                    borderRadius: '50%', 
                    backgroundColor: category.color,
                    display: 'inline-block' 
                  }}
                  aria-hidden="true"
                ></span>
                {category.name}
              </span>
              
              <div className="d-flex gap-2">
                <button 
                  onClick={() => handleEditClick(category)} 
                  className="btn btn-outline-success btn-sm"
                  aria-label={`Editar ${category.name}`}
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(category.id)} 
                  className="btn btn-outline-danger btn-sm"
                  aria-label={`Excluir ${category.name}`}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
          {filteredCategories.length === 0 && (
            <li className="list-group-item text-muted text-center">Nenhuma categoria encontrada.</li>
          )}
        </ul>

        <hr />

        <footer className="mt-3">
          <h2 className="h5 mb-3">{editingId ? 'Editar Categoria' : 'Criar Nova Categoria'}</h2>
          
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Nome da categoria (ex: Trabalho, Ideias)..."
                aria-label="Nome da categoria"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label d-block">Escolher Cor Padrão:</label>
              <div className="d-flex gap-2 flex-wrap" role="radiogroup" aria-label="Cores da categoria">
                {presetColors.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    className={`btn p-0 border-0 ${categoryColor === color.hex ? 'ring ring-primary' : ''}`}
                    style={{ 
                      width: '35px', 
                      height: '35px', 
                      borderRadius: '50%', 
                      backgroundColor: color.hex,
                      border: categoryColor === color.hex ? '3px solid #000' : 'none'
                    }}
                    onClick={() => setCategoryColor(color.hex)}
                    aria-label={`Cor ${color.name}`}
                    aria-checked={categoryColor === color.hex}
                    role="radio"
                  />
                ))}
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-end">
              {editingId && (
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => { setEditingId(null); setCategoryName(''); setCategoryColor('#fde047'); }}
                >
                  Cancelar
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </form>
        </footer>
      </div>
    </main>
  );
}