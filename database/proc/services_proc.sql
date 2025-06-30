-- Active: 1751161037637@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.SearchServicesCat()
BEGIN
    SELECT
        cs.nom_cat,
        cs.des_cat AS tec_des_cat,
        cs.img_cat
    FROM 
        categorias_servicios cs
    WHERE
        cs.sta_cat = 1
    ORDER BY 
        cs.nom_cat
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.SearchServices()
BEGIN
    SELECT
        s.id_ser, -- ID del servicio
        s.nom_ser, -- Nombre del servicio
        s.pre_ser, -- Precio base del servicio
        s.des_ser, -- Descripción del servicio
        s.sta_ser, -- Estado del servicio
        ts.nom_tip_ser, -- Nombre del tipo de servicio
        cs.nom_cat, -- Nombre de la categoría
        cs.img_cat, -- Imagen de la categoría
        (
            SELECT 
                GROUP_CONCAT(
                    CONCAT_WS(';',
                        p.nom_pro, -- Nombre del procedimiento
                        p.des_pro, -- Descripción del procedimiento
                        p.cat_pro, -- Categoría del procedimiento
                        p.niv_rie_pro, -- Nivel de riesgo
                        p.dur_min_pro, -- Duración mínima
                        p.pro_pro, -- Protocolo
                        p.con_esp_pro -- Consideraciones especiales
                    ) 
                    SEPARATOR '---'
                )
            FROM 
                servicios_procedimientos sp
            JOIN procedimientos p ON p.id_pro = sp.id_pro
            WHERE
                sp.id_ser = s.id_ser
        ) AS proc_ser
    FROM 
        servicios s
    JOIN tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
    JOIN categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
    WHERE
        cs.sta_cat = 1
    ORDER BY 
        s.nom_ser
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.SearchServicesBy(
    IN p_nom_cat VARCHAR(100)
)
BEGIN
    SELECT
        s.id_ser, -- ID del servicio
        s.nom_ser, -- Nombre del servicio
        s.pre_ser, -- Precio base del servicio
        s.des_ser, -- Descripción del servicio
        s.pre_act_ser, -- Precio actual del servicio
        s.sta_ser, -- Estado del servicio
        ts.nom_tip_ser, -- Nombre del tipo de servicio
        ts.des_tip_ser, -- descripción del tipo de servicio
        ts.dur_min_tip_ser, -- Duración minima del tipo de servicio
        ts.req_equ_esp, -- Rquiere equipo el tipo de servicio? 1/0
        cs.nom_cat, -- Nombre de la categoría
        cs.img_cat, -- Imagen de la categoría
        (
            SELECT 
                GROUP_CONCAT(
                    CONCAT_WS(';',
                        p.nom_pro, -- Nombre del procedimiento
                        p.des_pro, -- Descripción del procedimiento
                        p.cat_pro, -- Categoría del procedimiento
                        p.niv_rie_pro, -- Nivel de riesgo
                        p.dur_min_pro, -- Duración mínima
                        p.pro_pro, -- Protocolo
                        p.con_esp_pro -- Consideraciones especiales
                    ) 
                    SEPARATOR '---'
                )
            FROM 
                servicios_procedimientos sp
            JOIN procedimientos p ON p.id_pro = sp.id_pro
            WHERE
                sp.id_ser = s.id_ser
        ) AS proc_ser
    FROM 
        servicios s
    JOIN tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
    JOIN categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
    WHERE
        cs.nom_cat LIKE p_nom_cat
    ORDER BY 
        s.nom_ser
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.SearchService(
    IN p_id_ser INT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM servicios s
        WHERE s.id_ser = p_id_ser
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontro el servicio';
    ELSE
        SELECT
            s.id_ser,
            s.nom_ser,
            s.pre_ser,
            s.des_ser,
            s.sta_ser,
            ts.nom_tip_ser,
            cs.nom_cat,
            cs.img_cat,
            (
                SELECT 
                    GROUP_CONCAT(
                        CONCAT_WS('---',
                            p.nom_pro,
                            p.des_pro,
                            p.cat_pro,
                            p.niv_rie_pro,
                            p.dur_min_pro,
                            p.pro_pro,
                            p.con_esp_pro
                        ) 
                        SEPARATOR '; '
                    )
                FROM 
                    servicios_procedimientos sp
                JOIN procedimientos p ON p.id_pro = sp.id_pro
                WHERE sp.id_ser = s.id_ser
            ) AS procedimientos
        FROM 
            servicios s
        JOIN tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
        JOIN categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
        WHERE
            s.id_ser = p_id_ser
        LIMIT 1;
    END IF;
END //
CREATE PROCEDURE pets_heaven.RegisterService(
    IN p_tip_ser INT, -- ID del tipo de servicio
    IN p_nom_ser VARCHAR(100),
    IN p_pre_ser DECIMAL(10,2),
    IN p_des_ser TEXT,
    IN p_sta_ser ENUM('DISPONIBLE','NO_DISPONIBLE','TEMPORAL'),
    IN p_req TEXT,
    IN p_cos_est_ser DECIMAL(10,2)
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
        tip_ser,
        nom_ser,
        des_ser,
        pre_ser,
        pre_act_ser,
        cos_est_ser,
        sta_ser,
        req
    ) VALUES (
        p_tip_ser,
        p_nom_ser,
        p_des_ser,
        p_pre_ser,
        p_pre_ser,
        p_cos_est_ser,
        p_sta_ser,
        IFNULL(p_req, 'No registrado')
    );

    COMMIT;

    SET autocommit = 1;
END //
CREATE PROCEDURE pets_heaven.RegisterCirugia(
    IN p_tip_ser INT, -- ID del tipo de servicio (debe ser tipo "Cirugía")
    IN p_nom_ser VARCHAR(100),
    IN p_pre_ser DECIMAL(10,2),
    IN p_des_ser TEXT,
    IN p_sta_ser ENUM('DISPONIBLE','NO_DISPONIBLE','TEMPORAL'),
    IN p_req TEXT,
    IN p_cos_est_ser DECIMAL(10,2),
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
        tip_ser,
        nom_ser,
        des_ser,
        pre_ser,
        pre_act_ser,
        cos_est_ser,
        sta_ser,
        req
    ) VALUES (
        p_tip_ser,
        p_nom_ser,
        p_des_ser,
        p_pre_ser,
        p_pre_ser,
        p_cos_est_ser,
        p_sta_ser,
        IFNULL(p_req, 'No registrado')
    );

    SET @last_id_ser = LAST_INSERT_ID();

    INSERT INTO procedimientos (
        nom_pro,
        des_pro,
        cat_pro,
        niv_rie_pro,
        dur_min_pro,
        pro_pro,
        con_esp_pro
    ) VALUES (
        p_nom_ser, -- nombre del procedimiento igual al servicio
        p_des_cir, -- descripción del procedimiento (puedes ajustar)
        'CIRUGIA',
        NULL,
        NULL,
        NULL,
        NULL
    );

    SET @last_id_pro = LAST_INSERT_ID();

    INSERT INTO servicios_procedimientos (
        id_ser,
        id_pro,
        es_principal,
        ord_eje
    ) VALUES (
        @last_id_ser,
        @last_id_pro,
        TRUE,
        1
    );

    COMMIT;
    SET autocommit = 1;
END //
CREATE PROCEDURE pets_heaven.AbleOrDesableService(
    IN p_id_ser INT,
    IN p_nom_cat VARCHAR(100)
)
BEGIN
    DECLARE p_id_tip_ser INT;
    DECLARE p_id_cat_ser INT;
    DECLARE p_sta_ser ENUM('DISPONIBLE','NO_DISPONIBLE','TEMPORAL');
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;
    START TRANSACTION;

    -- Verifica que el servicio exista
    IF NOT EXISTS (SELECT 1 FROM servicios WHERE id_ser = p_id_ser) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontro el servicio en el sistema';
    END IF;

    -- Obtiene el tipo de servicio y la categoría
    SELECT tip_ser INTO p_id_tip_ser FROM servicios WHERE id_ser = p_id_ser;
    SELECT id_cat INTO p_id_cat_ser FROM categorias_servicios WHERE nom_cat LIKE p_nom_cat;

    -- Verifica que el tipo de servicio pertenezca a la categoría indicada
    IF NOT EXISTS (
        SELECT 1 FROM tipos_servicios 
        WHERE id_tip_ser = p_id_tip_ser AND cat_tip_ser = p_id_cat_ser
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El tipo de servicio no pertenece a la categoría indicada';
    END IF;

    -- Obtiene el estado actual del servicio
    SELECT sta_ser INTO p_sta_ser FROM servicios WHERE id_ser = p_id_ser;

    -- Cambia el estado del servicio
    IF p_sta_ser LIKE 'DISPONIBLE' THEN
        UPDATE servicios
        SET sta_ser = 'NO_DISPONIBLE'
        WHERE id_ser = p_id_ser;
    ELSE
        UPDATE servicios
        SET sta_ser = 'DISPONIBLE'
        WHERE id_ser = p_id_ser;
    END IF;

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.RegisterVacuna(
    IN p_nom_vac VARCHAR(255),
    IN p_efe_sec_vac VARCHAR(255),
    IN p_cat_vac VARCHAR(100),
    IN p_dos_rec_vac VARCHAR(100),
    IN p_lot_vac VARCHAR(255),
    IN p_fec_ven_vac DATE,
    IN p_fre_vac VARCHAR(100),
    IN p_nom_pro VARCHAR(100),
    IN p_des_pro TEXT,
    IN p_nom_cat VARCHAR(100)
)
BEGIN
    DECLARE v_id_pro INT;
    DECLARE p_cat_pro INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;
    START TRANSACTION;

    SELECT id_cat INTO p_cat_pro FROM categorias_servicios WHERE nom_cat LIKE p_nom_cat LIMIT 1;
    IF p_cat_pro IS NULL 
        THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Categoria del servicio no encontrada';
    END IF;

    -- Registrar el procedimiento si no existe
    SELECT id_pro INTO v_id_pro
    FROM procedimientos
    WHERE nom_pro = p_nom_pro AND cat_pro = p_cat_pro
    LIMIT 1;

    IF v_id_pro IS NULL THEN
        INSERT INTO procedimientos (
            nom_pro, des_pro, cat_pro
        ) VALUES (
            p_nom_pro, p_des_pro, p_cat_pro
        );
        SET v_id_pro = LAST_INSERT_ID();
    END IF;

    -- Validar lote único
    IF (SELECT COUNT(*) FROM vacunas WHERE lot_vac = p_lot_vac) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este lote de vacuna ya existe';
    END IF;

    -- Registrar la vacuna
    INSERT INTO vacunas (
        nom_vac,
        efe_sec_vac,
        cat_vac,
        dos_rec_vac,
        lot_vac,
        fec_ven_vac,
        fre_vac,
        pro_vac
    ) VALUES (
        p_nom_vac,
        p_efe_sec_vac,
        p_cat_vac,
        p_dos_rec_vac,
        p_lot_vac,
        p_fec_ven_vac,
        p_fre_vac,
        v_id_pro
    );

    COMMIT;
    SET autocommit = 1;
END //
CREATE PROCEDURE pets_heaven.ChangeVaccineState(
    IN p_id_vac INT,
    IN p_nom_vac VARCHAR(255),
    IN p_nom_cat VARCHAR(100),
    IN p_nom_pro VARCHAR(100)
)
BEGIN    
    DECLARE p_id_cat INT;
    DECLARE p_id_pro INT;
    DECLARE p_sta_vac INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;
    START TRANSACTION;

    SELECT id_cat INTO p_id_cat FROM categorias_servicios WHERE nom_cat LIKE p_nom_cat LIMIT 1;
    IF p_id_cat IS NULL 
        THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Categoria del servicio no encontrada';
    END IF;

    -- Registrar el procedimiento si no existe
    SELECT id_pro INTO p_id_pro FROM procedimientos WHERE nom_pro = p_nom_pro AND cat_pro = p_id_cat;
    IF p_id_pro IS NULL 
        THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Procedimiento del servicio no encontrado';
    END IF;

    SELECT sta_vac INTO p_sta_vac
    FROM vacunas
    WHERE 
        nom_vac LIKE p_nom_vac
        AND id_vac = p_id_vac
        AND pro_vac = p_id_pro;
    IF p_sta_vac IS NULL 
        THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Vacuna no encontrada en el sistema';
    ELSEIF (p_sta_vac = 1) THEN
        UPDATE vacunas v
        SET v.sta_vac = 0
        WHERE 
            v.nom_vac LIKE p_nom_vac
            AND pro_vac = p_id_pro
            AND id_vac = p_id_vac;
    ELSE
        UPDATE vacunas v
        SET v.sta_vac = 1
        WHERE 
            v.nom_vac LIKE p_nom_vac
            AND id_vac = p_id_vac
            AND pro_vac = p_id_pro;
    END IF;

    COMMIT;
    SET autocommit = 1;
END //
/* CREATE PROCEDURE pets_heaven.RegisterVacuna(
    IN p_tip_ser INT, -- ID del tipo de servicio (debe ser tipo "Vacuna")
    IN p_nom_ser VARCHAR(100),
    IN p_pre_ser DECIMAL(10,2),
    IN p_des_ser TEXT,
    IN p_sta_ser ENUM('DISPONIBLE','NO_DISPONIBLE','TEMPORAL'),
    IN p_req TEXT,
    IN p_cos_est_ser DECIMAL(10,2),
    IN p_nom_pro VARCHAR(100),
    IN p_des_pro TEXT,
    IN p_cat_pro ENUM('VACUNA','CIRUGIA','DIAGNOSTICO','TERAPIA'),
    IN p_dos_rec VARCHAR(100),
    IN p_lot VARCHAR(255),
    IN p_fec_ven DATE,
    IN p_fre_vac VARCHAR(100),
    IN p_efe_sec VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;
    START TRANSACTION;

    -- Validar lote único
    IF (SELECT COUNT(*) FROM vacunas WHERE lot_vac = p_lot) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este lote de vacuna ya existe';
    END IF;

    -- Registrar el servicio
    INSERT INTO servicios (
        tip_ser,
        nom_ser,
        des_ser,
        pre_ser,
        pre_act_ser,
        cos_est_ser,
        sta_ser,
        req
    ) VALUES (
        p_tip_ser,
        p_nom_ser,
        p_des_ser,
        p_pre_ser,
        p_pre_ser,
        p_cos_est_ser,
        p_sta_ser,
        IFNULL(p_req, 'No registrado')
    );

    SET @last_id_ser = LAST_INSERT_ID();

    -- Registrar el procedimiento
    INSERT INTO procedimientos (
        nom_pro,
        des_pro,
        cat_pro,
        niv_rie_pro,
        dur_min_pro,
        pro_pro,
        con_esp_pro
    ) VALUES (
        p_nom_pro,
        p_des_pro,
        p_cat_pro,
        NULL,
        NULL,
        NULL,
        NULL
    );

    SET @last_id_pro = LAST_INSERT_ID();

    -- Relacionar servicio y procedimiento
    INSERT INTO servicios_procedimientos (
        id_ser,
        id_pro,
        es_principal,
        ord_eje
    ) VALUES (
        @last_id_ser,
        @last_id_pro,
        TRUE,
        1
    );

    -- Registrar la vacuna en inventario
    INSERT INTO vacunas (
        nom_vac,
        efe_sec_vac,
        cat_vac,
        dos_rec_vac,
        lot_vac,
        fec_ven_vac,
        fre_vac,
        pro_vac
    ) VALUES (
        p_nom_pro,
        p_efe_sec,
        p_cat_pro,
        p_dos_rec,
        p_lot,
        p_fec_ven,
        p_fre_vac,
        @last_id_pro
    );

    COMMIT;
    SET autocommit = 1;
END // */

CREATE PROCEDURE pets_heaven.SearchVacunas()
BEGIN
    SELECT 
        v.*,
        p.id_pro,
        p.nom_pro,
        p.des_pro,
        s.id_ser,
        s.tip_ser,
        s.nom_ser,
        s.pre_ser,
        s.des_ser,
        s.sta_ser,
        s.req,
        ts.nom_tip_ser,
        cs.nom_cat
    FROM 
        vacunas v
    JOIN procedimientos p ON v.pro_vac = p.id_pro
    JOIN servicios_procedimientos sp ON sp.id_pro = p.id_pro
    JOIN servicios s ON sp.id_ser = s.id_ser
    JOIN tipos_servicios ts ON s.tip_ser = ts.id_tip_ser
    JOIN categorias_servicios cs ON ts.cat_tip_ser = cs.id_cat
    ORDER BY v.id_vac ASC;
END //


CREATE PROCEDURE pets_heaven.SearchVacunas()
BEGIN
    SELECT 
        v.*,
        p.id_pro,
        p.nom_pro,
        p.des_pro,
        GROUP_CONCAT(DISTINCT s.nom_ser SEPARATOR ', ') as servicios_asociados
    FROM 
        vacunas v
    JOIN procedimientos p ON v.pro_vac = p.id_pro
    LEFT JOIN servicios_procedimientos sp ON sp.id_pro = p.id_pro
    LEFT JOIN servicios s ON sp.id_ser = s.id_ser
    GROUP BY v.id_vac
    ORDER BY v.id_vac ASC;
END //
/* DROP PROCEDURE `SearchServices`; */
/* DROP PROCEDURE pets_heaven.SearchServicesBy; */
/* DROP PROCEDURE pets_heaven.AbleOrDesableService; */
/* DROP PROCEDURE pets_heaven.SearchVacunas; */
/* DROP PROCEDURE pets_heaven.RegisterVacuna; */
/* DROP PROCEDURE pets_heaven.`ChangeVaccineState`; */
/* DROP PROCEDURE pets_heaven.SearchVacunas; */

/* CALL `SearchServices`(); */
/* CALL pets_heaven.SearchServicesBy('Cirugia'); */
/* CALL pets_heaven.AbleOrDesableService('6','Cirugia'); */
/* CALL pets_heaven.SearchVacunas(); */
/* CALL pets_heaven.RegisterVacuna(''); */