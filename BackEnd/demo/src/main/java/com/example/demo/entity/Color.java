package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "color")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int     color_id;
    private String  color_nombre;
    private int     color_activo;

    public Color(){

    }

    public Color(int color_id, String color_nombre, int color_activo) {
        this.color_id = color_id;
        this.color_nombre = color_nombre;
        this.color_activo = color_activo;
    }

    public int getColor_id() {
        return color_id;
    }

    public void setColor_id(int color_id) {
        this.color_id = color_id;
    }

    public String getColor_nombre() {
        return color_nombre;
    }

    public void setColor_nombre(String color_nombre) {
        this.color_nombre = color_nombre;
    }

    public int getColor_activo() {
        return color_activo;
    }

    public void setColor_activo(int color_activo) {
        this.color_activo = color_activo;
    }

    @Override
    public String toString() {
        return "Color [color_activo=" + color_activo + ", color_id=" + color_id + ", color_nombre=" + color_nombre
                + "]";
    }
    
}
