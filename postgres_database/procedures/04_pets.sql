-- PostgreSQL Procedures for PetsHeaven - Pets (Mascotas)
-- Migrated from MySQL

-- Register new pet
CREATE OR REPLACE FUNCTION public.RegistPets(
    p_nom_mas VARCHAR(100),
    p_esp_mas VARCHAR(100),
    p_col_mas VARCHAR(100),
    p_raz_mas VARCHAR(100),
    p_ali_mas VARCHAR(100),
    p_fec_nac_mas DATE,
    p_pes_mas NUMERIC,
    p_persona VARCHAR(100),
    p_gen_mas VARCHAR(20),
    p_est_rep_mas VARCHAR(50),
    p_fot_mas TEXT
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
DECLARE
    p_id_pro_mas INTEGER;
BEGIN
    SELECT p.id_per INTO p_id_pro_mas 
    FROM public.personas p 
    WHERE p.doc_per = p_persona
        OR p.email_per = p_persona;

    IF p_id_pro_mas IS NULL THEN 
        RETURN QUERY SELECT FALSE, 'Esta persona no esta registrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    INSERT INTO public.mascotas (nom_mas, esp_mas, col_mas, raz_mas, ali_mas, fec_nac_mas, pes_mas, gen_mas, id_pro_mas, est_rep_mas, fot_mas)
    VALUES(p_nom_mas, p_esp_mas, p_col_mas, p_raz_mas, p_ali_mas, p_fec_nac_mas, p_pes_mas, p_gen_mas, p_id_pro_mas, p_est_rep_mas, p_fot_mas);

    RETURN QUERY SELECT TRUE, 'Mascota registrada exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;

-- Modify pet information
CREATE OR REPLACE FUNCTION public.ModifyPets(
    p_nom_mas VARCHAR(100),
    p_esp_mas VARCHAR(100),
    p_col_mas VARCHAR(100),
    p_raz_mas VARCHAR(100),
    p_ali_mas VARCHAR(100),
    p_fec_nac_mas DATE,
    p_pes_mas NUMERIC,
    p_persona VARCHAR(100),
    p_gen_mas VARCHAR(20),
    p_est_rep_mas VARCHAR(50),
    p_fot_mas TEXT
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
DECLARE
    p_id_pro_mas INTEGER;
    p_img_mas TEXT;
BEGIN
    p_img_mas := p_fot_mas;

    SELECT id_per INTO p_id_pro_mas FROM public.personas WHERE doc_per = p_persona;

    IF p_id_pro_mas IS NULL THEN 
        RETURN QUERY SELECT FALSE, 'Esta persona no esta registrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    IF NOT EXISTS (SELECT id_mas FROM public.mascotas WHERE nom_mas = p_nom_mas) THEN 
        RETURN QUERY SELECT FALSE, 'Esta mascota no esta registrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    p_img_mas := COALESCE(p_img_mas, 'No-registrado');

    UPDATE
        public.mascotas m
    SET 
        esp_mas = p_esp_mas,
        col_mas = p_col_mas,
        raz_mas = p_raz_mas,
        ali_mas = p_ali_mas,
        fec_nac_mas = p_fec_nac_mas,
        pes_mas = p_pes_mas,
        gen_mas = p_gen_mas,
        est_rep_mas = p_est_rep_mas,
        fot_mas = p_img_mas
    WHERE
        m.estado = TRUE
        AND m.nom_mas = p_nom_mas
        AND m.id_pro_mas = p_id_pro_mas;

    RETURN QUERY SELECT TRUE, 'Mascota actualizada exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;

-- Search all pets
CREATE OR REPLACE FUNCTION public.SearchPets()
RETURNS TABLE(
    id_mas INTEGER,
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
    nom_per VARCHAR,
    ape_per VARCHAR,
    doc_per VARCHAR,
    cel_per VARCHAR,
    email_per VARCHAR,
    gen_per VARCHAR,
    estado_persona BOOLEAN,
    ultima_cita DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        m.id_mas,
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
        p.nom_per,
        p.ape_per,
        p.doc_per,
        p.cel_per,
        p.email_per,
        p.gen_per,
        p.estado,
        (
            SELECT c.fec_cit 
            FROM public.citas c
            WHERE c.mas_cit = m.id_mas
                AND c.est_cit::TEXT = 'REALIZADO'
            ORDER BY c.fec_cit DESC
            LIMIT 1
        )
    FROM 
        public.mascotas m
    JOIN
        public.personas p ON p.id_per = m.id_pro_mas
    WHERE 
        m.estado = TRUE
        AND p.estado = TRUE
    ORDER BY 
        m.fec_cre_mas
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Search pets by criteria
CREATE OR REPLACE FUNCTION public.SearchPetsBy(
    p_by VARCHAR(100),
    p_second_by VARCHAR(100) DEFAULT NULL
)
RETURNS TABLE(
    id_mas INTEGER,
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
    nom_per VARCHAR,
    ape_per VARCHAR,
    doc_per VARCHAR,
    cel_per VARCHAR,
    email_per VARCHAR,
    gen_per VARCHAR,
    estado_persona BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        m.id_mas,
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
        p.nom_per,
        p.ape_per,
        p.doc_per,
        p.cel_per,
        p.email_per,
        p.gen_per,
        p.estado
    FROM 
        public.mascotas m
    JOIN
        public.personas p ON p.id_per = m.id_pro_mas
    WHERE 
        m.estado = TRUE
        AND p.estado = TRUE
        AND (
            m.nom_mas LIKE p_by
            OR m.raz_mas LIKE p_by
            OR m.esp_mas LIKE p_by
            OR p.nom_per LIKE p_by
            OR (p.email_per LIKE p_by AND m.nom_mas LIKE COALESCE(p_second_by, m.nom_mas))
            OR (p.doc_per LIKE p_by AND m.nom_mas LIKE COALESCE(p_second_by, m.nom_mas))
        )
    ORDER BY m.nom_mas
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Search single pet
CREATE OR REPLACE FUNCTION public.SearchPetBy(p_by VARCHAR(100))
RETURNS TABLE(
    id_mas INTEGER,
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
    nom_per VARCHAR,
    ape_per VARCHAR,
    doc_per VARCHAR,
    cel_per VARCHAR,
    email_per VARCHAR,
    gen_per VARCHAR,
    estado_persona BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        m.id_mas,
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
        p.nom_per,
        p.ape_per,
        p.doc_per,
        p.cel_per,
        p.email_per,
        p.gen_per,
        p.estado
    FROM 
        public.mascotas m
    JOIN
        public.personas p ON p.id_per = m.id_pro_mas
    WHERE 
        m.estado = TRUE
        AND p.estado = TRUE
        AND (
            m.nom_mas LIKE p_by
            OR m.raz_mas LIKE p_by
            OR m.esp_mas LIKE p_by
            OR p.nom_per LIKE p_by
            OR p.email_per LIKE p_by
            OR p.doc_per LIKE p_by
        )
    ORDER BY m.nom_mas
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Delete/deactivate pet
CREATE OR REPLACE FUNCTION public.DeletePetBy(
    p_first_by VARCHAR(100),
    p_second_by VARCHAR(100)
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
DECLARE
    p_sta_mas BOOLEAN;
    p_id_per INTEGER;
BEGIN
    SELECT id_per INTO p_id_per FROM public.personas WHERE doc_per = p_first_by;
    IF p_id_per IS NULL THEN 
        RETURN QUERY SELECT FALSE, 'Esta persona no esta registrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    SELECT estado INTO p_sta_mas FROM public.mascotas WHERE nom_mas = p_second_by AND id_pro_mas = p_id_per;
    IF p_sta_mas IS NULL THEN 
        RETURN QUERY SELECT FALSE, 'Esta mascota no esta registrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    UPDATE 
        public.mascotas m
    SET 
        estado = NOT p_sta_mas
    WHERE 
        m.nom_mas = p_second_by
        AND m.id_pro_mas = p_id_per;

    RETURN QUERY SELECT TRUE, 'Mascota actualizada exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;
