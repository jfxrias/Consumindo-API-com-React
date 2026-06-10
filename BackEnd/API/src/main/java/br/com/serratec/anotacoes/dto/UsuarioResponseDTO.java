package br.com.serratec.anotacoes.dto;

public class UsuarioResponseDTO {

    private Long idUsuario;
    private String login;

    public UsuarioResponseDTO(Long idUsuario, String login) {
        this.idUsuario = idUsuario;
        this.login = login;
    }

    public Long getIdUsuario() { return idUsuario; }
    public String getLogin() { return login; }
}
