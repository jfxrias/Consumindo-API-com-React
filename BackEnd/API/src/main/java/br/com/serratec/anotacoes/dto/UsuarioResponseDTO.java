package br.com.serratec.anotacoes.dto;

public class UsuarioResponseDTO {
    private Long idUsuario;
    private String login;
    private String token;

    public UsuarioResponseDTO(Long idUsuario, String login) {
        this.idUsuario = idUsuario;
        this.login = login;
    }

    public UsuarioResponseDTO(Long idUsuario, String login, String token) {
        this.idUsuario = idUsuario;
        this.login = login;
        this.token = token;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
