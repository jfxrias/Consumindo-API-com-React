package br.com.serratec.anotacoes.dto;

public class BlocoResponseDTO {
    private Long idBloco;
    private Long idUsuario;
    private String texto;
    private String cor; 

    public BlocoResponseDTO(Long idBloco, Long idUsuario, String texto, String cor) {
        this.idBloco = idBloco;
        this.idUsuario = idUsuario;
        this.texto = texto;
        this.cor = cor;
    }

    public Long getIdBloco() {
        return idBloco;
    }

    public void setIdBloco(Long idBloco) {
        this.idBloco = idBloco;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }
}
