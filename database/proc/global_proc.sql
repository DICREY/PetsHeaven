-- Active: 1746046445434@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.SearchServices()
BEGIN
    SELECT
        s.nom_ser,
        c.nom_cat,
        s.pre_ser,
        s.des_ser,
        s.tec_des_ser,
        s.img_ser
    FROM
        servicios s
    JOIN
        categorias_ser c ON c.id_cat = s.cat_ser
    WHERE
        s.estado = 1
    LIMIT 40;
END //

CREATE PROCEDURE pets_heaven.Login(
    IN p_firstData VARCHAR(100)
)
BEGIN
    SELECT
        u.nom_per,
        u.ape_per,
        u.doc_per,
        u.cont_per,
        GROUP_CONCAT(r.nom_rol SEPARATOR ', ') AS roles,
        GROUP_CONCAT(r.fot_rol SEPARATOR ', ') AS fot_roles
    FROM
        personas u
    JOIN
        otorgar_roles otr ON otr.id_per = u.id_per
    JOIN
        roles r ON otr.id_rol = r.id_rol
    WHERE
        u.estado = 1
        AND (
            u.doc_per = p_firstData OR 
            u.email_per = p_firstData
        )
    GROUP BY u.nom_per
    LIMIT 40;
END //

DROP PROCEDURE pets_heaven.`Login`;