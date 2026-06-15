package br.com.serratec.anotacoes.dto;

public class ConfiguracoesRequestDTO {
    private String senhaNova;
   
    private String login;
    private String nomeCategoria;
    private String corCategoria;
    private String idioma;

    // getters e setters
    public String getSenhaNova() { return senhaNova; }
    public void setSenhaNova(String senhaNova) { this.senhaNova = senhaNova; }



    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getNomeCategoria() { return nomeCategoria; }
    public void setNomeCategoria(String nomeCategoria) { this.nomeCategoria = nomeCategoria; }

    public String getCorCategoria() { return corCategoria; }
    public void setCorCategoria(String corCategoria) { this.corCategoria = corCategoria; }

    public String getIdioma() { return idioma; }
    public void setIdioma(String idioma) { this.idioma = idioma; }
}
