-- Active: 1747081666433@@127.0.0.1@3306@pets_heaven
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


CREATE PROCEDURE pets_heaven.RegisterService(
    IN p_cat_ser INT,
    IN p_nom_ser VARCHAR(100),
    IN p_pre_ser DECIMAL(10,2),
    IN p_des_ser TEXT,
    IN p_sta_ser ENUM("DISPONIBLE","NO-DISPONIBLE"),
    IN p_tec_des_ser TEXT
)
BEGIN
    INSERT INTO servicios (
        cat_ser,
        nom_ser,
        pre_ser,
        des_ser,
        sta_ser,
        tec_des_ser
    ) VALUES (
        p_cat_ser,
        p_nom_ser,
        p_pre_ser,
        p_des_ser,
        p_sta_ser,
        p_tec_des_ser
    );
END //


CREATE PROCEDURE pets_heaven.RegisterCirugia(
    IN p_cat_ser INT,
    IN p_nom_ser VARCHAR(100),
    IN p_pre_ser DECIMAL(10,2),
    IN p_des_ser TEXT,
    IN p_sta_ser ENUM("DISPONIBLE","NO-DISPONIBLE"),
    IN p_tec_des_ser TEXT,
    IN p_fec_cir DATE,
    IN p_des_cir VARCHAR(100),
    IN p_res_cir VARCHAR(200),
    IN p_com_cir VARCHAR(200),
    IN p_obv_cir TEXT
)
BEGIN
    INSERT INTO servicios (
        cat_ser,
        nom_ser,
        pre_ser,
        des_ser,
        sta_ser,
        tec_des_ser
    ) VALUES (
        p_cat_ser,
        p_nom_ser,
        p_pre_ser,
        p_des_ser,
        p_sta_ser,
        p_tec_des_ser
    );

    SET @last_id_ser = LAST_INSERT_ID();

    INSERT INTO cirugias (
        fec_cir,
        des_cir,
        res_cir,
        com_cir,
        obv_cir,
        ser_cir
    ) VALUES (
        p_fec_cir,
        p_des_cir,
        p_res_cir,
        p_com_cir,
        p_obv_cir,
        @last_id_ser
    );
END //

