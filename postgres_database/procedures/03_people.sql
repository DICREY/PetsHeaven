-- PostgreSQL Procedures for PetsHeaven - People (Personas)
-- Migrated from MySQL

-- Register new person
CREATE OR REPLACE FUNCTION public.RegistPeoples(
    p_nom_per VARCHAR(100),
    p_ape_per VARCHAR(100),
    p_fec_nac_per DATE,
    p_tip_doc_per VARCHAR(10),
    p_doc_per VARCHAR(20),
    p_dir_per VARCHAR(100),
    p_cel_per VARCHAR(20),
    p_cel2_per VARCHAR(20),
    p_email_per VARCHAR(100),
    p_cont_per VARCHAR(255),
    p_gen_per VARCHAR(20),
    p_img_per VARCHAR(255) DEFAULT NULL
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
DECLARE
    p_id_persona INTEGER;
    p_id_rol INTEGER;
    img_per VARCHAR(255);
BEGIN
    IF EXISTS(SELECT id_per FROM public.personas WHERE doc_per = p_doc_per) THEN 
        RETURN QUERY SELECT FALSE, 'Este numero de documento ya esta registrado en el sistema'::VARCHAR;
        RETURN;
    END IF;

    IF EXISTS(SELECT id_per FROM public.personas WHERE email_per = p_email_per) THEN 
        RETURN QUERY SELECT FALSE, 'Este correo electrónico ya esta registrado en el sistema'::VARCHAR;
        RETURN;
    END IF;

    img_per := COALESCE(p_img_per, 'No-registrado');

    INSERT INTO public.personas (
        nom_per, ape_per, fec_nac_per, tip_doc_per, doc_per, dir_per, cel_per, cel2_per, email_per, cont_per, gen_per, fot_per
    )
    VALUES (
        p_nom_per, p_ape_per, p_fec_nac_per, p_tip_doc_per, p_doc_per, p_dir_per, p_cel_per, p_cel2_per, p_email_per, p_cont_per, p_gen_per, img_per
    );

    p_id_persona := LASTVAL();

    SELECT id_rol INTO p_id_rol FROM public.roles WHERE nom_rol = 'Usuario';

    INSERT INTO public.otorgar_roles(id_per, id_rol, fec_oto)
    VALUES (p_id_persona, p_id_rol, CURRENT_DATE);

    RETURN QUERY SELECT TRUE, 'Persona registrada exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;

-- Assign admin role
CREATE OR REPLACE FUNCTION public.AssignRolAdmin(p_doc VARCHAR(100))
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
DECLARE
    p_id_per INTEGER;
    p_id_rol INTEGER;
    p_id_rol_sec INTEGER;
BEGIN
    SELECT id_per INTO p_id_per FROM public.personas WHERE doc_per = p_doc;
    IF p_id_per IS NULL THEN 
        RETURN QUERY SELECT FALSE, 'No se encontro a esta persona'::VARCHAR;
        RETURN;
    END IF;

    SELECT id_rol INTO p_id_rol FROM public.roles WHERE nom_rol LIKE 'Administrador';
    SELECT id_rol INTO p_id_rol_sec FROM public.roles WHERE nom_rol LIKE 'Veterinario';

    IF EXISTS (SELECT 1 FROM public.otorgar_roles WHERE id_per = p_id_per AND id_rol = p_id_rol) THEN
        RETURN QUERY SELECT FALSE, 'Esta persona ya tiene este Rol'::VARCHAR;
        RETURN;
    END IF;

    INSERT INTO public.otorgar_roles(id_per, id_rol, fec_oto)
    VALUES (p_id_per, p_id_rol, CURRENT_DATE);

    IF NOT EXISTS (SELECT 1 FROM public.otorgar_roles WHERE id_per = p_id_per AND id_rol = p_id_rol_sec) THEN
        INSERT INTO public.otorgar_roles(id_per, id_rol, fec_oto)
        VALUES (p_id_per, p_id_rol_sec, CURRENT_DATE);
    END IF;

    RETURN QUERY SELECT TRUE, 'Rol asignado exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;

-- Assign veterinarian role
CREATE OR REPLACE FUNCTION public.AssignRolStaff(
    p_doc VARCHAR(100),
    p_esp VARCHAR(100),
    p_hor VARCHAR(100),
    p_num_tar VARCHAR(100),
    p_fot_tar TEXT
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
DECLARE
    p_id_per INTEGER;
    p_id_rol INTEGER;
BEGIN
    SELECT id_per INTO p_id_per FROM public.personas WHERE doc_per = p_doc;
    IF p_id_per IS NULL THEN 
        RETURN QUERY SELECT FALSE, 'No se encontro a esta persona'::VARCHAR;
        RETURN;
    END IF;

    SELECT id_rol INTO p_id_rol FROM public.roles WHERE nom_rol LIKE 'Veterinario';

    IF EXISTS (SELECT 1 FROM public.otorgar_roles WHERE id_per = p_id_per AND id_rol = p_id_rol) THEN
        RETURN QUERY SELECT FALSE, 'Esta persona ya tiene este Rol'::VARCHAR;
        RETURN;
    END IF;

    INSERT INTO public.otorgar_roles(id_per, id_rol, fec_oto)
    VALUES (p_id_per, p_id_rol, CURRENT_DATE);

    INSERT INTO public.veterinarios (id_vet, especialidad, horarios, num_tar_vet, fot_tar_vet)
    VALUES (p_id_per, p_esp, p_hor, p_num_tar, p_fot_tar);

    RETURN QUERY SELECT TRUE, 'Rol asignado exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;

-- Modify person information
CREATE OR REPLACE FUNCTION public.ModifyPeople(
    p_nom_per VARCHAR(100),
    p_ape_per VARCHAR(100),
    p_fec_nac_per DATE,
    p_doc_per VARCHAR(20),
    p_dir_per VARCHAR(100),
    p_cel_per VARCHAR(20),
    p_cel2_per VARCHAR(20),
    p_email_per VARCHAR(100),
    p_gen_per VARCHAR(20),
    p_img_per TEXT DEFAULT NULL
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
DECLARE
    img_per TEXT;
BEGIN
    img_per := COALESCE(p_img_per, 'No-registrado');

    IF (SELECT id_per FROM public.personas WHERE doc_per = p_doc_per) IS NULL THEN 
        RETURN QUERY SELECT FALSE, 'Esta persona no esta registrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    UPDATE 
        public.personas p
    SET
        nom_per = p_nom_per,
        ape_per = p_ape_per,
        fec_nac_per = p_fec_nac_per,
        dir_per = p_dir_per,
        cel_per = p_cel_per,
        cel2_per = p_cel2_per,
        email_per = p_email_per,
        gen_per = p_gen_per,
        fot_per = img_per
    WHERE
        doc_per = p_doc_per;

    RETURN QUERY SELECT TRUE, 'Persona actualizada exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;

-- Search people by criteria
CREATE OR REPLACE FUNCTION public.SearchPeopleBy(p_by VARCHAR(100))
RETURNS TABLE(
    nom_per VARCHAR,
    ape_per VARCHAR,
    fec_nac_per DATE,
    tip_doc_per VARCHAR,
    doc_per VARCHAR,
    dir_per VARCHAR,
    cel_per VARCHAR,
    cel2_per VARCHAR,
    email_per VARCHAR,
    cont_per VARCHAR,
    gen_per VARCHAR,
    fec_cre_per DATE,
    fot_per TEXT,
    roles TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.nom_per,
        p.ape_per,
        p.fec_nac_per,
        p.tip_doc_per,
        p.doc_per,
        p.dir_per,
        p.cel_per,
        p.cel2_per,
        p.email_per,
        p.cont_per,
        p.gen_per,
        p.fec_cre_per,
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
            p.doc_per = p_by
            OR p.email_per LIKE p_by
        )
    GROUP BY p.id_per
    ORDER BY p.id_per
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Search people with multiple criteria
CREATE OR REPLACE FUNCTION public.SearchPeoplesBy(p_by VARCHAR(100))
RETURNS TABLE(
    nom_per VARCHAR,
    ape_per VARCHAR,
    fec_nac_per DATE,
    tip_doc_per VARCHAR,
    doc_per VARCHAR,
    dir_per VARCHAR,
    cel_per VARCHAR,
    cel2_per VARCHAR,
    email_per VARCHAR,
    cont_per VARCHAR,
    gen_per VARCHAR,
    fec_cre_per DATE,
    fot_per TEXT,
    roles TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.nom_per,
        p.ape_per,
        p.fec_nac_per,
        p.tip_doc_per,
        p.doc_per,
        p.dir_per,
        p.cel_per,
        p.cel2_per,
        p.email_per,
        p.cont_per,
        p.gen_per,
        p.fec_cre_per,
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
            r.nom_rol = p_by
            OR p.nom_per ILIKE '%' || p_by || '%'
            OR p.ape_per ILIKE '%' || p_by || '%'
            OR p.doc_per LIKE '%' || p_by || '%'
            OR p.email_per LIKE '%' || p_by || '%'
            OR p.gen_per LIKE '%' || p_by || '%'
            OR p.cel_per LIKE '%' || p_by || '%'
            OR p.tip_doc_per LIKE '%' || p_by || '%'
        )
    GROUP BY p.id_per
    ORDER BY p.id_per
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Delete/deactivate person
CREATE OR REPLACE FUNCTION public.DeletePeople(p_by VARCHAR(100))
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
BEGIN
    IF (SELECT id_per FROM public.personas WHERE doc_per = p_by) IS NULL THEN 
        RETURN QUERY SELECT FALSE, 'Esta persona no esta registrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    UPDATE
        public.personas p
    SET 
        estado = FALSE
    WHERE
        estado = TRUE
        AND (
            p.doc_per LIKE p_by
            OR p.email_per LIKE p_by
        );

    RETURN QUERY SELECT TRUE, 'Persona desactivada exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;
