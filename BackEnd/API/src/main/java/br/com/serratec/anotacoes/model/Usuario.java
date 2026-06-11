package br.com.serratec.anotacoes.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @NotBlank
    @Column(name = "login", nullable = false, unique = true, length = 100)
    private String login;

    @NotBlank
    @Column(name = "senha_usuario", nullable = false)
    private String senhaUsuario;

    @Column(name = "role", nullable = false, length = 20)
    private String role; 

  
    public Usuario() {}

    public Usuario(String login, String senhaUsuario, String role) {
        this.login = login;
        this.senhaUsuario = senhaUsuario;
        this.role = role;
    }

  
    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getSenhaUsuario() { return senhaUsuario; }
    public void setSenhaUsuario(String senhaUsuario) { this.senhaUsuario = senhaUsuario; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
