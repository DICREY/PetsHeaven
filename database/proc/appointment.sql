-- Active: 1746130779175@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.SearchAllAppointments()
BEGIN 
    SELECT 
        c.fec_reg_cit,
        c.fec_cit,
        c.hor_ini_cit,
        c.hor_fin_cit,
        cs.nom_cat,
        s.nom_ser,
        s.des_ser,
        m.nom_mas,
        m.esp_mas,
        m.fot_mas,    
        p.nom_per,
        p.ape_per,
        p.cel_per,
        c.estado
    FROM 
        citas c
    JOIN 
        mascotas m ON m.id_mas = c.mas_cit
    JOIN 
        servicios s ON s.id_ser = c.ser_cit
    JOIN 
        categorias_ser cs ON cs.id_cat = s.cat_ser
    JOIN 
        personas p ON p.id_per = c.vet_cit
    WHERE
        c.estado != 'CANCELADO'
    ORDER BY c.fec_cit
    LIMIT 50;
END //

/* CALL `SearchAllAppointments`(); */

/* DROP PROCEDURE `SearchAllAppointments`; */ 