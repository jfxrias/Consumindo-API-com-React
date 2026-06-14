package br.com.serratec.anotacoes.service;

import br.com.serratec.anotacoes.dto.LoginRequestDTO;
import br.com.serratec.anotacoes.dto.LoginResponseDTO;
import br.com.serratec.anotacoes.dto.UsuarioCadastroDTO;
import br.com.serratec.anotacoes.dto.UsuarioResponseDTO;
import br.com.serratec.anotacoes.model.Usuario;
import br.com.serratec.anotacoes.repository.UsuarioRepository;
import br.com.serratec.anotacoes.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public UsuarioResponseDTO cadastrar(UsuarioCadastroDTO dto) {
        if (usuarioRepository.existsByLogin(dto.getLogin())) {
            throw new RuntimeException("Login já cadastrado: " + dto.getLogin());
        }
        Usuario usuario = new Usuario();
        usuario.setLogin(dto.getLogin());
        usuario.setSenhaUsuario(passwordEncoder.encode(dto.getSenha()));
        usuario.setRole(dto.getRole());
        Usuario salvo = usuarioRepository.save(usuario);
        return new UsuarioResponseDTO(salvo.getIdUsuario(), salvo.getLogin());
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getLogin(), dto.getSenha())
            );
            Usuario usuario = usuarioRepository.findByLogin(dto.getLogin())
                    .orElseThrow();
            String token = jwtUtil.gerarToken(dto.getLogin());
            return new LoginResponseDTO(token, usuario.getIdUsuario(), usuario.getLogin());
        } catch (Exception e) {
            throw new BadCredentialsException("Login ou senha inválidos");
        }
    }

    public Usuario alterarSenha(Long id, String novaSenha) {
        Usuario u = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        u.setSenhaUsuario(passwordEncoder.encode(novaSenha));
        return usuarioRepository.save(u);
    }

public UsuarioResponseDTO atualizarPerfil(Long id, String login) {
    Usuario u = usuarioRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

    if (login != null && !login.isBlank()) {
        if (!login.equals(u.getLogin()) && usuarioRepository.existsByLogin(login)) {
            throw new RuntimeException("Login já cadastrado: " + login);
        }
        u.setLogin(login);
    }

    Usuario salvo = usuarioRepository.save(u);
    String novoToken = jwtUtil.gerarToken(salvo.getLogin());
    return new UsuarioResponseDTO(salvo.getIdUsuario(), salvo.getLogin(), novoToken);
}


    public Usuario mudarIdioma(Long id, String idioma) {
        Usuario u = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        u.setIdioma(idioma);
        return usuarioRepository.save(u);
    }
}
