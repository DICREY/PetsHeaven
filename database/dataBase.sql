-- Active: 1746043677643@@127.0.0.1@3306@pets_heaven
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

CREATE TABLE pets_heaven.veterinarios(
    id_vet INT PRIMARY KEY,INDEX(id_vet),FOREIGN KEY(id_vet)  REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE, -- ID del veterinario (persona)
    especialidad VARCHAR(100) NOT NULL, -- Especialidad del veterinario
    horarios VARCHAR(100) NOT NULL, -- Horarios de atención
    num_tar_vet VARCHAR(100) DEFAULT("no-registrado") NOT NULL, -- Número de tarjeta profesional
    fot_tar_vet TEXT DEFAULT("no-registrado") NOT NULL -- Foto de la tarjeta profesional
);
CREATE TABLE pets_heaven.otorgar_categoria_vet(
    id_cat INT NOT NULL,INDEX(id_cat),FOREIGN KEY(id_cat) REFERENCES categorias_veterinario(id_cat) ON DELETE CASCADE ON UPDATE CASCADE, -- ID de la categoría
    id_vet INT NOT NULL,INDEX(id_vet),FOREIGN KEY(id_vet) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE, -- ID de la persona
    fec_oto DATE DEFAULT(CURRENT_DATE()) NOT NULL, -- Fecha de otorgamiento
    PRIMARY KEY(id_cat,id_vet)
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

CREATE TABLE pets_heaven.categorias_servicios (
    id_cat INT AUTO_INCREMENT PRIMARY KEY, -- ID de la categoría de servicio
    nom_cat VARCHAR(100) NOT NULL,INDEX(nom_cat), -- Nombre de la categoría
    slug VARCHAR(100) UNIQUE NOT NULL, -- Versión normalizada y simplificada del nombre
    des_cat TEXT, -- Descripción de la categoría
    col_hex VARCHAR(7) DEFAULT '#4b8ef5', -- Color de la categoria
    sta_cat BOOLEAN DEFAULT 1,INDEX(sta_cat), -- Estado activo/inactivo
    img_cat TEXT DEFAULT('No-Registrado') NOT NULL, -- Imagen de la categoría
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE pets_heaven.tipos_servicios (
    id_tip_ser INT AUTO_INCREMENT PRIMARY KEY,
    cat_tip_ser INT NOT NULL,INDEX(cat_tip_ser), -- ID categoria del tipo de servicio
    nom_tip_ser VARCHAR(100) NOT NULL,INDEX(nom_tip_ser), -- Nombre del tipo de servicio
    des_tip_ser TEXT NOT NULL, -- Descripcion del tipo de servicio
    tec_des_cat TEXT NOT NULL, -- Descripción técnica del tipo de servicio
    sta_tip_ser BOOLEAN DEFAULT 1, -- Estado del tipo de servicio
    req_equ_esp BOOLEAN DEFAULT 0, -- Define si requiere equipo especial
    dur_min_tip_ser INT, -- Duracion minima del servicio en horas
    FOREIGN KEY (cat_tip_ser) REFERENCES categorias_servicios(id_cat) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE pets_heaven.servicios (
    id_ser INT AUTO_INCREMENT PRIMARY KEY, -- ID del servicio
    tip_ser INT NOT NULL,INDEX(tip_ser), -- ID del Tipo de servicio
    nom_ser VARCHAR(100) NOT NULL,INDEX(nom_ser), -- Nombre del servicio
    des_ser TEXT NOT NULL, -- Descripción del servicio
    pre_ser DECIMAL(10,2) NOT NULL, -- Precio base del servicio
    pre_act_ser DECIMAL(10,2) NOT NULL,INDEX(pre_act_ser), -- Precio actual del servicio
    cos_est_ser DECIMAL(10,2), -- Costo estimado del servicio
    sta_ser ENUM('DISPONIBLE', 'NO_DISPONIBLE', 'TEMPORAL') DEFAULT 'DISPONIBLE', -- Estado del servicio
    req TEXT DEFAULT 'No-registrado', -- Requisitos previos para el servicio
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tip_ser) REFERENCES tipos_servicios(id_tip_ser) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE pets_heaven.procedimientos (
    id_pro INT AUTO_INCREMENT PRIMARY KEY, -- ID del procedimiento
    nom_pro VARCHAR(100) NOT NULL,INDEX(nom_pro), -- Nombre del procedimiento
    des_pro TEXT NOT NULL, -- Descripción del procedimiento
    cat_pro INT NOT NULL,INDEX(cat_pro), -- Categoria del procedimiento
    niv_rie_pro ENUM('BAJO', 'MODERADO', 'ALTO', 'CRITICO'),INDEX(niv_rie_pro), -- Nivel de riesgo del procedimiento
    dur_min_pro INT, -- Duración minima del procedimiento
    pro_pro TEXT DEFAULT 'No-registrado', -- Protocolo / Pasos del procedimiento
    con_esp_pro TEXT DEFAULT 'No-registrado', -- Consideraciones especiales
    FOREIGN KEY (cat_pro) REFERENCES categorias_servicios(id_cat) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE pets_heaven.servicios_procedimientos (
    id_ser INT NOT NULL, -- ID del servicio
    id_pro INT NOT NULL, -- ID del procedimiento
    es_principal BOOLEAN DEFAULT TRUE,
    ord_eje SMALLINT,
    PRIMARY KEY (id_ser, id_pro),
    FOREIGN KEY (id_ser) REFERENCES servicios(id_ser) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_pro) REFERENCES procedimientos(id_pro) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE pets_heaven.tipos_pruebas (
    id_tip_pru INT AUTO_INCREMENT PRIMARY KEY, -- ID único del tipo de prueba
    cod_tip_pru VARCHAR(20) UNIQUE NOT NULL,INDEX(cod_tip_pru), -- Código identificador de la prueba
    nom_tip_pru VARCHAR(100) NOT NULL, -- Nombre del tipo de prueba
    des_tip_pru TEXT DEFAULT 'No-registrado', -- Descripción de la prueba
    cat_tip_pru ENUM('HEMATOLOGIA', 'BIOQUIMICA', 'MICROBIOLOGIA', 'PATOLOGIA', 'GENETICA') NOT NULL,INDEX(cat_tip_pru), -- Categoría de la prueba
    met_est_tip_pru VARCHAR(100), -- Método estándar utilizado
    tie_est_hrs_tip_pru INT, -- Tiempo estimado en horas para el resultado
    ins_pre_tip_pru TEXT DEFAULT 'No-registrado', -- Instrucciones de preparación para la prueba
    par_ref_tip_pru TEXT DEFAULT 'No-registrado' -- Parámetros de referencia
);

CREATE TABLE pets_heaven.pruebas_laboratorio (
    id_pru_lab INT AUTO_INCREMENT PRIMARY KEY, -- ID único de la prueba de laboratorio
    cod_ord_pru_lab VARCHAR(20) UNIQUE NOT NULL, -- Código de orden de la prueba
    id_mas_pru_lab INT NOT NULL,INDEX(id_mas_pru_lab), -- ID de la mascota
    id_vet_sol_pru_lab INT NOT NULL, -- ID del veterinario solicitante
    id_tip_pru_lab INT NOT NULL, -- ID del tipo de prueba
    id_ser_pru_lab INT, -- ID del servicio asociado (opcional)
    fec_sol_pru_lab DATETIME NOT NULL,INDEX(fec_sol_pru_lab), -- Fecha y hora de solicitud de la prueba
    fec_mue_pru_lab DATETIME, -- Fecha y hora de toma de muestra
    fec_pro_pru_lab DATETIME, -- Fecha y hora de procesamiento de la muestra
    fec_res_pru_lab DATETIME,INDEX(fec_res_pru_lab), -- Fecha y hora de resultado disponible
    est_pru_lab ENUM('REGISTRADO', 'MUESTRA_TOMADA', 'EN_PROCESO', 'COMPLETADO', 'ENTREGADO', 'CANCELADO') DEFAULT 'REGISTRADO',INDEX(est_pru_lab), -- Estado de la prueba
    pri_pru_lab ENUM('ROUTINA', 'URGENTE', 'STAT') DEFAULT 'ROUTINA', -- Prioridad de la prueba
    obs_mue_pru_lab TEXT, -- Observaciones sobre la muestra
    res_pru_lab TEXT DEFAULT 'No-registrado', -- Resultados de la prueba en formato
    id_vet_rev_pru_lab INT, -- ID del veterinario revisor
    FOREIGN KEY (id_mas_pru_lab) REFERENCES mascotas(id_mas) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_vet_sol_pru_lab) REFERENCES veterinarios(id_vet) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_tip_pru_lab) REFERENCES tipos_pruebas(id_tip_pru) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_ser_pru_lab) REFERENCES servicios(id_ser) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_vet_rev_pru_lab) REFERENCES veterinarios(id_vet) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE pets_heaven.consultorios (
    id_con INT AUTO_INCREMENT PRIMARY KEY, -- ID único del consultorio
    cod_con VARCHAR(10) UNIQUE NOT NULL,   -- Código identificador del consultorio
    nom_con VARCHAR(100) NOT NULL,         -- Nombre del consultorio
    des_con TEXT DEFAULT 'No-registrado', -- Descripción del consultorio
    tip_con ENUM('CONSULTA', 'CIRUGIA', 'HOSPITALIZACION', 'LABORATORIO', 'IMAGENES') NOT NULL,INDEX(tip_con), -- Tipo de consultorio
    equ_con TEXT DEFAULT 'No-registrado', -- Equipamiento disponible en formato JSON
    cap_con INT DEFAULT 1,                 -- Capacidad máxima del consultorio
    est_con BOOLEAN DEFAULT 1          -- Estado de actividad del consultorio
);

CREATE TABLE pets_heaven.citas(
    id_cit INT AUTO_INCREMENT, -- ID de la cita
    fec_reg_cit DATE DEFAULT(CURRENT_DATE()) NOT NULL, -- Fecha de registro de la cita
    fec_cit DATE NOT NULL, -- Fecha de la cita
    hor_ini_cit TIME NOT NULL, -- Hora de inicio de la cita
    hor_fin_cit TIME NOT NULL, -- Hora de fin de la cita
    mot_cit TEXT DEFAULT 'No-registrado', -- Motivo de la consulta
    est_cit ENUM('PENDIENTE', 'CONFIRMADA', 'EN_PROGRESO', 'COMPLETADA', 'CANCELADA', 'NO_ASISTIO') NOT NULL,INDEX(est_cit), -- Estado de la cita
    fec_cre_cit TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del registro
    fec_act_cit TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de última actualización
    con_cit INT NOT NULL,INDEX(con_cit),FOREIGN KEY (con_cit) REFERENCES consultorios(id_con) ON UPDATE CASCADE ON DELETE CASCADE, -- ID del consultorio
    ser_cit INT NOT NULL,INDEX(ser_cit),FOREIGN KEY(ser_cit) REFERENCES servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE, -- ID del servicio
    vet_cit INT NOT NULL,INDEX(vet_cit),FOREIGN KEY(vet_cit) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE, -- ID del veterinario
    mas_cit INT NOT NULL,INDEX(mas_cit),FOREIGN KEY(mas_cit) REFERENCES mascotas(id_mas) ON DELETE CASCADE ON UPDATE CASCADE, -- ID de la mascota
    PRIMARY KEY (id_cit,mas_cit)
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
    des_vac TEXT DEFAULT 'No-registrado', -- Descripción de la vacuna
    sta_vac BOOLEAN DEFAULT 1 NOT NULL, -- Estado de vacuna (disponible / No disponible) (1/0)
    pro_vac INT NOT NULL,INDEX(pro_vac), FOREIGN KEY(pro_vac) REFERENCES procedimientos(id_pro) ON DELETE CASCADE ON UPDATE CASCADE, -- ID del procedimiento asociado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);