-- Active: 1746046445434@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.RegistPeoples(
    IN p_nom_per VARCHAR(100),
    IN p_ape_per VARCHAR(100),
    IN p_fec_nac_per DATE,
    IN p_tip_doc_per VARCHAR(10),
    IN p_doc_per VARCHAR(20),
    IN p_dir_per VARCHAR(100),
    IN p_cel_per VARCHAR(20),
    IN p_cel2_per VARCHAR(20),
    IN p_email_per VARCHAR(100),
    IN p_cont_per VARCHAR(255),
    IN p_gen_per VARCHAR(20),
    IN p_img_per VARCHAR(255)
)
BEGIN
    DECLARE p_id_persona INT;
    DECLARE p_id_rol INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
     BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    INSERT INTO personas (
        nom_per,ape_per,fec_nac_per,tip_doc_per,doc_per,dir_per,cel_per,cel2_per,email_per,cont_per,gen_per,fot_per
    )
    VALUES (
        p_nom_per,p_ape_per,p_fec_nac_per,p_tip_doc_per,p_doc_per,p_dir_per,p_cel_per,p_cel2_per,p_email_per,p_cont_per,p_gen_per,p_img_per
    );

    SET p_id_persona = LAST_INSERT_ID();

    SELECT id_rol INTO p_id_rol FROM roles WHERE nom_rol = 'Usuario';

    INSERT INTO otorgar_roles(id_per,id_rol,fec_oto)
    VALUES (p_id_persona,p_id_rol,NOW());

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.AssignRol(
    IN p_doc VARCHAR(100),
    IN p_rol VARCHAR(100)
)
BEGIN
    DECLARE p_id_per INT;
    DECLARE p_id_rol INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
     BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    SELECT id_per INTO p_id_per FROM personas WHERE doc_per = p_doc;

    SELECT id_rol INTO p_id_rol FROM roles WHERE nom_rol = p_rol;

    INSERT INTO otorgar_roles(id_per,id_rol,fec_oto)
    VALUES (p_id_per,p_id_rol,NOW());

    COMMIT;

    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.ModifyPeople(
    IN p_nom_per VARCHAR(100),
    IN p_ape_per VARCHAR(100),
    IN p_fec_nac_per DATE,
    IN p_doc_per VARCHAR(20),
    IN p_dir_per VARCHAR(100),
    IN p_cel_per VARCHAR(20),
    IN p_cel2_per VARCHAR(20),
    IN p_email_per VARCHAR(100),
    IN p_cont_per VARCHAR(255),
    IN p_gen_per VARCHAR(20),
    IN p_img_per VARCHAR(255)
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
        personas p
    SET
        p.nom_per = p_nom_per,
        p.ape_per = p_ape_per,
        p.fec_nac_per = p_fec_nac_per,
        p.dir_per = p_dir_per,
        p.cel_per = p_cel_per,
        p.cel2_per = p_cel2_per,
        p.email_per = p_email_per,
        p.cont_per = p_cont_per,
        p.gen_per = p_gen_per,
        p.fot_per = p_img_per
    WHERE
        p.doc_per = p_doc_per;

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.SearchPeopleBy(
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
        p.gen_per,
        p.fec_cre_per,
        p.fot_per,
        GROUP_CONCAT(r.nom_rol SEPARATOR ', ') AS roles
    FROM 
        personas p
    JOIN
        otorgar_roles otr ON otr.id_per = p.id_per
    JOIN
        roles r ON otr.id_rol = r.id_rol
    WHERE
        p.estado = 1
        AND (
            p.doc_per = p_by
            OR p.email_per LIKE p_by
        )
    ORDER BY
        p.id_per
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.SearchPeoplesBy(
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
        p.gen_per,
        p.fec_cre_per,
        p.fot_per,
        GROUP_CONCAT(r.nom_rol SEPARATOR ', ') AS roles
    FROM 
        personas p
    JOIN
        otorgar_roles otr ON otr.id_per = p.id_per
    JOIN
        roles r ON otr.id_rol = r.id_rol
    WHERE
        p.estado = 1
        AND (
            r.nom_rol = p_by
            OR p.nom_per LIKE CONCAT('%',p_by,'%')
            OR p.ape_per LIKE CONCAT('%',p_by,'%')
            OR p.doc_per LIKE CONCAT('%',p_by,'%')
            OR p.email_per LIKE CONCAT('%',p_by,'%')
            OR p.gen_per LIKE CONCAT('%',p_by,'%')
            OR p.cel_per LIKE CONCAT('%',p_by,'%')
            OR p.tip_doc_per LIKE CONCAT('%',p_by,'%')
        )
    GROUP BY 
        p.id_per
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.DeletePeople(
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
        personas p
    SET 
        p.estado = 0
    WHERE
        p.estado = 1
        AND (
            p.doc_per LIKE p_by
            OR p.email_per LIKE p_by
        );

    COMMIT;

    SET autocommit = 1;
END //

/* CALL `SearchPeoplesVet`();
/* CALL pets_heaven.SearchAllPeoples(); */
/* CALL pets_heaven.SearchPeoples(); */
/* CALL pets_heaven.AssignRol('12345678','Administrador'); */

/* DROP PROCEDURE `RegistPeoples`; */
/* DROP PROCEDURE `AssignRol`; */
/* DROP PROCEDURE `ModifyPeople`; */
/* DROP PROCEDURE pets_heaven.`SearchPeopleBy`; */
/* DROP PROCEDURE pets_heaven.`SearchPeoplesBy`; */
/* DROP PROCEDURE pets_heaven.`DeletePeople`; */