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

import com.example.demo.entity.Tarea;
import com.example.demo.service.TareaService;

@RestController
public class TareaController {
    @Autowired
    private TareaService tareaService;

    @CrossOrigin
	@GetMapping(path = "/getAllTareas")
	public List<Tarea> getAllTareas() {
		return tareaService.getAllTareas();
	}

	@CrossOrigin
	@GetMapping("/getTareaByID/{id}")
	public Optional<Tarea> getTareaByID(@PathVariable("id") Integer id) {
		return tareaService.getTareaByID(id);
	}

	@CrossOrigin
	@GetMapping("/getTareaByIDUsuario/{id}")
	public List<Tarea> getTareaByIDUsuario(@PathVariable("id") Integer id) {
		return tareaService.getTareaByIDUsuario(id);
	}
    
	@CrossOrigin
	@PostMapping("/createTarea")
	public int createTarea(@RequestBody Tarea newTarea) {
		return tareaService.createTarea(newTarea);
	}

	@CrossOrigin
	@PutMapping("/updateTarea")
	public String updateTarea(@RequestBody Tarea myTarea) {
		return tareaService.updateTarea(myTarea);
	}

	@CrossOrigin
	@DeleteMapping("/deleteTarea/{id}")
	public String deleteTarea(@PathVariable("id") Integer id) {
		return tareaService.deleteTarea(id);
	}

	@CrossOrigin
	@PutMapping("/desactivarTarea/{id}")
	public String desactivarTarea(@PathVariable("id") Integer id) {
		return tareaService.desactivarTarea(id);
	}
}
