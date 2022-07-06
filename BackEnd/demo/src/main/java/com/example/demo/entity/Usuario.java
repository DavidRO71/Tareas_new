package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="usu_id")
    private int     id;
    private String  usu_nombre;
    private String  usu_apellido;

    @Column(name="usu_login")
    private String  login;

    @Column(name="usu_password")
    private String  password;
    private int     usu_activo;
    
    public Usuario() {
    }

    public Usuario(int usu_id, String usu_nombre, String usu_apellido, String usu_login, String usu_password, int usu_activo) {
        this.id = usu_id;
        this.usu_nombre = usu_nombre;
        this.usu_apellido = usu_apellido;
        this.login = usu_login;
        this.password = usu_password;
        this.usu_activo = usu_activo;
    }

    public int getUsu_id() {
        return id;
    }

    public void setUsu_id(int usu_id) {
        this.id = usu_id;
    }

    public String getUsu_nombre() {
        return usu_nombre;
    }

    public void setUsu_nombre(String usu_nombre) {
        this.usu_nombre = usu_nombre;
    }

    public String getUsu_apellido() {
        return usu_apellido;
    }

    public void setUsu_apellido(String usu_apellido) {
        this.usu_apellido = usu_apellido;
    }

    public String getUsu_login() {
        return login;
    }

    public void setUsu_login(String usu_login) {
        this.login = usu_login;
    }

    public String getUsu_password() {
        return password;
    }

    public void setUsu_password(String usu_password) {
        this.password = usu_password;
    }

    public int getUsu_activo() {
        return usu_activo;
    }

    public void setUsu_activo(int usu_activo) {
        this.usu_activo = usu_activo;
    }

    @Override
    public String toString() {
        return "Usuario [usu_activo=" + usu_activo + ", usu_apellido=" + usu_apellido + ", usu_id=" + id
                + ", usu_login=" + login + ", usu_nombre=" + usu_nombre + ", usu_password=" + password + "]";
    }

}
