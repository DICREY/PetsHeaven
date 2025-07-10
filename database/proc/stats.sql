-- Active: 1746130779175@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.frequentPets()
BEGIN
    -- Consulta para obtener las razas más frecuentes y su información demográfica
    SELECT 
        raz_mas AS Raza,
        COUNT(*) AS Cantidad_Mascotas,
        ROUND(AVG(TIMESTAMPDIFF(YEAR, fec_nac_mas, CURDATE())), 1) AS Edad_Promedio_Años,
        MIN(TIMESTAMPDIFF(YEAR, fec_nac_mas, CURDATE())) AS Edad_Minima,
        MAX(TIMESTAMPDIFF(YEAR, fec_nac_mas, CURDATE())) AS Edad_Maxima,
        esp_mas AS Especie,
        gen_mas AS Genero_Mas_Comun,
        est_rep_mas AS Estado_Reproductivo_Mas_Comun
    FROM 
        mascotas
    WHERE 
        estado = 1 -- Solo mascotas activas
    GROUP BY 
        raz_mas, esp_mas
    ORDER BY 
        Cantidad_Mascotas DESC, Edad_Promedio_Años
    LIMIT 5;
END //