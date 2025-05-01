-- Active: 1745808709557@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.RegistPets(
    IN p_nom_mas VARCHAR(100),
    IN p_esp_mas VARCHAR(100),
    IN p_col_mas VARCHAR(100),
    IN p_raz_mas VARCHAR(100),
    IN p_ali_mas VARCHAR(100),
    IN p_fec_nac_mas DATE,
    IN p_pes_mas FLOAT,
    IN p_persona VARCHAR(100),
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

    SELECT u.id_per INTO p_id_pro_mas 
    FROM 
        personas u 
    WHERE 
        u.doc_per = p_persona
        OR u.email_per = p_persona;

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
    IN p_persona VARCHAR(100),
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
        mascotas m, personas u
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
            u.doc_per = p_persona 
            OR u.email_per = p_persona
        ) AND m.nom_mas = p_nom_mas
        AND m.id_pro_mas = u.id_per;

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
        u.nom_per,
        u.ape_per,
        u.doc_per,
        u.cel_per,
        u.email_per,
        u.gen_per,
        u.estado
    FROM 
        mascotas m
    JOIN
        personas u ON u.id_per = m.id_pro_mas
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
        u.nom_per,
        u.ape_per,
        u.doc_per,
        u.cel_per,
        u.email_per,
        u.gen_per,
        u.estado
    FROM 
        mascotas m
    JOIN
        personas u ON u.id_per = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND u.estado = 1
        AND (
            m.nom_mas LIKE p_by
            OR m.raz_mas LIKE p_by
            OR m.esp_mas LIKE p_by
            OR u.nom_per LIKE p_by
            OR (u.email_per LIKE p_by AND m.nom_mas LIKE p_second_by)
            OR (u.doc_per LIKE p_by AND m.nom_mas LIKE p_second_by)
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
        u.nom_per,
        u.ape_per,
        u.doc_per,
        u.cel_per,
        u.email_per,
        u.gen_per,
        u.estado
    FROM 
        mascotas m
    JOIN
        personas u ON u.id_per = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND u.estado = 1
        AND (
            m.nom_mas LIKE p_by
            OR m.raz_mas LIKE p_by
            OR m.esp_mas LIKE p_by
            OR u.nom_per LIKE p_by
            OR u.email_per LIKE p_by
            OR u.doc_per LIKE p_by
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
        mascotas m, personas u
    SET 
        m.estado = 0
    WHERE 
        m.estado = 1
        AND u.estado = 1
        AND m.nom_mas LIKE p_second_by
        AND ( 
            u.email_per LIKE p_first_by
            OR u.doc_per LIKE p_first_by
        );
END //


/* Historys */
CREATE PROCEDURE pets_heaven.SearchHistoryBy(
    IN p_by VARCHAR(100),
    IN p_by_two VARCHAR(100)
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
        p.nom_per,
        p.ape_per,
        p.doc_per,
        p.cel_per,
        p.email_per,
        p.gen_per,
        p.estado
        (
            SELECT GROUP_CONCAT(
                CONCAT_WS(',',
                    c.mas_con,
                    c.pro_mas_con
                ) 
                SEPARATOR '; '
            ) 
            FROM consultas c
            WHERE 
                c.mas_con = m.id_mas
        ) AS consultas,
        (
            SELECT GROUP_CONCAT(
                CONCAT_WS(',',
                    ct.fec_reg_cit,
                    ct.fec_cit,
                    ct.hor_ini_cit,
                    ct.hor_fin_cit,
                    ct.ser_cit,
                    ct.vet_cit,
                    ct.mas_cit,
                    ct.estado
                ) 
                SEPARATOR '; '
            ) 
            FROM citas ct 
            WHERE 
                ct.mas_cit = m.id_mas
        ) AS citas
    FROM 
        mascotas m
    JOIN
        personas p 
        ON p.id_per = m.id_pro_mas
        AND p.estado = 1
        AND (
            p.email_per LIKE p_by_two
            OR p.doc_per LIKE p_by_two
        )
    WHERE 
        m.estado = 1
        AND m.nom_mas LIKE p_by
    ORDER BY m.nom_mas
    LIMIT 50;
END //

CALL pets_heaven.SearchHistoryBy('luna','87654321');