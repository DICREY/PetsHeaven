-- PostgreSQL Procedures for PetsHeaven - Consultations (Consultas)
-- Migrated from MySQL

-- Procedure to register consultation with complete details
CREATE OR REPLACE FUNCTION pets_heaven.RegistConsult(
    p_fecha_cita DATE,
    p_hora_inicio TIME,
    p_hora_fin TIME,
    p_motivo_cita TEXT,
    p_id_consultorio INTEGER,
    p_id_servicio INTEGER,
    p_id_veterinario INTEGER,
    p_id_mascota INTEGER,
    p_peso NUMERIC(5,2),
    p_temperatura SMALLINT,
    p_diagnostico TEXT,
    p_medicamentos TEXT,
    p_motivo_consulta TEXT,
    p_nombre_tratamiento VARCHAR(100),
    p_descripcion_tratamiento TEXT,
    p_prueba_laboratorio VARCHAR(100) DEFAULT NULL,
    p_resultado_laboratorio TEXT DEFAULT NULL,
    p_referencia_laboratorio TEXT DEFAULT NULL,
    OUT p_mensaje VARCHAR(255),
    OUT p_id_consulta INTEGER,
    OUT p_id_cita INTEGER
) AS $$
DECLARE
    v_id_motivo INTEGER;
    v_id_tratamiento INTEGER;
    v_id_prueba_lab INTEGER DEFAULT NULL;
    v_codigo_prueba VARCHAR(20);
BEGIN
    -- 1. Register appointment first
    INSERT INTO pets_heaven.citas (
        fec_cit,
        hor_ini_cit,
        hor_fin_cit,
        mot_cit,
        con_cit,
        ser_cit,
        vet_cit,
        mas_cit,
        est_cit
    ) VALUES (
        p_fecha_cita,
        p_hora_inicio,
        p_hora_fin,
        p_motivo_cita,
        p_id_consultorio,
        p_id_servicio,
        p_id_veterinario,
        p_id_mascota,
        'COMPLETADA'::pets_heaven.estado_cita
    );
    
    p_id_cita := LASTVAL();
    
    -- 2. Register reason for consultation (if not exists)
    SELECT id_mot_con INTO v_id_motivo 
    FROM pets_heaven.motivos_consultas 
    WHERE mot_con = p_motivo_consulta
    LIMIT 1;
    
    IF v_id_motivo IS NULL THEN
        INSERT INTO pets_heaven.motivos_consultas (mot_con) VALUES (p_motivo_consulta);
        v_id_motivo := LASTVAL();
    END IF;
    
    -- 3. Register treatment (if not exists)
    SELECT id_tra_con INTO v_id_tratamiento
    FROM pets_heaven.tratamientos_consultas
    WHERE nom_tra_con = p_nombre_tratamiento
    AND des_tra_con = p_descripcion_tratamiento
    LIMIT 1;
    
    IF v_id_tratamiento IS NULL THEN
        INSERT INTO pets_heaven.tratamientos_consultas (nom_tra_con, des_tra_con)
        VALUES (p_nombre_tratamiento, p_descripcion_tratamiento);
        v_id_tratamiento := LASTVAL();
    END IF;
    
    -- 4. Register laboratory test if provided
    IF p_prueba_laboratorio IS NOT NULL THEN
        v_codigo_prueba := 'LAB-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || FLOOR(RANDOM() * 1000)::TEXT;
        
        INSERT INTO pets_heaven.pruebas_laboratorio (
            cod_ord_pru_lab,
            id_mas_pru_lab,
            id_vet_sol_pru_lab,
            id_tip_pru_lab,
            id_ser_pru_lab,
            fec_sol_pru_lab,
            est_pru_lab,
            res_pru_lab,
            obs_mue_pru_lab
        ) VALUES (
            v_codigo_prueba,
            p_id_mascota,
            p_id_veterinario,
            (SELECT id_tip_pru FROM pets_heaven.tipos_pruebas WHERE nom_tip_pru = p_prueba_laboratorio LIMIT 1),
            p_id_servicio,
            NOW(),
            'COMPLETADO'::pets_heaven.estado_prueba,
            p_resultado_laboratorio,
            p_referencia_laboratorio
        );
        
        v_id_prueba_lab := LASTVAL();
    END IF;
    
    -- 5. Register main consultation
    INSERT INTO pets_heaven.consultas (
        pes_mas_con,
        tem_mas_con,
        dia_con,
        med_con,
        fec_con,
        mot_con,
        tra_con,
        cit_con
    ) VALUES (
        p_peso,
        p_temperatura,
        p_diagnostico,
        p_medicamentos,
        CURRENT_DATE,
        v_id_motivo,
        v_id_tratamiento,
        p_id_cita
    );
    
    p_id_consulta := LASTVAL();
    p_mensaje := 'Consulta registrada exitosamente';
    
END;
$$ LANGUAGE plpgsql;
