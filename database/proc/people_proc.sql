-- Active: 1746130779175@@127.0.0.1@3306@pets_heaven
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

    IF (SELECT id_per FROM personas WHERE doc_per = p_doc_per) THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este numero de documento ya esta registrado en el sistema';
    END IF;

    
    IF (SELECT id_per FROM personas WHERE email_per = p_email_per) THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este correo electrónico ya esta registrado en el sistema';
    END IF;

    INSERT INTO personas (
        nom_per,ape_per,fec_nac_per,tip_doc_per,doc_per,dir_per,cel_per,cel2_per,email_per,cont_per,gen_per,fot_per
    )
    VALUES (
        p_nom_per,p_ape_per,p_fec_nac_per,p_tip_doc_per,p_doc_per,p_dir_per,p_cel_per,p_cel2_per,p_email_per,p_cont_per,p_gen_per,p_img_per
    );

    SET p_id_persona = LAST_INSERT_ID();

    SELECT id_rol INTO p_id_rol FROM roles WHERE nom_rol = 'Usuario';

    INSERT INTO otorgar_roles(id_per,id_rol,fec_oto)
    VALUES (p_id_persona,p_id_rol,CURRENT_DATE());

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.AssignRolAdmin(
    IN p_doc VARCHAR(100)
)
BEGIN
    DECLARE p_id_per INT;
    DECLARE p_id_rol INT;
    DECLARE p_id_rol_sec INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
     BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    SELECT id_per INTO p_id_per FROM personas WHERE doc_per = p_doc;
    IF p_id_per IS NULL THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontro a esta persona';
    END IF;

    SELECT id_rol INTO p_id_rol FROM roles WHERE nom_rol LIKE 'Administrador';

    SELECT id_rol INTO p_id_rol_sec FROM roles WHERE nom_rol LIKE 'Veterinario';

    IF EXISTS (SELECT 1 FROM otorgar_roles WHERE id_per = p_id_per AND id_rol = p_id_rol)
        THEN SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Esta persona ya tiene este Rol';
    END IF;

    -- Asignar rol Administrador si no lo tiene
    IF NOT EXISTS (SELECT 1 FROM otorgar_roles WHERE id_per = p_id_per AND id_rol = p_id_rol) THEN
        INSERT INTO otorgar_roles(id_per, id_rol, fec_oto)
        VALUES (p_id_per, p_id_rol, CURRENT_DATE());
    END IF;

    -- Asignar rol Veterinario si no lo tiene
    IF NOT EXISTS (SELECT 1 FROM otorgar_roles WHERE id_per = p_id_per AND id_rol = p_id_rol_sec) THEN
        INSERT INTO otorgar_roles(id_per, id_rol, fec_oto)
        VALUES (p_id_per, p_id_rol_sec, CURRENT_DATE());
    END IF;

    COMMIT;

    SET autocommit = 1;
END //
CREATE PROCEDURE pets_heaven.AssignRolStaff(
    IN p_doc VARCHAR(100),
    IN p_esp VARCHAR(100),
    IN p_hor VARCHAR(100),
    IN p_num_tar VARCHAR(100),
    IN p_fot_tar TEXT
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
    IF p_id_per IS NULL THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontro a esta persona';
    END IF;

    SELECT id_rol INTO p_id_rol FROM roles WHERE nom_rol LIKE 'Veterinario';

    -- Asignar rol Veterinario si no lo tiene
    IF EXISTS (SELECT 1 FROM otorgar_roles WHERE id_per = p_id_per AND id_rol = p_id_rol) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Esta persona ya tiene este Rol';
    ELSE 
        INSERT INTO otorgar_roles(id_per, id_rol, fec_oto)
        VALUES (p_id_per, p_id_rol, CURRENT_DATE());
    END IF;

    INSERT INTO veterinarios (id_vet,especialidad,horarios,num_tar_vet,fot_tar_vet)
    VALUES (p_id_per,p_esp,p_hor,p_num_tar,p_fot_tar);

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

    IF (SELECT id_per FROM personas WHERE doc_per = p_doc_per) IS NULL THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Esta persona no esta registrada en el sistema';
    END IF;

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

    IF (SELECT id_per FROM personas WHERE doc_per = p_by) IS NULL THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Esta persona no esta registrada en el sistema';
    END IF;

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
/* CALL pets_heaven.AssignRolAdmin('12345678'); */

/* DROP PROCEDURE `RegistPeoples`; */
/* DROP PROCEDURE `AssignRolAdmin`; */
/* DROP PROCEDURE `AssignRolStaff`; */
/* DROP PROCEDURE `ModifyPeople`; */
/* DROP PROCEDURE pets_heaven.`SearchPeopleBy`; */
/* DROP PROCEDURE pets_heaven.`SearchPeoplesBy`; */
/* DROP PROCEDURE pets_heaven.`DeletePeople`; */