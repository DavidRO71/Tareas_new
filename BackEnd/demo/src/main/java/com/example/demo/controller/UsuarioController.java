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

import com.example.demo.entity.Usuario;
import com.example.demo.service.UsuarioService;

@RestController
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @CrossOrigin
	@GetMapping(path = "/getAllUsuarios")
	public List<Usuario> getAllUsuarios() {
		return usuarioService.getAllUsuarios();
	}

	@CrossOrigin
	@GetMapping("/getUsuarioByID/{id}")
	public Optional<Usuario> getUsuarioByID(@PathVariable("id") Integer id) {
		return usuarioService.getUsuarioByID(id);
	}
    
	@CrossOrigin
	@PostMapping("/createUsuario")
	public int createUsuario(@RequestBody Usuario newUsuario) {
		return usuarioService.createUsuario(newUsuario);
	}

	@CrossOrigin
	@PutMapping("/updateUsuario")
	public String updateUsuario(@RequestBody Usuario myUsuario) {
		return usuarioService.updateUsuario(myUsuario);
	}

	@CrossOrigin
	@DeleteMapping("/deleteUsuario/{id}")
	public String deleteUsuario(@PathVariable("id") Integer id) {
		return usuarioService.deleteUsuario(id);
	}

	@CrossOrigin
	@PutMapping("/desactivarUsuario/{id}")
	public String desactivarUsuario(@PathVariable("id") Integer id) {
		return usuarioService.desactivarUsuario(id);
	}

    @CrossOrigin
    @GetMapping("/comprobarLoginPwd/{login}&{password}")
	public Usuario findByLoginAndPassword(@PathVariable("login") String login, @PathVariable("password") String password) {
		return usuarioService.findByLoginAndPassword(login, password);
	}
}
