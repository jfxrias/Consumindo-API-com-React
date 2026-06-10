package br.com.serratec.anotacoes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class BlocoInserirDTO {

    @NotBlank(message = "O texto não pode ser vazio")
    @Size(max = 100, message = "O texto deve ter no máximo 100 caracteres")
    private String texto;

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }
}
