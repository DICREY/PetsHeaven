-- Active: 1743971322762@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.SearchOwners()
BEGIN
    SELECT
        u.id_usu,
        u.nom_usu,
        u.ape_usu,
        u.fec_nac_usu,
        u.tip_doc_usu,
        u.doc_usu,
        u.dir_usu,
        u.cel_usu,
        u.cel2_usu,
        u.email_usu,
        u.cont_usu,
        u.fec_cre_usu,
        u.gen_usu,
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
            SEPARATOR '; '
        ) AS mascotas
    FROM 
        usuarios u
    JOIN 
        mascotas m ON m.id_pro_mas = u.id_usu
    WHERE
        u.estado = 1
        AND m.estado = 1
    GROUP BY
        u.id_usu,
        u.nom_usu,
        u.ape_usu,
        u.fec_nac_usu,
        u.tip_doc_usu,
        u.doc_usu,
        u.dir_usu,
        u.cel_usu,
        u.cel2_usu,
        u.email_usu,
        u.cont_usu,
        u.fec_cre_usu
    ORDER BY
        u.id_usu
    LIMIT 50;
END //
CREATE PROCEDURE pets_heaven.SearchOwnersBy(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        u.nom_usu,
        u.ape_usu,
        u.fec_nac_usu,
        u.tip_doc_usu,
        u.doc_usu,
        u.dir_usu,
        u.cel_usu,
        u.cel2_usu,
        u.email_usu,
        u.cont_usu,
        u.fec_cre_usu,
        u.gen_usu,
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
                SEPARATOR '; '
            ) 
            FROM mascotas m 
            WHERE 
                m.id_pro_mas = u.id_usu
                AND m.estado = 1
        ) AS mascotas
    FROM 
        usuarios u
    WHERE
        u.estado = 1
        AND ( 
            u.nom_usu LIKE CONCAT('%',p_by)
            OR u.ape_usu LIKE CONCAT('%',p_by)
            OR u.doc_usu LIKE CONCAT('%',p_by)
            OR u.email_usu LIKE CONCAT('%',p_by)
            OR u.gen_usu LIKE CONCAT('%',p_by)
            OR u.cel_usu LIKE CONCAT('%',p_by)
            OR u.tip_doc_usu LIKE CONCAT('%',p_by)
        )
    GROUP BY
        u.id_usu,
        u.nom_usu,
        u.ape_usu,
        u.fec_nac_usu,
        u.tip_doc_usu,
        u.doc_usu,
        u.dir_usu,
        u.cel_usu,
        u.cel2_usu,
        u.email_usu,
        u.cont_usu,
        u.fec_cre_usu
    ORDER BY
        u.id_usu DESC
    LIMIT 50;
END //
CREATE PROCEDURE pets_heaven.SearchOwnerBy(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        u.nom_usu,
        u.ape_usu,
        u.fec_nac_usu,
        u.tip_doc_usu,
        u.doc_usu,
        u.dir_usu,
        u.cel_usu,
        u.cel2_usu,
        u.email_usu,
        u.cont_usu,
        u.fec_cre_usu,
        u.gen_usu,
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
                SEPARATOR '; '
            ) 
            FROM mascotas m 
            WHERE 
                m.id_pro_mas = u.id_usu
                AND m.estado = 1
        ) AS mascotas
    FROM 
        usuarios u
    WHERE
        u.estado = 1
        AND ( 
            u.doc_usu LIKE p_by
            OR u.email_usu LIKE p_by
        )
    GROUP BY
        u.id_usu,
        u.nom_usu,
        u.ape_usu,
        u.fec_nac_usu,
        u.tip_doc_usu,
        u.doc_usu,
        u.dir_usu,
        u.cel_usu,
        u.cel2_usu,
        u.email_usu,
        u.cont_usu,
        u.fec_cre_usu
    ORDER BY
        u.id_usu DESC
    LIMIT 50;
END //
CREATE PROCEDURE pets_heaven.SearchOwnersByPet(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        u.nom_usu,
        u.ape_usu,
        u.fec_nac_usu,
        u.tip_doc_usu,
        u.doc_usu,
        u.dir_usu,
        u.cel_usu,
        u.cel2_usu,
        u.email_usu,
        u.cont_usu,
        u.fec_cre_usu,
        u.gen_usu,
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
                SEPARATOR '; '
            ) 
        ) AS mascotas
    FROM 
        usuarios u
    LEFT JOIN mascotas m ON
        m.id_pro_mas = u.id_usu
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
        u.id_usu,
        u.nom_usu,
        u.ape_usu,
        u.fec_nac_usu,
        u.tip_doc_usu,
        u.doc_usu,
        u.dir_usu,
        u.cel_usu,
        u.cel2_usu,
        u.email_usu,
        u.cont_usu,
        u.fec_cre_usu
    ORDER BY
        u.id_usu DESC
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
        usuarios u
    JOIN 
        mascotas m ON u.id_usu = m.id_pro_mas 
    SET
        u.estado = 0,
        m.estado = 0
    WHERE
        u.estado = 1
        AND (
            u.doc_usu LIKE p_by
            OR u.email_usu LIKE p_by
        );

    COMMIT;

    SET autocommit = 1;
END //