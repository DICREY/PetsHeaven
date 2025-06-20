-- Active: 1750268475844@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.RegistStaff(
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
    IN p_esp_vet VARCHAR(100),
    IN p_num_tar_vet VARCHAR(100),
    IN p_fot_tar_vet VARCHAR(100),
    IN p_fot_vet VARCHAR(100)
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
        nom_per,ape_per,fec_nac_per,tip_doc_per,doc_per,dir_per,cel_per,cel2_per,email_per,cont_per,gen_per
    )
    VALUES (
        p_nom_per,p_ape_per,p_fec_nac_per,p_tip_doc_per,p_doc_per,p_dir_per,p_cel_per,p_cel2_per,p_email_per,p_cont_per,p_gen_per
    );

    SET p_id_persona = LAST_INSERT_ID();

    SELECT id_rol INTO p_id_rol FROM roles WHERE nom_rol = 'Veterinario';

    INSERT INTO otorgar_roles(id_per,id_rol,fec_oto)
    VALUES (p_id_persona,p_id_rol,NOW());

    COMMIT;
    SET autocommit = 1;

END //
CREATE PROCEDURE pets_heaven.RegistAdmin(
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
    IN P_esp_vet VARCHAR(100),
    IN P_num_tar_vet VARCHAR(100),
    IN P_fot_tar_vet VARCHAR(100),
    IN P_fot_vet VARCHAR(100)
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
        nom_per,ape_per,fec_nac_per,tip_doc_per,doc_per,dir_per,cel_per,cel2_per,email_per,cont_per,gen_per
    )
    VALUES (
        p_nom_per,p_ape_per,p_fec_nac_per,p_tip_doc_per,p_doc_per,p_dir_per,p_cel_per,p_cel2_per,p_email_per,p_cont_per,p_gen_per
    );

    SET p_id_persona = LAST_INSERT_ID();

    SELECT id_rol INTO p_id_rol FROM roles WHERE nom_rol = 'Administrador';

    INSERT INTO otorgar_roles(id_per,id_rol)
    VALUES (p_id_persona,p_id_rol);

    COMMIT;
    SET autocommit = 1;
END //
CREATE PROCEDURE pets_heaven.SearchPeoples()
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
    ORDER BY 
        p.fec_cre_per
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.SearchPeoplesVet()
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
        v.especialidad AS esp_vet,
        v.num_tar_vet,
        v.fot_tar_vet,
        v.fot_vet,
        v.horarios,
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
        veterinarios v
    JOIN
        personas p ON v.id_vet = p.id_per
    WHERE
        p.estado = 1
    ORDER BY
        p.fec_cre_per
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.SearchAllPeoples()
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
    ORDER BY
        p.fec_cre_per
    LIMIT 1000;
END //

/* CALL pets_heaven.SearchPeoplesVet(); */
/* DROP PROCEDURE pets_heaven.SearchPeoplesVet; */