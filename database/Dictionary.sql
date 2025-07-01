-- Diccionario de las tablas de la base de datos
SELECT DATABASE(),
       TABLE_NAME AS 'Tabla',
       COLUMN_NAME AS 'Columna',
       DATA_TYPE AS 'Tipo de dato',
       CHARACTER_MAXIMUM_LENGTH AS 'Longitud máxima',
       IS_NULLABLE AS '¿Es nulo?', 
       COLUMN_DEFAULT AS 'Valor por defecto',
       COLUMN_COMMENT AS 'Commentario'
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
ORDER BY TABLE_NAME, ORDINAL_POSITION;