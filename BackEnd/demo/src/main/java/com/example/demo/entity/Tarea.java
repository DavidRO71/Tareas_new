package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tarea")
public class Tarea{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int     tarea_id;
    private String  tarea_nombre;
    private int     tarea_activo;
    private int     cate_id;

    @Column(name="usu_id")
    private int     usuid;

    public Tarea(){

    }

    public Tarea(int tarea_id, String tarea_nombre, int tarea_activo, int cate_id, int usu_id) {
        this.tarea_id = tarea_id;
        this.tarea_nombre = tarea_nombre;
        this.tarea_activo = tarea_activo;
        this.cate_id = cate_id;
        this.usuid = usu_id;
    }

    public int getTarea_id() {
        return tarea_id;
    }

    public void setTarea_id(int tarea_id) {
        this.tarea_id = tarea_id;
    }

    public String getTarea_nombre() {
        return tarea_nombre;
    }

    public void setTarea_nombre(String tarea_nombre) {
        this.tarea_nombre = tarea_nombre;
    }

    public int getTarea_activo() {
        return tarea_activo;
    }

    public void setTarea_activo(int tarea_activo) {
        this.tarea_activo = tarea_activo;
    }

    public int getCate_id() {
        return cate_id;
    }

    public void setCate_id(int cate_id) {
        this.cate_id = cate_id;
    }

    public int getUsu_id() {
        return usuid;
    }

    public void setUsu_id(int usu_id) {
        this.usuid = usu_id;
    }

    @Override
    public String toString() {
        return "Tarea [cate_id=" + cate_id + ", tarea_activo=" + tarea_activo + ", tarea_id=" + tarea_id
                + ", tarea_nombre=" + tarea_nombre + ", usu_id=" + usuid + "]";
    }
}
