package br.com.serratec.anotacoes.controller;

import br.com.serratec.anotacoes.dto.*;
import br.com.serratec.anotacoes.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuários", description = "Cadastro e login de usuários")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    //POST /usuarios/cadastro 
    @PostMapping("/cadastro")
    @Operation(summary = "Cadastra um novo usuário")
    public ResponseEntity<UsuarioResponseDTO> cadastrar(
            @Valid @RequestBody UsuarioCadastroDTO dto) {

        UsuarioResponseDTO salvo = usuarioService.cadastrar(dto);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getIdUsuario())
                .toUri();

        return ResponseEntity.created(uri).body(salvo);
    }

    //POST /usuarios/login
    @PostMapping("/login")
    @Operation(summary = "Autentica o usuário e retorna o token JWT")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO dto) {

        LoginResponseDTO response = usuarioService.login(dto);
        return ResponseEntity.ok(response);
    }
}
