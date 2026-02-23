-- PostgreSQL Procedures for PetsHeaven - Appointments (Citas)
-- Migrated from MySQL

-- Procedure to register an appointment
CREATE OR REPLACE FUNCTION pets_heaven.RegistAppointment(
    p_fec_cit DATE,
    p_hor_ini_cit TIME,
    p_hor_fin_cit TIME,
    p_con_cit VARCHAR(100),
    p_mot_cit TEXT,
    p_ser VARCHAR(100),
    p_vet VARCHAR(100),
    p_mas VARCHAR(100)
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
DECLARE
    v_id_con_cit INTEGER;
    v_id_ser INTEGER;
    v_id_vet INTEGER;
    v_id_mas INTEGER;
    v_conflicto INTEGER DEFAULT 0;
BEGIN
    -- Find consultorio
    SELECT id_con INTO v_id_con_cit FROM pets_heaven.consultorios WHERE cod_con LIKE p_con_cit LIMIT 1;
    IF v_id_con_cit IS NULL THEN
        RETURN QUERY SELECT FALSE, 'Consultorio no encontrado'::VARCHAR;
        RETURN;
    END IF;

    -- Find service category
    SELECT id_cat INTO v_id_ser FROM pets_heaven.categorias_servicios WHERE nom_cat LIKE p_ser LIMIT 1;
    IF v_id_ser IS NULL THEN
        RETURN QUERY SELECT FALSE, 'Servicio no encontrado'::VARCHAR;
        RETURN;
    END IF;

    -- Find veterinarian
    SELECT id_per INTO v_id_vet FROM pets_heaven.personas WHERE doc_per = p_vet LIMIT 1;
    IF v_id_vet IS NULL THEN
        RETURN QUERY SELECT FALSE, 'Veterinario no encontrado'::VARCHAR;
        RETURN;
    END IF;

    -- Validate mascota
    v_id_mas := CAST(p_mas AS INTEGER);
    IF NOT EXISTS (SELECT 1 FROM pets_heaven.mascotas WHERE id_mas = v_id_mas) THEN
        RETURN QUERY SELECT FALSE, 'Mascota no encontrada'::VARCHAR;
        RETURN;
    END IF;

    -- Check for scheduling conflicts
    SELECT COUNT(*) INTO v_conflicto
    FROM pets_heaven.citas
    WHERE con_cit = v_id_con_cit
      AND fec_cit = p_fec_cit
      AND (
            (hor_ini_cit < p_hor_fin_cit AND hor_fin_cit > p_hor_ini_cit)
          );

    IF v_conflicto > 0 THEN
        RETURN QUERY SELECT FALSE, 'Ya existe una cita en ese consultorio y horario'::VARCHAR;
    ELSE
        INSERT INTO pets_heaven.citas (
            fec_cit, hor_ini_cit, hor_fin_cit, mot_cit, est_cit,
            con_cit, ser_cit, vet_cit, mas_cit
        ) VALUES (
            p_fec_cit, p_hor_ini_cit, p_hor_fin_cit, COALESCE(p_mot_cit, 'No-registrado'), 'PENDIENTE',
            v_id_con_cit, v_id_ser, v_id_vet, v_id_mas
        );
        RETURN QUERY SELECT TRUE, 'Cita registrada exitosamente'::VARCHAR;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Procedure to search all appointments
CREATE OR REPLACE FUNCTION pets_heaven.SearchAllAppointments()
RETURNS TABLE(
    id_cit INTEGER,
    mas_cit INTEGER,
    fec_reg_cit DATE,
    fec_cit DATE,
    hor_ini_cit TIME,
    hor_fin_cit TIME,
    con_cit INTEGER,
    nom_con VARCHAR,
    nom_tip_ser VARCHAR,
    nom_cat VARCHAR,
    nom_ser VARCHAR,
    des_ser TEXT,
    nom_mas VARCHAR,
    esp_mas VARCHAR,
    col_mas VARCHAR,
    raz_mas VARCHAR,
    ali_mas VARCHAR,
    fec_nac_mas DATE,
    pes_mas NUMERIC,
    gen_mas VARCHAR,
    est_rep_mas VARCHAR,
    fot_mas TEXT,
    fec_cre_mas DATE,
    vet_nom_per VARCHAR,
    vet_ape_per VARCHAR,
    vet_cel_per VARCHAR,
    prop_nom_per VARCHAR,
    prop_ape_per VARCHAR,
    prop_cel_per VARCHAR,
    prop_doc_per VARCHAR,
    prop_email_per VARCHAR,
    est_cit TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id_cit,
        c.mas_cit,
        c.fec_reg_cit,
        c.fec_cit,
        c.hor_ini_cit,
        c.hor_fin_cit,
        c.con_cit,
        con.nom_con,
        ts.nom_tip_ser,
        cs.nom_cat,
        s.nom_ser,
        s.des_ser,
        m.nom_mas,
        m.esp_mas,
        m.col_mas,
        m.raz_mas,
        m.ali_mas,
        m.fec_nac_mas,
        m.pes_mas,
        m.gen_mas,
        m.est_rep_mas,
        m.fot_mas,
        m.fec_cre_mas,
        p_vet.nom_per,
        p_vet.ape_per,
        p_vet.cel_per,
        p_prop.nom_per,
        p_prop.ape_per,
        p_prop.cel_per,
        p_prop.doc_per,
        p_prop.email_per,
        c.est_cit::TEXT
    FROM 
        pets_heaven.citas c
    JOIN pets_heaven.mascotas m ON m.id_mas = c.mas_cit
    JOIN pets_heaven.servicios s ON s.id_ser = c.ser_cit
    JOIN pets_heaven.tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
    JOIN pets_heaven.categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
    JOIN pets_heaven.consultorios con ON con.id_con = c.con_cit
    JOIN pets_heaven.personas p_vet ON p_vet.id_per = c.vet_cit
    JOIN pets_heaven.personas p_prop ON p_prop.id_per = m.id_pro_mas
    WHERE c.est_cit::TEXT != 'CANCELADA'
    ORDER BY c.fec_reg_cit
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Procedure to search appointments by user
CREATE OR REPLACE FUNCTION pets_heaven.SearchAppointmentsByUser(p_by VARCHAR(100))
RETURNS TABLE(
    id_cit INTEGER,
    mas_cit INTEGER,
    fec_reg_cit DATE,
    fec_cit DATE,
    hor_ini_cit TIME,
    hor_fin_cit TIME,
    con_cit INTEGER,
    nom_con VARCHAR,
    nom_tip_ser VARCHAR,
    nom_cat VARCHAR,
    nom_ser VARCHAR,
    des_ser TEXT,
    nom_mas VARCHAR,
    esp_mas VARCHAR,
    col_mas VARCHAR,
    raz_mas VARCHAR,
    ali_mas VARCHAR,
    fec_nac_mas DATE,
    pes_mas NUMERIC,
    gen_mas VARCHAR,
    est_rep_mas VARCHAR,
    fot_mas TEXT,
    vet_nom_per VARCHAR,
    vet_ape_per VARCHAR,
    vet_cel_per VARCHAR,
    prop_nom_per VARCHAR,
    prop_ape_per VARCHAR,
    prop_cel_per VARCHAR,
    prop_doc_per VARCHAR,
    prop_email_per VARCHAR,
    est_cit TEXT
) AS $$
BEGIN
    IF NOT EXISTS (
        SELECT c.id_cit 
        FROM pets_heaven.citas c
        JOIN pets_heaven.personas p_vet ON p_vet.id_per = c.vet_cit
        WHERE c.est_cit::TEXT != 'CANCELADA'
            AND p_vet.doc_per = p_by
        LIMIT 1
    ) THEN 
        RAISE EXCEPTION 'No se encontraron citas para este usuario';
    END IF;

    RETURN QUERY
    SELECT 
        c.id_cit,
        c.mas_cit,
        c.fec_reg_cit,
        c.fec_cit,
        c.hor_ini_cit,
        c.hor_fin_cit,
        c.con_cit,
        con.nom_con,
        ts.nom_tip_ser,
        cs.nom_cat,
        s.nom_ser,
        s.des_ser,
        m.nom_mas,
        m.esp_mas,
        m.col_mas,
        m.raz_mas,
        m.ali_mas,
        m.fec_nac_mas,
        m.pes_mas,
        m.gen_mas,
        m.est_rep_mas,
        m.fot_mas,
        p_vet.nom_per,
        p_vet.ape_per,
        p_vet.cel_per,
        p_prop.nom_per,
        p_prop.ape_per,
        p_prop.cel_per,
        p_prop.doc_per,
        p_prop.email_per,
        c.est_cit::TEXT
    FROM 
        pets_heaven.citas c
    JOIN pets_heaven.mascotas m ON m.id_mas = c.mas_cit
    JOIN pets_heaven.servicios s ON s.id_ser = c.ser_cit
    JOIN pets_heaven.tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
    JOIN pets_heaven.categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
    JOIN pets_heaven.consultorios con ON con.id_con = c.con_cit
    JOIN pets_heaven.personas p_vet ON p_vet.id_per = c.vet_cit
    JOIN pets_heaven.personas p_prop ON p_prop.id_per = m.id_pro_mas
    WHERE c.est_cit::TEXT != 'CANCELADA'
        AND (
            p_vet.doc_per = p_by
            OR p_vet.email_per = p_by
            OR p_prop.doc_per = p_by
            OR p_prop.email_per = p_by
        )
    ORDER BY c.fec_reg_cit
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Procedure to search consulting rooms
CREATE OR REPLACE FUNCTION pets_heaven.SearchConsultingRooms()
RETURNS TABLE(
    id_con INTEGER,
    cod_con VARCHAR,
    nom_con VARCHAR,
    des_con TEXT,
    tip_con TEXT,
    equ_con TEXT,
    cap_con INTEGER,
    est_con BOOLEAN
) AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pets_heaven.consultorios) THEN
        RAISE EXCEPTION 'Consultorios no encontrados';
    END IF;

    RETURN QUERY
    SELECT
        c.id_con,
        c.cod_con,
        c.nom_con,
        c.des_con,
        c.tip_con::TEXT,
        c.equ_con,
        c.cap_con,
        c.est_con
    FROM pets_heaven.consultorios c
    ORDER BY c.id_con
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Procedure to cancel appointment
CREATE OR REPLACE FUNCTION pets_heaven.CancelAppointment(
    p_id_cit INTEGER,
    p_id_mas INTEGER
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pets_heaven.citas WHERE id_cit = p_id_cit) THEN
        RETURN QUERY SELECT FALSE, 'Cita no encontrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    UPDATE pets_heaven.citas
    SET est_cit = 'CANCELADA'::pets_heaven.estado_cita
    WHERE id_cit = p_id_cit 
      AND mas_cit = p_id_mas;

    RETURN QUERY SELECT TRUE, 'Cita cancelada exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;

-- Procedure to update appointment date
CREATE OR REPLACE FUNCTION pets_heaven.UpdateAppointmentDate(
    p_id_cit INTEGER,
    p_nom_mas VARCHAR(100),
    p_pro_mas VARCHAR(20),
    p_new_date DATE,
    p_new_hor_ini TIME,
    p_new_hor_fin TIME,
    p_new_con INTEGER
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
DECLARE
    p_id_mas INTEGER;
    p_id_pro_mas INTEGER;
BEGIN
    SELECT id_per INTO p_id_pro_mas FROM pets_heaven.personas WHERE doc_per = p_pro_mas;
    IF p_id_pro_mas IS NULL THEN
        RETURN QUERY SELECT FALSE, 'Propietario de mascota no encontrado en el sistema'::VARCHAR;
        RETURN;
    END IF;

    SELECT id_mas INTO p_id_mas FROM pets_heaven.mascotas WHERE nom_mas = p_nom_mas AND id_pro_mas = p_id_pro_mas;
    IF p_id_mas IS NULL THEN
        RETURN QUERY SELECT FALSE, 'Mascota no encontrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pets_heaven.citas WHERE id_cit = p_id_cit AND mas_cit = p_id_mas) THEN
        RETURN QUERY SELECT FALSE, 'Cita no encontrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    UPDATE pets_heaven.citas
    SET
        fec_cit = p_new_date,
        hor_ini_cit = p_new_hor_ini,
        hor_fin_cit = p_new_hor_fin,
        con_cit = p_new_con
    WHERE
        id_cit = p_id_cit 
        AND mas_cit = p_id_mas;

    RETURN QUERY SELECT TRUE, 'Cita actualizada exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;
