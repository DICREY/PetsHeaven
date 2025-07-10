-- Active: 1747352860830@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.RegistConsult(
    -- Datos de la cita
    IN p_fecha_cita DATE,
    IN p_hora_inicio TIME,
    IN p_hora_fin TIME,
    IN p_motivo_cita TEXT,
    IN p_id_consultorio INT,
    IN p_id_servicio INT,
    IN p_id_veterinario INT,
    IN p_id_mascota INT,
    
    -- Datos de la consulta
    IN p_peso DECIMAL(5,2),
    IN p_temperatura SMALLINT,
    IN p_diagnostico TEXT,
    IN p_medicamentos TEXT,
    
    -- Motivo y tratamiento
    IN p_motivo_consulta TEXT,
    IN p_nombre_tratamiento VARCHAR(100),
    IN p_descripcion_tratamiento TEXT,
    
    -- Resultados de laboratorio (opcional, puede ser NULL)
    IN p_prueba_laboratorio VARCHAR(100),
    IN p_resultado_laboratorio TEXT,
    IN p_referencia_laboratorio TEXT,
    
    -- Parámetros de salida
    OUT p_mensaje VARCHAR(255),
    OUT p_id_consulta INT,
    OUT p_id_cita INT
)
BEGIN
    DECLARE v_id_motivo INT;
    DECLARE v_id_tratamiento INT;
    DECLARE v_id_prueba_lab INT DEFAULT NULL;
    DECLARE v_codigo_prueba VARCHAR(20);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
        @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_mensaje = CONCAT("Error ", @errno, " (", @sqlstate, "): ", @text);
        ROLLBACK;
    END;
    
    START TRANSACTION;
    
    -- 1. Registrar la cita primero
    INSERT INTO citas (
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
        'COMPLETADA'
    );
    
    SET p_id_cita = LAST_INSERT_ID();
    
    -- 2. Registrar motivo de consulta (si no existe)
    SELECT id_mot_con INTO v_id_motivo 
    FROM motivos_consultas 
    WHERE mot_con = p_motivo_consulta
    LIMIT 1;
    
    IF v_id_motivo IS NULL THEN
        INSERT INTO motivos_consultas (mot_con) VALUES (p_motivo_consulta);
        SET v_id_motivo = LAST_INSERT_ID();
    END IF;
    
    -- 3. Registrar tratamiento (si no existe)
    SELECT id_tra_con INTO v_id_tratamiento
    FROM tratamientos_consultas
    WHERE nom_tra_con = p_nombre_tratamiento
    AND des_tra_con = p_descripcion_tratamiento
    LIMIT 1;
    
    IF v_id_tratamiento IS NULL THEN
        INSERT INTO tratamientos_consultas (nom_tra_con, des_tra_con)
        VALUES (p_nombre_tratamiento, p_descripcion_tratamiento);
        SET v_id_tratamiento = LAST_INSERT_ID();
    END IF;
    
    -- 4. Registrar prueba de laboratorio si se proporcionó
    IF p_prueba_laboratorio IS NOT NULL THEN
        -- Generar código único para la prueba
        SET v_codigo_prueba = CONCAT('LAB-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', FLOOR(RAND() * 1000));
        
        INSERT INTO pruebas_laboratorio (
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
            (SELECT id_tip_pru FROM tipos_pruebas WHERE nom_tip_pru = p_prueba_laboratorio LIMIT 1),
            p_id_servicio,
            NOW(),
            'COMPLETADO',
            p_resultado_laboratorio,
            p_referencia_laboratorio
        );
        
        SET v_id_prueba_lab = LAST_INSERT_ID();
    END IF;
    
    -- 5. Registrar la consulta principal
    INSERT INTO consultas (
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
        CURDATE(),
        v_id_motivo,
        v_id_tratamiento,
        p_id_cita
    );
    
    SET p_id_consulta = LAST_INSERT_ID();
    SET p_mensaje = 'Consulta registrada exitosamente';
    
    COMMIT;
END //
/* 
CALL pets_heaven.RegistConsult(
    -- Datos de la cita
    '2025-08-02', 
    '14:00:00', 
    '15:00:00', 
    'Análisis de sangre completo', 
    3,                       -- Laboratorio Clínico
    8,                       -- Perfil Bioquímico Completo
    6,                       -- Nikola Tesla (veterinario)
    5,                       -- Charlie (Golden Retriever)
    -- Datos de la consulta
    31.8, 
    38.5, 
'Posible infección renal, se requiere análisis de sangre para confirmar',
'Antibiótico pendiente de resultados',
 -- Motivo y tratamiento
'Posible infección renal', 
'Antibiótico renal', 
'Tratamiento con antibiótico específico para infecciones renales',
 -- Resultados de laboratorio
'Perfil Renal',             -- p_prueba_laboratorio
'BUN: 45 mg/dL (alto), Creatinina: 2.1 mg/dL (alto)', -- p_resultado_laboratorio
'Valores elevados sugieren insuficiencia renal', -- p_referencia_laboratorio
-- Parámetros de salida
    @mensaje, 
    @id_consulta, 
    @id_cita
);

SELECT @mensaje, @id_consulta, @id_cita; */