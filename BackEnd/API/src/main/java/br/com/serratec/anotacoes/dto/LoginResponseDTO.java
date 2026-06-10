package br.com.serratec.anotacoes.dto;

public class LoginResponseDTO {

    private String token;
    private String tipo = "Bearer";
    private Long idUsuario;
    private String login;

    public LoginResponseDTO(String token, Long idUsuario, String login) {
        this.token = token;
        this.idUsuario = idUsuario;
        this.login = login;
    }

    public String getToken() { return token; }
    public String getTipo() { return tipo; }
    public Long getIdUsuario() { return idUsuario; }
    public String getLogin() { return login; }
}
