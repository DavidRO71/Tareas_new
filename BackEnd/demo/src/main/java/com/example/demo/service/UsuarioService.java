package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Usuario;
import com.example.demo.repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios(){
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioByID(int myID) {
        Optional<Usuario> myUsuario = usuarioRepository.findById(myID);
        if (myUsuario.isPresent()){
            return myUsuario;            
        }
        return null;
    }

    public int createUsuario(Usuario usuario){
        return usuarioRepository.saveAndFlush(usuario).getUsu_id();
    }

    public String updateUsuario(Usuario usuario) {
        Optional<Usuario> myUsuario = usuarioRepository.findById(usuario.getUsu_id());
        if (myUsuario.isPresent()){
            usuarioRepository.saveAndFlush(usuario);
            return "OK";            
        }
        return "NO OK";
    }

    public String deleteUsuario(int myID){
        Optional<Usuario> myUsuario = usuarioRepository.findById(myID);
        if (myUsuario.isPresent()){
            usuarioRepository.deleteById(myID);
            return "OK";            
        }
        return "NO OK";
    }

    public String desactivarUsuario(int myID) {
        Optional<Usuario> myUsuario = usuarioRepository.findById(myID);
        if (myUsuario.isPresent()){
            Usuario usuario = myUsuario.get();
            usuario.setUsu_activo(0);
            usuarioRepository.saveAndFlush(usuario);
            return "OK";            
        }
        return "NO OK";
    }

    public Usuario findByLoginAndPassword(String login, String password) {
        return usuarioRepository.findByLoginAndPassword(login, password);
    }
}
