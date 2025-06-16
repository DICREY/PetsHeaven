-- Active: 1747081666433@@127.0.0.1@3306@pets_heaven
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
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.GetStatsAdmin(
    /* IN p_by VARCHAR(100) */
)
BEGIN
    SELECT 
        COUNT(v.id_vet) AS doc,
        ( SELECT COUNT(*) FROM mascotas m WHERE m.estado = 1) AS mas,
        ( 
            SELECT COUNT(*) 
            FROM 
                citas c 
            WHERE 
                c.fec_cit LIKE CURRENT_DATE()
                AND c.estado != 'CANCELADO'
        ) AS cit,
        ( 
            SELECT COUNT(*) 
            FROM 
                citas c 
            JOIN 
                servicios s ON s.id_ser = c.ser_cit
            JOIN
                categorias_ser cs ON cs.id_cat = s.cat_ser
            WHERE 
                cs.nom_cat LIKE "Emergencias 24h"
        ) AS emg
    FROM 
        veterinarios v
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.GetStatsVet()
BEGIN
    SELECT 
        COUNT(v.id_vet) AS doc,
        ( SELECT COUNT(*) FROM mascotas m WHERE m.estado = 1) AS mas,
        ( 
            SELECT COUNT(*) 
            FROM 
                citas c 
            WHERE 
                c.fec_cit LIKE CURRENT_DATE()
                AND c.estado != 'CANCELADO'
        ) AS cit,
        ( 
            SELECT COUNT(*)
            FROM 
                citas c 
            JOIN 
                servicios s ON s.id_ser = c.ser_cit
            JOIN
                categorias_ser cs ON cs.id_cat = s.cat_ser
            WHERE 
                cs.nom_cat LIKE "Emergencias 24h"
        ) AS emg
    FROM 
        veterinarios v
    LIMIT 1000;
END //

/* DROP PROCEDURE pets_heaven.`Login`; */
/* CALL `GetDataAdmin`(); */
/* DROP PROCEDURE `GetDataAdmin`; */