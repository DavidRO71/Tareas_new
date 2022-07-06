package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Tarea;
import com.example.demo.repository.TareaRepository;

@Service
public class TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    public List<Tarea> getAllTareas(){
        return tareaRepository.findAll();
    }

    public Optional<Tarea> getTareaByID(int myID) {
        Optional<Tarea> myTarea = tareaRepository.findById(myID);
        if (myTarea.isPresent()){
            return myTarea;            
        }
        return null;
    }

    public List<Tarea> getTareaByIDUsuario(int myID) {
        List<Tarea> myTareas = tareaRepository.findByUsuid(myID);
        return myTareas;
    }

    public int createTarea(Tarea tarea){
        return tareaRepository.saveAndFlush(tarea).getTarea_id();
    }

    public String updateTarea(Tarea tarea) {
        Optional<Tarea> myTarea = tareaRepository.findById(tarea.getTarea_id());
        if (myTarea.isPresent()){
            tareaRepository.saveAndFlush(tarea);
            return "OK";            
        }
        return "NO OK";
    }

    public String deleteTarea(int myID){
        Optional<Tarea> myTarea = tareaRepository.findById(myID);
        if (myTarea.isPresent()){
            tareaRepository.deleteById(myID);
            return "OK";            
        }
        return "NO OK";
    }

    public String desactivarTarea(int myID) {
        Optional<Tarea> myTarea = tareaRepository.findById(myID);
        if (myTarea.isPresent()){
            Tarea tarea = myTarea.get();
            tarea.setTarea_activo(0);
            tareaRepository.saveAndFlush(tarea);
            return "OK";            
        }
        return "NO OK";
    }
}
