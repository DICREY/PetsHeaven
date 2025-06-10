-- Active: 1747352860830@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.SearchServices()
BEGIN
    SELECT
        s.nom_ser,
        s.pre_ser,
        s.des_ser,
        s.tec_des_ser,
        s.sta_ser,
        c.nom_cat,
        c.img_cat,
        (
            SELECT 
                GROUP_CONCAT(
                    CONCAT_WS('---',
                        ci.fec_cir,
                        ci.res_cir,
                        ci.com_cir,
                        ci.obv_cir
                    ) 
                    SEPARATOR '; '
                )
            FROM 
                cirugias ci
            WHERE 
                ci.ser_cir = s.id_ser
        ) AS cirugias,
        (
            SELECT
                GROUP_CONCAT(
                    CONCAT_WS('---',
                        v.nom_vac,
                        v.efe_sec_vac,
                        v.cat_vac,
                        v.dos_rec_vac,
                        v.des_vac,
                        v.des_tec_vac,
                        v.lot_vac,
                        v.fec_ven_vac,
                        v.pre_vac
                    ) 
                    SEPARATOR '; '
                )
            FROM 
                vacunas v
            WHERE 
                v.ser_vac = s.id_ser
        ) AS vacunas
    FROM 
        servicios s
    JOIN 
        categorias_ser c ON c.id_cat = s.cat_ser 
    WHERE
        c.estado = 1
    ORDER BY 
        s.nom_ser
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.SearchServicesCat()
BEGIN
    SELECT
        cs.nom_cat,
        cs.tec_des_cat,
        cs.img_cat
    FROM 
        categorias_ser cs
    WHERE
        cs.estado = 1
    ORDER BY 
        cs.nom_cat
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.SearchServicesBy(
    IN p_cat_ser VARCHAR(100)
)
BEGIN
    SELECT
        s.nom_ser,
        s.pre_ser,
        s.des_ser,
        s.tec_des_ser,
        s.sta_ser,
        c.nom_cat,
        c.img_cat,
        (
            SELECT 
                GROUP_CONCAT(
                    CONCAT_WS('---',
                        ci.fec_cir,
                        ci.res_cir,
                        ci.com_cir,
                        ci.obv_cir
                    ) 
                    SEPARATOR '; '
                )
            FROM 
                cirugias ci
            WHERE 
                ci.ser_cir = s.id_ser
        ) AS cirugias,
        (
            SELECT
                GROUP_CONCAT(
                    CONCAT_WS('---',
                        v.nom_vac,
                        v.efe_sec_vac,
                        v.cat_vac,
                        v.dos_rec_vac,
                        v.des_vac,
                        v.des_tec_vac,
                        v.lot_vac,
                        v.fec_ven_vac,
                        v.pre_vac
                    ) 
                    SEPARATOR '; '
                )
            FROM 
                vacunas v
            WHERE 
                v.ser_vac = s.id_ser
        ) AS vacunas
    FROM 
        servicios s
    JOIN 
        categorias_ser c ON c.id_cat = s.cat_ser 
    WHERE
        c.estado = 1
        AND c.nom_cat LIKE p_cat_ser
    ORDER BY 
        s.nom_ser
    LIMIT 1000;
END //


/* CALL `SearchServices`(); */
/* CALL pets_heaven.`SearchServicesBy`('Cirugía'); */
/* DROP PROCEDURE pets_heaven.SearchServices; */
/* DROP PROCEDURE pets_heaven.`SearchServicesBy`; */
/* CALL `SearchCatServices`(); */