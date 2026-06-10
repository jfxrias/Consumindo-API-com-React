package br.com.serratec.anotacoes.repository;

import br.com.serratec.anotacoes.model.Bloco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlocoRepository extends JpaRepository<Bloco, Long> {

    // Busca todos os blocos de um usuário específico
    List<Bloco> findByUsuarioIdUsuario(Long idUsuario);
}
