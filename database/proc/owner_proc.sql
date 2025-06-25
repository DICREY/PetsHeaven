<<<<<<< HEAD
-- Active: 1750268475844@@127.0.0.1@3306@pets_heaven
=======
-- Active: 1746043677643@@127.0.0.1@3306@pets_heaven
>>>>>>> a001651c0d6958d0fd8405d1d3e8fee5067c2109
CREATE PROCEDURE pets_heaven.SearchOwners()
BEGIN
    SELECT
        p.id_per,
        p.nom_per,
        p.ape_per,
        p.fec_nac_per,
        p.tip_doc_per,
        p.doc_per,
        p.dir_per,
        p.cel_per,
        p.cel2_per,
        p.email_per,
        p.cont_per,
        p.fec_cre_per,
        p.gen_per,
        p.fot_per,
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
        ) AS mascotas,
        (
            SELECT GROUP_CONCAT(
                r.nom_rol
                SEPARATOR ', '
            )
            FROM
                roles r
            JOIN
                otorgar_roles otr ON otr.id_per = p.id_per
            WHERE
                otr.id_rol = r.id_rol
        ) AS roles
    FROM 
        personas p
    JOIN 
        mascotas m ON m.id_pro_mas = p.id_per
    WHERE
        p.estado = 1
        AND m.estado = 1
    GROUP BY
        p.id_per,
        p.nom_per,
        p.ape_per,
        p.fec_nac_per,
        p.tip_doc_per,
        p.doc_per,
        p.dir_per,
        p.cel_per,
        p.cel2_per,
        p.email_per,
        p.cont_per,
        p.fec_cre_per
    ORDER BY
        p.fec_cre_per
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.SearchOwnersBy(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        p.nom_per,
        p.ape_per,
        p.fec_nac_per,
        p.tip_doc_per,
        p.doc_per,
        p.dir_per,
        p.cel_per,
        p.cel2_per,
        p.email_per,
        p.cont_per,
        p.fec_cre_per,
        p.gen_per,
        p.fot_per,
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
                m.id_pro_mas = p.id_per
                AND m.estado = 1
        ) AS mascotas,
        (
            SELECT GROUP_CONCAT(
                r.nom_rol
                SEPARATOR ', '
            )
            FROM
                roles r
            JOIN
                otorgar_roles otr ON otr.id_per = p.id_per
            WHERE
                otr.id_rol = r.id_rol
        ) AS roles
    FROM 
        personas p
    WHERE
        p.estado = 1
        AND ( 
            p.nom_per LIKE CONCAT('%',p_by)
            OR p.ape_per LIKE CONCAT('%',p_by)
            OR p.doc_per LIKE CONCAT('%',p_by)
            OR p.email_per LIKE CONCAT('%',p_by)
            OR p.gen_per LIKE CONCAT('%',p_by)
            OR p.cel_per LIKE CONCAT('%',p_by)
            OR p.tip_doc_per LIKE CONCAT('%',p_by)
        )
    GROUP BY
        p.id_per,
        p.nom_per,
        p.ape_per,
        p.fec_nac_per,
        p.tip_doc_per,
        p.doc_per,
        p.dir_per,
        p.cel_per,
        p.cel2_per,
        p.email_per,
        p.cont_per,
        p.fec_cre_per
    ORDER BY
        u.id_per DESC
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.SearchOwnerBy(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        p.nom_per,
        p.ape_per,
        p.fec_nac_per,
        p.tip_doc_per,
        p.doc_per,
        p.dir_per,
        p.cel_per,
        p.cel2_per,
        p.email_per,
        p.cont_per,
        p.fec_cre_per,
        p.gen_per,
        p.fot_per,
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
                m.id_pro_mas = p.id_per
                AND m.estado = 1
        ) AS mascotas,
        (
            SELECT GROUP_CONCAT(
                r.nom_rol
                SEPARATOR ', '
            )
            FROM
                roles r
            JOIN
                otorgar_roles otr ON otr.id_per = p.id_per
            WHERE
                otr.id_rol = r.id_rol
        ) AS roles
    FROM 
        personas p
    WHERE
        p.estado = 1
        AND ( 
            p.doc_per LIKE p_by
            OR p.email_per LIKE p_by
        )
    GROUP BY
        p.id_per,
        p.nom_per,
        p.ape_per,
        p.fec_nac_per,
        p.tip_doc_per,
        p.doc_per,
        p.dir_per,
        p.cel_per,
        p.cel2_per,
        p.email_per,
        p.cont_per,
        p.gen_per,
        p.fec_cre_per
    ORDER BY
        u.id_per DESC
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.SearchOwnersByPet(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        p.nom_per,
        p.ape_per,
        p.fec_nac_per,
        p.tip_doc_per,
        p.doc_per,
        p.dir_per,
        p.cel_per,
        p.cel2_per,
        p.email_per,
        p.cont_per,
        p.fec_cre_per,
        p.gen_per,
        p.fot_per,
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
        ) AS mascotas,
        (
            SELECT GROUP_CONCAT(
                r.nom_rol
                SEPARATOR ', '
            )
            FROM
                roles r
            JOIN
                otorgar_roles otr ON otr.id_per = p.id_per
            WHERE
                otr.id_rol = r.id_rol
        ) AS roles
    FROM 
        personas p
    LEFT JOIN mascotas m ON
        m.id_pro_mas = p.id_per
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
        p.estado = 1
    GROUP BY
        p.id_per,
        p.nom_per,
        p.ape_per,
        p.fec_nac_per,
        p.tip_doc_per,
        p.doc_per,
        p.dir_per,
        p.cel_per,
        p.cel2_per,
        p.email_per,
        p.cont_per,
        p.gen_per,
        p.fec_cre_per
    ORDER BY
        u.id_per DESC
    LIMIT 1000;
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

    IF (SELECT id_per FROM personas WHERE doc_per = p_by) IS NULL THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Esta persona no esta registrada en el sistema';
    END IF;

    UPDATE 
        personas p
    JOIN 
        mascotas m ON p.id_per = m.id_pro_mas 
    SET
        p.estado = 0,
        m.estado = 0
    WHERE
        p.estado = 1
        AND (
            p.doc_per LIKE p_by
            OR p.email_per LIKE p_by
        );

    COMMIT;

    SET autocommit = 1;
END //