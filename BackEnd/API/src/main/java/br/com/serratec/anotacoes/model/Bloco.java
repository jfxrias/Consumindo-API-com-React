package br.com.serratec.anotacoes.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "bloco")
public class Bloco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bloco")
    private Long idBloco;

    @NotBlank(message = "O texto não pode ser vazio")
    @Size(max = 100, message = "O texto deve ter no máximo 100 caracteres")
    @Column(name = "texto", nullable = false, length = 100)
    private String texto;

  
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    private String cor;

   
    public Bloco() {
    }

    public Bloco(String texto, Usuario usuario) {
        this.texto = texto;
        this.usuario = usuario;
    }

    
    public Long getIdBloco() {
        return idBloco;
    }

    public void setIdBloco(Long idBloco) {
        this.idBloco = idBloco;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }
}
