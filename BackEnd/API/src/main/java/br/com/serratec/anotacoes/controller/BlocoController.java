package br.com.serratec.anotacoes.controller;

import br.com.serratec.anotacoes.dto.BlocoInserirDTO;
import br.com.serratec.anotacoes.dto.BlocoResponseDTO;
import br.com.serratec.anotacoes.service.BlocoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/blocos")
@Tag(name = "Blocos de Anotações", description = "CRUD de blocos — requer autenticação Bearer")
@SecurityRequirement(name = "bearerAuth")
public class BlocoController {

    @Autowired
    private BlocoService blocoService;

    // ── GET /blocos
    @GetMapping
    @Operation(summary = "Lista todos os blocos do usuário logado")
    public ResponseEntity<List<BlocoResponseDTO>> listar() {
        return ResponseEntity.ok(blocoService.listar());
    }

    // ── GET /blocos/{id}
    @GetMapping("/{id}")
    @Operation(summary = "Busca um bloco por ID")
    public ResponseEntity<BlocoResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(blocoService.buscarPorId(id));
    }

    // ── POST /blocos
    @PostMapping
    @Operation(summary = "Cria um novo bloco de anotação")
    public ResponseEntity<BlocoResponseDTO> criar(
            @Valid @RequestBody BlocoInserirDTO dto) {

        BlocoResponseDTO salvo = blocoService.criar(dto);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getIdBloco())
                .toUri();

        return ResponseEntity.created(uri).body(salvo);
    }

    // ── PUT /blocos/{id}
    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um bloco existente")
    public ResponseEntity<BlocoResponseDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody BlocoInserirDTO dto) {

        return ResponseEntity.ok(blocoService.atualizar(id, dto));
    }

    // ── DELETE /blocos/{id}
    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta um bloco")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        blocoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
