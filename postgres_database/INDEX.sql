-- PostgreSQL Database Index File for PetsHeaven
-- Migration Summary and Installation Order

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│                   PETSHEAVEN - PostgreSQL Database                          │
│                   Veterinary Management System Database                      │
│                                                                              │
│  Status: ✅ Migrated from MySQL to PostgreSQL                               │
│  Date: February 16, 2026                                                    │
│  Version: 1.0                                                                │
└─────────────────────────────────────────────────────────────────────────────┘
*/

-- ============================================================================
-- INSTALLATION ORDER (Execute in this sequence)
-- ============================================================================

/*
1. Execute main schema:
   \i 01_dataBase.sql
   
2. Execute initial data:
   \i 02_inserts.sql
   
3. Execute procedures (in order):
   \i procedures/01_appointment.sql
   \i procedures/02_consult.sql
   \i procedures/03_people.sql
   \i procedures/04_pets.sql
   \i procedures/05_services.sql      [Placeholder]
   \i procedures/06_owner.sql
   \i procedures/07_staff.sql          [Placeholder]
   \i procedures/08_history.sql        [Placeholder]
   \i procedures/09_global.sql
*/

-- ============================================================================
-- DATABASE STRUCTURE OVERVIEW
-- ============================================================================

/*
SCHEMAS:
  └─ pets_heaven

CUSTOM TYPES (ENUMs):
  ├─ estado_cita
  ├─ estado_prueba
  ├─ prioridad_prueba
  ├─ estado_servicio
  ├─ nivel_riesgo
  ├─ tipo_consultorio
  ├─ categoria_prueba
  └─ accion_auditoria

CORE TABLES (27 total):
  ├─ roles (3 roles)
  ├─ personas (20+ personas)
  ├─ otorgar_roles (role assignments)
  ├─ categorias_veterinario
  ├─ veterinarios
  ├─ otorgar_categoria_vet
  ├─ mascotas (30+ mascotas)
  ├─ categorias_servicios (6 categorías)
  ├─ tipos_servicios
  ├─ servicios (13+ servicios)
  ├─ procedimientos (7+ procedimientos)
  ├─ servicios_procedimientos
  ├─ tipos_pruebas (6+ tipos)
  ├─ pruebas_laboratorio
  ├─ consultorios (5 consultorios)
  ├─ citas (appointments)
  ├─ vacunas (12 vacunas)
  ├─ vacunacion
  ├─ motivos_consultas
  ├─ tratamientos_consultas
  ├─ consultas
  ├─ auditoria_usuarios (audit log)
  └─ historial_mascotas (pet history)

FUNCTIONS/PROCEDURES (40+):
  ├─ Appointment Management (5)
  ├─ Consultation (1)
  ├─ People Management (6)
  ├─ Pet Management (6)
  ├─ Owner Management (4)
  └─ Global Functions (6)

TRIGGERS (5):
  ├─ update_categorias_servicios_updated_at
  ├─ update_servicios_updated_at
  ├─ update_vacunas_updated_at
  ├─ tr_auditoria_usuarios
  └─ tr_historial_mascotas
*/

-- ============================================================================
-- KEY FEATURES
-- ============================================================================

/*
✓ Audit Trail
  - Automatic tracking of user changes
  - Pet history logging
  - Timestamp tracking (created_at, updated_at)

✓ Data Integrity
  - Foreign key constraints with cascading
  - ENUM types for standardized values
  - Unique constraints on critical fields

✓ Security
  - Role-based access control (3 roles)
  - Password management functions
  - Status-based data filtering

✓ Reporting Capabilities
  - Admin statistics
  - Staff performance metrics
  - Owner statistics
  - Pet population analysis
*/

-- ============================================================================
-- QUICK START EXAMPLES
-- ============================================================================

/*

-- LOGIN
SELECT * FROM pets_heaven.Login('admin@gmail.com');

-- REGISTER PERSON
SELECT * FROM pets_heaven.RegistPeoples(
    'Juan', 'Pérez', CURRENT_DATE - INTERVAL '30 years', 
    'CC', '12345678', 'Calle 1', '3001234567', NULL,
    'juan@example.com', '$2y$10$...', 'Masculino', NULL
);

-- REGISTER PET
SELECT * FROM pets_heaven.RegistPets(
    'Max', 'Perro', 'Marrón', 'Labrador', 'Purina',
    CURRENT_DATE - INTERVAL '3 years', 28.5, '12345678',
    'Masculino', 'No esterilizado', 'https://...'
);

-- REGISTER APPOINTMENT
SELECT * FROM pets_heaven.RegistAppointment(
    CURRENT_DATE + INTERVAL '2 days', '10:00:00', '11:00:00',
    'CON-101', 'Chequeo anual', 'Consulta General', 
    '1298765432', '1'
);

-- GET STATISTICS
SELECT * FROM pets_heaven.GetAdminStats();
SELECT * FROM pets_heaven.GetOwnStats('12345678');
SELECT * FROM pets_heaven.frequentPets();

*/

-- ============================================================================
-- PERFORMANCE TIPS
-- ============================================================================

/*
1. Indexes
   - Automatically created on foreign keys
   - Primary indexes on all IDs
   - Search indexes on document/email fields

2. Query Optimization
   - Use EXPLAIN ANALYZE for complex queries
   - Leverage STRING_AGG for efficient grouping
   - Partition large tables if needed

3. Maintenance
   - Run VACUUM ANALYZE regularly
   - Monitor slow queries
   - Check trigger performance
*/

-- ============================================================================
-- MIGRATION NOTES
-- ============================================================================

/*
Changes from MySQL:
  ✓ AUTO_INCREMENT → SERIAL
  ✓ FLOAT(x,y) → NUMERIC(x,y)
  ✓ ENUM declarations → Custom types
  ✓ PROCEDURE/OUT → FUNCTION/RETURNS TABLE
  ✓ GROUP_CONCAT → STRING_AGG
  ✓ LAST_INSERT_ID() → LASTVAL()
  ✓ Triggers updated to PostgreSQL syntax
  ✓ DELIMITER // removed
*/

-- ============================================================================
-- SUPPORT & DOCUMENTATION
-- ============================================================================

/*
Files included:
  ✓ 01_dataBase.sql           - Main schema
  ✓ 02_inserts.sql            - Initial data
  ✓ README.md                 - Installation guide
  ✓ MIGRATION_GUIDE.md        - Detailed migration info
  ✓ INDEX.sql                 - This file
  
  Procedures/
  ✓ 01_appointment.sql        - Appointment management
  ✓ 02_consult.sql            - Consultation records
  ✓ 03_people.sql             - People management
  ✓ 04_pets.sql               - Pet management
  ✓ 05_services.sql           - Services (placeholder)
  ✓ 06_owner.sql              - Owner management
  ✓ 07_staff.sql              - Staff (placeholder)
  ✓ 08_history.sql            - History (placeholder)
  ✓ 09_global.sql             - Global functions

Contact: See project README for support
*/

-- ============================================================================
-- VERIFY INSTALLATION
-- ============================================================================

-- List all schemas
-- SELECT schema_name FROM information_schema.schemata;

-- List all tables in pets_heaven
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'pets_heaven' ORDER BY table_name;

-- List all functions in pets_heaven
-- SELECT routine_name, routine_type FROM information_schema.routines
-- WHERE routine_schema = 'pets_heaven' ORDER BY routine_name;

-- Check table row counts
-- SELECT table_name, 
--        (SELECT count(*) FROM information_schema.tables t2 
--         WHERE t2.table_name = t1.table_name) 
-- FROM information_schema.tables t1 
-- WHERE table_schema = 'pets_heaven';

-- ============================================================================
-- END OF INDEX FILE
-- ============================================================================
