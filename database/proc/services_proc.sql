-- Active: 1746130779175@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.SearchServices()
BEGIN
    SELECT
        s.id_ser,
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
                        /* v.des_vac, */
                        v.des_tec_vac,
                        v.lot_vac,
                        v.fre_vac,
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
        s.id_ser,
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
                        ci.id_cir,
                        ci.des_cir,
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
                        v.fre_vac,
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
        /* c.estado = 1 */
        c.nom_cat LIKE p_cat_ser
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
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

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

    COMMIT;

    SET autocommit = 1;
END //


CREATE PROCEDURE pets_heaven.RegisterCirugia(
    IN p_cat_ser INT,
    IN p_nom_ser VARCHAR(100),
    IN p_pre_ser DECIMAL(10,2),
    IN p_des_ser TEXT,
    IN p_sta_ser ENUM("DISPONIBLE","NO-DISPONIBLE"),
    IN p_tec_des_ser TEXT,
    IN p_des_cir VARCHAR(100),
    IN p_res_cir VARCHAR(200),
    IN p_com_cir VARCHAR(200),
    IN p_obv_cir TEXT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

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
        des_cir,
        res_cir,
        com_cir,
        obv_cir,
        ser_cir
    ) VALUES (
        p_des_cir,
        p_res_cir,
        p_com_cir,
        p_obv_cir,
        @last_id_ser
    );

    COMMIT;

    SET autocommit = 1;
END //


CREATE PROCEDURE pets_heaven.RegisterVacuna(
    IN p_nom_vac VARCHAR(255),
    IN p_des_gen TEXT,
    IN p_des_tec TEXT,
    IN p_pre_vac DECIMAL(10,2),
    IN p_fre_vac VARCHAR(100),
    IN p_cat_vac VARCHAR(100),
    IN p_num_lot VARCHAR(255),
    IN p_fec_vec DATE,
    IN p_efe_sec VARCHAR(255),
    IN p_dos_rec VARCHAR(100),
    IN p_sta_ser ENUM('DISPONIBLE','NO-DISPONIBLE') 
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    IF (SELECT id_vac FROM vacunas WHERE lot_vac LIKE p_num_lot)
        THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este lote de vacuna ya existe';
    END IF;

    INSERT INTO servicios (
        cat_ser,
        nom_ser,
        pre_ser,
        des_ser,
        sta_ser,
        tec_des_ser
    ) VALUES (
        2, 
        p_nom_vac,
        p_pre_vac,
        p_des_gen,
        p_sta_ser,
        p_des_tec
    );

    SET @last_id_ser = LAST_INSERT_ID();

    INSERT INTO vacunas (
        nom_vac,
        efe_sec_vac,
        cat_vac,
        dos_rec_vac,
        lot_vac,
        fec_ven_vac,
        fre_vac,
        ser_vac
    ) VALUES (
        p_nom_vac,
        p_efe_sec,
        p_cat_vac, 
        p_dos_rec,
        p_num_lot, 
        p_fec_vec, 
        p_fre_vac,
        @last_id_ser
    );

    COMMIT;

    SET autocommit = 1;
END //


CREATE PROCEDURE pets_heaven.SearchVacunas()
BEGIN
    SELECT 
        v.*,
        s.id_ser,
        s.cat_ser,
        s.nom_ser,
        s.pre_ser,
        s.des_ser,
        s.sta_ser,
        s.tec_des_ser,
        cs.nom_cat 
    FROM 
        vacunas v
    JOIN 
        servicios s ON v.ser_vac = s.id_ser
    JOIN 
        categorias_ser cs ON s.cat_ser = cs.id_cat
    ORDER BY 
        v.nom_vac ASC;
END //


CREATE PROCEDURE pets_heaven.SearchCirugias()
BEGIN
    SELECT 
        ci.*,
        s.id_ser,
        s.cat_ser,  
        s.nom_ser,  
        s.pre_ser,  
        s.des_ser,  
        s.sta_ser,  
        s.tec_des_ser,
        cs.nom_cat 
    FROM 
        cirugias ci
    JOIN 
        servicios s ON ci.ser_CIR = s.id_ser
    JOIN 
        categorias_ser cs ON s.cat_ser = cs.id_cat
    LIMIT 1000;
END //


CREATE PROCEDURE pets_heaven.AbleOrDesableService(
    IN p_id_ser INT,
    IN p_or BOOLEAN
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
        pets_heaven.servicios
    SET sta_ser = CASE
        WHEN p_or THEN 'NO-DISPONIBLE'
        ELSE 'DISPONIBLE'
        END
    WHERE 
        id_ser = p_id_ser;

    COMMIT;

    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.SearchService(
    IN p_id_ser VARCHAR(100)
)
BEGIN
    IF (
        SELECT
            s.id_ser,
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
                            v.lot_vac,
                            v.fre_vac,
                            v.fec_ven_vac
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
            s.id_ser LIKE p_id_ser
        ORDER BY 
            s.nom_ser
        LIMIT 1000
    ) IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontro el servicio';
    END IF;
END //

DROP PROCEDURE `SearchService`;