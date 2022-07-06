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

import com.example.demo.entity.Color;
import com.example.demo.service.ColorService;

@RestController
public class ColorController {

    @Autowired
    private ColorService colorService;

    @CrossOrigin
	@GetMapping(path = "/getAllColores")
	public List<Color> getAllColores() {
		return colorService.getAllColores();
	}

	@CrossOrigin
	@GetMapping("/getColorByID/{id}")
	public Optional<Color> getColorByID(@PathVariable("id") Integer id) {
		return colorService.getColorByID(id);
	}
    
	@CrossOrigin
	@PostMapping("/createColor")
	public int createColor(@RequestBody Color newColor) {
		return colorService.createColor(newColor);
	}

	@CrossOrigin
	@PutMapping("/updateColor")
	public String updateColor(@RequestBody Color myColor) {
		return colorService.updateColor(myColor);
	}

	@CrossOrigin
	@DeleteMapping("/deleteColor/{id}")
	public String deleteColor(@PathVariable("id") Integer id) {
		return colorService.deleteColor(id);
	}

	@CrossOrigin
	@PutMapping("/desactivarColor/{id}")
	public String desactivarColor(@PathVariable("id") Integer id) {
		return colorService.desactivarColor(id);
	}
	
}
