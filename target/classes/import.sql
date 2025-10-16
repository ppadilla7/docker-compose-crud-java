-- Datos iniciales para la tabla de empleados
INSERT INTO empleados (nombre, apellido, email, salario, fecha_contratacion, departamento)
VALUES ('Juan', 'Pérez', 'juan.perez@empresa.com', 35000.00, '2020-01-15', 'Desarrollo')
ON CONFLICT (email) DO NOTHING;
INSERT INTO empleados (nombre, apellido, email, salario, fecha_contratacion, departamento)
VALUES ('María', 'González', 'maria.gonzalez@empresa.com', 42000.00, '2019-05-20', 'Marketing')
ON CONFLICT (email) DO NOTHING;
INSERT INTO empleados (nombre, apellido, email, salario, fecha_contratacion, departamento)
VALUES ('Carlos', 'Rodríguez', 'carlos.rodriguez@empresa.com', 38000.00, '2021-03-10', 'Recursos Humanos')
ON CONFLICT (email) DO NOTHING;
INSERT INTO empleados (nombre, apellido, email, salario, fecha_contratacion, departamento)
VALUES ('Ana', 'Martínez', 'ana.martinez@empresa.com', 45000.00, '2018-11-05', 'Desarrollo')
ON CONFLICT (email) DO NOTHING;
INSERT INTO empleados (nombre, apellido, email, salario, fecha_contratacion, departamento)
VALUES ('Luis', 'Sánchez', 'luis.sanchez@empresa.com', 32000.00, '2022-02-18', 'Ventas')
ON CONFLICT (email) DO NOTHING;