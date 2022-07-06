package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Categoria;
import com.example.demo.repository.CategoriaRepository;


@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> getCategoriaByID(int myID) {
        Optional<Categoria> myCategoria = categoriaRepository.findById(myID);
        if (myCategoria.isPresent()){
            return myCategoria;            
        }
        return null;
    }

    public int createCategoria(Categoria categoria){
        return categoriaRepository.saveAndFlush(categoria).getCate_id();
    }

    public String updateCategoria(Categoria categoria) {
        Optional<Categoria> myCategoria = categoriaRepository.findById(categoria.getCate_id());
        if (myCategoria.isPresent()){
            categoriaRepository.saveAndFlush(categoria);
            return "OK";            
        }
        return "NO OK";
    }

    public String deleteCategoria(int myID){
        Optional<Categoria> myCategoria = categoriaRepository.findById(myID);
        if (myCategoria.isPresent()){
            categoriaRepository.deleteById(myID);
            return "OK";            
        }
        return "NO OK";
    }

    public String desactivarCategoria(int myID) {
        Optional<Categoria> myCategoria = categoriaRepository.findById(myID);
        if (myCategoria.isPresent()){
            Categoria categoria = myCategoria.get();
            categoria.setCate_activo(0);
            categoriaRepository.saveAndFlush(categoria);
            return "OK";            
        }
        return "NO OK";
    }

}
