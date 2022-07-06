package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int     cate_id;
    private String  cate_nombre;
    private int     color_id;
    private int     cate_activo;
    
    public Categoria() {
    }

    public Categoria(int cate_id, String cate_nombre, int color_id, int cate_activo) {
        this.cate_id = cate_id;
        this.cate_nombre = cate_nombre;
        this.color_id = color_id;
        this.cate_activo = cate_activo;
    }

    public int getCate_id() {
        return cate_id;
    }

    public void setCate_id(int cate_id) {
        this.cate_id = cate_id;
    }

    public String getCate_nombre() {
        return cate_nombre;
    }

    public void setCate_nombre(String cate_nombre) {
        this.cate_nombre = cate_nombre;
    }

    public int getColor_id() {
        return color_id;
    }

    public void setColor_id(int color_id) {
        this.color_id = color_id;
    }

    public int getCate_activo() {
        return cate_activo;
    }

    public void setCate_activo(int cate_activo) {
        this.cate_activo = cate_activo;
    }

    @Override
    public String toString() {
        return "Categoria [cate_activo=" + cate_activo + ", cate_id=" + cate_id + ", cate_nombre=" + cate_nombre
                + ", color_id=" + color_id + "]";
    }

}
