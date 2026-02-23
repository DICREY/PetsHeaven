-- Active: 1770454793864@@aws-1-us-east-2.pooler.supabase.com@5432@postgres@public
-- Función para buscar categorías de servicios
CREATE OR REPLACE FUNCTION public.search_services_cat()
RETURNS TABLE (
    id_cat INT,
    nom_cat VARCHAR,
    tec_des_cat TEXT,
    img_cat TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT cs.id_cat, cs.nom_cat, cs.des_cat, cs.img_cat
    FROM categorias_servicios cs
    WHERE cs.sta_cat = TRUE
    ORDER BY cs.nom_cat
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Función para buscar tipos de servicios
CREATE OR REPLACE FUNCTION public.search_services_type()
RETURNS TABLE (
    id_tip_ser INT,
    nom_tip_ser VARCHAR,
    des_tip_ser TEXT,
    tec_des_tip_ser TEXT,
    sta_tip_ser INT,
    req_equ_esp BOOLEAN,
    dur_min_tip_ser INT,
    cat_tip_ser INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT ts.id_tip_ser, ts.nom_tip_ser, ts.des_tip_ser, ts.tec_des_tip_ser,
           ts.sta_tip_ser, ts.req_equ_esp, ts.dur_min_tip_ser, ts.cat_tip_ser
    FROM tipos_servicios ts
    WHERE ts.sta_tip_ser = 1
    ORDER BY ts.nom_tip_ser
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Función para buscar procedimientos
CREATE OR REPLACE FUNCTION public.search_procedures()
RETURNS TABLE (
    id_pro INT,
    nom_pro VARCHAR,
    des_pro TEXT,
    cat_pro INT,
    niv_rie_pro VARCHAR,
    dur_min_pro INT,
    pro_pro TEXT,
    con_esp_pro TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id_pro, p.nom_pro, p.des_pro, p.cat_pro,
           p.niv_rie_pro, p.dur_min_pro, p.pro_pro, p.con_esp_pro
    FROM procedimientos p
    ORDER BY p.nom_pro
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener tipos de pruebas
CREATE OR REPLACE FUNCTION public.get_test_types()
RETURNS TABLE (
    id_tip_pru INT,
    cod_tip_pru VARCHAR,
    nom_tip_pru VARCHAR,
    des_tip_pru TEXT,
    cat_tip_pru VARCHAR,
    met_est_tip_pru VARCHAR,
    tie_est_hrs_tip_pru INT,
    cos_est_tip_pru NUMERIC,
    ins_pre_tip_pru TEXT,
    par_ref_tip_pru TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT tp.id_tip_pru, tp.cod_tip_pru, tp.nom_tip_pru, tp.des_tip_pru,
           tp.cat_tip_pru, tp.met_est_tip_pru, tp.tie_est_hrs_tip_pru,
           tp.cos_est_tip_pru, tp.ins_pre_tip_pru, tp.par_ref_tip_pru
    FROM tipos_pruebas tp
    ORDER BY tp.id_tip_pru DESC
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Función para buscar todos los servicios
CREATE OR REPLACE FUNCTION public.search_services()
RETURNS TABLE (
    id_ser INT,
    nom_ser VARCHAR,
    pre_ser NUMERIC,
    des_ser TEXT,
    pre_act_ser NUMERIC,
    cos_est_ser NUMERIC,
    sta_ser VARCHAR,
    req TEXT,
    nom_tip_ser VARCHAR,
    des_tip_ser TEXT,
    tec_des_tip_ser TEXT,
    dur_min_tip_ser INT,
    req_equ_esp BOOLEAN,
    nom_cat VARCHAR,
    img_cat TEXT,
    proc_ser TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        s.id_ser::INT,
        s.nom_ser::VARCHAR,
        s.pre_ser::NUMERIC,
        s.des_ser::TEXT,
        s.pre_act_ser::NUMERIC,
        s.cos_est_ser::NUMERIC,
        s.sta_ser::VARCHAR,
        s.req::TEXT,
        ts.nom_tip_ser::VARCHAR,
        ts.des_tip_ser::TEXT,
        ts.tec_des_tip_ser::TEXT,
        ts.dur_min_tip_ser::INT,
        CASE
            WHEN ts.req_equ_esp IS NULL THEN NULL
            WHEN ts.req_equ_esp::TEXT IN ('1','t','true','TRUE','True') THEN TRUE
            WHEN ts.req_equ_esp::TEXT IN ('0','f','false','FALSE','False') THEN FALSE
            ELSE NULL
        END,
        cs.nom_cat::VARCHAR,
        cs.img_cat::TEXT,
        COALESCE(
            STRING_AGG(
                CONCAT_WS(';', p.nom_pro, p.des_pro, p.cat_pro::VARCHAR,
                         p.niv_rie_pro, p.dur_min_pro::VARCHAR, p.pro_pro, p.con_esp_pro),
                '---'
            ),
            ''
        )::TEXT
    FROM servicios s
    JOIN tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
    JOIN categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
    LEFT JOIN servicios_procedimientos sp ON sp.id_ser = s.id_ser
    LEFT JOIN procedimientos p ON p.id_pro = sp.id_pro
    WHERE cs.sta_cat = TRUE
    GROUP BY s.id_ser, s.nom_ser, s.pre_ser, s.des_ser, s.pre_act_ser,
             s.cos_est_ser, s.sta_ser, s.req, ts.id_tip_ser, ts.nom_tip_ser, ts.des_tip_ser,
             ts.tec_des_tip_ser, ts.dur_min_tip_ser, ts.req_equ_esp, cs.id_cat, cs.nom_cat, cs.img_cat
    ORDER BY s.nom_ser
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Función para buscar servicios por categoría
CREATE OR REPLACE FUNCTION public.search_services_by(p_nom_cat VARCHAR)
RETURNS TABLE (
    id_ser INT,
    nom_ser VARCHAR,
    pre_ser NUMERIC,
    des_ser TEXT,
    pre_act_ser NUMERIC,
    cos_est_ser NUMERIC,
    sta_ser VARCHAR,
    req TEXT,
    nom_tip_ser VARCHAR,
    des_tip_ser TEXT,
    tec_des_tip_ser TEXT,
    dur_min_tip_ser INT,
    req_equ_esp BOOLEAN,
    nom_cat VARCHAR,
    img_cat TEXT,
    proc_ser TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        s.id_ser,
        s.nom_ser,
        s.pre_ser,
        s.des_ser,
        s.pre_act_ser,
        s.cos_est_ser,
        s.sta_ser,
        s.req,
        ts.nom_tip_ser,
        ts.des_tip_ser,
        ts.tec_des_tip_ser,
        ts.dur_min_tip_ser,
        ts.req_equ_esp,
        cs.nom_cat,
        cs.img_cat,
        COALESCE(
            STRING_AGG(
                CONCAT_WS(';', p.nom_pro, p.des_pro, p.cat_pro::VARCHAR,
                         p.niv_rie_pro, p.dur_min_pro::VARCHAR, p.pro_pro, p.con_esp_pro),
                '---'
            ),
            ''
        )::TEXT
    FROM servicios s
    JOIN tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
    JOIN categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
    LEFT JOIN servicios_procedimientos sp ON sp.id_ser = s.id_ser
    LEFT JOIN procedimientos p ON p.id_pro = sp.id_pro
    WHERE cs.nom_cat ILIKE '%' || p_nom_cat || '%'
    GROUP BY s.id_ser, s.nom_ser, s.pre_ser, s.des_ser, s.pre_act_ser,
             s.cos_est_ser, s.sta_ser, s.req, ts.id_tip_ser, ts.nom_tip_ser, ts.des_tip_ser,
             ts.tec_des_tip_ser, ts.dur_min_tip_ser, ts.req_equ_esp, cs.id_cat, cs.nom_cat, cs.img_cat
    ORDER BY s.nom_ser
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Función para buscar un servicio por ID
CREATE OR REPLACE FUNCTION public.search_service(p_id_ser INT)
RETURNS TABLE (
    id_ser INT,
    nom_ser VARCHAR,
    pre_ser NUMERIC,
    des_ser TEXT,
    pre_act_ser NUMERIC,
    cos_est_ser NUMERIC,
    sta_ser VARCHAR,
    req TEXT,
    nom_tip_ser VARCHAR,
    des_tip_ser TEXT,
    tec_des_tip_ser TEXT,
    dur_min_tip_ser INT,
    req_equ_esp BOOLEAN,
    nom_cat VARCHAR,
    img_cat TEXT,
    procedimientos TEXT
) AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM servicios s WHERE s.id_ser = p_id_ser) THEN
        RAISE EXCEPTION 'No se encontro el servicio';
    END IF;

    RETURN QUERY
    SELECT
        s.id_ser,
        s.nom_ser,
        s.pre_ser,
        s.des_ser,
        s.pre_act_ser,
        s.cos_est_ser,
        s.sta_ser,
        s.req,
        ts.nom_tip_ser,
        ts.des_tip_ser,
        ts.tec_des_tip_ser,
        ts.dur_min_tip_ser,
        ts.req_equ_esp,
        cs.nom_cat,
        cs.img_cat,
        STRING_AGG(
            CONCAT_WS('---', p.nom_pro, p.des_pro, p.cat_pro::VARCHAR,
                     p.niv_rie_pro, p.dur_min_pro::VARCHAR, p.pro_pro, p.con_esp_pro),
            '; '
        )
    FROM servicios s
    JOIN tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
    JOIN categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
    LEFT JOIN servicios_procedimientos sp ON sp.id_ser = s.id_ser
    LEFT JOIN procedimientos p ON p.id_pro = sp.id_pro
    WHERE s.id_ser = p_id_ser
    GROUP BY s.id_ser, s.nom_ser, s.pre_ser, s.des_ser, s.pre_act_ser,
             s.cos_est_ser, s.sta_ser, s.req, ts.nom_tip_ser, ts.des_tip_ser,
             ts.tec_des_tip_ser, ts.dur_min_tip_ser, ts.req_equ_esp, cs.nom_cat, cs.img_cat
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Función para registrar un servicio
CREATE OR REPLACE FUNCTION public.register_service(
    p_nom_cat VARCHAR,
    p_slug_cat VARCHAR,
    p_img_cat TEXT,
    p_des_cat TEXT,
    p_col_hex VARCHAR,
    p_nom_tip_ser VARCHAR,
    p_des_tip_ser TEXT,
    p_tec_des_cat TEXT,
    p_dur_min_tip_ser INT,
    p_req_equ_esp BOOLEAN,
    p_nom_ser VARCHAR,
    p_pre_ser NUMERIC,
    p_des_ser TEXT,
    p_pre_act_ser NUMERIC,
    p_cos_est_ser NUMERIC,
    p_sta_ser VARCHAR,
    p_req TEXT,
    p_nom_pro VARCHAR,
    p_des_pro TEXT,
    p_niv_rie_pro VARCHAR,
    p_dur_min_pro INT,
    p_pro_pro TEXT,
    p_con_esp_pro TEXT
)
RETURNS TABLE (id_ser INT, id_cat INT, id_tip_ser INT, id_pro INT) AS $$
DECLARE
    v_id_cat INT;
    v_id_tip_ser INT;
    v_id_ser INT;
    v_id_pro INT;
BEGIN
    BEGIN
        -- 1. Insertar o buscar la categoría
        SELECT id_cat INTO v_id_cat FROM categorias_servicios WHERE nom_cat = p_nom_cat LIMIT 1;
        IF v_id_cat IS NULL THEN
            INSERT INTO categorias_servicios (nom_cat, slug, des_cat, col_hex, img_cat)
            VALUES (p_nom_cat, p_slug_cat, p_des_cat, p_col_hex, p_img_cat)
            RETURNING id_cat INTO v_id_cat;
        END IF;

        -- 2. Insertar o buscar el tipo de servicio
        SELECT id_tip_ser INTO v_id_tip_ser FROM tipos_servicios 
        WHERE nom_tip_ser = p_nom_tip_ser AND cat_tip_ser = v_id_cat LIMIT 1;
        IF v_id_tip_ser IS NULL THEN
            INSERT INTO tipos_servicios (cat_tip_ser, nom_tip_ser, des_tip_ser, tec_des_tip_ser, req_equ_esp, dur_min_tip_ser)
            VALUES (v_id_cat, p_nom_tip_ser, p_des_tip_ser, p_tec_des_cat, p_req_equ_esp, p_dur_min_tip_ser)
            RETURNING id_tip_ser INTO v_id_tip_ser;
        END IF;

        -- 3. Verificar si el servicio ya existe
        SELECT id_ser INTO v_id_ser FROM servicios 
        WHERE nom_ser = p_nom_ser AND tip_ser = v_id_tip_ser LIMIT 1;
        IF v_id_ser IS NULL THEN
            INSERT INTO servicios (tip_ser, nom_ser, des_ser, pre_ser, pre_act_ser, cos_est_ser, sta_ser, req)
            VALUES (v_id_tip_ser, p_nom_ser, p_des_ser, p_pre_ser, p_pre_act_ser, p_cos_est_ser, p_sta_ser, p_req)
            RETURNING id_ser INTO v_id_ser;
        END IF;

        -- 4. Verificar si el procedimiento ya existe
        SELECT id_pro INTO v_id_pro FROM procedimientos 
        WHERE nom_pro = p_nom_pro AND cat_pro = v_id_cat LIMIT 1;
        IF v_id_pro IS NULL THEN
            INSERT INTO procedimientos (nom_pro, des_pro, cat_pro, niv_rie_pro, dur_min_pro, pro_pro, con_esp_pro)
            VALUES (p_nom_pro, p_des_pro, v_id_cat, p_niv_rie_pro, p_dur_min_pro, p_pro_pro, p_con_esp_pro)
            RETURNING id_pro INTO v_id_pro;
        END IF;

        -- 5. Asociar el procedimiento al servicio
        IF NOT EXISTS (SELECT 1 FROM servicios_procedimientos WHERE id_ser = v_id_ser AND id_pro = v_id_pro) THEN
            INSERT INTO servicios_procedimientos (id_ser, id_pro, es_principal, ord_eje)
            VALUES (v_id_ser, v_id_pro, TRUE, 1);
        END IF;

        RETURN QUERY SELECT v_id_ser, v_id_cat, v_id_tip_ser, v_id_pro;
    EXCEPTION WHEN OTHERS THEN
        RAISE EXCEPTION 'Error en register_service: %', SQLERRM;
    END;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar un servicio
CREATE OR REPLACE FUNCTION public.update_service(
    p_nom_cat VARCHAR,
    p_slug_cat VARCHAR,
    p_img_cat TEXT,
    p_des_cat TEXT,
    p_col_hex VARCHAR,
    p_nom_tip_ser VARCHAR,
    p_des_tip_ser TEXT,
    p_tec_des_cat TEXT,
    p_dur_min_tip_ser INT,
    p_req_equ_esp BOOLEAN,
    p_nom_ser VARCHAR,
    p_pre_ser NUMERIC,
    p_des_ser TEXT,
    p_pre_act_ser NUMERIC,
    p_cos_est_ser NUMERIC,
    p_sta_ser VARCHAR,
    p_req TEXT,
    p_nom_pro VARCHAR,
    p_des_pro TEXT,
    p_niv_rie_pro VARCHAR,
    p_dur_min_pro INT,
    p_pro_pro TEXT,
    p_con_esp_pro TEXT
)
RETURNS TABLE (success BOOLEAN, message VARCHAR) AS $$
DECLARE
    v_id_cat INT;
    v_id_tip_ser INT;
    v_id_ser INT;
    v_id_pro INT;
BEGIN
    BEGIN
        -- 1. Buscar la categoría
        SELECT id_cat INTO v_id_cat FROM categorias_servicios WHERE nom_cat = p_nom_cat LIMIT 1;

        -- 2. Buscar el tipo de servicio
        SELECT id_tip_ser INTO v_id_tip_ser FROM tipos_servicios 
        WHERE nom_tip_ser = p_nom_tip_ser AND cat_tip_ser = v_id_cat LIMIT 1;

        -- 3. Buscar el servicio
        SELECT id_ser INTO v_id_ser FROM servicios 
        WHERE nom_ser = p_nom_ser AND tip_ser = v_id_tip_ser LIMIT 1;
        
        -- 4. Buscar el procedimiento
        SELECT id_pro INTO v_id_pro FROM procedimientos 
        WHERE nom_pro = p_nom_pro AND cat_pro = v_id_cat LIMIT 1;

        -- 1. Actualizar o insertar la categoría
        IF v_id_cat IS NULL THEN
            INSERT INTO categorias_servicios (nom_cat, slug, des_cat, col_hex, img_cat)
            VALUES (p_nom_cat, p_slug_cat, p_des_cat, p_col_hex, p_img_cat)
            RETURNING id_cat INTO v_id_cat;
        ELSE
            UPDATE categorias_servicios
            SET slug = p_slug_cat, des_cat = p_des_cat, col_hex = p_col_hex, img_cat = p_img_cat
            WHERE id_cat = v_id_cat;
        END IF;

        -- 2. Actualizar o insertar el tipo de servicio
        IF v_id_tip_ser IS NULL THEN
            INSERT INTO tipos_servicios (cat_tip_ser, nom_tip_ser, des_tip_ser, tec_des_tip_ser, req_equ_esp, dur_min_tip_ser)
            VALUES (v_id_cat, p_nom_tip_ser, p_des_tip_ser, p_tec_des_cat, p_req_equ_esp, p_dur_min_tip_ser)
            RETURNING id_tip_ser INTO v_id_tip_ser;
        ELSE
            UPDATE tipos_servicios
            SET des_tip_ser = p_des_tip_ser, tec_des_tip_ser = p_tec_des_cat, 
                req_equ_esp = p_req_equ_esp, dur_min_tip_ser = p_dur_min_tip_ser
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

        RETURN QUERY SELECT TRUE::BOOLEAN, 'Servicio actualizado correctamente'::VARCHAR;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY SELECT FALSE::BOOLEAN, SQLERRM::VARCHAR;
    END;
END;
$$ LANGUAGE plpgsql;

-- Función para habilitar/deshabilitar un servicio
CREATE OR REPLACE FUNCTION public.able_or_disable_service(p_id_ser INT, p_nom_cat VARCHAR)
RETURNS TABLE (success BOOLEAN, message VARCHAR) AS $$
DECLARE
    p_id_tip_ser INT;
    p_id_cat_ser INT;
    p_sta_ser VARCHAR;
BEGIN
    BEGIN
        -- Verifica que el servicio exista
        IF NOT EXISTS (SELECT 1 FROM servicios WHERE id_ser = p_id_ser) THEN
            RAISE EXCEPTION 'No se encontro el servicio en el sistema';
        END IF;

        -- Obtiene el tipo de servicio y la categoría
        SELECT tip_ser INTO p_id_tip_ser FROM servicios WHERE id_ser = p_id_ser;
        SELECT id_cat INTO p_id_cat_ser FROM categorias_servicios WHERE nom_cat ILIKE p_nom_cat;

        -- Verifica que el tipo de servicio pertenezca a la categoría indicada
        IF NOT EXISTS (
            SELECT 1 FROM tipos_servicios 
            WHERE id_tip_ser = p_id_tip_ser AND cat_tip_ser = p_id_cat_ser
        ) THEN
            RAISE EXCEPTION 'El tipo de servicio no pertenece a la categoría indicada';
        END IF;

        -- Obtiene el estado actual del servicio
        SELECT sta_ser INTO p_sta_ser FROM servicios WHERE id_ser = p_id_ser;

        -- Cambia el estado del servicio
        IF p_sta_ser = 'DISPONIBLE' THEN
            UPDATE servicios SET sta_ser = 'NO_DISPONIBLE' WHERE id_ser = p_id_ser;
        ELSE
            UPDATE servicios SET sta_ser = 'DISPONIBLE' WHERE id_ser = p_id_ser;
        END IF;

        RETURN QUERY SELECT TRUE::BOOLEAN, 'Estado del servicio actualizado'::VARCHAR;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY SELECT FALSE::BOOLEAN, SQLERRM::VARCHAR;
    END;
END;
$$ LANGUAGE plpgsql;

-- Función para registrar una vacuna
CREATE OR REPLACE FUNCTION public.register_vacuna(
    p_nom_vac VARCHAR,
    p_efe_sec_vac VARCHAR,
    p_cat_vac VARCHAR,
    p_dos_rec_cac_vac VARCHAR,
    p_dos_rec_adu_vac VARCHAR,
    p_dos_rec_adu_jov_vac VARCHAR,
    p_lot_vac VARCHAR,
    p_fec_ven_vac DATE,
    p_fec_cre_vac DATE,
    p_fre_vac INT,
    p_des_vac TEXT,
    p_pre_vac NUMERIC,
    p_nom_pro VARCHAR,
    p_des_pro TEXT,
    p_nom_cat VARCHAR
)
RETURNS TABLE (id_vac INT, message VARCHAR) AS $$
DECLARE
    v_id_pro INT;
    p_cat_pro INT;
BEGIN
    BEGIN
        SELECT id_cat INTO p_cat_pro FROM categorias_servicios WHERE nom_cat ILIKE p_nom_cat LIMIT 1;
        IF p_cat_pro IS NULL THEN
            RAISE EXCEPTION 'Categoria del servicio no encontrada';
        END IF;

        SELECT id_pro INTO v_id_pro
        FROM procedimientos
        WHERE nom_pro = p_nom_pro AND cat_pro = p_cat_pro
        LIMIT 1;

        -- Registrar el procedimiento si no existe
        IF v_id_pro IS NULL THEN
            INSERT INTO procedimientos (nom_pro, des_pro, cat_pro)
            VALUES (p_nom_pro, p_des_pro, p_cat_pro)
            RETURNING id_pro INTO v_id_pro;
        END IF;

        -- Validar lote único
        IF (SELECT COUNT(*) FROM vacunas WHERE lot_vac = p_lot_vac) > 0 THEN
            RAISE EXCEPTION 'Este lote de vacuna ya existe';
        END IF;

        -- Registrar la vacuna
        INSERT INTO vacunas (
            nom_vac, efe_sec_vac, cat_vac, dos_rec_cac_vac, dos_rec_adu_vac,
            dos_rec_adu_jov_vac, lot_vac, fec_ven_vac, fec_cre_vac, fre_vac,
            des_vac, pre_vac, pro_vac
        ) VALUES (
            p_nom_vac, p_efe_sec_vac, p_cat_vac, p_dos_rec_cac_vac, p_dos_rec_adu_vac,
            p_dos_rec_adu_jov_vac, p_lot_vac, p_fec_ven_vac, p_fec_cre_vac, p_fre_vac,
            p_des_vac, p_pre_vac, v_id_pro
        )
        RETURNING id_vac INTO v_id_pro;

        RETURN QUERY SELECT v_id_pro::INT, 'Vacuna registrada correctamente'::VARCHAR;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY SELECT NULL::INT, SQLERRM::VARCHAR;
    END;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar vacuna y procedimiento
CREATE OR REPLACE FUNCTION public.update_vaccine_and_procedure(
    p_id_vac INT,
    p_nom_vac VARCHAR,
    p_efe_sec_vac VARCHAR,
    p_cat_vac VARCHAR,
    p_dos_rec_cac_vac VARCHAR,
    p_dos_rec_adu_vac VARCHAR,
    p_dos_rec_adu_jov_vac VARCHAR,
    p_lot_vac VARCHAR,
    p_fec_ven_vac DATE,
    p_fec_cre_vac DATE,
    p_fre_vac INT,
    p_des_vac TEXT,
    p_pre_vac NUMERIC,
    p_nom_pro VARCHAR,
    p_des_pro TEXT
)
RETURNS TABLE (success BOOLEAN, message VARCHAR) AS $$
DECLARE
    v_id_pro INT;
BEGIN
    BEGIN
        -- Obtener el id_pro asociado a la vacuna
        SELECT pro_vac INTO v_id_pro FROM vacunas WHERE id_vac = p_id_vac;

        IF v_id_pro IS NULL THEN
            RAISE EXCEPTION 'Vacuna no encontrada o sin procedimiento asociado';
        END IF;

        -- Actualizar la vacuna
        UPDATE vacunas
        SET nom_vac = p_nom_vac,
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

        -- Actualizar el procedimiento asociado si se envían los datos
        IF p_nom_pro IS NOT NULL OR p_des_pro IS NOT NULL THEN
            UPDATE procedimientos
            SET nom_pro = COALESCE(p_nom_pro, nom_pro),
                des_pro = COALESCE(p_des_pro, des_pro)
            WHERE id_pro = v_id_pro;
        END IF;

        RETURN QUERY SELECT TRUE::BOOLEAN, 'Vacuna actualizada correctamente'::VARCHAR;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY SELECT FALSE::BOOLEAN, SQLERRM::VARCHAR;
    END;
END;
$$ LANGUAGE plpgsql;

-- Función para cambiar el estado de una vacuna
CREATE OR REPLACE FUNCTION public.change_vaccine_state(
    p_id_vac INT,
    p_nom_vac VARCHAR,
    p_nom_cat VARCHAR,
    p_nom_pro VARCHAR
)
RETURNS TABLE (success BOOLEAN, message VARCHAR) AS $$
DECLARE
    p_id_cat INT;
    p_id_pro INT;
    p_sta_vac INT;
BEGIN
    BEGIN
        SELECT id_cat INTO p_id_cat FROM categorias_servicios WHERE nom_cat ILIKE p_nom_cat LIMIT 1;
        IF p_id_cat IS NULL THEN
            RAISE EXCEPTION 'Categoria del servicio no encontrada';
        END IF;

        -- Registrar el procedimiento si no existe
        SELECT id_pro INTO p_id_pro FROM procedimientos 
        WHERE nom_pro = p_nom_pro AND cat_pro = p_id_cat;
        IF p_id_pro IS NULL THEN
            RAISE EXCEPTION 'Procedimiento del servicio no encontrado';
        END IF;

        SELECT sta_vac INTO p_sta_vac
        FROM vacunas
        WHERE nom_vac ILIKE p_nom_vac
            AND id_vac = p_id_vac
            AND pro_vac = p_id_pro;
            
        IF p_sta_vac IS NULL THEN
            RAISE EXCEPTION 'Vacuna no encontrada en el sistema';
        ELSIF p_sta_vac = 1 THEN
            UPDATE vacunas SET sta_vac = 0
            WHERE nom_vac ILIKE p_nom_vac
                AND pro_vac = p_id_pro
                AND id_vac = p_id_vac;
        ELSE
            UPDATE vacunas SET sta_vac = 1
            WHERE nom_vac ILIKE p_nom_vac
                AND id_vac = p_id_vac
                AND pro_vac = p_id_pro;
        END IF;

        RETURN QUERY SELECT TRUE::BOOLEAN, 'Estado de la vacuna actualizado'::VARCHAR;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY SELECT FALSE::BOOLEAN, SQLERRM::VARCHAR;
    END;
END;
$$ LANGUAGE plpgsql;

-- Función para buscar todas las vacunas
CREATE OR REPLACE FUNCTION public.search_vacunas()
RETURNS TABLE (
    id_vac INT,
    nom_vac VARCHAR,
    efe_sec_vac VARCHAR,
    cat_vac VARCHAR,
    dos_rec_cac_vac VARCHAR,
    dos_rec_adu_vac VARCHAR,
    dos_rec_adu_jov_vac VARCHAR,
    lot_vac VARCHAR,
    fec_ven_vac DATE,
    fec_cre_vac DATE,
    fre_vac INT,
    des_vac TEXT,
    pre_vac NUMERIC,
    pro_vac INT,
    sta_vac INT,
    id_pro INT,
    nom_pro VARCHAR,
    des_pro TEXT,
    dur_min_pro INT,
    niv_rie_pro VARCHAR,
    pro_pro TEXT,
    con_esp_pro TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id_vac,
        v.nom_vac,
        v.efe_sec_vac,
        v.cat_vac,
        v.dos_rec_cac_vac,
        v.dos_rec_adu_vac,
        v.dos_rec_adu_jov_vac,
        v.lot_vac,
        v.fec_ven_vac,
        v.fec_cre_vac,
        v.fre_vac,
        v.des_vac,
        v.pre_vac,
        v.pro_vac,
        v.sta_vac,
        p.id_pro,
        p.nom_pro,
        p.des_pro,
        p.dur_min_pro,
        p.niv_rie_pro,
        p.pro_pro,
        p.con_esp_pro
    FROM vacunas v
    JOIN procedimientos p ON v.pro_vac = p.id_pro
    ORDER BY v.id_vac ASC;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener pruebas de laboratorio
CREATE OR REPLACE FUNCTION public.get_laboratory_tests()
RETURNS TABLE (
    id_pru_lab INT,
    cod_ord_pru_lab VARCHAR,
    nom_mas VARCHAR,
    esp_mas VARCHAR,
    raz_mas VARCHAR,
    gen_mas VARCHAR,
    fec_nac_mas DATE,
    nom_vet_sol VARCHAR,
    ape_vet_sol VARCHAR,
    nom_vet_rev VARCHAR,
    ape_vet_rev VARCHAR,
    nom_tip_pru VARCHAR,
    cod_tip_pru VARCHAR,
    cat_tip_pru VARCHAR,
    des_tip_pru TEXT,
    met_est_tip_pru VARCHAR,
    tie_est_hrs_tip_pru INT,
    cos_est_tip_pru NUMERIC,
    ins_pre_tip_pru TEXT,
    par_ref_tip_pru TEXT,
    fec_sol_pru_lab TIMESTAMP,
    fec_mue_pru_lab TIMESTAMP,
    fec_pro_pru_lab TIMESTAMP,
    fec_res_pru_lab TIMESTAMP,
    est_pru_lab VARCHAR,
    pri_pru_lab VARCHAR,
    cos_fin_pru_lab NUMERIC,
    obs_mue_pru_lab TEXT,
    res_pru_lab TEXT,
    cos_est_ser NUMERIC,
    pre_act_ser NUMERIC,
    pre_ser NUMERIC,
    req TEXT,
    nom_ser VARCHAR,
    des_ser TEXT,
    proc_ser TEXT
) AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.pruebas_laboratorio) THEN
        RAISE EXCEPTION 'No se encontraron pruebas de laboratorio registradas';
    END IF;

    RETURN QUERY
    SELECT
        pl.id_pru_lab,
        pl.cod_ord_pru_lab,
        m.nom_mas,
        m.esp_mas,
        m.raz_mas,
        m.gen_mas,
        m.fec_nac_mas,
        psol.nom_per,
        psol.ape_per,
        prev.nom_per,
        prev.ape_per,
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
        STRING_AGG(
            CONCAT_WS(';', p.nom_pro, p.des_pro, p.cat_pro::VARCHAR,
                     p.niv_rie_pro, p.dur_min_pro::VARCHAR, p.pro_pro, p.con_esp_pro),
            '---'
        )
    FROM public.pruebas_laboratorio pl
    INNER JOIN public.tipos_pruebas tp ON pl.id_tip_pru_lab = tp.id_tip_pru
    LEFT JOIN public.mascotas m ON pl.id_mas_pru_lab = m.id_mas
    LEFT JOIN public.veterinarios vsol ON pl.id_vet_sol_pru_lab = vsol.id_vet
    LEFT JOIN public.personas psol ON vsol.id_vet = psol.id_per
    LEFT JOIN public.veterinarios vrev ON pl.id_vet_rev_pru_lab = vrev.id_vet
    LEFT JOIN public.personas prev ON vrev.id_vet = prev.id_per
    LEFT JOIN public.servicios s ON pl.id_ser_pru_lab = s.id_ser
    LEFT JOIN public.servicios_procedimientos sp ON sp.id_ser = s.id_ser
    LEFT JOIN public.procedimientos p ON p.id_pro = sp.id_pro
    GROUP BY pl.id_pru_lab, pl.cod_ord_pru_lab, m.nom_mas, m.esp_mas, m.raz_mas, m.gen_mas,
             m.fec_nac_mas, psol.nom_per, psol.ape_per, prev.nom_per, prev.ape_per,
             tp.nom_tip_pru, tp.cod_tip_pru, tp.cat_tip_pru, tp.des_tip_pru,
             tp.met_est_tip_pru, tp.tie_est_hrs_tip_pru, tp.cos_est_tip_pru,
             tp.ins_pre_tip_pru, tp.par_ref_tip_pru, pl.fec_sol_pru_lab, pl.fec_mue_pru_lab,
             pl.fec_pro_pru_lab, pl.fec_res_pru_lab, pl.est_pru_lab, pl.pri_pru_lab,
             pl.cos_fin_pru_lab, pl.obs_mue_pru_lab, pl.res_pru_lab, s.cos_est_ser,
             s.pre_act_ser, s.pre_ser, s.req, s.nom_ser, s.des_ser
    ORDER BY pl.fec_sol_pru_lab DESC
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Función para registrar una prueba de laboratorio
CREATE OR REPLACE FUNCTION public.register_lab_test(
    p_cod_ord_pru_lab VARCHAR,
    p_nom_mas VARCHAR,
    p_doc_vet_sol VARCHAR,
    p_nom_tip_pru VARCHAR,
    p_cod_tip_pru VARCHAR,
    p_cat_tip_pru VARCHAR,
    p_des_tip_pru TEXT,
    p_met_est_tip_pru VARCHAR,
    p_tie_est_hrs_tip_pru INT,
    p_cos_est_tip_pru NUMERIC,
    p_ins_pre_tip_pru TEXT,
    p_par_ref_tip_pru TEXT,
    p_nom_pro VARCHAR,
    p_des_pro TEXT,
    p_cat_pro VARCHAR,
    p_niv_rie_pro VARCHAR,
    p_dur_min_pro INT,
    p_pro_pro TEXT,
    p_con_esp_pro TEXT,
    p_nom_ser VARCHAR,
    p_fec_sol_pru_lab TIMESTAMP,
    p_fec_mue_pru_lab TIMESTAMP,
    p_fec_pro_pru_lab TIMESTAMP,
    p_fec_res_pru_lab TIMESTAMP,
    p_est_pru_lab VARCHAR,
    p_pri_pru_lab VARCHAR,
    p_obs_mue_pru_lab TEXT,
    p_cos_fin_pru_lab NUMERIC,
    p_res_pru_lab TEXT,
    p_doc_vet_rev VARCHAR
)
RETURNS TABLE (success BOOLEAN, message VARCHAR, id_pru_lab INT) AS $$
DECLARE
    v_id_mas INT;
    v_id_vet_sol INT;
    v_id_tip_pru INT;
    v_id_ser INT;
    v_id_vet_rev INT;
    v_id_pro INT;
    v_id_cat_pro INT;
    v_exists INT DEFAULT 0;
    v_new_id INT;
BEGIN
    BEGIN
        -- Buscar o registrar el procedimiento si es necesario
        IF p_nom_pro IS NOT NULL AND p_nom_pro <> '' THEN
            SELECT id_cat INTO v_id_cat_pro FROM categorias_servicios WHERE nom_cat = p_cat_pro LIMIT 1;
            IF v_id_cat_pro IS NULL THEN
                INSERT INTO categorias_servicios (nom_cat, slug) 
                VALUES (p_cat_pro, LOWER(REPLACE(p_cat_pro, ' ', '-')))
                RETURNING id_cat INTO v_id_cat_pro;
            END IF;

            SELECT id_pro INTO v_id_pro FROM procedimientos 
            WHERE nom_pro = p_nom_pro AND cat_pro = v_id_cat_pro LIMIT 1;
            IF v_id_pro IS NULL THEN
                INSERT INTO procedimientos (nom_pro, des_pro, cat_pro, niv_rie_pro, dur_min_pro, pro_pro, con_esp_pro)
                VALUES (p_nom_pro, p_des_pro, v_id_cat_pro, p_niv_rie_pro, p_dur_min_pro, p_pro_pro, p_con_esp_pro)
                RETURNING id_pro INTO v_id_pro;
            END IF;
        ELSE
            v_id_pro := NULL;
        END IF;

        -- Buscar o registrar el tipo de prueba
        SELECT id_tip_pru INTO v_id_tip_pru FROM tipos_pruebas WHERE nom_tip_pru = p_nom_tip_pru LIMIT 1;
        IF v_id_tip_pru IS NULL THEN
            INSERT INTO tipos_pruebas (cod_tip_pru, nom_tip_pru, des_tip_pru, cat_tip_pru, 
                                       met_est_tip_pru, tie_est_hrs_tip_pru, cos_est_tip_pru, 
                                       ins_pre_tip_pru, par_ref_tip_pru)
            VALUES (p_cod_tip_pru, p_nom_tip_pru, p_des_tip_pru, p_cat_tip_pru, 
                   p_met_est_tip_pru, p_tie_est_hrs_tip_pru, p_cos_est_tip_pru, 
                   p_ins_pre_tip_pru, p_par_ref_tip_pru)
            RETURNING id_tip_pru INTO v_id_tip_pru;
        END IF;

        -- Buscar IDs por nombre
        SELECT id_mas INTO v_id_mas FROM mascotas WHERE nom_mas = p_nom_mas LIMIT 1;
        SELECT v.id_vet INTO v_id_vet_sol FROM veterinarios v 
        JOIN personas p ON v.id_vet = p.id_per WHERE p.doc_per = p_doc_vet_sol LIMIT 1;
        SELECT id_ser INTO v_id_ser FROM servicios WHERE nom_ser = p_nom_ser LIMIT 1;
        SELECT v.id_vet INTO v_id_vet_rev FROM veterinarios v 
        JOIN personas p ON v.id_vet = p.id_per WHERE p.doc_per = p_doc_vet_rev LIMIT 1;

        -- Verificar si ya existe la prueba de laboratorio
        SELECT COUNT(*) INTO v_exists FROM pruebas_laboratorio WHERE cod_ord_pru_lab = p_cod_ord_pru_lab;
        IF v_exists > 0 THEN
            RAISE EXCEPTION 'Ya existe una prueba de laboratorio con ese código de orden';
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
        )
        RETURNING id_pru_lab INTO v_new_id;

        RETURN QUERY SELECT TRUE::BOOLEAN, 'Prueba de laboratorio registrada correctamente'::VARCHAR, v_new_id::INT;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY SELECT FALSE::BOOLEAN, SQLERRM::VARCHAR, NULL::INT;
    END;
END;
$$ LANGUAGE plpgsql;

/* Call Functions */
/* SELECT public.search_services(); */
/* SELECT public.search_services_cat(); */

/* Delete Functions  */
/* DROP FUNCTION public.search_services; */