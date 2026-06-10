package br.com.serratec.anotacoes.security;

import br.com.serratec.anotacoes.model.Usuario;
import br.com.serratec.anotacoes.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Usuário não encontrado: " + login));

        // Retorna o UserDetails com login, senha e sem roles extras
        return new org.springframework.security.core.userdetails.User(
                usuario.getLogin(),
                usuario.getSenhaUsuario(),
                new ArrayList<>()
        );
    }
}
