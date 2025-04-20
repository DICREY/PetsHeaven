-- Active: 1744760357807@@127.0.0.1@3306@pets_heaven
DELIMITER //
CREATE PROCEDURE pets_heaven.RegistPeoples(
    IN p_nom_usu VARCHAR(100),
    IN p_ape_usu VARCHAR(100),
    IN p_fec_nac_usu DATE,
    IN p_tip_doc_usu VARCHAR(10),
    IN p_doc_usu VARCHAR(20),
    IN p_dir_usu VARCHAR(100),
    IN p_cel_usu VARCHAR(20),
    IN p_cel2_usu VARCHAR(20),
    IN p_email_usu VARCHAR(100),
    IN p_cont_usu VARCHAR(255),
    IN p_gen_usu VARCHAR(20)
)
BEGIN
    DECLARE p_id_usuario INT;
    DECLARE p_id_rol INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
     BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    INSERT INTO usuarios (
        nom_usu,ape_usu,fec_nac_usu,tip_doc_usu,doc_usu,dir_usu,cel_usu,cel2_usu,email_usu,cont_usu,gen_usu
    )
    VALUES (
        p_nom_usu,p_ape_usu,p_fec_nac_usu,p_tip_doc_usu,p_doc_usu,p_dir_usu,p_cel_usu,p_cel2_usu,p_email_usu,p_cont_usu,p_gen_usu
    );

    SET p_id_usuario = LAST_INSERT_ID();

    SELECT id_rol INTO p_id_rol FROM roles WHERE nom_rol = 'Usuario';

    INSERT INTO otorgar_roles(id_usu,id_rol,fec_oto)
    VALUES (p_id_usuario,p_id_rol,NOW());

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.SearchPeoples()
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
        GROUP_CONCAT(r.nom_rol SEPARATOR ', ') AS roles
    FROM 
        usuarios u
    JOIN
        otorgar_roles otr ON otr.id_usu = u.id_usu
    JOIN
        roles r ON otr.id_rol = r.id_rol
    WHERE
        u.estado = 1
    GROUP BY 
        u.id_usu
    LIMIT 100;
END //
CREATE PROCEDURE pets_heaven.SearchAllPeoples()
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
        GROUP_CONCAT(r.nom_rol SEPARATOR ', ') AS roles
    FROM 
        usuarios u
    JOIN
        otorgar_roles otr ON otr.id_usu = u.id_usu
    JOIN
        roles r ON otr.id_rol = r.id_rol
    GROUP BY 
        u.id_usu
    LIMIT 100;
END //

CREATE PROCEDURE pets_heaven.SearchPeopleBy(
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
        GROUP_CONCAT(r.nom_rol SEPARATOR ', ') AS roles
    FROM 
        usuarios u
    JOIN
        otorgar_roles otr ON otr.id_usu = u.id_usu
    JOIN
        roles r ON otr.id_rol = r.id_rol
    WHERE
        u.estado = 1
        AND (
            u.doc_usu = p_by
            OR u.email_usu LIKE p_by
        )
    ORDER BY
        u.id_usu
    LIMIT 50;
END //
CREATE PROCEDURE pets_heaven.SearchPeoplesOwner()
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
        u.fec_cre_usu
    FROM 
        usuarios u
    JOIN
        mascotas m
    WHERE
        u.estado = 1
        AND u.id_usu = m.id_pro_mas
    ORDER BY
        u.id_usu
    LIMIT 50;
END //

CREATE PROCEDURE pets_heaven.SearchPeoplesBy(
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
        GROUP_CONCAT(r.nom_rol SEPARATOR ', ') AS roles
    FROM 
        usuarios u
    JOIN
        otorgar_roles otr ON otr.id_usu = u.id_usu
    JOIN
        roles r ON otr.id_rol = r.id_rol
    WHERE
        u.estado = 1
        AND (
            r.nom_rol = p_by
            OR u.nom_usu LIKE CONCAT('%',p_by,'%')
            OR u.ape_usu LIKE CONCAT('%',p_by,'%')
            OR u.doc_usu LIKE CONCAT('%',p_by,'%')
            OR u.email_usu LIKE CONCAT('%',p_by,'%')
            OR u.gen_usu LIKE CONCAT('%',p_by,'%')
            OR u.cel_usu LIKE CONCAT('%',p_by,'%')
            OR u.tip_doc_usu LIKE CONCAT('%',p_by,'%')
        )
    GROUP BY 
        u.id_usu
    LIMIT 100;
END //