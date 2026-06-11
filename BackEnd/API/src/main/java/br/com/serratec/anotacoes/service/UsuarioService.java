package br.com.serratec.anotacoes.service;

import br.com.serratec.anotacoes.dto.*;
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

    //Cadastro
  public UsuarioResponseDTO cadastrar(UsuarioCadastroDTO dto) {
    if (usuarioRepository.existsByLogin(dto.getLogin())) {
        throw new RuntimeException("Login já cadastrado: " + dto.getLogin());
    }

    Usuario usuario = new Usuario();
    usuario.setLogin(dto.getLogin());
    usuario.setSenhaUsuario(passwordEncoder.encode(dto.getSenha()));
    usuario.setRole(dto.getRole()); // ESSENCIAL: copiar o role do DTO

    Usuario salvo = usuarioRepository.save(usuario);
    return new UsuarioResponseDTO(salvo.getIdUsuario(), salvo.getLogin());
}


    //Login
    public LoginResponseDTO login(LoginRequestDTO dto) {
        try {
            // Autentica com o AuthenticationManager do Spring Security
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getLogin(), dto.getSenha())
            );

            // Busca o usuário no banco para pegar o id
            Usuario usuario = usuarioRepository.findByLogin(dto.getLogin())
                    .orElseThrow();

            // Gera o token JWT
            String token = jwtUtil.gerarToken(dto.getLogin());

            return new LoginResponseDTO(token, usuario.getIdUsuario(), usuario.getLogin());

        } catch (Exception e) {
            throw new BadCredentialsException("Login ou senha inválidos");
        }
    }
}
