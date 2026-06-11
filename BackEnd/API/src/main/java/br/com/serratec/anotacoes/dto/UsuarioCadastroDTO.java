package br.com.serratec.anotacoes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UsuarioCadastroDTO {

    @NotBlank(message = "Login é obrigatório")
    @Size(max = 100)
    private String login;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
    private String senha;

     @NotBlank(message = "Role é obrigatória")
    private String role;

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
     public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}

