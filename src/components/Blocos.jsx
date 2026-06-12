import { useState, useEffect } from "react";
import api from "../services/api";
import "./Blocos.css";

export default function Blocos() {
  const nomeUsuario = "Gabriel";
  const [blocos, setBlocos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoTexto, setNovoTexto] = useState("");

  const carregarBlocos = () => {
    api.get("/blocos")
      .then((response) => setBlocos(response.data))
      .catch((error) => console.error("Erro ao carregar blocos.", error));
  };

  const criarBloco = () => {
    if (!novoTexto.trim()) return alert("O texto não pode estar vazio!");
    
    // Enviando o texto para a API
    api.post("/blocos", { texto: novoTexto })
      .then((response) => {
        setBlocos([...blocos, response.data]);
        fecharModal();
      })
      .catch((error) => alert("Erro ao criar nota."));
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setNovoTexto("");
  };

  const excluirBloco = (id) => {
    if (window.confirm("Deseja mesmo excluir?")) {
      api.delete(`/blocos/${id}`)
        .then(() => setBlocos(blocos.filter((b) => b.idBloco !== id)));
    }
  };

  useEffect(() => {
    carregarBlocos();
  }, []);

  return (
    <div className="container">
      <button className="btn-nova-nota" onClick={() => setIsModalOpen(true)}>
        + Nova Nota
      </button>

      <h1 className="titulo-mural">📌 Mural de {nomeUsuario}</h1>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Criar Novo Post-it</h2>
            <textarea
              placeholder="Escreva sua nota aqui..."
              value={novoTexto}
              maxLength={100}
              onChange={(e) => setNovoTexto(e.target.value)}
            />
            <p className={`contador ${novoTexto.length >= 100 ? "limite" : ""}`}>
              {novoTexto.length}/100 caracteres
            </p>
            <div className="modal-actions">
              <button className="btn-cancelar" onClick={fecharModal}>Cancelar</button>
              <button className="btn-criar" onClick={criarBloco}>Criar</button>
            </div>
          </div>
        </div>
      )}

      <div className="mural-grid">
        {blocos.map((bloco) => (
          <div key={bloco.idBloco} className="post-it">
            <button className="btn-excluir" onClick={() => excluirBloco(bloco.idBloco)}>×</button>
            {/* Exibindo apenas o texto agora */}
            <p className="post-it-texto">{bloco.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

