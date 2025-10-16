package com.example.empleadoscrud.repository;

import com.example.empleadoscrud.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    List<Empleado> findByDepartamento(String departamento);
    List<Empleado> findByNombreContainingOrApellidoContaining(String nombre, String apellido);
}