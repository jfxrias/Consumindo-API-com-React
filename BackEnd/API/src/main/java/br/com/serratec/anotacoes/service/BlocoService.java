package br.com.serratec.anotacoes.service;

import br.com.serratec.anotacoes.dto.BlocoRequestDTO;
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

    private Usuario getUsuarioLogado() {
        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        return usuarioRepository.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public List<BlocoResponseDTO> listar() {
        Usuario usuario = getUsuarioLogado();
        return blocoRepository.findByUsuarioIdUsuario(usuario.getIdUsuario())
                .stream()
                .map(b -> new BlocoResponseDTO(
                        b.getIdBloco(),
                        b.getUsuario().getIdUsuario(),
                        b.getTexto(),
                        b.getCor()))
                .collect(Collectors.toList());
    }

    public BlocoResponseDTO buscarPorId(Long id) {
        Usuario usuario = getUsuarioLogado();
        Bloco bloco = blocoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bloco não encontrado"));
        if (!bloco.getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("Acesso negado a este bloco");
        }
        return new BlocoResponseDTO(
                bloco.getIdBloco(),
                bloco.getUsuario().getIdUsuario(),
                bloco.getTexto(),
                bloco.getCor());
    }

    public BlocoResponseDTO criar(BlocoRequestDTO dto) {
        Usuario usuario = getUsuarioLogado();
        Bloco bloco = new Bloco(dto.getTexto(), usuario);
        bloco.setCor(dto.getCor());
        Bloco salvo = blocoRepository.save(bloco);
        return new BlocoResponseDTO(
                salvo.getIdBloco(),
                salvo.getUsuario().getIdUsuario(),
                salvo.getTexto(),
                salvo.getCor());
    }

    public BlocoResponseDTO atualizar(Long id, BlocoRequestDTO dto) {
        Usuario usuario = getUsuarioLogado();
        Bloco bloco = blocoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bloco não encontrado"));
        if (!bloco.getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("Acesso negado a este bloco");
        }
        bloco.setTexto(dto.getTexto());
        bloco.setCor(dto.getCor());
        Bloco atualizado = blocoRepository.save(bloco);
        return new BlocoResponseDTO(
                atualizado.getIdBloco(),
                atualizado.getUsuario().getIdUsuario(),
                atualizado.getTexto(),
                atualizado.getCor());
    }

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
