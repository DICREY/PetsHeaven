-- Active: 1746130779175@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.RegistAppointment(
    IN p_fec_cit DATE, -- Fecha de la cita
    IN p_hor_ini_cit TIME, -- Hora de inicio de la cita
    IN p_hor_fin_cit TIME, -- Hora de fin de la cita
    IN p_con_cit VARCHAR(100), -- Consultorio
    IN p_mot_cit TEXT, -- Motivo de la consulta
    IN p_ser VARCHAR(100), -- servicio
    IN p_vet VARCHAR(100), -- veterinario
    IN p_mas VARCHAR(100) -- mascota
)
BEGIN
    DECLARE p_id_con_cit INT;
    DECLARE p_id_ser INT;
    DECLARE p_id_vet INT;
    DECLARE p_id_mas INT;
    DECLARE v_conflicto INT DEFAULT 0;

    SELECT id_con INTO p_id_con_cit FROM consultorios WHERE cod_con LIKE p_con_cit LIMIT 1;
    IF p_id_con_cit IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Consultorio no encontrado';
    END IF;

    SELECT id_cat INTO p_id_ser FROM categorias_servicios WHERE nom_cat LIKE p_ser LIMIT 1;
    IF p_id_ser IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Servicio no encontrado';
    END IF;

    SELECT id_per INTO p_id_vet FROM personas WHERE doc_per = p_vet LIMIT 1;
    IF p_id_vet IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Veterinario no encontrado';
    END IF;

    SET p_id_mas = p_mas;
    IF NOT EXISTS (SELECT 1 FROM mascotas WHERE id_mas = p_id_mas) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Mascota no encontrada';
    END IF;

    -- Verificar si ya existe una cita en ese consultorio y horario
    SELECT COUNT(*) INTO v_conflicto
    FROM citas
    WHERE con_cit = p_id_con_cit
      AND fec_cit = p_fec_cit
      AND (
            (hor_ini_cit < p_hor_fin_cit AND hor_fin_cit > p_hor_ini_cit)
          );

    IF v_conflicto > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe una cita en ese consultorio y horario';
    ELSE
        INSERT INTO citas (
            fec_cit, hor_ini_cit, hor_fin_cit, mot_cit, est_cit,
            con_cit, ser_cit, vet_cit, mas_cit
        ) VALUES (
            p_fec_cit, p_hor_ini_cit, p_hor_fin_cit, IFNULL(p_mot_cit, 'No-registrado'), 'PENDIENTE',
            p_id_con_cit, p_id_ser, p_id_vet, p_id_mas
        );
    END IF;
END //


CREATE PROCEDURE pets_heaven.SearchAllAppointments()
BEGIN 
    SELECT 
        c.id_cit,
        c.mas_cit,
        c.fec_reg_cit,
        c.fec_cit,
        c.hor_ini_cit,
        c.hor_fin_cit,
        c.con_cit, -- ID del consultorio
        con.nom_con AS nom_con, -- Nombre del consultorio
        ts.nom_tip_ser,
        cs.nom_cat,
        s.nom_ser,
        s.des_ser,
        m.nom_mas,
        m.esp_mas,
        m.col_mas,
        m.raz_mas,
        m.ali_mas,
        m.fec_nac_mas,
        m.pes_mas,
        m.gen_mas,
        m.est_rep_mas,
        m.fot_mas,
        m.fec_cre_mas,
        p_vet.nom_per AS vet_nom_per,
        p_vet.ape_per AS vet_ape_per,
        p_vet.cel_per AS vet_cel_per,
        p_prop.nom_per AS prop_nom_per,
        p_prop.ape_per AS prop_ape_per,
        p_prop.cel_per AS prop_cel_per,
        p_prop.doc_per AS prop_doc_per,
        p_prop.email_per AS prop_email_per,
        c.est_cit
    FROM 
        citas c
    JOIN mascotas m ON m.id_mas = c.mas_cit
    JOIN servicios s ON s.id_ser = c.ser_cit
    JOIN tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
    JOIN categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
    JOIN consultorios con ON con.id_con = c.con_cit
    JOIN personas p_vet ON p_vet.id_per = c.vet_cit
    JOIN personas p_prop ON p_prop.id_per = m.id_pro_mas
    WHERE
        c.est_cit != 'CANCELADA'
    ORDER BY c.fec_reg_cit
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.SearchAppointmentsByUser(
    IN p_by VARCHAR(100)
)
BEGIN 
    IF NOT EXISTS (
        SELECT c.id_cit 
        FROM 
            citas c
        JOIN personas p_vet ON p_vet.id_per = c.vet_cit
        WHERE
            c.est_cit != 'CANCELADA'
            AND p_vet.doc_per = p_by
        LIMIT 1
    ) THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se se encontraron citas para este usuario';
    ELSE
        SELECT 
            c.id_cit,
            c.mas_cit,
            c.fec_reg_cit,
            c.fec_cit,
            c.hor_ini_cit,
            c.hor_fin_cit,
            c.con_cit,
            con.nom_con AS nom_con,
            ts.nom_tip_ser,
            cs.nom_cat,
            s.nom_ser,
            s.des_ser,
            m.nom_mas,
            m.esp_mas,
            m.col_mas,
            m.raz_mas,
            m.ali_mas,
            m.fec_nac_mas,
            m.pes_mas,
            m.gen_mas,
            m.est_rep_mas,
            m.fot_mas,
            p_vet.nom_per AS vet_nom_per,
            p_vet.ape_per AS vet_ape_per,
            p_vet.cel_per AS vet_cel_per,
            p_prop.nom_per AS prop_nom_per,
            p_prop.ape_per AS prop_ape_per,
            p_prop.cel_per AS prop_cel_per,
            p_prop.doc_per AS prop_doc_per,
            p_prop.email_per AS prop_email_per,
            c.est_cit
        FROM 
            citas c
        JOIN mascotas m ON m.id_mas = c.mas_cit
        JOIN servicios s ON s.id_ser = c.ser_cit
        JOIN tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
        JOIN categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
        JOIN consultorios con ON con.id_con = c.con_cit
        JOIN personas p_vet ON p_vet.id_per = c.vet_cit
        JOIN personas p_prop ON p_prop.id_per = m.id_pro_mas
        WHERE
            c.est_cit != 'CANCELADA'
            AND (
                p_vet.doc_per = p_by
                OR p_vet.email_per = p_by
                OR p_prop.doc_per = p_by
                OR p_prop.email_per = p_by
            )
        ORDER BY 
            c.fec_reg_cit
        LIMIT 1000;
    END IF;
END //

CREATE PROCEDURE pets_heaven.SearchConsultingRooms()
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM consultorios
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Consultorios no encontrados';
    ELSE
        SELECT
            id_con,        -- ID único del consultorio
            cod_con,       -- Código identificador del consultorio
            nom_con,       -- Nombre del consultorio
            des_con,       -- Descripción del consultorio
            tip_con,       -- Tipo de consultorio
            equ_con,       -- Equipamiento disponible
            cap_con,       -- Capacidad máxima
            est_con        -- Estado de actividad
        FROM
            consultorios
        ORDER BY
            id_con
        LIMIT 1000;
    END IF;
END //

CREATE PROCEDURE pets_heaven.CancelAppointment(
    IN p_id_cit INT,
    IN p_id_mas INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    IF NOT EXISTS (SELECT 1 FROM citas WHERE id_cit = p_id_cit) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cita no encontrada en el sistema';
    END IF;

    UPDATE pets_heaven.citas
    SET est_cit = 'CANCELADA'
    WHERE id_cit = p_id_cit 
      AND mas_cit = p_id_mas;

    COMMIT;

    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.UpdateAppointmentDate(
    IN p_id_cit INT,
    IN p_nom_mas VARCHAR(100),
    IN p_pro_mas VARCHAR(20),
    IN p_new_date DATE,
    IN p_new_hor_ini TIME,
    IN p_new_hor_fin TIME,
    IN p_new_con INT
)
BEGIN
    DECLARE p_id_mas INT;
    DECLARE p_id_pro_mas INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;
    START TRANSACTION;

    SELECT id_per INTO p_id_pro_mas FROM personas WHERE doc_per = p_pro_mas;
    IF p_id_pro_mas IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Propietario de mascota no encontrado en el sistema';
    END IF;

    SELECT id_mas INTO p_id_mas FROM mascotas WHERE nom_mas = p_nom_mas AND id_pro_mas = p_id_pro_mas;
    IF p_id_mas IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Mascota no encontrada en el sistema';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM citas WHERE id_cit = p_id_cit AND mas_cit = p_id_mas) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cita no encontrada en el sistema';
    END IF;

    UPDATE pets_heaven.citas
    SET
        fec_cit = p_new_date,
        hor_ini_cit = p_new_hor_ini,
        hor_fin_cit = p_new_hor_fin,
        con_cit = p_new_con
    WHERE
        id_cit = p_id_cit 
        AND mas_cit = p_id_mas;

    COMMIT;
    SET autocommit = 1;
END //

/* DROP PROCEDURE SearchAppointmentsByUser; */
/* DROP PROCEDURE RegistAppointment; */
/* DROP PROCEDURE SearchConsultingRooms; */
/* DROP PROCEDURE pets_heaven.`RegistAppointment`; */
/* DROP PROCEDURE pets_heaven.`SearchAppointmentsByPet`; */
/* CALL pets_heaven.SearchAppointmentsByUser('1298765432'); */
/* CALL pets_heaven.SearchAllAppointments(); */
/* CALL pets_heaven.SearchAppointmentsByPet('max','12345678'); */