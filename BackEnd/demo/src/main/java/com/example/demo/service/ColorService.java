package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Color;
import com.example.demo.repository.ColorRepository;

@Service
public class ColorService {
    
    @Autowired
    private ColorRepository colorRepository;

    public List<Color> getAllColores(){
        return colorRepository.findAll();
    }

    public Optional<Color> getColorByID(int myID) {
        Optional<Color> myColor = colorRepository.findById(myID);
        if (myColor.isPresent()){
            return myColor;            
        }
        return null;
    }

    public int createColor(Color color){
        return colorRepository.saveAndFlush(color).getColor_id();
    }

    public String updateColor(Color color) {
        Optional<Color> myColor = colorRepository.findById(color.getColor_id());
        if (myColor.isPresent()){
            colorRepository.saveAndFlush(color);
            return "OK";            
        }
        return "NO OK";
    }

    public String deleteColor(int myID){
        Optional<Color> myColor = colorRepository.findById(myID);
        if (myColor.isPresent()){
            colorRepository.deleteById(myID);
            return "OK";            
        }
        return "NO OK";
    }

    public String desactivarColor(int myID) {
        Optional<Color> myColor = colorRepository.findById(myID);
        if (myColor.isPresent()){
            Color color = myColor.get();
            color.setColor_activo(0);
            colorRepository.saveAndFlush(color);
            return "OK";            
        }
        return "NO OK";
    }
}
