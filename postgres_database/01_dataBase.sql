-- PostgreSQL Database Schema for PetsHeaven
-- Migrated from MySQL to PostgreSQL
-- Active: PostgreSQL

-- Drop existing schema if exists
DROP SCHEMA IF EXISTS pets_heaven CASCADE;
CREATE SCHEMA pets_heaven;

-- Create ENUM types for better type safety
CREATE TYPE pets_heaven.estado_cita AS ENUM ('PENDIENTE', 'CONFIRMADA', 'EN_PROGRESO', 'COMPLETADA', 'CANCELADA', 'NO_ASISTIO');
CREATE TYPE pets_heaven.estado_prueba AS ENUM ('REGISTRADO', 'MUESTRA_TOMADA', 'EN_PROCESO', 'COMPLETADO', 'ENTREGADO', 'CANCELADO');
CREATE TYPE pets_heaven.prioridad_prueba AS ENUM ('ROUTINA', 'URGENTE', 'STAT');
CREATE TYPE pets_heaven.estado_servicio AS ENUM ('DISPONIBLE', 'NO_DISPONIBLE', 'TEMPORAL');
CREATE TYPE pets_heaven.nivel_riesgo AS ENUM ('BAJO', 'MODERADO', 'ALTO', 'CRITICO');
CREATE TYPE pets_heaven.tipo_consultorio AS ENUM ('CONSULTA', 'CIRUGIA', 'HOSPITALIZACION', 'LABORATORIO', 'IMAGENES');
CREATE TYPE pets_heaven.categoria_prueba AS ENUM ('HEMATOLOGIA', 'BIOQUIMICA', 'MICROBIOLOGIA', 'PATOLOGIA', 'GENETICA');
CREATE TYPE pets_heaven.accion_auditoria AS ENUM ('INSERT', 'UPDATE', 'DELETE');

-- Create roles table
CREATE TABLE pets_heaven.roles (
    id_rol SERIAL PRIMARY KEY,
    nom_rol VARCHAR(100) NOT NULL UNIQUE
);

-- Create personas (people) table
CREATE TABLE pets_heaven.personas (
    id_per SERIAL PRIMARY KEY,
    nom_per VARCHAR(100) NOT NULL,
    ape_per VARCHAR(100) NOT NULL,
    fec_nac_per DATE NOT NULL,
    tip_doc_per VARCHAR(10) NOT NULL,
    doc_per VARCHAR(20) UNIQUE NOT NULL,
    dir_per VARCHAR(100) NOT NULL,
    cel_per VARCHAR(20) NOT NULL,
    cel2_per VARCHAR(20),
    email_per VARCHAR(100) UNIQUE NOT NULL,
    cont_per VARCHAR(255) NOT NULL,
    gen_per VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT TRUE NOT NULL,
    fot_per TEXT DEFAULT 'https://img.freepik.com/vector-gratis/lindo-perro-medico-estetoscopio-dibujos-animados-vector-icono-ilustracion-animal-salud-icono-aislado_138676-5182.jpg' NOT NULL,
    fec_cre_per DATE DEFAULT CURRENT_DATE NOT NULL
);

-- Create index for personas
CREATE INDEX idx_personas_doc ON pets_heaven.personas(doc_per);
CREATE INDEX idx_personas_email ON pets_heaven.personas(email_per);

-- Create otorgar_roles (assign roles) table
CREATE TABLE pets_heaven.otorgar_roles (
    id_rol INTEGER NOT NULL REFERENCES pets_heaven.roles(id_rol) ON DELETE CASCADE ON UPDATE CASCADE,
    id_per INTEGER NOT NULL REFERENCES pets_heaven.personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    fec_oto DATE DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY(id_rol, id_per)
);

CREATE INDEX idx_otorgar_roles_rol ON pets_heaven.otorgar_roles(id_rol);
CREATE INDEX idx_otorgar_roles_per ON pets_heaven.otorgar_roles(id_per);

-- Create categorias_veterinario table
CREATE TABLE pets_heaven.categorias_veterinario (
    id_cat SERIAL PRIMARY KEY,
    nom_cat VARCHAR(100) NOT NULL
);

-- Create veterinarios table
CREATE TABLE pets_heaven.veterinarios (
    id_vet INTEGER PRIMARY KEY REFERENCES pets_heaven.personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    especialidad VARCHAR(100) NOT NULL,
    horarios VARCHAR(100) NOT NULL,
    num_tar_vet VARCHAR(100) DEFAULT 'no-registrado' NOT NULL,
    fot_tar_vet TEXT DEFAULT 'no-registrado' NOT NULL
);

CREATE INDEX idx_veterinarios_id ON pets_heaven.veterinarios(id_vet);

-- Create otorgar_categoria_vet table
CREATE TABLE pets_heaven.otorgar_categoria_vet (
    id_cat INTEGER NOT NULL REFERENCES pets_heaven.categorias_veterinario(id_cat) ON DELETE CASCADE ON UPDATE CASCADE,
    id_vet INTEGER NOT NULL REFERENCES pets_heaven.veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE,
    fec_oto DATE DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY(id_cat, id_vet)
);

CREATE INDEX idx_otorgar_categoria_vet_cat ON pets_heaven.otorgar_categoria_vet(id_cat);
CREATE INDEX idx_otorgar_categoria_vet_vet ON pets_heaven.otorgar_categoria_vet(id_vet);

-- Create mascotas (pets) table
CREATE TABLE pets_heaven.mascotas (
    id_mas SERIAL PRIMARY KEY,
    nom_mas VARCHAR(100) NOT NULL,
    esp_mas VARCHAR(100) NOT NULL,
    col_mas VARCHAR(100) NOT NULL,
    raz_mas VARCHAR(100) NOT NULL,
    ali_mas VARCHAR(100) NOT NULL,
    fec_nac_mas DATE NOT NULL,
    pes_mas NUMERIC(12,2) NOT NULL,
    gen_mas VARCHAR(20) NOT NULL,
    id_pro_mas INTEGER NOT NULL REFERENCES pets_heaven.personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    est_rep_mas VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT TRUE NOT NULL,
    fot_mas TEXT NOT NULL,
    fec_cre_mas DATE DEFAULT CURRENT_DATE NOT NULL
);

CREATE INDEX idx_mascotas_nom ON pets_heaven.mascotas(nom_mas);
CREATE INDEX idx_mascotas_id_pro ON pets_heaven.mascotas(id_pro_mas);

-- Create categorias_servicios table
CREATE TABLE pets_heaven.categorias_servicios (
    id_cat SERIAL PRIMARY KEY,
    nom_cat VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    des_cat TEXT,
    col_hex VARCHAR(7) DEFAULT '#4b8ef5',
    sta_cat BOOLEAN DEFAULT TRUE,
    img_cat TEXT DEFAULT 'No-Registrado' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categorias_servicios_nom ON pets_heaven.categorias_servicios(nom_cat);
CREATE INDEX idx_categorias_servicios_sta ON pets_heaven.categorias_servicios(sta_cat);

-- Create tipos_servicios table
CREATE TABLE pets_heaven.tipos_servicios (
    id_tip_ser SERIAL PRIMARY KEY,
    cat_tip_ser INTEGER NOT NULL REFERENCES pets_heaven.categorias_servicios(id_cat) ON UPDATE CASCADE ON DELETE CASCADE,
    nom_tip_ser VARCHAR(100) NOT NULL,
    des_tip_ser TEXT NOT NULL,
    tec_des_tip_ser TEXT NOT NULL,
    sta_tip_ser BOOLEAN DEFAULT TRUE,
    req_equ_esp BOOLEAN DEFAULT FALSE,
    dur_min_tip_ser INTEGER
);

CREATE INDEX idx_tipos_servicios_cat ON pets_heaven.tipos_servicios(cat_tip_ser);
CREATE INDEX idx_tipos_servicios_nom ON pets_heaven.tipos_servicios(nom_tip_ser);

-- Create servicios table
CREATE TABLE pets_heaven.servicios (
    id_ser SERIAL PRIMARY KEY,
    tip_ser INTEGER NOT NULL REFERENCES pets_heaven.tipos_servicios(id_tip_ser) ON UPDATE CASCADE ON DELETE CASCADE,
    nom_ser VARCHAR(100) NOT NULL,
    des_ser TEXT NOT NULL,
    pre_ser NUMERIC(10,2) NOT NULL,
    pre_act_ser NUMERIC(10,2) NOT NULL,
    cos_est_ser NUMERIC(10,2),
    sta_ser pets_heaven.estado_servicio DEFAULT 'DISPONIBLE',
    req TEXT DEFAULT 'No-registrado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_servicios_tip ON pets_heaven.servicios(tip_ser);
CREATE INDEX idx_servicios_nom ON pets_heaven.servicios(nom_ser);
CREATE INDEX idx_servicios_pre ON pets_heaven.servicios(pre_act_ser);

-- Create procedimientos table
CREATE TABLE pets_heaven.procedimientos (
    id_pro SERIAL PRIMARY KEY,
    nom_pro VARCHAR(100) NOT NULL,
    des_pro TEXT NOT NULL,
    cat_pro INTEGER NOT NULL REFERENCES pets_heaven.categorias_servicios(id_cat) ON UPDATE CASCADE ON DELETE CASCADE,
    niv_rie_pro pets_heaven.nivel_riesgo,
    dur_min_pro INTEGER,
    pro_pro TEXT DEFAULT 'No-registrado',
    con_esp_pro TEXT DEFAULT 'No-registrado'
);

CREATE INDEX idx_procedimientos_nom ON pets_heaven.procedimientos(nom_pro);
CREATE INDEX idx_procedimientos_cat ON pets_heaven.procedimientos(cat_pro);
CREATE INDEX idx_procedimientos_niv ON pets_heaven.procedimientos(niv_rie_pro);

-- Create servicios_procedimientos (junction table)
CREATE TABLE pets_heaven.servicios_procedimientos (
    id_ser INTEGER NOT NULL REFERENCES pets_heaven.servicios(id_ser) ON UPDATE CASCADE ON DELETE CASCADE,
    id_pro INTEGER NOT NULL REFERENCES pets_heaven.procedimientos(id_pro) ON UPDATE CASCADE ON DELETE CASCADE,
    es_principal BOOLEAN DEFAULT TRUE,
    ord_eje SMALLINT,
    PRIMARY KEY (id_ser, id_pro)
);

-- Create tipos_pruebas table
CREATE TABLE pets_heaven.tipos_pruebas (
    id_tip_pru SERIAL PRIMARY KEY,
    cod_tip_pru VARCHAR(20) UNIQUE NOT NULL,
    nom_tip_pru VARCHAR(100) NOT NULL,
    des_tip_pru TEXT DEFAULT 'No-registrado',
    cat_tip_pru pets_heaven.categoria_prueba NOT NULL,
    met_est_tip_pru VARCHAR(100),
    tie_est_hrs_tip_pru INTEGER,
    cos_est_tip_pru NUMERIC(10,2) NOT NULL,
    ins_pre_tip_pru TEXT DEFAULT 'No-registrado',
    par_ref_tip_pru TEXT DEFAULT 'No-registrado'
);

CREATE INDEX idx_tipos_pruebas_cod ON pets_heaven.tipos_pruebas(cod_tip_pru);
CREATE INDEX idx_tipos_pruebas_cat ON pets_heaven.tipos_pruebas(cat_tip_pru);

-- Create pruebas_laboratorio table
CREATE TABLE pets_heaven.pruebas_laboratorio (
    id_pru_lab SERIAL PRIMARY KEY,
    cod_ord_pru_lab VARCHAR(20) UNIQUE NOT NULL,
    id_mas_pru_lab INTEGER NOT NULL REFERENCES pets_heaven.mascotas(id_mas) ON UPDATE CASCADE ON DELETE CASCADE,
    id_vet_sol_pru_lab INTEGER NOT NULL REFERENCES pets_heaven.veterinarios(id_vet) ON UPDATE CASCADE ON DELETE CASCADE,
    id_tip_pru_lab INTEGER NOT NULL REFERENCES pets_heaven.tipos_pruebas(id_tip_pru) ON UPDATE CASCADE ON DELETE CASCADE,
    id_ser_pru_lab INTEGER REFERENCES pets_heaven.servicios(id_ser) ON UPDATE CASCADE ON DELETE CASCADE,
    fec_sol_pru_lab TIMESTAMP NOT NULL,
    fec_mue_pru_lab TIMESTAMP,
    fec_pro_pru_lab TIMESTAMP,
    fec_res_pru_lab TIMESTAMP,
    est_pru_lab pets_heaven.estado_prueba DEFAULT 'REGISTRADO',
    pri_pru_lab pets_heaven.prioridad_prueba DEFAULT 'ROUTINA',
    obs_mue_pru_lab TEXT,
    cos_fin_pru_lab NUMERIC(10,2) DEFAULT 0.00,
    res_pru_lab TEXT DEFAULT 'No-registrado',
    id_vet_rev_pru_lab INTEGER REFERENCES pets_heaven.veterinarios(id_vet) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idx_pruebas_laboratorio_mas ON pets_heaven.pruebas_laboratorio(id_mas_pru_lab);
CREATE INDEX idx_pruebas_laboratorio_fec_sol ON pets_heaven.pruebas_laboratorio(fec_sol_pru_lab);
CREATE INDEX idx_pruebas_laboratorio_fec_res ON pets_heaven.pruebas_laboratorio(fec_res_pru_lab);
CREATE INDEX idx_pruebas_laboratorio_est ON pets_heaven.pruebas_laboratorio(est_pru_lab);

-- Create consultorios table
CREATE TABLE pets_heaven.consultorios (
    id_con SERIAL PRIMARY KEY,
    cod_con VARCHAR(10) UNIQUE NOT NULL,
    nom_con VARCHAR(100) NOT NULL,
    des_con TEXT DEFAULT 'No-registrado',
    tip_con pets_heaven.tipo_consultorio NOT NULL,
    equ_con TEXT DEFAULT 'No-registrado',
    cap_con INTEGER DEFAULT 1,
    est_con BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_consultorios_tip ON pets_heaven.consultorios(tip_con);

-- Create citas (appointments) table
CREATE TABLE pets_heaven.citas (
    id_cit SERIAL,
    fec_reg_cit DATE DEFAULT CURRENT_DATE NOT NULL,
    fec_cit DATE NOT NULL,
    hor_ini_cit TIME NOT NULL,
    hor_fin_cit TIME NOT NULL,
    mot_cit TEXT DEFAULT 'No-registrado',
    est_cit pets_heaven.estado_cita NOT NULL,
    fec_cre_cit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fec_act_cit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    con_cit INTEGER NOT NULL REFERENCES pets_heaven.consultorios(id_con) ON UPDATE CASCADE ON DELETE CASCADE,
    ser_cit INTEGER NOT NULL REFERENCES pets_heaven.servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE,
    vet_cit INTEGER NOT NULL REFERENCES pets_heaven.veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE,
    mas_cit INTEGER NOT NULL REFERENCES pets_heaven.mascotas(id_mas) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_cit, mas_cit)
);

CREATE INDEX idx_citas_est ON pets_heaven.citas(est_cit);
CREATE INDEX idx_citas_con ON pets_heaven.citas(con_cit);
CREATE INDEX idx_citas_ser ON pets_heaven.citas(ser_cit);
CREATE INDEX idx_citas_vet ON pets_heaven.citas(vet_cit);
CREATE INDEX idx_citas_mas ON pets_heaven.citas(mas_cit);

-- Create vacunas table
CREATE TABLE pets_heaven.vacunas (
    id_vac SERIAL PRIMARY KEY,
    nom_vac VARCHAR(255) NOT NULL,
    efe_sec_vac VARCHAR(255) NOT NULL,
    cat_vac VARCHAR(100) NOT NULL,
    dos_rec_cac_vac VARCHAR(100) NOT NULL,
    dos_rec_adu_vac VARCHAR(100) NOT NULL,
    dos_rec_adu_jov_vac VARCHAR(100) NOT NULL,
    lot_vac VARCHAR(255) UNIQUE NOT NULL,
    fec_ven_vac DATE NOT NULL,
    fec_cre_vac DATE NOT NULL,
    fre_vac INTEGER NOT NULL,
    des_vac TEXT DEFAULT 'No-registrado',
    pre_vac NUMERIC(10,2) NOT NULL,
    sta_vac BOOLEAN DEFAULT TRUE NOT NULL,
    pro_vac INTEGER NOT NULL REFERENCES pets_heaven.procedimientos(id_pro) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vacunas_nom ON pets_heaven.vacunas(nom_vac);
CREATE INDEX idx_vacunas_cat ON pets_heaven.vacunas(cat_vac);
CREATE INDEX idx_vacunas_lot ON pets_heaven.vacunas(lot_vac);
CREATE INDEX idx_vacunas_pro ON pets_heaven.vacunas(pro_vac);

-- Create vacunacion table
CREATE TABLE pets_heaven.vacunacion (
    id_vacn INTEGER REFERENCES pets_heaven.vacunas(id_vac) ON UPDATE CASCADE ON DELETE CASCADE,
    id_cit_vacn INTEGER,
    fec_vacn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_vacn, id_cit_vacn),
    FOREIGN KEY (id_cit_vacn) REFERENCES pets_heaven.citas(id_cit) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idx_vacunacion_vacn ON pets_heaven.vacunacion(id_vacn);
CREATE INDEX idx_vacunacion_cit ON pets_heaven.vacunacion(id_cit_vacn);

-- Create motivos_consultas table
CREATE TABLE pets_heaven.motivos_consultas (
    id_mot_con SERIAL PRIMARY KEY,
    mot_con TEXT NOT NULL
);

-- Create tratamientos_consultas table
CREATE TABLE pets_heaven.tratamientos_consultas (
    id_tra_con SERIAL PRIMARY KEY,
    nom_tra_con VARCHAR(100) NOT NULL,
    des_tra_con TEXT NOT NULL
);

CREATE INDEX idx_tratamientos_consultas_nom ON pets_heaven.tratamientos_consultas(nom_tra_con);

-- Create consultas table
CREATE TABLE pets_heaven.consultas (
    id_con SERIAL PRIMARY KEY,
    pes_mas_con NUMERIC(5,2),
    tem_mas_con SMALLINT,
    dia_con TEXT,
    med_con TEXT,
    fec_con DATE DEFAULT CURRENT_DATE NOT NULL,
    mot_con INTEGER NOT NULL REFERENCES pets_heaven.motivos_consultas(id_mot_con) ON DELETE RESTRICT ON UPDATE CASCADE,
    tra_con INTEGER NOT NULL REFERENCES pets_heaven.tratamientos_consultas(id_tra_con) ON DELETE RESTRICT ON UPDATE CASCADE,
    cit_con INTEGER NOT NULL REFERENCES pets_heaven.citas(id_cit) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_consultas_fec ON pets_heaven.consultas(fec_con);
CREATE INDEX idx_consultas_mot ON pets_heaven.consultas(mot_con);
CREATE INDEX idx_consultas_tra ON pets_heaven.consultas(tra_con);
CREATE INDEX idx_consultas_cit ON pets_heaven.consultas(cit_con);

-- Create auditoria_usuarios table
CREATE TABLE pets_heaven.auditoria_usuarios (
    id_auditoria SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES pets_heaven.personas(id_per),
    campo_modificado VARCHAR(50) NOT NULL,
    valor_anterior TEXT,
    valor_nuevo TEXT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_responsable VARCHAR(100),
    accion pets_heaven.accion_auditoria NOT NULL
);

-- Create historial_mascotas table
CREATE TABLE pets_heaven.historial_mascotas (
    id_historial SERIAL PRIMARY KEY,
    id_mascota INTEGER NOT NULL REFERENCES pets_heaven.mascotas(id_mas),
    campo_modificado VARCHAR(50) NOT NULL,
    valor_anterior TEXT,
    valor_nuevo TEXT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_responsable VARCHAR(100),
    accion pets_heaven.accion_auditoria NOT NULL
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION pets_heaven.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_categorias_servicios_updated_at BEFORE UPDATE ON pets_heaven.categorias_servicios
    FOR EACH ROW EXECUTE FUNCTION pets_heaven.update_updated_at_column();

CREATE TRIGGER update_servicios_updated_at BEFORE UPDATE ON pets_heaven.servicios
    FOR EACH ROW EXECUTE FUNCTION pets_heaven.update_updated_at_column();

CREATE TRIGGER update_vacunas_updated_at BEFORE UPDATE ON pets_heaven.vacunas
    FOR EACH ROW EXECUTE FUNCTION pets_heaven.update_updated_at_column();

-- Create audit trigger for personas
CREATE OR REPLACE FUNCTION pets_heaven.audit_personas()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.nom_per != OLD.nom_per THEN
        INSERT INTO pets_heaven.auditoria_usuarios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_per, 'nom_per', OLD.nom_per, NEW.nom_per, 'UPDATE');
    END IF;
    
    IF NEW.ape_per != OLD.ape_per THEN
        INSERT INTO pets_heaven.auditoria_usuarios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_per, 'ape_per', OLD.ape_per, NEW.ape_per, 'UPDATE');
    END IF;
    
    IF NEW.doc_per != OLD.doc_per THEN
        INSERT INTO pets_heaven.auditoria_usuarios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_per, 'doc_per', OLD.doc_per, NEW.doc_per, 'UPDATE');
    END IF;
    
    IF NEW.email_per != OLD.email_per THEN
        INSERT INTO pets_heaven.auditoria_usuarios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_per, 'email_per', OLD.email_per, NEW.email_per, 'UPDATE');
    END IF;
    
    IF NEW.estado != OLD.estado THEN
        INSERT INTO pets_heaven.auditoria_usuarios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_per, 'estado', OLD.estado::TEXT, NEW.estado::TEXT, 'UPDATE');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_auditoria_usuarios
AFTER UPDATE ON pets_heaven.personas
FOR EACH ROW EXECUTE FUNCTION pets_heaven.audit_personas();

-- Create audit trigger for mascotas
CREATE OR REPLACE FUNCTION pets_heaven.audit_mascotas()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.nom_mas != OLD.nom_mas THEN
        INSERT INTO pets_heaven.historial_mascotas (id_mascota, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_mas, 'nom_mas', OLD.nom_mas, NEW.nom_mas, 'UPDATE');
    END IF;
    
    IF NEW.pes_mas != OLD.pes_mas THEN
        INSERT INTO pets_heaven.historial_mascotas (id_mascota, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_mas, 'pes_mas', OLD.pes_mas::TEXT, NEW.pes_mas::TEXT, 'UPDATE');
    END IF;
    
    IF NEW.est_rep_mas != OLD.est_rep_mas THEN
        INSERT INTO pets_heaven.historial_mascotas (id_mascota, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_mas, 'est_rep_mas', OLD.est_rep_mas, NEW.est_rep_mas, 'UPDATE');
    END IF;
    
    IF NEW.estado != OLD.estado THEN
        INSERT INTO pets_heaven.historial_mascotas (id_mascota, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_mas, 'estado', OLD.estado::TEXT, NEW.estado::TEXT, 'UPDATE');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_historial_mascotas
AFTER UPDATE ON pets_heaven.mascotas
FOR EACH ROW EXECUTE FUNCTION pets_heaven.audit_mascotas();
