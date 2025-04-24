-- Active: 1743971322762@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.RegistPets(
    IN p_nom_mas VARCHAR(100),
    IN p_esp_mas VARCHAR(100),
    IN p_col_mas VARCHAR(100),
    IN p_raz_mas VARCHAR(100),
    IN p_ali_mas VARCHAR(100),
    IN p_fec_nac_mas DATE,
    IN p_pes_mas FLOAT,
    IN p_usuario VARCHAR(100),
    IN p_gen_mas VARCHAR(20),
    IN p_est_rep_mas VARCHAR(50),
    IN p_fot_mas TEXT
)
BEGIN
    DECLARE p_id_pro_mas INT;
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
     BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    SELECT u.id_usu INTO p_id_pro_mas 
    FROM 
        usuarios u 
    WHERE 
        u.doc_usu = p_usuario 
        OR u.email_usu = p_usuario;

    INSERT INTO pets_heaven.mascotas (nom_mas,esp_mas,col_mas,raz_mas,ali_mas,fec_nac_mas,pes_mas,gen_mas,id_pro_mas,est_rep_mas,fot_mas)
    VALUES(p_nom_mas,p_esp_mas,p_col_mas,p_raz_mas,p_ali_mas,p_fec_nac_mas,p_pes_mas,p_gen_mas,p_id_pro_mas,p_est_rep_mas,p_fot_mas);

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.ModifyPets(
    IN p_nom_mas VARCHAR(100),
    IN p_esp_mas VARCHAR(100),
    IN p_col_mas VARCHAR(100),
    IN p_raz_mas VARCHAR(100),
    IN p_ali_mas VARCHAR(100),
    IN p_fec_nac_mas DATE,
    IN p_pes_mas FLOAT,
    IN p_usuario VARCHAR(100),
    IN p_gen_mas VARCHAR(20),
    IN p_est_rep_mas VARCHAR(50),
    IN p_fot_mas TEXT
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
        mascotas m, usuarios u
    SET 
        m.esp_mas = p_esp_mas,
        m.col_mas = p_col_mas,
        m.raz_mas = p_raz_mas,
        m.ali_mas = p_ali_mas,
        m.fec_nac_mas = p_fec_nac_mas,
        m.pes_mas = p_pes_mas,
        m.gen_mas = p_gen_mas,
        m.est_rep_mas = p_est_rep_mas,
        m.fot_mas = p_fot_mas
    WHERE
        m.estado = 1
        AND (
            u.doc_usu = p_usuario 
            OR u.email_usu = p_usuario
        ) AND m.nom_mas = p_nom_mas
        AND m.id_pro_mas = u.id_usu;

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.SearchPets()
BEGIN
    SELECT
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
        u.nom_usu,
        u.ape_usu,
        u.doc_usu,
        u.cel_usu,
        u.email_usu,
        u.gen_usu,
        u.estado
    FROM 
        mascotas m
    JOIN
        usuarios u ON u.id_usu = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND u.estado = 1
    ORDER BY 
        m.nom_mas
    LIMIT 40;

END //

CREATE PROCEDURE pets_heaven.SearchPetsBy(
    IN p_by VARCHAR(100),
    IN p_second_by VARCHAR(100)
)
BEGIN
    SELECT
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
        u.nom_usu,
        u.ape_usu,
        u.doc_usu,
        u.cel_usu,
        u.email_usu,
        u.gen_usu,
        u.estado
    FROM 
        mascotas m
    JOIN
        usuarios u ON u.id_usu = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND u.estado = 1
        AND (
            m.nom_mas LIKE p_by
            OR m.raz_mas LIKE p_by
            OR m.esp_mas LIKE p_by
            OR u.nom_usu LIKE p_by
            OR (u.email_usu LIKE p_by AND m.nom_mas LIKE p_second_by)
            OR (u.doc_usu LIKE p_by AND m.nom_mas LIKE p_second_by)
        )
    ORDER BY m.nom_mas
    LIMIT 40;

END //
CREATE PROCEDURE pets_heaven.SearchPetBy(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
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
        u.nom_usu,
        u.ape_usu,
        u.doc_usu,
        u.cel_usu,
        u.email_usu,
        u.gen_usu,
        u.estado
    FROM 
        mascotas m
    JOIN
        usuarios u ON u.id_usu = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND u.estado = 1
        AND (
            m.nom_mas LIKE p_by
            OR m.raz_mas LIKE p_by
            OR m.esp_mas LIKE p_by
            OR u.nom_usu LIKE p_by
            OR u.email_usu LIKE p_by
            OR u.doc_usu LIKE p_by
        )
    ORDER BY m.nom_mas
    LIMIT 40;
END //

CREATE PROCEDURE pets_heaven.DeletePetBy(
    IN p_first_by VARCHAR(100),
    IN p_second_by VARCHAR(100)
)
BEGIN
    UPDATE 
        mascotas m, usuarios u
    SET 
        m.estado = 0
    WHERE 
        m.estado = 1
        AND u.estado = 1
        AND m.nom_mas LIKE p_second_by
        AND ( 
            u.email_usu LIKE p_first_by
            OR u.doc_usu LIKE p_first_by
        );
END //

CREATE PROCEDURE pets_heaven.SearchHistoryBy(
    IN p_pet_id INT
)
BEGIN
    SELECT
        hm.id_his AS historial_id,
        hm.fec_his AS fecha_historial,
        hm.tra_his AS tratamiento,
        hm.des_his AS descripcion,
        v.id_vet AS id_veterinario,
        u.nom_usu AS nombre_veterinario,
        u.ape_usu AS apellido_veterinario,
        v.especialidad AS especialidad_veterinario,
        v.fot_vet AS foto_veterinario
    FROM 
        historiales_medicos hm
    JOIN
        mascotas m ON hm.id_mas_his = m.id_mas
    JOIN
        veterinarios v ON hm.id_vet_his = v.id_vet
    JOIN
        usuarios u ON v.id_vet = u.id_usu
    WHERE 
        hm.id_mas_his = p_pet_id;
END //