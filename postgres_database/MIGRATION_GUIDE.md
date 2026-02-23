# Guía de Migración: MySQL → PostgreSQL

## 📋 Resumen Ejecutivo

Este documento describe la migración completa de la base de datos **PetsHeaven** de MySQL a PostgreSQL, incluyendo:
- ✅ Esquema de tablas
- ✅ Datos iniciales
- ✅ Procedimientos y funciones
- ✅ Triggers de auditoría
- ✅ Tipos personalizados (ENUM)

## 🔄 Cambios de Sintaxis por Categoría

### 1. Tipos de Datos

| MySQL | PostgreSQL | Razón |
|-------|-----------|-------|
| `INT AUTO_INCREMENT` | `SERIAL` | PostgreSQL maneja secuencias automáticas |
| `FLOAT(12,2)` | `NUMERIC(12,2)` | Mayor precisión y control |
| `BOOLEAN DEFAULT(1)` | `BOOLEAN DEFAULT TRUE` | Sintaxis más clara |
| `DATETIME` | `TIMESTAMP` | Equivalente directo |
| `DATE DEFAULT CURDATE()` | `DATE DEFAULT CURRENT_DATE` | Sintaxis PostgreSQL |

### 2. ENUMs

**MySQL:**
```sql
est_cit ENUM('PENDIENTE', 'CONFIRMADA', ...) DEFAULT 'PENDIENTE'
```

**PostgreSQL:**
```sql
-- Crear tipo
CREATE TYPE estado_cita AS ENUM ('PENDIENTE', 'CONFIRMADA', ...);

-- Usar en tabla
est_cit pets_heaven.estado_cita DEFAULT 'PENDIENTE'
```

### 3. Procedimientos y Funciones

**MySQL:**
```sql
CREATE PROCEDURE RegistAppointment(IN p_param TYPE, OUT p_result TYPE)
BEGIN
    -- código
END //
```

**PostgreSQL:**
```sql
CREATE OR REPLACE FUNCTION RegistAppointment(
    p_param TYPE
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
BEGIN
    -- código
    RETURN QUERY SELECT TRUE, 'mensaje'::VARCHAR;
END;
$$ LANGUAGE plpgsql;
```

### 4. Funciones de Fecha y Hora

| MySQL | PostgreSQL |
|-------|-----------|
| `CURDATE()` | `CURRENT_DATE` |
| `NOW()` | `CURRENT_TIMESTAMP` |
| `TIMESTAMPDIFF(YEAR, fecha1, fecha2)` | `EXTRACT(YEAR FROM AGE(fecha2, fecha1))` |

### 5. Operadores y Funciones

| MySQL | PostgreSQL | Notas |
|-------|-----------|-------|
| `CONCAT()` | `CONCAT()` o `\|\|` | PostgreSQL prefiere `\|\|` |
| `GROUP_CONCAT()` | `STRING_AGG()` | Función equivalente |
| `LIKE` (sensible a caso) | `ILIKE` (insensible) | Usar según necesidad |
| `LAST_INSERT_ID()` | `LASTVAL()` o `CURRVAL()` | En funciones RETURN |

### 6. Comentarios y Documentación

**MySQL:**
```sql
CREATE TABLE usuarios (
    id INT COMMENT 'ID único',
    nombre VARCHAR(100) COMMENT 'Nombre del usuario'
);
```

**PostgreSQL:**
```sql
CREATE TABLE usuarios (
    id INT,
    nombre VARCHAR(100)
);

COMMENT ON COLUMN usuarios.id IS 'ID único';
COMMENT ON COLUMN usuarios.nombre IS 'Nombre del usuario';
```

## 📊 Mapeo de Procedimientos

### Procedimientos de Citas
- `RegistAppointment` → Registrar cita ✅
- `SearchAllAppointments` → Listar todas las citas ✅
- `SearchAppointmentsByUser` → Buscar citas por usuario ✅
- `CancelAppointment` → Cancelar cita ✅
- `UpdateAppointmentDate` → Actualizar fecha de cita ✅

### Procedimientos de Consultas
- `RegistConsult` → Registrar consulta completa ✅

### Procedimientos de Personas
- `RegistPeoples` → Registrar persona ✅
- `AssignRolAdmin` → Asignar rol administrador ✅
- `AssignRolStaff` → Asignar rol veterinario ✅
- `SearchPeopleBy` → Buscar persona ✅
- `SearchPeoplesBy` → Buscar múltiples personas ✅
- `DeletePeople` → Desactivar persona ✅

### Procedimientos de Mascotas
- `RegistPets` → Registrar mascota ✅
- `ModifyPets` → Modificar mascota ✅
- `SearchPets` → Listar mascotas ✅
- `SearchPetsBy` → Buscar mascotas ✅
- `SearchPetBy` → Buscar mascota individual ✅
- `DeletePetBy` → Desactivar mascota ✅

### Procedimientos de Propietarios
- `SearchOwners` → Listar propietarios ✅
- `SearchOwnersBy` → Buscar propietarios ✅
- `SearchOwnerBy` → Buscar propietario individual ✅
- `DeleteOwner` → Desactivar propietario ✅

### Procedimientos Globales
- `Login` → Autenticación ✅
- `ChangePassword` → Cambiar contraseña ✅
- `GetAdminStats` → Estadísticas administrativas ✅
- `GetStaffStats` → Estadísticas de veterinarios ✅
- `GetOwnStats` → Estadísticas de propietarios ✅
- `frequentPets` → Mascotas más frecuentes ✅

## 🔐 Seguridad y Validación

### Cambios de Integridad Referencial
- Todos los `ON DELETE CASCADE` se mantienen
- Los `ON UPDATE CASCADE` se conservan
- Se añaden validaciones explícitas en las funciones

### Triggers de Auditoría
```sql
-- Trigger automático para actualizar updated_at
CREATE TRIGGER update_categorias_updated_at 
BEFORE UPDATE ON categorias_servicios
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para auditar cambios en personas
CREATE TRIGGER tr_auditoria_usuarios
AFTER UPDATE ON personas
FOR EACH ROW EXECUTE FUNCTION audit_personas();
```

## 📈 Mejoras en Rendimiento

1. **Índices**: Mantienen la misma estrategia
2. **ENUMs**: Mejoran validación y rendimiento
3. **Triggers**: Automatizan auditoría sin impacto notable
4. **STRING_AGG**: Más eficiente que MySQL `GROUP_CONCAT`

## 🧪 Pruebas Post-Migración

### Verificar Conexión
```bash
psql -U postgres -d postgres -c "SELECT version();"
```

### Verificar Esquema
```sql
SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'pets_heaven';
```

### Verificar Tablas
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'pets_heaven';
```

### Verificar Funciones
```sql
SELECT routine_name FROM information_schema.routines WHERE routine_schema = 'pets_heaven';
```

### Prueba de Inserción
```sql
SELECT pets_heaven.RegistPeoples(
    'Test', 'User', CURRENT_DATE, 'CC', '99999999', 
    'Calle Test', '1234567890', NULL, 'test@email.com', 
    'password', 'Masculino', NULL
);
```

## ⚠️ Consideraciones Importantes

1. **Secuencias**: PostgreSQL utiliza secuencias independientes
2. **Case-sensitivity**: PostgreSQL es case-sensitive por defecto
3. **Transacciones**: Compatible con la lógica original
4. **Unicode**: Soporte completo desde el inicio

## 📚 Recursos Adicionales

- [PostgreSQL Official Docs](https://www.postgresql.org/docs/)
- [PostgreSQL vs MySQL Comparison](https://wiki.postgresql.org/wiki/Things_to_find_in_the_MySQL_vs_PostgreSQL)
- [PL/pgSQL Documentation](https://www.postgresql.org/docs/current/plpgsql.html)

---

**Versión**: 1.0  
**Fecha**: Febrero 16, 2026  
**Estado**: ✅ Completa y Probada
