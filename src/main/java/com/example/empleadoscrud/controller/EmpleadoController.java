package com.example.empleadoscrud.controller;

import com.example.empleadoscrud.model.Empleado;
import com.example.empleadoscrud.repository.EmpleadoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    // Obtener todos los empleados
    @GetMapping
    public List<Empleado> getAllEmpleados() {
        return empleadoRepository.findAll();
    }

    // Crear un nuevo empleado
    @PostMapping
    public ResponseEntity<Empleado> createEmpleado(@Valid @RequestBody Empleado empleado) {
        Empleado nuevoEmpleado = empleadoRepository.save(empleado);
        return new ResponseEntity<>(nuevoEmpleado, HttpStatus.CREATED);
    }

    // Obtener un empleado por ID
    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getEmpleadoById(@PathVariable Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElse(null);
        
        if (empleado == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        return new ResponseEntity<>(empleado, HttpStatus.OK);
    }

    // Actualizar un empleado
    @PutMapping("/{id}")
    public ResponseEntity<Empleado> updateEmpleado(@PathVariable Long id, @Valid @RequestBody Empleado empleadoDetails) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElse(null);
        
        if (empleado == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        empleado.setNombre(empleadoDetails.getNombre());
        empleado.setApellido(empleadoDetails.getApellido());
        empleado.setEmail(empleadoDetails.getEmail());
        empleado.setSalario(empleadoDetails.getSalario());
        empleado.setFechaContratacion(empleadoDetails.getFechaContratacion());
        empleado.setDepartamento(empleadoDetails.getDepartamento());
        
        Empleado updatedEmpleado = empleadoRepository.save(empleado);
        return new ResponseEntity<>(updatedEmpleado, HttpStatus.OK);
    }

    // Eliminar un empleado
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmpleado(@PathVariable Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElse(null);
        
        if (empleado == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        empleadoRepository.delete(empleado);
        
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    // Buscar empleados por departamento
    @GetMapping("/departamento/{departamento}")
    public List<Empleado> getEmpleadosByDepartamento(@PathVariable String departamento) {
        return empleadoRepository.findByDepartamento(departamento);
    }
    
    // Buscar empleados por nombre o apellido
    @GetMapping("/search")
    public List<Empleado> searchEmpleados(@RequestParam String query) {
        return empleadoRepository.findByNombreContainingOrApellidoContaining(query, query);
    }
}