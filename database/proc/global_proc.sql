-- Active: 1746130779175@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.Login(
    IN p_firstData VARCHAR(100)
)
BEGIN
    SELECT
        p.nom_per,
        p.ape_per,
        p.doc_per,
        p.cont_per,
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
        AND p.email_per = p_firstData
    ORDER BY 
        p.nom_per
    LIMIT 40;
END //

/* DROP PROCEDURE pets_heaven.`Login`; */