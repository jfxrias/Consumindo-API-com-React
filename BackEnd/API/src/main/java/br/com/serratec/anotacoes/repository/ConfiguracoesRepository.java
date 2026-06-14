package br.com.serratec.anotacoes.repository;

import br.com.serratec.anotacoes.model.Configuracoes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfiguracoesRepository extends JpaRepository<Configuracoes, Long> {
}
