-- PostgreSQL Procedures for PetsHeaven - Global Functions
-- Migrated from MySQL

-- Login function
CREATE OR REPLACE FUNCTION public.Login(p_firstData VARCHAR(100))
RETURNS TABLE(
    nom_per VARCHAR,
    ape_per VARCHAR,
    doc_per VARCHAR,
    cont_per VARCHAR,
    fot_per TEXT,
    roles TEXT
) AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.personas WHERE email_per = p_firstData) THEN
        RAISE EXCEPTION 'Email ingresado no existe en el sistema';
    END IF;
    
    RETURN QUERY
    SELECT
        p.nom_per,
        p.ape_per,
        p.doc_per,
        p.cont_per,
        p.fot_per,
        STRING_AGG(r.nom_rol, ', ')
    FROM
        public.personas p
    JOIN
        public.otorgar_roles otr ON otr.id_per = p.id_per
    JOIN
        public.roles r ON otr.id_rol = r.id_rol
    WHERE
        p.estado = TRUE
        AND (
            p.email_per = p_firstData
            OR p.doc_per = p_firstData
        )
    GROUP BY
        p.id_per,
        p.nom_per,
        p.ape_per,
        p.doc_per,
        p.cont_per,
        p.fot_per
    ORDER BY 
        p.nom_per
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Change password function
CREATE OR REPLACE FUNCTION public.ChangePassword(
    p_email VARCHAR(100),
    p_passwd TEXT
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.personas WHERE email_per = p_email) THEN
        RETURN QUERY SELECT FALSE, 'Email ingresado no existe en el sistema'::VARCHAR;
        RETURN;
    END IF;
    
    UPDATE
        public.personas p
    SET
        cont_per = p_passwd
    WHERE
        email_per = p_email;
    
    RETURN QUERY SELECT TRUE, 'Contraseña actualizada exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;

-- Get admin statistics
CREATE OR REPLACE FUNCTION public.GetAdminStats()
RETURNS TABLE(
    doc INTEGER,
    mas INTEGER,
    cit INTEGER,
    emg INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(v.id_vet)::INTEGER,
        (SELECT COUNT(*) FROM public.mascotas m WHERE m.estado = TRUE)::INTEGER,
        (
            SELECT COUNT(*) 
            FROM public.citas c 
            WHERE c.fec_cit = CURRENT_DATE AND c.est_cit::TEXT != 'CANCELADA'
        )::INTEGER,
        (
            SELECT COUNT(*) 
            FROM public.citas c
            JOIN public.servicios s ON s.id_ser = c.ser_cit
            JOIN public.tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
            JOIN public.categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
            WHERE cs.nom_cat = 'Emergencias'
        )::INTEGER
    FROM public.veterinarios v
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Get staff statistics
CREATE OR REPLACE FUNCTION public.GetStaffStats(p_by VARCHAR(100))
RETURNS TABLE(
    doc INTEGER,
    cir_pro INTEGER,
    emg_ate INTEGER,
    con_com INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(v.id_vet)::INTEGER,
        (
            SELECT COUNT(*) 
            FROM public.citas cc
            JOIN public.servicios ccs ON cc.ser_cit = ccs.id_ser
            JOIN public.tipos_servicios tcs ON tcs.id_tip_ser = ccs.tip_ser
            JOIN public.categorias_servicios cs ON cs.id_cat = tcs.cat_tip_ser
            WHERE cc.vet_cit = v.id_vet
              AND cs.nom_cat LIKE '%Cirugía%'
        )::INTEGER,
        (
            SELECT COUNT(*) 
            FROM public.citas cc
            JOIN public.servicios ccs ON cc.ser_cit = ccs.id_ser
            JOIN public.tipos_servicios tcs ON tcs.id_tip_ser = ccs.tip_ser
            JOIN public.categorias_servicios cs ON cs.id_cat = tcs.cat_tip_ser
            WHERE cc.vet_cit = v.id_vet
              AND cs.nom_cat LIKE '%Emergencias%'
        )::INTEGER,
        (
            SELECT COUNT(*) 
            FROM public.citas cc
            JOIN public.servicios ccs ON cc.ser_cit = ccs.id_ser
            JOIN public.tipos_servicios tcs ON tcs.id_tip_ser = ccs.tip_ser
            JOIN public.categorias_servicios cs ON cs.id_cat = tcs.cat_tip_ser
            WHERE cc.vet_cit = v.id_vet
              AND cs.nom_cat LIKE '%Consulta General%'
        )::INTEGER
    FROM public.veterinarios v
    JOIN public.personas p ON v.id_vet = p.id_per
    WHERE p.doc_per LIKE p_by
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Get owner statistics
CREATE OR REPLACE FUNCTION public.GetOwnStats(p_by VARCHAR(100))
RETURNS TABLE(
    mas INTEGER,
    citas INTEGER,
    consultas INTEGER
) AS $$
DECLARE
    v_id_per INTEGER;
BEGIN
    SELECT id_per INTO v_id_per FROM public.personas WHERE doc_per = p_by LIMIT 1;

    IF v_id_per IS NULL THEN
        RAISE EXCEPTION 'No existe persona con ese documento';
    END IF;

    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM public.mascotas WHERE id_pro_mas = v_id_per)::INTEGER,
        (SELECT COUNT(*) FROM public.citas WHERE mas_cit IN (SELECT id_mas FROM public.mascotas WHERE id_pro_mas = v_id_per))::INTEGER,
        (SELECT COUNT(*) 
            FROM public.citas cc
            JOIN public.servicios ccs ON cc.ser_cit = ccs.id_ser
            JOIN public.tipos_servicios tcs ON tcs.id_tip_ser = ccs.tip_ser
            JOIN public.categorias_servicios cs ON cs.id_cat = tcs.cat_tip_ser
            WHERE cc.mas_cit IN (SELECT id_mas FROM public.mascotas WHERE id_pro_mas = v_id_per)
              AND cs.nom_cat LIKE '%Consulta General%'
        )::INTEGER;
END;
$$ LANGUAGE plpgsql;

-- Frequent pets statistics
CREATE OR REPLACE FUNCTION public.frequentPets()
RETURNS TABLE(
    raza VARCHAR,
    cantidad_mascotas BIGINT,
    edad_promedio_años NUMERIC,
    edad_minima INTEGER,
    edad_maxima INTEGER,
    especie VARCHAR,
    genero_mas_comun VARCHAR,
    estado_reproductivo_mas_comun VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.raz_mas,
        COUNT(*)::BIGINT,
        ROUND(AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, m.fec_nac_mas)))::NUMERIC, 1),
        MIN(EXTRACT(YEAR FROM AGE(CURRENT_DATE, m.fec_nac_mas)))::INTEGER,
        MAX(EXTRACT(YEAR FROM AGE(CURRENT_DATE, m.fec_nac_mas)))::INTEGER,
        m.esp_mas,
        (MODE() WITHIN GROUP (ORDER BY m.gen_mas))::VARCHAR,
        (MODE() WITHIN GROUP (ORDER BY m.est_rep_mas))::VARCHAR
    FROM 
        public.mascotas m
    WHERE 
        m.estado = TRUE
    GROUP BY 
        m.raz_mas, m.esp_mas
    ORDER BY 
        COUNT(*) DESC, AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, m.fec_nac_mas)))
    LIMIT 5;
END;
$$ LANGUAGE plpgsql;
