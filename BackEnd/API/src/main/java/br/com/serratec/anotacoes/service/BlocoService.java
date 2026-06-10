package br.com.serratec.anotacoes.service;

import br.com.serratec.anotacoes.dto.BlocoInserirDTO;
import br.com.serratec.anotacoes.dto.BlocoResponseDTO;
import br.com.serratec.anotacoes.model.Bloco;
import br.com.serratec.anotacoes.model.Usuario;
import br.com.serratec.anotacoes.repository.BlocoRepository;
import br.com.serratec.anotacoes.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlocoService {

    @Autowired
    private BlocoRepository blocoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    //Pega o usuário logado pelo contexto do Spring Security
    private Usuario getUsuarioLogado() {
        String login = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return usuarioRepository.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    //Listar todos os blocos do usuário logado
    public List<BlocoResponseDTO> listar() {
        Usuario usuario = getUsuarioLogado();
        return blocoRepository.findByUsuarioIdUsuario(usuario.getIdUsuario())
                .stream()
                .map(b -> new BlocoResponseDTO(
                        b.getIdBloco(),
                        b.getUsuario().getIdUsuario(),
                        b.getTexto()))
                .collect(Collectors.toList());
    }

    //Buscar bloco por ID (somente do usuário logado)
    public BlocoResponseDTO buscarPorId(Long id) {
        Usuario usuario = getUsuarioLogado();
        Bloco bloco = blocoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bloco não encontrado"));

        // Garante que o bloco pertence ao usuário logado
        if (!bloco.getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("Acesso negado a este bloco");
        }

        return new BlocoResponseDTO(bloco.getIdBloco(),
                bloco.getUsuario().getIdUsuario(), bloco.getTexto());
    }

    //Criar novo bloco
    public BlocoResponseDTO criar(BlocoInserirDTO dto) {
        Usuario usuario = getUsuarioLogado();
        Bloco bloco = new Bloco(dto.getTexto(), usuario);
        Bloco salvo = blocoRepository.save(bloco);
        return new BlocoResponseDTO(salvo.getIdBloco(),
                salvo.getUsuario().getIdUsuario(), salvo.getTexto());
    }

    //Atualizar bloco
    public BlocoResponseDTO atualizar(Long id, BlocoInserirDTO dto) {
        Usuario usuario = getUsuarioLogado();
        Bloco bloco = blocoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bloco não encontrado"));

        if (!bloco.getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("Acesso negado a este bloco");
        }

        bloco.setTexto(dto.getTexto());
        Bloco atualizado = blocoRepository.save(bloco);
        return new BlocoResponseDTO(atualizado.getIdBloco(),
                atualizado.getUsuario().getIdUsuario(), atualizado.getTexto());
    }

    // ── Deletar bloco
    public void deletar(Long id) {
        Usuario usuario = getUsuarioLogado();
        Bloco bloco = blocoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bloco não encontrado"));

        if (!bloco.getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("Acesso negado a este bloco");
        }

        blocoRepository.delete(bloco);
    }
}
