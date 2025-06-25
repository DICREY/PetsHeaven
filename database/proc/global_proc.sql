-- Active: 1746043677643@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.Login(
    IN p_firstData VARCHAR(100)
)
BEGIN
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
    LIMIT 1000;
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

/* DROP PROCEDURE pets_heaven.`Login`; */
/* CALL `GetAdminStats`(); */
/* CALL `GetStaffStats`('1298765432'); */
/* DROP PROCEDURE `GetAdminStats`; */
/* DROP PROCEDURE `GetStatsVet`; */