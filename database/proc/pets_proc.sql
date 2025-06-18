-- Active: 1750268475844@@127.0.0.1@3306@pets_heaven
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

    SELECT p.id_per INTO p_id_pro_mas 
    FROM 
        personas p 
    WHERE 
        p.doc_per = p_persona
        OR p.email_per = p_persona;

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
        mascotas m, personas p
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
            p.doc_per = p_persona 
            OR p.email_per = p_persona
        ) AND m.nom_mas = p_nom_mas
        AND m.id_pro_mas = p.id_per;

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.SearchPets()
BEGIN
    SELECT
        m.id_mas,
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
        p.estado,
        (
            SELECT c.fec_cit 
            FROM citas c
            WHERE
                c.mas_cit = m.id_mas
                AND c.estado = 'REALIZADO'
        )
    FROM 
        mascotas m
    JOIN
        personas p ON p.id_per = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND p.estado = 1
    ORDER BY 
        m.fec_cre_mas
    LIMIT 1000;

END //

CREATE PROCEDURE pets_heaven.SearchPetsBy(
    IN p_by VARCHAR(100),
    IN p_second_by VARCHAR(100)
)
BEGIN
    SELECT
        m.id_mas,
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
        p.estado,
        (
            SELECT c.fec_cit 
            FROM citas c
            WHERE
                c.mas_cit = m.id_mas
                AND c.estado = 'REALIZADO'
        )
    FROM 
        mascotas m
    JOIN
        personas p ON p.id_per = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND p.estado = 1
        AND (
            m.nom_mas LIKE p_by
            OR m.raz_mas LIKE p_by
            OR m.esp_mas LIKE p_by
            OR p.nom_per LIKE p_by
            OR (p.email_per LIKE p_by AND m.nom_mas LIKE p_second_by)
            OR (p.doc_per LIKE p_by AND m.nom_mas LIKE p_second_by)
        )
    ORDER BY m.nom_mas
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.SearchPetBy(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        m.id_mas,
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
        p.estado,
        (
            SELECT c.fec_cit 
            FROM citas c
            WHERE
                c.mas_cit = m.id_mas
                AND c.estado = 'REALIZADO'
        )
    FROM 
        mascotas m
    JOIN
        personas p ON p.id_per = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND p.estado = 1
        AND (
            m.nom_mas LIKE p_by
            OR m.raz_mas LIKE p_by
            OR m.esp_mas LIKE p_by
            OR p.nom_per LIKE p_by
            OR p.email_per LIKE p_by
            OR p.doc_per LIKE p_by
        )
    ORDER BY m.nom_mas
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.DeletePetBy(
    IN p_first_by VARCHAR(100),
    IN p_second_by VARCHAR(100)
)
BEGIN
    UPDATE 
        mascotas m, personas p
    SET 
        m.estado = 0
    WHERE 
        m.estado = 1
        AND p.estado = 1
        AND m.nom_mas = p_second_by
        AND ( 
            p.email_per = p_first_by
            OR p.doc_per = p_first_by
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
        p.estado,
        (
            SELECT GROUP_CONCAT(
                CONCAT_WS('---',
                    ct.fec_reg_cit,
                    ct.fec_cit,
                    ct.hor_ini_cit,
                    ct.hor_fin_cit,
                    s.nom_ser,
                    s.pre_ser,
                    s.des_ser,
                    s.tec_des_ser,
                    p.nom_per,
                    p.ape_per,
                    v.especialidad,
                    cv.nom_cat,
                    cs.img_cat,
                    v.fot_vet
                ) 
                SEPARATOR '; '
            ) 
            FROM 
                citas ct
            JOIN
                servicios s ON s.id_ser = ct.ser_cit
            JOIN
                personas p ON p.id_per = ct.vet_cit
            JOIN
                veterinarios v ON v.id_vet = ct.vet_cit
            JOIN
                otorgar_categoria_vet otv ON otv.id_per = ct.vet_cit
            JOIN
                categorias_veterinario cv ON otv.id_cat = cv.id_cat
            JOIN
                categorias_ser cs ON s.cat_ser = cs.id_cat
            WHERE 
                ct.estado = "REALIZADO"
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
    LIMIT 1000;
END //

/* CALL pets_heaven.SearchHistoryBy('luna','87654321'); */
/* DROP PROCEDURE pets_heaven.SearchHistoryBy; */