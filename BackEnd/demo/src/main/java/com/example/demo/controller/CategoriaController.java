package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Categoria;
import com.example.demo.service.CategoriaService;

@RestController
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;
    
    @CrossOrigin
	@GetMapping(path = "/getAllCategorias")
	public List<Categoria> getAllCategorias() {
		return categoriaService.getAllCategorias();
		// return myNoteService.GetNotes();
	}

	@CrossOrigin
	@GetMapping("/getCategoriaByID/{id}")
	public Optional<Categoria> getCategoriaByID(@PathVariable("id") Integer id) {
		return categoriaService.getCategoriaByID(id);
	}

	@CrossOrigin
	@PostMapping("/createCategoria")
	public int createCategoria(@RequestBody Categoria newCategoria) {
		return categoriaService.createCategoria(newCategoria);
	}

	@CrossOrigin
	@PutMapping("/updateCategoria")
	public String updateCategoria(@RequestBody Categoria myCategoria) {
		return categoriaService.updateCategoria(myCategoria);
	}

	@CrossOrigin
	@DeleteMapping("/deleteCategoria/{id}")
	public String deleteCategoria(@PathVariable("id") Integer id) {
		return categoriaService.deleteCategoria(id);
	}

	@CrossOrigin
	@PutMapping("/desactivarCategoria/{id}")
	public String desactivarCategoria(@PathVariable("id") Integer id) {
		return categoriaService.desactivarCategoria(id);
	}
}
