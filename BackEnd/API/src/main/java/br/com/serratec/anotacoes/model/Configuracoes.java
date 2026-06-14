

    package br.com.serratec.anotacoes.model;

import jakarta.persistence.*;


@Entity
@Table(name = "configuracoes")
public class Configuracoes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

  
    private String cor;

    // getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

 

    public String getCor() { return cor; }
    public void setCor(String cor) { this.cor = cor; }
}


