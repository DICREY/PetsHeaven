-- Active: 1746130779175@@127.0.0.1@3306@pets_heaven
-- Crear procedimiento para buscar todas las categorías de servicios
CREATE PROCEDURE pets_heaven.SearchServicesCat()
BEGIN
    SELECT
        cs.id_cat,
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
CREATE PROCEDURE pets_heaven.SearchServicesType()
BEGIN
    SELECT
        ts.id_tip_ser,
        ts.nom_tip_ser,
        ts.des_tip_ser,
        ts.tec_des_tip_ser,
        ts.sta_tip_ser,
        ts.req_equ_esp,
        ts.dur_min_tip_ser,
        ts.cat_tip_ser
    FROM 
        tipos_servicios ts
    WHERE
        ts.sta_tip_ser = 1
    ORDER BY 
        ts.nom_tip_ser
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.SearchProcedures()
BEGIN
    SELECT
        p.id_pro,
        p.nom_pro,
        p.des_pro,
        p.cat_pro,
        p.niv_rie_pro,
        p.dur_min_pro,
        p.pro_pro,
        p.con_esp_pro
    FROM
        procedimientos p
    ORDER BY
        p.nom_pro
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.GetTestTypes()
BEGIN
    SELECT
        tp.*
    FROM
        tipos_pruebas tp
    ORDER BY
        tp.id_tip_pru DESC
    LIMIT 1000;
END //
-- Crear procedimiento para buscar todos los servicios
CREATE PROCEDURE pets_heaven.SearchServices()
BEGIN
    SELECT
        s.id_ser, -- ID del servicio
        s.nom_ser, -- Nombre del servicio
        s.pre_ser, -- Precio base del servicio
        s.des_ser, -- Descripción del servicio
        s.pre_act_ser, -- Precio actual del servicio
        s.cos_est_ser, -- Costo estimado del servicio
        s.sta_ser, -- Estado del servicio
        s.req, -- Requerimientos del servicio
        ts.nom_tip_ser, -- Nombre del tipo de servicio
        ts.des_tip_ser, -- descripción del tipo de servicio
        ts.tec_des_tip_ser, -- descripción tecnica del tipo de servicio
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
        cs.sta_cat = 1
    ORDER BY 
        s.nom_ser
    LIMIT 1000;
END //
-- Crear procedimiento para buscar servicios por categoría
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
        s.cos_est_ser, -- Costo estimado del servicio
        s.sta_ser, -- Estado del servicio
        s.req, -- Requerimientos del servicio
        ts.nom_tip_ser, -- Nombre del tipo de servicio
        ts.des_tip_ser, -- descripción del tipo de servicio
        ts.tec_des_tip_ser, -- descripción tecnica del tipo de servicio
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
-- Crear procedimiento para buscar un servicio por ID
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
            s.id_ser, -- ID del servicio
            s.nom_ser, -- Nombre del servicio
            s.pre_ser, -- Precio base del servicio
            s.des_ser, -- Descripción del servicio
            s.pre_act_ser, -- Precio actual del servicio
            s.cos_est_ser, -- Costo estimado del servicio
            s.sta_ser, -- Estado del servicio
            s.req, -- Requerimientos del servicio
            ts.nom_tip_ser,
            ts.des_tip_ser,
            ts.tec_des_tip_ser,
            ts.dur_min_tip_ser,
            ts.req_equ_esp,
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
-- Crear procedimiento para registrar un servicio
CREATE PROCEDURE pets_heaven.RegisterService(
    IN p_nom_cat VARCHAR(100),
    IN p_slug_cat VARCHAR(100),
    IN p_img_cat TEXT,
    IN p_des_cat TEXT,
    IN p_col_hex VARCHAR(7),
    IN p_nom_tip_ser VARCHAR(100),
    IN p_des_tip_ser TEXT,
    IN p_tec_des_cat TEXT,
    IN p_dur_min_tip_ser INT,
    IN p_req_equ_esp BOOLEAN,
    IN p_nom_ser VARCHAR(100),
    IN p_pre_ser DECIMAL(10,2),
    IN p_des_ser TEXT,
    IN p_pre_act_ser DECIMAL(10,2),
    IN p_cos_est_ser DECIMAL(10,2),
    IN p_sta_ser ENUM('DISPONIBLE','NO_DISPONIBLE','TEMPORAL'),
    IN p_req TEXT,
    IN p_nom_pro VARCHAR(100),
    IN p_des_pro TEXT,
    IN p_niv_rie_pro ENUM('BAJO', 'MODERADO', 'ALTO', 'CRITICO'),
    IN p_dur_min_pro INT,
    IN p_pro_pro TEXT,
    IN p_con_esp_pro TEXT
)
BEGIN
    DECLARE v_id_cat INT;
    DECLARE v_id_tip_ser INT;
    DECLARE v_id_ser INT;
    DECLARE v_id_pro INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;
    START TRANSACTION;

    -- 1. Insertar o buscar la categoría
    SELECT id_cat INTO v_id_cat FROM categorias_servicios WHERE nom_cat = p_nom_cat LIMIT 1;
    IF v_id_cat IS NULL THEN
        INSERT INTO categorias_servicios (nom_cat, slug, des_cat, col_hex, img_cat)
        VALUES (p_nom_cat, p_slug_cat, p_des_cat, p_col_hex, p_img_cat);
        SET v_id_cat = LAST_INSERT_ID();
    END IF;

    -- 2. Insertar o buscar el tipo de servicio
    SELECT id_tip_ser INTO v_id_tip_ser FROM tipos_servicios WHERE nom_tip_ser = p_nom_tip_ser AND cat_tip_ser = v_id_cat LIMIT 1;
    IF v_id_tip_ser IS NULL THEN
        INSERT INTO tipos_servicios (cat_tip_ser, nom_tip_ser, des_tip_ser, tec_des_cat, req_equ_esp, dur_min_tip_ser)
        VALUES (v_id_cat, p_nom_tip_ser, p_des_tip_ser, p_tec_des_cat, p_req_equ_esp, p_dur_min_tip_ser);
        SET v_id_tip_ser = LAST_INSERT_ID();
    END IF;

    -- 3. verificar si el servicio ya existe
    SELECT id_ser INTO v_id_ser FROM servicios WHERE nom_ser = p_nom_ser AND tip_ser = v_id_tip_ser LIMIT 1;
    IF v_id_ser IS NULL THEN
        INSERT INTO servicios (
            tip_ser, nom_ser, des_ser, pre_ser, pre_act_ser, cos_est_ser, sta_ser, req
        ) VALUES (
            v_id_tip_ser, p_nom_ser, p_des_ser, p_pre_ser, p_pre_act_ser, p_cos_est_ser, p_sta_ser, p_req
        );
        SET v_id_ser = LAST_INSERT_ID();
    END IF;

    -- 3. verificar si el procedimiento ya existe
    SELECT id_pro INTO v_id_pro FROM procedimientos WHERE nom_pro = p_nom_pro AND cat_pro = v_id_cat LIMIT 1;
    IF v_id_pro IS NULL THEN
        INSERT INTO procedimientos (
            nom_pro, des_pro, cat_pro, niv_rie_pro, dur_min_pro, pro_pro, con_esp_pro
        ) VALUES (
            p_nom_pro, p_des_pro, v_id_cat, p_niv_rie_pro, p_dur_min_pro, p_pro_pro, p_con_esp_pro
        );
        SET v_id_pro = LAST_INSERT_ID();
    END IF;

    -- 5. Asociar el procedimiento al servicio
    IF NOT EXISTS (
        SELECT 1 FROM servicios_procedimientos WHERE id_ser = v_id_ser AND id_pro = v_id_pro
    ) THEN
        INSERT INTO servicios_procedimientos (
            id_ser, id_pro, es_principal, ord_eje
        ) VALUES (
            v_id_ser, v_id_pro, TRUE, 1
        );
    END IF;

    COMMIT;
    SET autocommit = 1;
END //
CREATE PROCEDURE pets_heaven.UpdateService(
    IN p_nom_cat VARCHAR(100),
    IN p_slug_cat VARCHAR(100),
    IN p_img_cat TEXT,
    IN p_des_cat TEXT,
    IN p_col_hex VARCHAR(7),
    IN p_nom_tip_ser VARCHAR(100),
    IN p_des_tip_ser TEXT,
    IN p_tec_des_cat TEXT,
    IN p_dur_min_tip_ser INT,
    IN p_req_equ_esp BOOLEAN,
    IN p_nom_ser VARCHAR(100),
    IN p_pre_ser DECIMAL(10,2),
    IN p_des_ser TEXT,
    IN p_pre_act_ser DECIMAL(10,2),
    IN p_cos_est_ser DECIMAL(10,2),
    IN p_sta_ser ENUM('DISPONIBLE','NO_DISPONIBLE','TEMPORAL'),
    IN p_req TEXT,
    IN p_nom_pro VARCHAR(100),
    IN p_des_pro TEXT,
    IN p_niv_rie_pro ENUM('BAJO', 'MODERADO', 'ALTO', 'CRITICO'),
    IN p_dur_min_pro INT,
    IN p_pro_pro TEXT,
    IN p_con_esp_pro TEXT
)
BEGIN
    DECLARE v_id_cat INT;
    DECLARE v_id_tip_ser INT;
    DECLARE v_id_ser INT;
    DECLARE v_id_pro INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;
    START TRANSACTION;

    -- 1. Buscar la categoría
    SELECT id_cat INTO v_id_cat FROM categorias_servicios WHERE nom_cat = p_nom_cat LIMIT 1;

    -- 2. Buscar el tipo de servicio
    SELECT id_tip_ser INTO v_id_tip_ser FROM tipos_servicios WHERE nom_tip_ser = p_nom_tip_ser AND cat_tip_ser = v_id_cat LIMIT 1;

    -- 3. Buscar el servicio
    SELECT id_ser INTO v_id_ser FROM servicios WHERE nom_ser = p_nom_ser AND tip_ser = v_id_tip_ser LIMIT 1;

    -- 4. Buscar el procedimiento
    SELECT id_pro INTO v_id_pro FROM procedimientos WHERE nom_pro = p_nom_pro AND cat_pro = v_id_cat LIMIT 1;

    -- 1. Actualizar o insertar la categoría
    IF v_id_cat IS NULL THEN
        INSERT INTO categorias_servicios (nom_cat, slug, des_cat, col_hex, img_cat)
        VALUES (p_nom_cat, p_slug_cat, p_des_cat, p_col_hex, p_img_cat);
        SET v_id_cat = LAST_INSERT_ID();
    ELSE
        UPDATE categorias_servicios
        SET slug = p_slug_cat, des_cat = p_des_cat, col_hex = p_col_hex, img_cat = p_img_cat
        WHERE id_cat = v_id_cat;
    END IF;

    -- 2. Actualizar o insertar el tipo de servicio
    IF v_id_tip_ser IS NULL THEN
        INSERT INTO tipos_servicios (cat_tip_ser, nom_tip_ser, des_tip_ser, tec_des_tip_ser, req_equ_esp, dur_min_tip_ser)
        VALUES (v_id_cat, p_nom_tip_ser, p_des_tip_ser, p_tec_des_cat, p_req_equ_esp, p_dur_min_tip_ser);
        SET v_id_tip_ser = LAST_INSERT_ID();
    ELSE
        UPDATE tipos_servicios
        SET des_tip_ser = p_des_tip_ser, tec_des_cat = p_tec_des_cat, req_equ_esp = p_req_equ_esp, dur_min_tip_ser = p_dur_min_tip_ser
        WHERE id_tip_ser = v_id_tip_ser;
    END IF;

    -- 3. Actualizar el servicio
    IF v_id_ser IS NOT NULL THEN
        UPDATE servicios
        SET tip_ser = v_id_tip_ser,
            nom_ser = p_nom_ser,
            des_ser = p_des_ser,
            pre_ser = p_pre_ser,
            pre_act_ser = p_pre_act_ser,
            cos_est_ser = p_cos_est_ser,
            sta_ser = p_sta_ser,
            req = p_req
        WHERE id_ser = v_id_ser;
    END IF;

    -- 4. Actualizar el procedimiento principal
    IF v_id_pro IS NOT NULL THEN
        UPDATE procedimientos
        SET nom_pro = p_nom_pro,
            des_pro = p_des_pro,
            cat_pro = v_id_cat,
            niv_rie_pro = p_niv_rie_pro,
            dur_min_pro = p_dur_min_pro,
            pro_pro = p_pro_pro,
            con_esp_pro = p_con_esp_pro
        WHERE id_pro = v_id_pro;
    END IF;

    COMMIT;
    SET autocommit = 1;
END //

DELIMITER ;
-- Crear procedimiento para habilitar o deshabilitar un servicio
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
-- Crear procedimiento para registrar una vacuna
CREATE PROCEDURE pets_heaven.RegisterVacuna(
    IN p_nom_vac VARCHAR(255),
    IN p_efe_sec_vac VARCHAR(255),
    IN p_cat_vac VARCHAR(100),
    IN p_dos_rec_cac_vac VARCHAR(100),
    IN p_dos_rec_adu_vac VARCHAR(100),
    IN p_dos_rec_adu_jov_vac VARCHAR(100),
    IN p_lot_vac VARCHAR(255),
    IN p_fec_ven_vac DATE,
    IN p_fec_cre_vac DATE,
    IN p_fre_vac INT,
    IN p_des_vac TEXT,
    IN p_pre_vac DECIMAL(10,2),
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

    SELECT id_pro INTO v_id_pro
    FROM procedimientos
    WHERE nom_pro = p_nom_pro AND cat_pro = p_cat_pro
    LIMIT 1;

    -- Registrar el procedimiento si no existe
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
        dos_rec_cac_vac,
        dos_rec_adu_vac,
        dos_rec_adu_jov_vac,
        lot_vac,
        fec_ven_vac,
        fec_cre_vac,
        fre_vac,
        des_vac,
        pre_vac,
        pro_vac
    ) VALUES (
        p_nom_vac,
        p_efe_sec_vac,
        p_cat_vac,
        p_dos_rec_cac_vac,
        p_dos_rec_adu_vac,
        p_dos_rec_adu_jov_vac,
        p_lot_vac,
        p_fec_ven_vac,
        p_fec_cre_vac,
        p_fre_vac,
        p_des_vac,
        p_pre_vac,
        v_id_pro
    );

    COMMIT;
    SET autocommit = 1;
END //
-- Crear procedimiento para actualizar una vacuna y su procedimiento asociado
CREATE PROCEDURE pets_heaven.UpdateVaccineAndProcedure(
    IN p_id_vac INT,
    IN p_nom_vac VARCHAR(255),
    IN p_efe_sec_vac VARCHAR(255),
    IN p_cat_vac VARCHAR(100),
    IN p_dos_rec_cac_vac VARCHAR(100),
    IN p_dos_rec_adu_vac VARCHAR(100),
    IN p_dos_rec_adu_jov_vac VARCHAR(100),
    IN p_lot_vac VARCHAR(255),
    IN p_fec_ven_vac DATE,
    IN p_fec_cre_vac DATE,
    IN p_fre_vac INT,
    IN p_des_vac TEXT,
    IN p_pre_vac DECIMAL(10,2),
    IN p_nom_pro VARCHAR(100),
    IN p_des_pro TEXT
)
BEGIN
    DECLARE v_id_pro INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;
    START TRANSACTION;

    -- Obtener el id_pro asociado a la vacuna
    SELECT pro_vac INTO v_id_pro FROM vacunas WHERE id_vac = p_id_vac;

    IF v_id_pro IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Vacuna no encontrada o sin procedimiento asociado';
    END IF;

    -- Actualizar la vacuna
    UPDATE vacunas
    SET
        nom_vac = p_nom_vac,
        efe_sec_vac = p_efe_sec_vac,
        cat_vac = p_cat_vac,
        dos_rec_cac_vac = p_dos_rec_cac_vac,
        dos_rec_adu_vac = p_dos_rec_adu_vac,
        dos_rec_adu_jov_vac = p_dos_rec_adu_jov_vac,
        lot_vac = p_lot_vac,
        fec_ven_vac = p_fec_ven_vac,
        fec_cre_vac = p_fec_cre_vac,
        fre_vac = p_fre_vac,
        des_vac = p_des_vac,
        pre_vac = p_pre_vac
    WHERE id_vac = p_id_vac;

    -- Actualizar el procedimiento asociado si se envian los datos
    IF p_nom_pro IS NOT NULL OR p_des_pro IS NOT NULL THEN
        UPDATE procedimientos
        SET
            nom_pro = p_nom_pro,
            des_pro = p_des_pro
        WHERE id_pro = v_id_pro;
    END IF;

    COMMIT;
    SET autocommit = 1;
END //
-- Crear procedimiento para cambiar el estado de una vacuna
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
-- Crear procedimiento para buscar todas las vacunas
CREATE PROCEDURE pets_heaven.SearchVacunas()
BEGIN
    SELECT 
        v.*,
        p.id_pro,
        p.nom_pro,
        p.des_pro,
        p.dur_min_pro,
        p.niv_rie_pro,
        p.pro_pro,
        p.con_esp_pro
    FROM 
        vacunas v
    JOIN procedimientos p ON v.pro_vac = p.id_pro
    ORDER BY v.id_vac ASC;
END //

CREATE PROCEDURE pets_heaven.GetLaboratoryTests()
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pets_heaven.pruebas_laboratorio) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontraron pruebas de laboratorio registradas';
    END IF;

    SELECT
        pl.id_pru_lab,
        pl.cod_ord_pru_lab,
        m.nom_mas,
        m.esp_mas,
        m.raz_mas,
        m.gen_mas,
        m.fec_nac_mas,
        psol.nom_per AS nom_vet_sol,
        psol.ape_per AS ape_vet_sol,
        prev.nom_per AS nom_vet_rev,
        prev.ape_per AS ape_vet_rev,
        tp.nom_tip_pru,
        tp.cod_tip_pru,
        tp.cat_tip_pru,
        tp.des_tip_pru,
        tp.met_est_tip_pru,
        tp.tie_est_hrs_tip_pru,
        tp.cos_est_tip_pru,
        tp.ins_pre_tip_pru,
        tp.par_ref_tip_pru,
        pl.fec_sol_pru_lab,
        pl.fec_mue_pru_lab,
        pl.fec_pro_pru_lab,
        pl.fec_res_pru_lab,
        pl.est_pru_lab,
        pl.pri_pru_lab,
        pl.cos_fin_pru_lab,
        pl.obs_mue_pru_lab,
        pl.res_pru_lab,
        s.cos_est_ser,
        s.pre_act_ser,
        s.pre_ser,
        s.req,
        s.nom_ser,
        s.des_ser,
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
        pets_heaven.pruebas_laboratorio pl
    INNER JOIN 
        pets_heaven.tipos_pruebas tp ON pl.id_tip_pru_lab = tp.id_tip_pru
    LEFT JOIN 
        pets_heaven.mascotas m ON pl.id_mas_pru_lab = m.id_mas
    LEFT JOIN 
        pets_heaven.veterinarios vsol ON pl.id_vet_sol_pru_lab = vsol.id_vet
    LEFT JOIN 
        pets_heaven.personas psol ON vsol.id_vet = psol.id_per
    LEFT JOIN 
        pets_heaven.veterinarios vrev ON pl.id_vet_rev_pru_lab = vrev.id_vet
    LEFT JOIN 
        pets_heaven.personas prev ON vrev.id_vet = prev.id_per
    LEFT JOIN 
        pets_heaven.servicios s ON pl.id_ser_pru_lab = s.id_ser
    ORDER BY 
        pl.fec_sol_pru_lab DESC
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.RegisterLabTest(
    IN p_cod_ord_pru_lab VARCHAR(20),
    IN p_nom_mas VARCHAR(100),
    IN p_doc_vet_sol VARCHAR(100),
    IN p_nom_tip_pru VARCHAR(100),
    IN p_cod_tip_pru VARCHAR(20),
    IN p_cat_tip_pru VARCHAR(100),
    IN p_des_tip_pru TEXT,
    IN p_met_est_tip_pru VARCHAR(100),
    IN p_tie_est_hrs_tip_pru INT,
    IN p_cos_est_tip_pru DECIMAL(10,2),
    IN p_ins_pre_tip_pru TEXT,
    IN p_par_ref_tip_pru TEXT,
    IN p_nom_pro VARCHAR(100),
    IN p_des_pro TEXT,
    IN p_cat_pro VARCHAR(100),
    IN p_niv_rie_pro ENUM('BAJO', 'MODERADO', 'ALTO', 'CRITICO'),
    IN p_dur_min_pro INT,
    IN p_pro_pro TEXT,
    IN p_con_esp_pro TEXT,
    IN p_nom_ser VARCHAR(100),
    IN p_fec_sol_pru_lab DATETIME,
    IN p_fec_mue_pru_lab DATETIME,
    IN p_fec_pro_pru_lab DATETIME,
    IN p_fec_res_pru_lab DATETIME,
    IN p_est_pru_lab ENUM('REGISTRADO', 'MUESTRA_TOMADA', 'EN_PROCESO', 'COMPLETADO', 'ENTREGADO', 'CANCELADO'),
    IN p_pri_pru_lab ENUM('ROUTINA', 'URGENTE', 'STAT'),
    IN p_obs_mue_pru_lab TEXT,
    IN p_cos_fin_pru_lab DECIMAL(10,2),
    IN p_res_pru_lab TEXT,
    IN p_doc_vet_rev VARCHAR(100)
)
BEGIN
    DECLARE v_id_mas INT;
    DECLARE v_id_vet_sol INT;
    DECLARE v_id_tip_pru INT;
    DECLARE v_id_ser INT;
    DECLARE v_id_vet_rev INT;
    DECLARE v_id_pro INT;
    DECLARE v_id_cat_pro INT;
    DECLARE v_exists INT DEFAULT 0;

    -- Buscar o registrar el procedimiento si es necesario
    IF p_nom_pro IS NOT NULL AND p_nom_pro <> '' THEN
        -- Buscar la categoría del procedimiento
        SELECT id_cat INTO v_id_cat_pro FROM categorias_servicios WHERE nom_cat = p_cat_pro LIMIT 1;
        IF v_id_cat_pro IS NULL THEN
            INSERT INTO categorias_servicios (nom_cat, slug) VALUES (p_cat_pro, LOWER(REPLACE(p_cat_pro, ' ', '-')));
            SET v_id_cat_pro = LAST_INSERT_ID();
        END IF;

        -- Buscar o registrar el procedimiento
        SELECT id_pro INTO v_id_pro FROM procedimientos WHERE nom_pro = p_nom_pro AND cat_pro = v_id_cat_pro LIMIT 1;
        IF v_id_pro IS NULL THEN
            INSERT INTO procedimientos (nom_pro, des_pro, cat_pro, niv_rie_pro, dur_min_pro, pro_pro, con_esp_pro)
            VALUES (p_nom_pro, p_des_pro, v_id_cat_pro, p_niv_rie_pro, p_dur_min_pro, p_pro_pro, p_con_esp_pro);
            SET v_id_pro = LAST_INSERT_ID();
        END IF;
    ELSE
        SET v_id_pro = NULL;
    END IF;

    -- Buscar o registrar el tipo de prueba
    SELECT id_tip_pru INTO v_id_tip_pru FROM tipos_pruebas WHERE nom_tip_pru = p_nom_tip_pru LIMIT 1;
    IF v_id_tip_pru IS NULL THEN
        INSERT INTO tipos_pruebas (
            cod_tip_pru, nom_tip_pru, des_tip_pru, cat_tip_pru, met_est_tip_pru, tie_est_hrs_tip_pru, cos_est_tip_pru, ins_pre_tip_pru, par_ref_tip_pru
        ) VALUES (
            p_cod_tip_pru, p_nom_tip_pru, p_des_tip_pru, p_cat_tip_pru, p_met_est_tip_pru, p_tie_est_hrs_tip_pru, p_cos_est_tip_pru, p_ins_pre_tip_pru, p_par_ref_tip_pru
        );
        SET v_id_tip_pru = LAST_INSERT_ID();
    END IF;

    -- Buscar IDs por nombre
    SELECT id_mas INTO v_id_mas FROM mascotas WHERE nom_mas = p_nom_mas LIMIT 1;
    SELECT v.id_vet INTO v_id_vet_sol FROM veterinarios v JOIN personas p ON v.id_vet = p.id_per WHERE p.doc_per = p_doc_vet_sol LIMIT 1;
    SELECT id_ser INTO v_id_ser FROM servicios WHERE nom_ser = p_nom_ser LIMIT 1;
    SELECT v.id_vet INTO v_id_vet_rev FROM veterinarios v JOIN personas p ON v.id_vet = p.id_per WHERE p.doc_per = p_doc_vet_rev LIMIT 1;

    -- Verificar si ya existe la prueba de laboratorio con el mismo código de orden
    SELECT COUNT(*) INTO v_exists FROM pruebas_laboratorio WHERE cod_ord_pru_lab = p_cod_ord_pru_lab;
    IF v_exists > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe una prueba de laboratorio con ese código de orden';
    END IF;

    -- Insertar la prueba de laboratorio
    INSERT INTO pruebas_laboratorio (
        cod_ord_pru_lab, id_mas_pru_lab, id_vet_sol_pru_lab, id_tip_pru_lab, id_ser_pru_lab,
        fec_sol_pru_lab, fec_mue_pru_lab, fec_pro_pru_lab, fec_res_pru_lab,
        est_pru_lab, pri_pru_lab, obs_mue_pru_lab, cos_fin_pru_lab, res_pru_lab, id_vet_rev_pru_lab
    ) VALUES (
        p_cod_ord_pru_lab, v_id_mas, v_id_vet_sol, v_id_tip_pru, v_id_ser,
        p_fec_sol_pru_lab, p_fec_mue_pru_lab, p_fec_pro_pru_lab, p_fec_res_pru_lab,
        p_est_pru_lab, p_pri_pru_lab, p_obs_mue_pru_lab, p_cos_fin_pru_lab, p_res_pru_lab, v_id_vet_rev
    );
END //

/* DROP PROCEDURE pets_heaven.`SearchService`; */
/* DROP PROCEDURE pets_heaven.`SearchServices`; */
/* DROP PROCEDURE pets_heaven.SearchServicesBy; */
/* DROP PROCEDURE pets_heaven.SearchVacunas; */
/* DROP PROCEDURE pets_heaven.SearchVacunas; */
/* DROP PROCEDURE pets_heaven.`SearchProcedures`; */
/* DROP PROCEDURE pets_heaven.`SearchServicesCat`; */
/* DROP PROCEDURE pets_heaven.`SearchServicesType`; */
/* DROP PROCEDURE pets_heaven.`RegisterService`; */
/* DROP PROCEDURE pets_heaven.RegisterVacuna; */
/* DROP PROCEDURE pets_heaven.`RegisterLabTest`; */
/* DROP PROCEDURE pets_heaven.`GetLaboratoryTests`; */
/* DROP PROCEDURE pets_heaven.`GetTestTypes`; */
/* DROP PROCEDURE pets_heaven.`UpdateVaccineAndProcedure`; */
/* DROP PROCEDURE pets_heaven.`ChangeVaccineState`; */
/* DROP PROCEDURE pets_heaven.AbleOrDesableService; */

/* CALL pets_heaven.`SearchServices`(); */
/* CALL pets_heaven.SearchServicesType(); */
/* CALL pets_heaven.SearchServicesBy('Cirugia'); */
/* CALL pets_heaven.SearchVacunas(); */
/* CALL pets_heaven.`GetLaboratoryTests`(); */
/* CALL pets_heaven.AbleOrDesableService('6','Cirugia'); */
/* CALL pets_heaven.GetTestTypes(); */

/* CALL pets_heaven.UpdateVaccineAndProcedure('1', 'Vacuna Actualizada', 'Efecto Secundario', 'Categoria', 'Dosis Recomendada', 'Lote', '2025-12-31', '2022-12-31', 30, 'Descripcion', 100.00, 'Procedimiento Actualizado', 'Descripcion del Procedimiento'); */
/* CALL pets_heaven.RegisterVacuna(
    'Vacuna de Prueba',
    'Efecto Secundario de Prueba',
    'Categoria de Prueba',
    'Dosis Recomendada de Prueba',
    'Lote12345',
    '2025-12-31',
    '2022-12-31',
    30,
    'Descripcion de la vacuna de prueba',
    100.00,
    'Procedimiento de Prueba',
    'Descripcion del Procedimiento de Prueba',
    'Vacunacion'
); */