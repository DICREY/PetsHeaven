-- Active: 1750268475844@@127.0.0.1@3306@pets_heaven
DROP DATABASE IF EXISTS pets_heaven;
CREATE DATABASE IF NOT EXISTS pets_heaven;
CREATE TABLE pets_heaven.roles(
    id_rol INT AUTO_INCREMENT PRIMARY KEY, -- ID del rol
    nom_rol VARCHAR(100) NOT NULL,INDEX(nom_rol) -- Nombre del rol
);

/* DIVIDIR USUARIOS EN DOS TABLAS USUARIOS Y PERSONAS LOS USUARIOS TENDRAN LA INFORMACION RELEVANTE CON LA AUTENTICACION Y LAS PERSONAS EL RESTO DE INFORMACION */
CREATE TABLE pets_heaven.personas(
    id_per INT AUTO_INCREMENT PRIMARY KEY, -- ID de la persona
    nom_per VARCHAR(100) NOT NULL, -- Nombre de la persona
    ape_per VARCHAR(100) NOT NULL, -- Apellido de la persona
    fec_nac_per DATE NOT NULL, -- Fecha de nacimiento
    tip_doc_per VARCHAR(10) NOT NULL, -- Tipo de documento
    doc_per VARCHAR(20) UNIQUE NOT NULL,INDEX(doc_per), -- Número de documento
    dir_per VARCHAR(100) NOT NULL, -- Dirección
    cel_per VARCHAR(20) NOT NULL, -- Celular principal
    cel2_per VARCHAR(20), -- Celular secundario
    email_per VARCHAR(100) UNIQUE NOT NULL,INDEX(email_per), -- Correo electrónico
    cont_per VARCHAR(255) NOT NULL, -- Contraseña
    gen_per VARCHAR(100) NOT NULL, -- Género
    estado BOOLEAN DEFAULT(1) NOT NULL, -- Estado activo/inactivo
    fot_per TEXT DEFAULT("https://img.freepik.com/vector-gratis/lindo-perro-medico-estetoscopio-dibujos-animados-vector-icono-ilustracion-animal-salud-icono-aislado_138676-5182.jpg") NOT NULL, -- Foto de perfil
    fec_cre_per DATE DEFAULT(CURRENT_DATE()) NOT NULL -- Fecha de creación del registro
);

CREATE TABLE pets_heaven.otorgar_roles(
    id_rol INT NOT NULL,INDEX(id_rol),FOREIGN KEY(id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE ON UPDATE CASCADE, -- ID del rol otorgado
    id_per INT NOT NULL,INDEX(id_per),FOREIGN KEY(id_per) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE, -- ID de la persona
    fec_oto DATE DEFAULT(CURRENT_DATE()) NOT NULL, -- Fecha de otorgamiento
    PRIMARY KEY(id_rol,id_per)
);

CREATE TABLE pets_heaven.categorias_veterinario(
    id_cat INT AUTO_INCREMENT PRIMARY KEY NOT NULL, -- ID de la categoría
    nom_cat VARCHAR(100) NOT NULL -- Nombre de la categoría
);

CREATE TABLE pets_heaven.otorgar_categoria_vet(
    id_cat INT NOT NULL,INDEX(id_cat),FOREIGN KEY(id_cat) REFERENCES categorias_veterinario(id_cat) ON DELETE CASCADE ON UPDATE CASCADE, -- ID de la categoría
    id_per INT NOT NULL,INDEX(id_per),FOREIGN KEY(id_per) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE, -- ID de la persona
    fec_oto DATE DEFAULT(CURRENT_DATE()) NOT NULL, -- Fecha de otorgamiento
    PRIMARY KEY(id_cat,id_per)
);

CREATE TABLE pets_heaven.veterinarios(
    id_vet INT PRIMARY KEY,INDEX(id_vet),FOREIGN KEY(id_vet)  REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE, -- ID del veterinario (persona)
    especialidad VARCHAR(100) NOT NULL, -- Especialidad del veterinario
    horarios VARCHAR(100) NOT NULL, -- Horarios de atención
    num_tar_vet VARCHAR(100) DEFAULT("no-registrado") NOT NULL, -- Número de tarjeta profesional
    fot_tar_vet TEXT DEFAULT("no-registrado") NOT NULL -- Foto de la tarjeta profesional
);

CREATE TABLE pets_heaven.mascotas(
    id_mas INT AUTO_INCREMENT PRIMARY KEY, -- ID de la mascota
    nom_mas VARCHAR(100) NOT NULL,INDEX(nom_mas), -- Nombre de la mascota
    esp_mas VARCHAR(100) NOT NULL, -- Especie de la mascota
    col_mas VARCHAR(100) NOT NULL, -- Color de la mascota
    raz_mas VARCHAR(100) NOT NULL, -- Raza de la mascota
    ali_mas VARCHAR(100) NOT NULL, -- Alimentación de la mascota
    fec_nac_mas DATE NOT NULL, -- Fecha de nacimiento de la mascota
    pes_mas FLOAT(12,2) UNSIGNED NOT NULL, -- Peso de la mascota
    gen_mas VARCHAR(20) NOT NULL, -- Género de la mascota
    id_pro_mas INT NOT NULL,INDEX(id_pro_mas),FOREIGN KEY (id_pro_mas) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE, -- ID del propietario
    est_rep_mas VARCHAR(100) NOT NULL, -- Estado reproductivo
    estado BOOLEAN DEFAULT(1) NOT NULL, -- Estado activo/inactivo
    fot_mas TEXT NOT NULL, -- Foto de la mascota
    fec_cre_mas DATE DEFAULT(CURRENT_DATE()) NOT NULL -- Fecha de creación del registro
);

CREATE TABLE pets_heaven.categorias_ser(
    id_cat INT AUTO_INCREMENT PRIMARY KEY, -- ID de la categoría de servicio
    nom_cat VARCHAR(100) NOT NULL,INDEX(nom_cat), -- Nombre de la categoría
    img_cat TEXT DEFAULT('No-Registrado') NOT NULL, -- Imagen de la categoría
    tec_des_cat TEXT NOT NULL, -- Descripción técnica de la categoría
    estado BOOLEAN DEFAULT(1) NOT NULL -- Estado activo/inactivo
);

CREATE TABLE pets_heaven.servicios(
    id_ser INT AUTO_INCREMENT PRIMARY KEY, -- ID del servicio
    cat_ser INT NOT NULL,INDEX(cat_ser), FOREIGN KEY(cat_ser) REFERENCES categorias_ser(id_cat) ON DELETE CASCADE ON UPDATE CASCADE, -- ID de la categoría de servicio
    nom_ser VARCHAR(100) NOT NULL,INDEX(nom_ser), -- Nombre del servicio
    pre_ser DECIMAL(10,2) NOT NULL, -- Precio del servicio
    des_ser TEXT NOT NULL, -- Descripción del servicio
    sta_ser ENUM("DISPONIBLE","NO-DISPONIBLE") DEFAULT("DISPONIBLE") NOT NULL, -- Estado del servicio
    tec_des_ser TEXT NOT NULL -- Descripción técnica del servicio
);

CREATE TABLE pets_heaven.cirugias(
    id_cir INT AUTO_INCREMENT PRIMARY KEY, -- ID de la cirugía
    des_cir VARCHAR (100) NOT NULL, -- Descripción de la cirugía
    res_cir VARCHAR(200),   -- Resultados de la cirugía
    com_cir VARCHAR(200),   -- Complicaciones de la cirugía
    obv_cir TEXT DEFAULT("No-Registrado") NOT NULL,  -- Observaciones de la cirugía
    ser_cir INT NOT NULL,INDEX(ser_cir), FOREIGN KEY(ser_cir) REFERENCES servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE -- ID del servicio asociado
);

CREATE TABLE pets_heaven.vacunas (
    id_vac INT AUTO_INCREMENT PRIMARY KEY, -- ID de la vacuna
    nom_vac VARCHAR(255) NOT NULL,INDEX(nom_vac), -- Nombre de la vacuna
    efe_sec_vac VARCHAR(255) NOT NULL,  -- Efectos secundarios de la vacuna
    cat_vac VARCHAR(100) NOT NULL,INDEX(cat_vac), -- Categoría de la vacuna
    dos_rec_vac VARCHAR(100) NOT NULL, -- Dosis recomendada
    lot_vac VARCHAR(255) NOT NULL,INDEX(lot_vac), -- Lote de la vacuna
    fec_ven_vac DATE NOT NULL, -- Fecha de vencimiento
    fre_vac VARCHAR(100) NOT NULL, -- Frecuencia de vacunación
    ser_vac INT NOT NULL,INDEX(ser_vac), FOREIGN KEY(ser_vac) REFERENCES servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE -- ID del servicio asociado
);
CREATE TABLE pets_heaven.consultorios(
    nom_esp VARCHAR (100) NOT NULL PRIMARY KEY, -- Nombre del consultorio (Ej. con 101)
    sta_esp BOOLEAN NOT NULL, -- Estado del consultorio
    esp_esp VARCHAR (255) NOT NULL, -- Especialidad del consultorio
    des_esp TEXT NOT NULL -- Descripcion del consultorio (Ej. Sala urgencias)
);

CREATE TABLE pets_heaven.citas(
    id_cit INT AUTO_INCREMENT, -- ID de la cita
    fec_reg_cit DATE DEFAULT(CURRENT_DATE()) NOT NULL, -- Fecha de registro de la cita
    fec_cit DATE NOT NULL, -- Fecha de la cita
    hor_ini_cit TIME NOT NULL, -- Hora de inicio de la cita
    hor_fin_cit TIME NOT NULL, -- Hora de fin de la cita
    lug_ate_cit VARCHAR(100) NOT NULL,INDEX(lug_ate_cit), FOREIGN KEY(lug_ate_cit) REFERENCES consultorios(nom_esp) ON DELETE CASCADE ON UPDATE CASCADE, -- ID del consultorio
    ser_cit INT NOT NULL,INDEX(ser_cit),FOREIGN KEY(ser_cit) REFERENCES servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE, -- ID del servicio
    vet_cit INT NOT NULL,INDEX(vet_cit),FOREIGN KEY(vet_cit) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE, -- ID del veterinario
    mas_cit INT NOT NULL,INDEX(mas_cit),FOREIGN KEY(mas_cit) REFERENCES mascotas(id_mas) ON DELETE CASCADE ON UPDATE CASCADE, -- ID de la mascota
    estado ENUM("PENDIENTE","EN-ESPERA","CANCELADO","RECHAZADO","REALIZADO","CONFIRMADO") NOT NULL, -- Estado de la cita
    PRIMARY KEY (id_cit,mas_cit)
);


CREATE TABLE pets_heaven.motivos_consultas(
    id_mot_con INT AUTO_INCREMENT PRIMARY KEY, -- ID del motivo de consulta
    mot_con TEXT NOT NULL COMMENT 'Motivo de consulta' -- Motivo de consulta
);

CREATE TABLE pets_heaven.tratamientos_consultas(
    id_tra_con INT AUTO_INCREMENT PRIMARY KEY, -- ID del tratamiento aplicado
    nom_tra_con VARCHAR(100) NOT NULL COMMENT 'Tratamiento aplicado',INDEX(nom_tra_con), -- Nombre del tratamiento
    des_tra_con TEXT NOT NULL -- Descripción del tratamiento
);

CREATE TABLE pets_heaven.consultas(
    id_con INT AUTO_INCREMENT PRIMARY KEY, -- ID de la consulta
    pes_mas_con DECIMAL(5,2) COMMENT 'Peso en kg', -- Peso de la mascota en la consulta
    tem_mas_con SMALLINT COMMENT 'Temperatura en °C', -- Temperatura de la mascota en la consulta
    dia_con TEXT COMMENT 'diagnostico', -- Diagnóstico de la consulta
    med_con TEXT COMMENT 'Medicamentos', -- Medicamentos recetados
    fec_con DATE DEFAULT(CURRENT_DATE()) NOT NULL,INDEX(fec_con), -- Fecha de la consulta
    mot_con INT NOT NULL,INDEX(mot_con),FOREIGN KEY (mot_con) REFERENCES motivos_consultas(id_mot_con) ON DELETE RESTRICT ON UPDATE CASCADE, -- ID del motivo de consulta
    nom_tra INT NOT NULL,INDEX(nom_tra),FOREIGN KEY (nom_tra) REFERENCES tratamientos_consultas(id_tra_con) ON DELETE RESTRICT ON UPDATE CASCADE, -- ID del tratamiento aplicado
    cit_con INT NOT NULL,INDEX(cit_con),FOREIGN KEY (cit_con) REFERENCES citas(id_cit) ON DELETE CASCADE ON UPDATE CASCADE -- ID de la cita asociada
);

CREATE TABLE tipos_prueba (
    id_tip_pru INT AUTO_INCREMENT PRIMARY KEY, -- ID del tipo de prueba
    nom_tip_pru VARCHAR(50) NOT NULL,INDEX(nom_tip_pru), -- nombre del tipo de prueba
    des_tip_pru TEXT, -- Descripcion del tipo de prueba
    tie_est_tip_pru INT -- Tiempo estimado en horas
);

CREATE TABLE pruebas_laboratorio (
    id_pru_lab INT AUTO_INCREMENT PRIMARY KEY, -- ID de la prueba de laboratorio
    mas_pru_lab INT NOT NULL,INDEX(mas_pru_lab),FOREIGN KEY (mas_pru_lab) REFERENCES mascotas(id_mas) ON UPDATE CASCADE ON DELETE CASCADE, -- Mascota de la prueba
    vet_pru_lab INT NOT NULL,INDEX(vet_pru_lab), FOREIGN KEY (vet_pru_lab) REFERENCES veterinarios(id_vet) ON UPDATE CASCADE ON DELETE CASCADE, -- Veterinario que solicito la prueba
    tip_pru_lab INT NOT NULL,INDEX(tip_pru_lab), FOREIGN KEY (tip_pru_lab) REFERENCES tipos_prueba(id_tip_pru) ON UPDATE CASCADE ON DELETE CASCADE, -- Tipo de prueba solicitada
    fec_sol_pru_lab DATETIME NOT NULL, -- Fecha en que se solicito la prueba
    fec_rea_pru_lab DATETIME NOT NULL, -- Fecha de realizacion de la prueba
    fec_ent_pru_lab DATETIME, -- Fecha de entrega de resultados
    sta_pru_lab ENUM('SOLICITADO', 'EN-PROCESO', 'COMPLETADO', 'ENTREGADO') DEFAULT 'SOLICITADO', -- Estado de la prueba
    res_pru_lab TEXT, -- Resultados obtenidos de la prueba
    obs_pru_lab TEXT, -- Observaciones de la prueba
    pre_pru_lab DECIMAL(10,2), -- Precio de la prueba 
    pri_pru_lab ENUM('RUTINA', 'URGENTE') DEFAULT 'RUTINA', -- Nivel de priorida de la prueba
    met_pru_lab VARCHAR(100), -- Metodo usado en la prueba
    created_pru_lab TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de insercion de datos
    updated_pru_lab TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha de actualizacion de datos
);