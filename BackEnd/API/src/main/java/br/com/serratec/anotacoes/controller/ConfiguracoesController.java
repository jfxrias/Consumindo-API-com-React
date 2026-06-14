package br.com.serratec.anotacoes.controller;

import br.com.serratec.anotacoes.dto.ConfiguracoesRequestDTO;
import br.com.serratec.anotacoes.dto.ConfiguracoesResponseDTO;
import br.com.serratec.anotacoes.dto.UsuarioResponseDTO;
import br.com.serratec.anotacoes.model.Configuracoes;
import br.com.serratec.anotacoes.model.Usuario;
import br.com.serratec.anotacoes.service.UsuarioService;
import br.com.serratec.anotacoes.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/configuracoes")
public class ConfiguracoesController {

    private final UsuarioService usuarioService;
    private final CategoriaService categoriaService;

    public ConfiguracoesController(UsuarioService usuarioService, CategoriaService categoriaService) {
        this.usuarioService = usuarioService;
        this.categoriaService = categoriaService;
    }

    @PostMapping("/alterar-senha/{id}")
    public ResponseEntity<ConfiguracoesResponseDTO> alterarSenha(@PathVariable Long id, @RequestBody ConfiguracoesRequestDTO dto) {
        Usuario u = usuarioService.alterarSenha(id, dto.getSenhaNova());
        ConfiguracoesResponseDTO response = new ConfiguracoesResponseDTO("Senha alterada com sucesso!");
        response.setIdUsuario(u.getIdUsuario());
        return ResponseEntity.ok(response);
    }

@PutMapping("/perfil/{id}")
public ResponseEntity<ConfiguracoesResponseDTO> atualizarPerfil(@PathVariable Long id, @RequestBody ConfiguracoesRequestDTO dto) {
    try {
        UsuarioResponseDTO u = usuarioService.atualizarPerfil(id, dto.getLogin());
        ConfiguracoesResponseDTO response = new ConfiguracoesResponseDTO("Perfil atualizado!");
        response.setIdUsuario(u.getIdUsuario());
        response.setLogin(u.getLogin());
        response.setToken(u.getToken()); // devolve o novo token
        return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(new ConfiguracoesResponseDTO(e.getMessage()));
    }
}




    @PostMapping("/categorias")
    public ResponseEntity<ConfiguracoesResponseDTO> criarCategoria(@RequestBody ConfiguracoesRequestDTO dto) {
        Configuracoes c = categoriaService.criarCategoria(dto.getNomeCategoria(), dto.getCorCategoria());
        ConfiguracoesResponseDTO response = new ConfiguracoesResponseDTO("Categoria criada!");
        response.setIdCategoria(c.getId());
        response.setCorCategoria(c.getCor());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/idioma/{id}")
    public ResponseEntity<ConfiguracoesResponseDTO> mudarIdioma(@PathVariable Long id, @RequestBody ConfiguracoesRequestDTO dto) {
        Usuario u = usuarioService.mudarIdioma(id, dto.getIdioma());
        ConfiguracoesResponseDTO response = new ConfiguracoesResponseDTO("Idioma alterado com sucesso!");
        response.setIdUsuario(u.getIdUsuario());
        response.setIdioma(u.getIdioma());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/exportar")
    public ResponseEntity<ConfiguracoesResponseDTO> exportarNotas() {
        return ResponseEntity.ok(new ConfiguracoesResponseDTO("Notas exportadas com sucesso!"));
    }

    @PostMapping("/importar")
    public ResponseEntity<ConfiguracoesResponseDTO> importarDados() {
        return ResponseEntity.ok(new ConfiguracoesResponseDTO("Dados importados com sucesso!"));
    }

    @PostMapping("/reset")
    public ResponseEntity<ConfiguracoesResponseDTO> redefinirAplicacao() {
        return ResponseEntity.ok(new ConfiguracoesResponseDTO("Aplicação redefinida!"));
    }
}
