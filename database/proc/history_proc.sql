-- Active: 1750268475844@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.SearchHistoryBy(
    IN p_by VARCHAR(100),
    IN p_by_two VARCHAR(100)
)
BEGIN
    IF NOT EXISTS(SELECT 1 FROM personas WHERE doc_per = p_by_two) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Esta persona no existe en el sistema';
    END IF;

    IF NOT EXISTS(SELECT 1 FROM mascotas WHERE nom_mas LIKE p_by) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Esta mascota no existe en el sistema';
    END IF;

    SELECT
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
            SELECT GROUP_CONCAT(
                CONCAT_WS('---',
                    ct.id_cit,
                    ct.fec_reg_cit,
                    ct.fec_cit,
                    ct.hor_ini_cit,
                    ct.hor_fin_cit,
                    ct.mot_cit,
                    ct.est_cit,
                    ct.fec_cre_cit,
                    ct.fec_act_cit,
                    s.nom_ser,
                    s.pre_ser,
                    s.des_ser,
                    ts.nom_tip_ser,
                    cs.nom_cat,
                    cs.img_cat,
                    p_vet.nom_per,
                    p_vet.ape_per,
                    v.especialidad,
                    cv.nom_cat,
                    p_vet.fot_per
                ) 
                SEPARATOR ';'
            ) 
            FROM 
                citas ct
            JOIN 
                servicios s ON s.id_ser = ct.ser_cit
            JOIN
                tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
            JOIN
                categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
            JOIN
                personas p_vet ON p_vet.id_per = ct.vet_cit
            JOIN
                veterinarios v ON v.id_vet = ct.vet_cit
            LEFT JOIN
                otorgar_categoria_vet otv ON otv.id_vet = ct.vet_cit
            LEFT JOIN
                categorias_veterinario cv ON otv.id_cat = cv.id_cat
            WHERE 
                ct.mas_cit = m.id_mas
                AND ct.est_cit = 'COMPLETADA'
        ) AS citas 
    FROM 
        mascotas m
    JOIN
        personas p ON p.id_per = m.id_pro_mas
        AND p.estado = 1
        AND (
            p.email_per = p_by_two
            OR p.doc_per = p_by_two
        )
    WHERE 
        m.estado = 1
        AND m.nom_mas LIKE p_by
    ORDER BY m.nom_mas
    LIMIT 1000;
END //
CREATE PROCEDURE pets_heaven.SearchAppointmentsByPet(
    IN p_nom_mas VARCHAR(100),
    IN p_doc_per VARCHAR(100)
)
BEGIN 
    IF NOT EXISTS (
        SELECT c.id_cit 
        FROM 
            citas c
        JOIN mascotas m ON m.id_mas = c.mas_cit
        WHERE
            c.est_cit != 'CANCELADA'
            AND m.nom_mas LIKE p_nom_mas
        LIMIT 1
    ) THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontraron citas para esta mascota';
    ELSE
        SELECT 
            c.id_cit,
            c.fec_reg_cit,
            c.fec_cit,
            c.hor_ini_cit,
            c.hor_fin_cit,
            c.con_cit,
            con.nom_con AS nom_con,
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
            p_vet.nom_per AS vet_nom_per,
            p_vet.ape_per AS vet_ape_per,
            p_vet.cel_per AS vet_cel_per,
            vet.especialidad AS vet_esp,
            p_prop.nom_per AS prop_nom_per,
            p_prop.ape_per AS prop_ape_per,
            p_prop.cel_per AS prop_cel_per,
            p_prop.doc_per AS prop_doc_per,
            p_prop.email_per AS prop_email_per,
            c.est_cit
        FROM 
            citas c
        JOIN
            mascotas m ON m.id_mas = c.mas_cit
        JOIN
            servicios s ON s.id_ser = c.ser_cit
        JOIN
            tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
        JOIN
            categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
        JOIN
            consultorios con ON con.id_con = c.con_cit
        JOIN
            personas p_vet ON p_vet.id_per = c.vet_cit
        JOIN
            veterinarios vet ON vet.id_vet = p_vet.id_per
        JOIN
            personas p_prop ON p_prop.id_per = m.id_pro_mas
        WHERE
            c.est_cit != 'CANCELADA'
            AND p_prop.doc_per = p_doc_per
            AND m.nom_mas LIKE p_nom_mas
            AND fec_cit > CURRENT_DATE
        ORDER BY 
            c.fec_cit
        LIMIT 1000;
    END IF;
END //
CREATE PROCEDURE pets_heaven.SearchAllAppointmentsByPet(
    IN p_nom_mas VARCHAR(100),
    IN p_doc_per VARCHAR(100)
)
BEGIN 
    IF NOT EXISTS (
        SELECT c.id_cit 
        FROM 
            citas c
        JOIN mascotas m ON m.id_mas = c.mas_cit
        WHERE
            c.est_cit != 'CANCELADA'
            AND m.nom_mas LIKE p_nom_mas
        LIMIT 1
    ) THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontraron citas para esta mascota';
    ELSE
        SELECT 
            c.id_cit,
            c.fec_reg_cit,
            c.fec_cit,
            c.hor_ini_cit,
            c.hor_fin_cit,
            c.con_cit,
            con.nom_con AS nom_con,
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
            p_vet.nom_per AS vet_nom_per,
            p_vet.ape_per AS vet_ape_per,
            p_vet.cel_per AS vet_cel_per,
            vet.especialidad AS vet_esp,
            p_prop.nom_per AS prop_nom_per,
            p_prop.ape_per AS prop_ape_per,
            p_prop.cel_per AS prop_cel_per,
            p_prop.doc_per AS prop_doc_per,
            p_prop.email_per AS prop_email_per,
            c.est_cit
        FROM 
            citas c
        JOIN mascotas m ON m.id_mas = c.mas_cit
        JOIN servicios s ON s.id_ser = c.ser_cit
        JOIN tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
        JOIN categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
        JOIN
            consultorios con ON con.id_con = c.con_cit
        JOIN 
            personas p_vet ON p_vet.id_per = c.vet_cit
        JOIN
            veterinarios vet ON vet.id_vet = p_vet.id_per
        JOIN personas p_prop ON p_prop.id_per = m.id_pro_mas
        WHERE
            c.est_cit != 'CANCELADA'
            AND p_prop.doc_per = p_doc_per
            AND m.nom_mas LIKE p_nom_mas
        ORDER BY 
            c.fec_cit
        LIMIT 1000;
    END IF;
END //
CREATE PROCEDURE pets_heaven.SearchAllAppointmentsByPetCompleted(
    IN p_nom_mas VARCHAR(100),
    IN p_doc_per VARCHAR(100)
)
BEGIN 
    IF NOT EXISTS (
        SELECT c.id_cit 
        FROM 
            citas c
        JOIN mascotas m ON m.id_mas = c.mas_cit
        WHERE
            c.est_cit LIKE 'COMPLETADA'
            AND m.nom_mas LIKE p_nom_mas
        LIMIT 1
    ) THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontraron citas para esta mascota';
    ELSE
        SELECT 
            c.id_cit,
            c.fec_reg_cit,
            c.fec_cit,
            c.hor_ini_cit,
            c.hor_fin_cit,
            c.con_cit,
            c.est_cit,
            con.nom_con AS nom_con,
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
            p_vet.nom_per AS vet_nom_per,
            p_vet.ape_per AS vet_ape_per,
            p_vet.cel_per AS vet_cel_per,
            vet.especialidad AS vet_esp,
            p_prop.nom_per AS prop_nom_per,
            p_prop.ape_per AS prop_ape_per,
            p_prop.cel_per AS prop_cel_per,
            p_prop.doc_per AS prop_doc_per,
            p_prop.email_per AS prop_email_per,
            p.*
        FROM 
            citas c
        JOIN
            mascotas m ON m.id_mas = c.mas_cit
        JOIN
            servicios s ON s.id_ser = c.ser_cit
        JOIN 
            tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
        JOIN
            servicios_procedimientos sp ON sp.id_ser = s.id_ser
        JOIN
            procedimientos p ON p.id_pro = sp.id_pro
        JOIN
            categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
        JOIN
            consultorios con ON con.id_con = c.con_cit
        JOIN
            personas p_vet ON p_vet.id_per = c.vet_cit
        JOIN
            veterinarios vet ON vet.id_vet = p_vet.id_per
        JOIN
            personas p_prop ON p_prop.id_per = m.id_pro_mas
        WHERE
            c.est_cit = 'COMPLETADA'
            AND p_prop.doc_per = p_doc_per
            AND m.nom_mas LIKE p_nom_mas
        ORDER BY 
            c.fec_cit
        LIMIT 1000;
    END IF;
END //
CREATE PROCEDURE pets_heaven.SearchAllAppointmentsByPetVacc(
    IN p_nom_mas VARCHAR(100),
    IN p_doc_per VARCHAR(100)
)
BEGIN 
    IF NOT EXISTS (
        SELECT c.id_cit 
        FROM 
            citas c
        JOIN mascotas m ON m.id_mas = c.mas_cit
        WHERE
            c.est_cit LIKE 'COMPLETADA'
            AND m.nom_mas LIKE p_nom_mas
        LIMIT 1
    ) THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontraron vacunas para esta mascota';
    ELSE
        SELECT 
            c.id_cit,
            c.fec_reg_cit,
            c.fec_cit,
            c.hor_ini_cit,
            c.hor_fin_cit,
            c.con_cit,
            c.est_cit,
            con.nom_con AS nom_con,
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
            p_vet.nom_per AS vet_nom_per,
            p_vet.ape_per AS vet_ape_per,
            p_vet.cel_per AS vet_cel_per,
            vet.especialidad AS vet_esp,
            p_prop.nom_per AS prop_nom_per,
            p_prop.ape_per AS prop_ape_per,
            p_prop.cel_per AS prop_cel_per,
            p_prop.doc_per AS prop_doc_per,
            p_prop.email_per AS prop_email_per,
            p.*,
            v.*
        FROM 
            citas c
        JOIN
            mascotas m ON m.id_mas = c.mas_cit
        JOIN
            personas p_vet ON p_vet.id_per = c.vet_cit
        JOIN
            veterinarios vet ON vet.id_vet = p_vet.id_per
        JOIN
            personas p_prop ON p_prop.id_per = m.id_pro_mas
        JOIN 
            servicios s ON s.id_ser = c.ser_cit
        JOIN 
            tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
        JOIN 
            categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
        JOIN
            consultorios con ON con.id_con = c.con_cit
        JOIN
            vacunacion vn ON vn.id_cit_vacn = c.id_cit
        JOIN
            vacunas v ON v.id_vac = vn.id_vacn
        JOIN
            procedimientos p ON p.id_pro = v.pro_vac
        WHERE
            c.est_cit = 'COMPLETADA'
            AND cs.nom_cat LIKE 'Vacunación'
            AND cs.id_cat = ts.cat_tip_ser
            AND p_prop.doc_per = p_doc_per
            AND m.nom_mas LIKE p_nom_mas
        ORDER BY 
            c.fec_cit
        LIMIT 1000;
    END IF;
END //
CREATE PROCEDURE pets_heaven.SearchAllAppointmentsByPetConsult(
    IN p_nom_mas VARCHAR(100),
    IN p_doc_per VARCHAR(100)
)
BEGIN 
    IF NOT EXISTS (
        SELECT c.id_cit 
        FROM 
            citas c
        JOIN mascotas m ON m.id_mas = c.mas_cit
        WHERE
            c.est_cit LIKE 'COMPLETADA'
            AND m.nom_mas LIKE p_nom_mas
        LIMIT 1
    ) THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontraron consultas para esta mascota';
    ELSE
        SELECT 
            c.id_cit,
            c.fec_reg_cit,
            c.fec_cit,
            c.hor_ini_cit,
            c.hor_fin_cit,
            c.con_cit,
            c.est_cit,
            con.nom_con AS nom_con,
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
            p_vet.nom_per AS vet_nom_per,
            p_vet.ape_per AS vet_ape_per,
            p_vet.cel_per AS vet_cel_per,
            vet.especialidad AS vet_esp,
            p_prop.nom_per AS prop_nom_per,
            p_prop.ape_per AS prop_ape_per,
            p_prop.cel_per AS prop_cel_per,
            p_prop.doc_per AS prop_doc_per,
            p_prop.email_per AS prop_email_per,
            cons.pes_mas_con,
            cons.tem_mas_con,
            cons.dia_con,
            cons.med_con,
            cons.fec_con,
            tc.nom_tra_con,
            tc.des_tra_con,
            mc.mot_con
        FROM 
            citas c
        JOIN
            mascotas m ON m.id_mas = c.mas_cit
        JOIN
            personas p_vet ON p_vet.id_per = c.vet_cit
        JOIN
            veterinarios vet ON vet.id_vet = p_vet.id_per
        JOIN
            personas p_prop ON p_prop.id_per = m.id_pro_mas
        JOIN 
            servicios s ON s.id_ser = c.ser_cit
        JOIN 
            tipos_servicios ts ON ts.id_tip_ser = s.tip_ser
        JOIN 
            categorias_servicios cs ON cs.id_cat = ts.cat_tip_ser
        JOIN
            consultorios con ON con.id_con = c.con_cit
        JOIN 
            consultas cons on cons.cit_con = c.id_cit
        JOIN
            motivos_consultas mc ON mc.id_mot_con = cons.mot_con
        JOIN
            tratamientos_consultas tc ON tc.id_tra_con = cons.tra_con
        WHERE
            c.est_cit = 'COMPLETADA'
            AND cs.nom_cat LIKE 'Consulta General'
            AND cs.id_cat = ts.cat_tip_ser
            AND p_prop.doc_per = p_doc_per
            AND m.nom_mas LIKE p_nom_mas
        ORDER BY 
            c.fec_cit
        LIMIT 1000;
    END IF;
END //

/* DROP PROCEDURE pets_heaven.SearchAllAppointmentsByPetCompleted; */
/* DROP PROCEDURE pets_heaven.SearchAllAppointmentsByPetVacc; */
/* DROP PROCEDURE pets_heaven.SearchAppointmentsByPet; */
/* DROP PROCEDURE pets_heaven.SearchAllAppointmentsByPet; */
/* DROP PROCEDURE pets_heaven.SearchHistoryBy; */

/* CALL pets_heaven.SearchAllAppointmentsByPetCompleted('max','12345678'); */
/* CALL pets_heaven.SearchAllAppointmentsByPetVacc('max','12345678'); */
/* CALL pets_heaven.SearchAllAppointmentsByPetConsult('max','12345678'); */