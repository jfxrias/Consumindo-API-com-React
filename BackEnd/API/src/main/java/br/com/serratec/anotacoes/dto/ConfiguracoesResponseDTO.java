package br.com.serratec.anotacoes.dto;

public class ConfiguracoesResponseDTO {

    private String mensagem;
    private Long idUsuario;
  
    private String login;
    private String idioma;
    private Long idCategoria;
    private String nomeCategoria;
    private String corCategoria;
    private String token;
    // Construtores
    public ConfiguracoesResponseDTO() {}

    public ConfiguracoesResponseDTO(String mensagem) {
        this.mensagem = mensagem;
    }

    // Getters e Setters
    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }

    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }


    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getIdioma() { return idioma; }
    public void setIdioma(String idioma) { this.idioma = idioma; }

    public Long getIdCategoria() { return idCategoria; }
    public void setIdCategoria(Long idCategoria) { this.idCategoria = idCategoria; }

    public String getNomeCategoria() { return nomeCategoria; }
    public void setNomeCategoria(String nomeCategoria) { this.nomeCategoria = nomeCategoria; }

    public String getCorCategoria() { return corCategoria; }
    public void setCorCategoria(String corCategoria) { this.corCategoria = corCategoria; }
    public String getToken() {
    return token;
}

public void setToken(String token) {
    this.token = token;
}
}
