package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class pruebaController {
    @GetMapping(path = "/greetings")
	public String greetings() {
		return "Hello World";
	}
}
