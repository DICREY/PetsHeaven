# PetsHeaven PostgreSQL Database Migration

Este directorio contiene la migración completa de la base de datos PetsHeaven de MySQL a PostgreSQL.

## 📁 Estructura de Archivos

```
postgres_database/
├── 01_dataBase.sql          # Esquema principal y tablas
├── 02_inserts.sql           # Datos iniciales
├── 03_triggers.sql          # Triggers de auditoría
├── procedures/
│   ├── 01_appointment.sql   # Procedimientos de citas
│   ├── 02_consult.sql       # Procedimientos de consultas
│   ├── 03_people.sql        # Procedimientos de personas
│   ├── 04_pets.sql          # Procedimientos de mascotas
│   ├── 05_services.sql      # Procedimientos de servicios
│   ├── 06_owner.sql         # Procedimientos de propietarios
│   ├── 07_staff.sql         # Procedimientos de personal
│   ├── 08_history.sql       # Procedimientos de historial
│   └── 09_global.sql        # Procedimientos globales
└── README.md                # Este archivo

```

## 🔄 Cambios de MySQL a PostgreSQL

### Principales diferencias en la migración:

1. **Auto-increment**
   - MySQL: `INT AUTO_INCREMENT`
   - PostgreSQL: `SERIAL` o `BIGSERIAL`

2. **Booleanos**
   - MySQL: `BOOLEAN DEFAULT(1)` / `BOOLEAN DEFAULT(0)`
   - PostgreSQL: `BOOLEAN DEFAULT TRUE` / `BOOLEAN DEFAULT FALSE`

3. **Tipos de datos**
   - MySQL: `FLOAT(12,2)` → PostgreSQL: `NUMERIC(12,2)`
   - MySQL: `INT` → PostgreSQL: `INTEGER`

4. **ENUMs**
   - Creados como tipos personalizados en PostgreSQL
   - Mejoran la integridad de datos y el rendimiento

5. **Procedimientos y Funciones**
   - MySQL: `CREATE PROCEDURE` / `CREATE FUNCTION`
   - PostgreSQL: `CREATE OR REPLACE FUNCTION` con `RETURNS TABLE`

6. **Timestamps**
   - MySQL: `TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
   - PostgreSQL: `TIMESTAMP DEFAULT CURRENT_TIMESTAMP`

7. **Comentarios**
   - MySQL: `COMMENT` en la definición de tabla
   - PostgreSQL: Utilizados en comentarios SQL tradicionales

## 🚀 Instalación

### Requisitos:
- PostgreSQL 12.0 o superior
- psql (cliente de PostgreSQL)

### Pasos para instalar:

1. **Conectar a PostgreSQL:**
```bash
psql -U postgres
```

2. **Ejecutar el esquema principal:**
```bash
\i /ruta/a/postgres_database/01_dataBase.sql
```

3. **Insertar datos iniciales:**
```bash
\i /ruta/a/postgres_database/02_inserts.sql
```

4. **Crear procedimientos (en orden):**
```bash
\i /ruta/a/postgres_database/procedures/01_appointment.sql
\i /ruta/a/postgres_database/procedures/02_consult.sql
\i /ruta/a/postgres_database/procedures/03_people.sql
\i /ruta/a/postgres_database/procedures/04_pets.sql
\i /ruta/a/postgres_database/procedures/05_services.sql
\i /ruta/a/postgres_database/procedures/06_owner.sql
\i /ruta/a/postgres_database/procedures/07_staff.sql
\i /ruta/a/postgres_database/procedures/08_history.sql
\i /ruta/a/postgres_database/procedures/09_global.sql
```

### Script de instalación completa:

```bash
#!/bin/bash
DB_PATH="/ruta/a/postgres_database"
psql -U postgres << EOF
\i $DB_PATH/01_dataBase.sql
\i $DB_PATH/02_inserts.sql
\i $DB_PATH/procedures/01_appointment.sql
\i $DB_PATH/procedures/02_consult.sql
\i $DB_PATH/procedures/03_people.sql
\i $DB_PATH/procedures/04_pets.sql
\i $DB_PATH/procedures/05_services.sql
\i $DB_PATH/procedures/06_owner.sql
\i $DB_PATH/procedures/07_staff.sql
\i $DB_PATH/procedures/08_history.sql
\i $DB_PATH/procedures/09_global.sql
EOF
```

## 📊 Esquema de Base de Datos

### Tablas Principales:

- **roles**: Roles del sistema (Administrador, Veterinario, Usuario)
- **personas**: Información de personas del sistema
- **mascotas**: Información de mascotas
- **veterinarios**: Información especializada de veterinarios
- **servicios**: Servicios ofrecidos
- **categorias_servicios**: Categorías de servicios
- **citas**: Citas programadas
- **consultas**: Consultas veterinarias
- **vacunas**: Información de vacunas
- **pruebas_laboratorio**: Pruebas de laboratorio
- **consultorios**: Consultorios disponibles

### Tabla de Auditoría:

- **auditoria_usuarios**: Registro de cambios en personas
- **historial_mascotas**: Registro de cambios en mascotas

## 🔑 Convenciones de Nomenclatura

### Tablas:
- Singular o plural según contexto
- Prefijo `id_` para claves primarias

### Procedimientos:
- Comienzan con verbo (Regist, Search, Update, Delete)
- Nombrados en inglés

### Columnas:
- Sufijo `_per` para personas
- Sufijo `_mas` para mascotas
- Sufijo `_vet` para veterinarios
- Sufijo `_ser` para servicios

## 🔐 Seguridad

- Usar roles de PostgreSQL para control de acceso
- Todas las funciones verifican existencia de registros
- Triggers para auditoría automática
- Foreign keys con cascada donde sea apropiado

## 📝 Notas de Migración

1. Los procedimientos MySQL que usaban `LAST_INSERT_ID()` ahora usan `LASTVAL()` en PostgreSQL
2. Las funciones ahora retornan `TABLE` para mejor rendimiento
3. Se utilizan tipos ENUM para mayor integridad de datos
4. Los triggers automáticos actualizan campos `updated_at`
5. Los esquemas están separados en archivos para facilitar mantenimiento

## 🛠️ Mantenimiento

### Actualizar datos:
```sql
SELECT pets_heaven.UpdateAppointmentDate(1, 'Max', '12345678', '2025-08-15', '10:00', '11:00', 1);
```

### Ver auditoría:
```sql
SELECT * FROM pets_heaven.auditoria_usuarios WHERE usuario_responsable = 'admin';
```

### Verificar integridad:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'pets_heaven';
```

## 📞 Soporte

Para preguntas sobre la migración, consulte los comentarios en los archivos SQL o revise la documentación oficial de PostgreSQL en https://www.postgresql.org/docs/

---

**Última actualización**: Febrero 16, 2026
**Versión de PostgreSQL**: 12.0+
**Estado de migración**: ✅ Completa
