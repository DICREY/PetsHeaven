<<<<<<< HEAD
-- Active: 1747081666433@@127.0.0.1@3306@pets_heaven
=======
-- Active: 1746046445434@@127.0.0.1@3306@pets_heaven
>>>>>>> 7683f047b7a9893aecaa095aacc01b0edc7cfdcd
CREATE PROCEDURE pets_heaven.SearchOwners()
BEGIN
    SELECT
        u.id_per,
        u.nom_per,
        u.ape_per,
        u.fec_nac_per,
        u.tip_doc_per,
        u.doc_per,
        u.dir_per,
        u.cel_per,
        u.cel2_per,
        u.email_per,
        u.cont_per,
        u.fec_cre_per,
        u.gen_per,
        GROUP_CONCAT(
            CONCAT_WS(',',
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
                m.fec_cre_mas
            ) 
            SEPARATOR '---'
        ) AS mascotas
    FROM 
        personas u
    JOIN 
        mascotas m ON m.id_pro_mas = u.id_per
    WHERE
        u.estado = 1
        AND m.estado = 1
    GROUP BY
        u.id_per,
        u.nom_per,
        u.ape_per,
        u.fec_nac_per,
        u.tip_doc_per,
        u.doc_per,
        u.dir_per,
        u.cel_per,
        u.cel2_per,
        u.email_per,
        u.cont_per,
        u.fec_cre_per
    ORDER BY
        u.id_per
    LIMIT 50;
END //
CREATE PROCEDURE pets_heaven.SearchOwnersBy(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        u.nom_per,
        u.ape_per,
        u.fec_nac_per,
        u.tip_doc_per,
        u.doc_per,
        u.dir_per,
        u.cel_per,
        u.cel2_per,
        u.email_per,
        u.cont_per,
        u.fec_cre_per,
        u.gen_per,
        (
            SELECT GROUP_CONCAT(
                CONCAT_WS(',',
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
                    m.fec_cre_mas
                ) 
                SEPARATOR '---'
            ) 
            FROM mascotas m 
            WHERE 
                m.id_pro_mas = u.id_per
                AND m.estado = 1
        ) AS mascotas
    FROM 
        personas u
    WHERE
        u.estado = 1
        AND ( 
            u.nom_per LIKE CONCAT('%',p_by)
            OR u.ape_per LIKE CONCAT('%',p_by)
            OR u.doc_per LIKE CONCAT('%',p_by)
            OR u.email_per LIKE CONCAT('%',p_by)
            OR u.gen_per LIKE CONCAT('%',p_by)
            OR u.cel_per LIKE CONCAT('%',p_by)
            OR u.tip_doc_per LIKE CONCAT('%',p_by)
        )
    GROUP BY
        u.id_per,
        u.nom_per,
        u.ape_per,
        u.fec_nac_per,
        u.tip_doc_per,
        u.doc_per,
        u.dir_per,
        u.cel_per,
        u.cel2_per,
        u.email_per,
        u.cont_per,
        u.fec_cre_per
    ORDER BY
        u.id_per DESC
    LIMIT 50;
END //
CREATE PROCEDURE pets_heaven.SearchOwnerBy(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        u.nom_per,
        u.ape_per,
        u.fec_nac_per,
        u.tip_doc_per,
        u.doc_per,
        u.dir_per,
        u.cel_per,
        u.cel2_per,
        u.email_per,
        u.cont_per,
        u.fec_cre_per,
        u.gen_per,
        (
            SELECT GROUP_CONCAT(
                CONCAT_WS(',',
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
                    m.fec_cre_mas
                ) 
                SEPARATOR '---'
            ) 
            FROM mascotas m 
            WHERE 
                m.id_pro_mas = u.id_per
                AND m.estado = 1
        ) AS mascotas
    FROM 
        personas u
    WHERE
        u.estado = 1
        AND ( 
            u.doc_per LIKE p_by
            OR u.email_per LIKE p_by
        )
    GROUP BY
        u.id_per,
        u.nom_per,
        u.ape_per,
        u.fec_nac_per,
        u.tip_doc_per,
        u.doc_per,
        u.dir_per,
        u.cel_per,
        u.cel2_per,
        u.email_per,
        u.cont_per,
        u.gen_per,
        u.fec_cre_per
    ORDER BY
        u.id_per DESC
    LIMIT 50;
END //
CREATE PROCEDURE pets_heaven.SearchOwnersByPet(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        u.nom_per,
        u.ape_per,
        u.fec_nac_per,
        u.tip_doc_per,
        u.doc_per,
        u.dir_per,
        u.cel_per,
        u.cel2_per,
        u.email_per,
        u.cont_per,
        u.fec_cre_per,
        u.gen_per,
        (
            GROUP_CONCAT(
                CONCAT_WS(',',
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
                    m.fec_cre_mas
                ) 
                SEPARATOR '---'
            ) 
        ) AS mascotas
    FROM 
        personas u
    LEFT JOIN mascotas m ON
        m.id_pro_mas = u.id_per
        AND m.estado = 1
        AND (
            m.nom_mas LIKE CONCAT('%',p_by)
            OR m.esp_mas LIKE CONCAT('%',p_by)
            OR m.col_mas LIKE CONCAT('%',p_by)
            OR m.est_rep_mas LIKE CONCAT('%',p_by)
            OR m.gen_mas LIKE CONCAT('%',p_by)
            OR m.ali_mas LIKE CONCAT('%',p_by)
        )
    WHERE
        u.estado = 1
    GROUP BY
        u.id_per,
        u.nom_per,
        u.ape_per,
        u.fec_nac_per,
        u.tip_doc_per,
        u.doc_per,
        u.dir_per,
        u.cel_per,
        u.cel2_per,
        u.email_per,
        u.cont_per,
        u.gen_per,
        u.fec_cre_per
    ORDER BY
        u.id_per DESC
    LIMIT 50;
END //

CREATE PROCEDURE pets_heaven.DeleteOwner(
    IN p_by VARCHAR(100)
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
        personas u
    JOIN 
        mascotas m ON u.id_per = m.id_pro_mas 
    SET
        u.estado = 0,
        m.estado = 0
    WHERE
        u.estado = 1
        AND (
            u.doc_per LIKE p_by
            OR u.email_per LIKE p_by
        );

    COMMIT;

    SET autocommit = 1;
END //