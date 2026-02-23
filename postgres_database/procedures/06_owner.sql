-- PostgreSQL Procedures for PetsHeaven - Owners (Propietarios)
-- Migrated from MySQL

-- Search all owners
CREATE OR REPLACE FUNCTION public.SearchOwners()
RETURNS TABLE(
    id_per INTEGER,
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
    fec_cre_per DATE,
    gen_per VARCHAR,
    fot_per TEXT,
    mascotas TEXT,
    roles TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id_per,
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
        p.fec_cre_per,
        p.gen_per,
        p.fot_per,
        STRING_AGG(DISTINCT
            CONCAT_WS(',',
                m.nom_mas,
                m.esp_mas,
                m.col_mas,
                m.raz_mas,
                m.ali_mas,
                m.fec_nac_mas::TEXT,
                m.pes_mas::TEXT,
                m.gen_mas,
                m.est_rep_mas,
                m.fot_mas,
                m.fec_cre_mas::TEXT
            ), 
            '---'
        ),
        STRING_AGG(DISTINCT r.nom_rol, ', ')
    FROM 
        pets_heaven.personas p
    JOIN 
        pets_heaven.mascotas m ON m.id_pro_mas = p.id_per
    JOIN
        pets_heaven.otorgar_roles otr ON otr.id_per = p.id_per
    JOIN
        pets_heaven.roles r ON otr.id_rol = r.id_rol
    WHERE
        p.estado = TRUE
        AND m.estado = TRUE
    GROUP BY
        p.id_per,
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
        p.fec_cre_per,
        p.gen_per,
        p.fot_per
    ORDER BY
        p.fec_cre_per
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Search owners by criteria
CREATE OR REPLACE FUNCTION pets_heaven.SearchOwnersBy(p_by VARCHAR(100))
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
    fec_cre_per DATE,
    gen_per VARCHAR,
    fot_per TEXT,
    mascotas TEXT,
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
        p.fec_cre_per,
        p.gen_per,
        p.fot_per,
        STRING_AGG(DISTINCT
            CONCAT_WS(',',
                m.nom_mas,
                m.esp_mas,
                m.col_mas,
                m.raz_mas,
                m.ali_mas,
                m.fec_nac_mas::TEXT,
                m.pes_mas::TEXT,
                m.gen_mas,
                m.est_rep_mas,
                m.fot_mas,
                m.fec_cre_mas::TEXT
            ), 
            '---'
        ),
        STRING_AGG(DISTINCT r.nom_rol, ', ')
    FROM 
        pets_heaven.personas p
    LEFT JOIN 
        pets_heaven.mascotas m ON m.id_pro_mas = p.id_per AND m.estado = TRUE
    JOIN
        pets_heaven.otorgar_roles otr ON otr.id_per = p.id_per
    JOIN
        pets_heaven.roles r ON otr.id_rol = r.id_rol
    WHERE
        p.estado = TRUE
        AND ( 
            p.nom_per ILIKE '%' || p_by
            OR p.ape_per ILIKE '%' || p_by
            OR p.doc_per LIKE '%' || p_by
            OR p.email_per LIKE '%' || p_by
            OR p.gen_per LIKE '%' || p_by
            OR p.cel_per LIKE '%' || p_by
            OR p.tip_doc_per LIKE '%' || p_by
        )
    GROUP BY
        p.id_per,
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
        p.fec_cre_per,
        p.gen_per,
        p.fot_per
    ORDER BY
        p.id_per DESC
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Search owner by document/email
CREATE OR REPLACE FUNCTION pets_heaven.SearchOwnerBy(p_by VARCHAR(100))
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
    fec_cre_per DATE,
    gen_per VARCHAR,
    fot_per TEXT,
    mascotas TEXT,
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
        p.fec_cre_per,
        p.gen_per,
        p.fot_per,
        STRING_AGG(DISTINCT
            CONCAT_WS(',',
                m.nom_mas,
                m.esp_mas,
                m.col_mas,
                m.raz_mas,
                m.ali_mas,
                m.fec_nac_mas::TEXT,
                m.pes_mas::TEXT,
                m.gen_mas,
                m.est_rep_mas,
                m.fot_mas,
                m.fec_cre_mas::TEXT
            ), 
            '---'
        ),
        STRING_AGG(DISTINCT r.nom_rol, ', ')
    FROM 
        pets_heaven.personas p
    LEFT JOIN 
        pets_heaven.mascotas m ON m.id_pro_mas = p.id_per AND m.estado = TRUE
    JOIN
        pets_heaven.otorgar_roles otr ON otr.id_per = p.id_per
    JOIN
        pets_heaven.roles r ON otr.id_rol = r.id_rol
    WHERE
        p.estado = TRUE
        AND ( 
            p.doc_per LIKE p_by
            OR p.email_per LIKE p_by
        )
    GROUP BY
        p.id_per,
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
        p.fec_cre_per,
        p.gen_per,
        p.fot_per
    ORDER BY
        p.id_per DESC
    LIMIT 1000;
END;
$$ LANGUAGE plpgsql;

-- Delete/deactivate owner
CREATE OR REPLACE FUNCTION pets_heaven.DeleteOwner(p_by VARCHAR(100))
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
BEGIN
    IF (SELECT id_per FROM pets_heaven.personas WHERE doc_per = p_by) IS NULL THEN 
        RETURN QUERY SELECT FALSE, 'Esta persona no esta registrada en el sistema'::VARCHAR;
        RETURN;
    END IF;

    UPDATE 
        pets_heaven.personas p
    JOIN 
        pets_heaven.mascotas m ON p.id_per = m.id_pro_mas 
    SET
        p.estado = FALSE,
        m.estado = FALSE
    WHERE
        p.estado = TRUE
        AND (
            p.doc_per LIKE p_by
            OR p.email_per LIKE p_by
        );

    RETURN QUERY SELECT TRUE, 'Propietario y mascotas desactivados exitosamente'::VARCHAR;
END;
$$ LANGUAGE plpgsql;
