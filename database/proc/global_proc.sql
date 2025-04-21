-- Active: 1743971322762@@127.0.0.1@3306@pets_heaven
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
        u.nom_usu,
        u.ape_usu,
        u.doc_usu,
        u.cont_usu,
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
            u.doc_usu = p_firstData OR 
            u.email_usu = p_firstData
        )
    GROUP BY u.nom_usu
    LIMIT 40;
END //