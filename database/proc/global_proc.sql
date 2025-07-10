-- Active: 1747352860830@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.Login(
    IN p_firstData VARCHAR(100)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM personas WHERE email_per = p_firstData) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email ingresado no existe en el sistema';
    END IF;
    SELECT
        p.nom_per,
        p.ape_per,
        p.doc_per,
        p.cont_per,
        p.fot_per,
        GROUP_CONCAT(r.nom_rol SEPARATOR ', ') AS roles
    FROM
        personas p
    JOIN
        otorgar_roles otr ON otr.id_per = p.id_per
    JOIN
        roles r ON otr.id_rol = r.id_rol
    WHERE
        p.estado = 1
        AND (
                p.email_per = p_firstData
                OR p.doc_per = p_firstData
            )
    ORDER BY 
        p.nom_per
    LIMIT 1;
END //
CREATE PROCEDURE pets_heaven.ChangePassword(
    IN p_email VARCHAR(100),
    IN p_passwd TEXT
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM personas WHERE email_per = p_email) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email ingresado no existe en el sistema';
    END IF;
    UPDATE
        personas p
    SET
        p.cont_per = p_passwd
    WHERE
        p.email_per = p_email;
END //

CREATE PROCEDURE pets_heaven.GetAdminStats()
BEGIN
    SELECT 
        COUNT(v.id_vet) AS doc, -- Total de veterinarios
        (SELECT COUNT(*) FROM mascotas m WHERE m.estado = 1) AS mas, -- Mascotas activas
        (
            SELECT COUNT(*) 
            FROM citas c 
            WHERE c.fec_cit = CURRENT_DATE() AND c.est_cit != 'CANCELADA'
        ) AS cit, -- Citas de hoy no canceladas
        (
            SELECT COUNT(*) 
            FROM citas c
            JOIN servicios s ON s.id_ser = c.ser_cit
            JOIN tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
            JOIN categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
            WHERE cs.nom_cat = "Emergencias 24h"
        ) AS emg -- Citas de emergencias
    FROM veterinarios v
    LIMIT 1000;
END //

CREATE PROCEDURE pets_heaven.GetStaffStats(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT 
        COUNT(v.id_vet) AS doc, -- Total de veterinarios encontrados
        (
            SELECT COUNT(*) 
            FROM citas cc
            JOIN servicios ccs ON cc.ser_cit = ccs.id_ser
            JOIN tipos_servicios tcs ON tcs.id_tip_ser = ccs.tip_ser
            JOIN categorias_servicios cs ON cs.id_cat = tcs.cat_tip_ser
            WHERE cc.vet_cit = v.id_vet
              AND cs.nom_cat LIKE '%Cirugía%'
        ) AS cir_pro, -- Cirugías realizadas por el veterinario
        (
            SELECT COUNT(*) 
            FROM citas cc
            JOIN servicios ccs ON cc.ser_cit = ccs.id_ser
            JOIN tipos_servicios tcs ON tcs.id_tip_ser = ccs.tip_ser
            JOIN categorias_servicios cs ON cs.id_cat = tcs.cat_tip_ser
            WHERE cc.vet_cit = v.id_vet
              AND cs.nom_cat LIKE '%Emergencias 24h%'
        ) AS emg_ate, -- Emergencias atendidas por el veterinario
        (
            SELECT COUNT(*) 
            FROM citas cc
            JOIN servicios ccs ON cc.ser_cit = ccs.id_ser
            JOIN tipos_servicios tcs ON tcs.id_tip_ser = ccs.tip_ser
            JOIN categorias_servicios cs ON cs.id_cat = tcs.cat_tip_ser
            WHERE cc.vet_cit = v.id_vet
              AND cs.nom_cat LIKE '%Consulta General%'
        ) AS con_com -- Consultas generales realizadas por el veterinario
    FROM veterinarios v
    JOIN personas p ON v.id_vet = p.id_per
    WHERE p.doc_per LIKE p_by
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.GetOwnStats(
    IN p_by VARCHAR(100)
)
BEGIN
    DECLARE v_id_per INT;

    -- Busca el id de la persona por el documento
    SELECT id_per INTO v_id_per FROM personas WHERE doc_per = p_by LIMIT 1;

    -- Si no existe la persona, lanza error
    IF v_id_per IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe persona con ese documento';
    END IF;

    -- Estadísticas generales del dueño
    SELECT 
        (SELECT COUNT(*) FROM mascotas WHERE id_pro_mas = v_id_per) AS mas, -- Total de mascotas
        (SELECT COUNT(*) FROM citas WHERE mas_cit IN (SELECT id_mas FROM mascotas WHERE id_pro_mas = v_id_per)) AS citas, -- Total de citas de todas sus mascotas
        (SELECT COUNT(*) 
            FROM citas cc
            JOIN servicios ccs ON cc.ser_cit = ccs.id_ser
            JOIN tipos_servicios tcs ON tcs.id_tip_ser = ccs.tip_ser
            JOIN categorias_servicios cs ON cs.id_cat = tcs.cat_tip_ser
            WHERE cc.mas_cit IN (SELECT id_mas FROM mascotas WHERE id_pro_mas = v_id_per)
              AND cs.nom_cat LIKE '%Consulta General%'
        ) AS consultas -- Total de consultas generales
    ;
END //

/* DROP PROCEDURE pets_heaven.`Login`; */
/* DROP PROCEDURE `GetAdminStats`; */
/* DROP PROCEDURE `GetStatsVet`; */
/* DROP PROCEDURE `GetOwnStats`; */

/* CALL `GetAdminStats`(); */
/* CALL `GetStaffStats`('1298765432'); */
/* CALL `GetOwnStats`('1298765432'); */