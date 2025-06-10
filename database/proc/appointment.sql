-- Active: 1746130779175@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.SearchAllAppointments()
BEGIN 
    SELECT 
        c.id_cit,
        c.mas_cit,
        c.fec_reg_cit,
        c.fec_cit,
        c.hor_ini_cit,
        c.hor_fin_cit,
        c.lug_ate_cit,
        cs.nom_cat,
        s.nom_ser,
        s.des_ser,
        m.nom_mas,
        m.esp_mas,
        m.fot_mas,
        p.nom_per,
        p.ape_per,
        p.cel_per,
        c.estado
    FROM 
        citas c
    JOIN 
        mascotas m ON m.id_mas = c.mas_cit
    JOIN 
        servicios s ON s.id_ser = c.ser_cit
    JOIN 
        categorias_ser cs ON cs.id_cat = s.cat_ser
    JOIN 
        personas p ON p.id_per = c.vet_cit
    WHERE
        c.estado != 'CANCELADO'
    ORDER BY c.fec_cit
    LIMIT 50;
END //


CREATE PROCEDURE pets_heaven.SearchAppointmentsByUser(
    IN p_by VARCHAR(100)
)
BEGIN 
    SELECT 
        c.fec_reg_cit,
        c.fec_cit,
        c.hor_ini_cit,
        c.hor_fin_cit,
        c.lug_ate_cit,
        cs.nom_cat,
        s.nom_ser,
        s.des_ser,
        m.nom_mas,
        m.esp_mas,
        m.fot_mas,    
        p.nom_per,
        p.ape_per,
        p.cel_per,
        c.estado
    FROM 
        citas c
    JOIN 
        mascotas m ON m.id_mas = c.mas_cit
    JOIN 
        servicios s ON s.id_ser = c.ser_cit
    JOIN 
        categorias_ser cs ON cs.id_cat = s.cat_ser
    JOIN 
        personas p ON p.id_per = c.vet_cit
    WHERE
        c.estado != 'CANCELADO'
        AND (
            p.nom_per LIKE p_by
            OR p.doc_per LIKE p_by
            OR p.email_per LIKE p_by
            OR cs.nom_cat LIKE p_by
            OR s.nom_ser LIKE p_by
            OR m.nom_mas LIKE p_by
            OR m.raz_mas LIKE p_by
            OR m.esp_mas LIKE p_by
        )
    ORDER BY c.fec_cit
    LIMIT 50;
END //


CREATE PROCEDURE pets_heaven.RegistAppointment(
    IN p_reg_date DATE,
    IN p_date DATE,
    IN p_hor_ini TIME,
    IN p_hor_fin TIME,
    IN p_lugar VARCHAR(100),
    IN p_ser VARCHAR(100),
    IN p_vet VARCHAR(100),
    IN p_mas VARCHAR(100),
    IN p_status VARCHAR(25)
)
BEGIN
    DECLARE p_id_ser INT;
    DECLARE p_id_vet INT;
    DECLARE p_id_mas INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;
    START TRANSACTION;

    SELECT id_cat INTO p_id_ser FROM categorias_ser WHERE nom_cat LIKE p_ser;

    SELECT id_per INTO p_id_vet FROM personas WHERE doc_per LIKE p_vet;

    SELECT id_mas INTO p_id_mas FROM mascotas WHERE nom_mas LIKE p_mas;

    INSERT INTO pets_heaven.citas (
        fec_reg_cit, fec_cit, hor_ini_cit, hor_fin_cit, lug_ate_cit, ser_cit, vet_cit, mas_cit, estado
    ) VALUES (
        p_reg_date, p_date, p_hor_ini, p_hor_fin, p_lugar, p_id_ser, p_id_vet, p_id_mas, p_status
    );

    COMMIT;
    SET autocommit = 1;
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

    UPDATE 
        pets_heaven.citas
    SET 
        estado = 'CANCELADO'
    WHERE 
        id_cit = p_id_cit 
        AND mas_cit = p_id_mas;

    COMMIT;

    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.UpdateAppointmentDate(
    IN p_id_cit INT,
    IN p_id_mas INT,
    IN p_new_date DATE,
    IN p_new_hor_ini TIME,
    IN p_new_hor_fin TIME,
    IN p_new_lugar VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    UPDATE pets_heaven.citas

    SET
        fec_cit = p_new_date,
        hor_ini_cit = p_new_hor_ini,
        hor_fin_cit = p_new_hor_fin,
        lug_ate_cit = p_new_lugar

    WHERE
        id_cit = p_id_cit 
        AND mas_cit = p_id_mas;

    COMMIT;

    SET autocommit = 1;
END //

/* CALL `SearchAppointmentsByUser`('perro'); */
/* DROP PROCEDURE SearchAppointmentsByUser; */
/* DROP PROCEDURE RegistAppointment; */