package br.com.serratec.anotacoes.dto;

public class BlocoResponseDTO {

    private Long idBloco;
    private Long idUsuario;
    private String texto;

    public BlocoResponseDTO(Long idBloco, Long idUsuario, String texto) {
        this.idBloco = idBloco;
        this.idUsuario = idUsuario;
        this.texto = texto;
    }

    public Long getIdBloco() { return idBloco; }
    public Long getIdUsuario() { return idUsuario; }
    public String getTexto() { return texto; }
}
