package br.com.serratec.anotacoes.service;

import br.com.serratec.anotacoes.model.Configuracoes;
import br.com.serratec.anotacoes.repository.ConfiguracoesRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {

    private final ConfiguracoesRepository repo;

    public CategoriaService(ConfiguracoesRepository repo) {
        this.repo = repo;
    }

    public Configuracoes criarCategoria(String nome, String cor) {
        Configuracoes c = new Configuracoes();
        c.setCor(cor);
        return repo.save(c);
    }
}
