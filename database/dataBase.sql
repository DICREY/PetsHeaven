-- Active: 1750268475844@@127.0.0.1@3306@pets_heaven
DROP DATABASE IF EXISTS pets_heaven;
CREATE DATABASE IF NOT EXISTS pets_heaven;
CREATE TABLE pets_heaven.roles(
    id_rol INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del rol',
    nom_rol VARCHAR(100) NOT NULL COMMENT 'Nombre del rol',
    INDEX(nom_rol)
);

CREATE TABLE pets_heaven.personas(
    id_per INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la persona',
    nom_per VARCHAR(100) NOT NULL COMMENT 'Nombre de la persona',
    ape_per VARCHAR(100) NOT NULL COMMENT 'Apellido de la persona',
    fec_nac_per DATE NOT NULL COMMENT 'Fecha de nacimiento',
    tip_doc_per VARCHAR(10) NOT NULL COMMENT 'Tipo de documento',
    doc_per VARCHAR(20) UNIQUE NOT NULL COMMENT 'Número de documento',
    dir_per VARCHAR(100) NOT NULL COMMENT 'Dirección',
    cel_per VARCHAR(20) NOT NULL COMMENT 'Celular principal',
    cel2_per VARCHAR(20) COMMENT 'Celular secundario',
    email_per VARCHAR(100) UNIQUE NOT NULL COMMENT 'Correo electrónico',
    cont_per VARCHAR(255) NOT NULL COMMENT 'Contraseña',
    gen_per VARCHAR(100) NOT NULL COMMENT 'Género',
    estado BOOLEAN DEFAULT(1) NOT NULL COMMENT 'Estado activo/inactivo',
    fot_per TEXT DEFAULT("https://img.freepik.com/vector-gratis/lindo-perro-medico-estetoscopio-dibujos-animados-vector-icono-ilustracion-animal-salud-icono-aislado_138676-5182.jpg") NOT NULL COMMENT 'Foto de perfil',
    fec_cre_per DATE DEFAULT(CURRENT_DATE()) NOT NULL COMMENT 'Fecha de creación del registro',
    INDEX(doc_per),
    INDEX(email_per)
);

CREATE TABLE pets_heaven.otorgar_roles(
    id_rol INT NOT NULL COMMENT 'ID del rol otorgado',
    id_per INT NOT NULL COMMENT 'ID de la persona',
    fec_oto DATE DEFAULT(CURRENT_DATE()) NOT NULL COMMENT 'Fecha de otorgamiento',
    PRIMARY KEY(id_rol, id_per),
    FOREIGN KEY(id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_per) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX(id_rol),
    INDEX(id_per)
);

CREATE TABLE pets_heaven.categorias_veterinario(
    id_cat INT AUTO_INCREMENT PRIMARY KEY NOT NULL COMMENT 'ID de la categoría',
    nom_cat VARCHAR(100) NOT NULL COMMENT 'Nombre de la categoría'
);

CREATE TABLE pets_heaven.veterinarios(
    id_vet INT PRIMARY KEY COMMENT 'ID del veterinario (persona)',
    especialidad VARCHAR(100) NOT NULL COMMENT 'Especialidad del veterinario',
    horarios VARCHAR(100) NOT NULL COMMENT 'Horarios de atención',
    num_tar_vet VARCHAR(100) DEFAULT("no-registrado") NOT NULL COMMENT 'Número de tarjeta profesional',
    fot_tar_vet TEXT DEFAULT("no-registrado") NOT NULL COMMENT 'Foto de la tarjeta profesional',
    INDEX(id_vet),
    FOREIGN KEY(id_vet) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pets_heaven.otorgar_categoria_vet(
    id_cat INT NOT NULL COMMENT 'ID de la categoría',
    id_vet INT NOT NULL COMMENT 'ID del veterinario',
    fec_oto DATE DEFAULT(CURRENT_DATE()) NOT NULL COMMENT 'Fecha de otorgamiento',
    PRIMARY KEY(id_cat, id_vet),
    FOREIGN KEY(id_cat) REFERENCES categorias_veterinario(id_cat) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_vet) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX(id_cat),
    INDEX(id_vet)
);

CREATE TABLE pets_heaven.mascotas(
    id_mas INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la mascota',
    nom_mas VARCHAR(100) NOT NULL COMMENT 'Nombre de la mascota',
    esp_mas VARCHAR(100) NOT NULL COMMENT 'Especie de la mascota',
    col_mas VARCHAR(100) NOT NULL COMMENT 'Color de la mascota',
    raz_mas VARCHAR(100) NOT NULL COMMENT 'Raza de la mascota',
    ali_mas VARCHAR(100) NOT NULL COMMENT 'Alimentación de la mascota',
    fec_nac_mas DATE NOT NULL COMMENT 'Fecha de nacimiento de la mascota',
    pes_mas FLOAT(12,2) UNSIGNED NOT NULL COMMENT 'Peso de la mascota',
    gen_mas VARCHAR(20) NOT NULL COMMENT 'Género de la mascota',
    id_pro_mas INT NOT NULL COMMENT 'ID del propietario',
    est_rep_mas VARCHAR(100) NOT NULL COMMENT 'Estado reproductivo',
    estado BOOLEAN DEFAULT(1) NOT NULL COMMENT 'Estado activo/inactivo',
    fot_mas TEXT NOT NULL COMMENT 'Foto de la mascota',
    fec_cre_mas DATE DEFAULT(CURRENT_DATE()) NOT NULL COMMENT 'Fecha de creación del registro',
    INDEX(nom_mas),
    INDEX(id_pro_mas),
    FOREIGN KEY(id_pro_mas) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pets_heaven.categorias_servicios (
    id_cat INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la categoría de servicio',
    nom_cat VARCHAR(100) NOT NULL COMMENT 'Nombre de la categoría',
    slug VARCHAR(100) UNIQUE NOT NULL COMMENT 'Versión normalizada y simplificada del nombre',
    des_cat TEXT COMMENT 'Descripción de la categoría',
    col_hex VARCHAR(7) DEFAULT '#4b8ef5' COMMENT 'Color de la categoría',
    sta_cat BOOLEAN DEFAULT 1 COMMENT 'Estado activo/inactivo',
    img_cat TEXT DEFAULT('No-Registrado') NOT NULL COMMENT 'Imagen de la categoría',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización',
    INDEX(nom_cat),
    INDEX(sta_cat)
);

CREATE TABLE pets_heaven.tipos_servicios (
    id_tip_ser INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del tipo de servicio',
    cat_tip_ser INT NOT NULL COMMENT 'ID de la categoría del tipo de servicio',
    nom_tip_ser VARCHAR(100) NOT NULL COMMENT 'Nombre del tipo de servicio',
    des_tip_ser TEXT NOT NULL COMMENT 'Descripción del tipo de servicio',
    tec_des_tip_ser TEXT NOT NULL COMMENT 'Descripción técnica del tipo de servicio',
    sta_tip_ser BOOLEAN DEFAULT 1 COMMENT 'Estado del tipo de servicio',
    req_equ_esp BOOLEAN DEFAULT 0 COMMENT 'Define si requiere equipo especial',
    dur_min_tip_ser INT COMMENT 'Duración mínima del servicio en horas',
    FOREIGN KEY (cat_tip_ser) REFERENCES categorias_servicios(id_cat) ON UPDATE CASCADE ON DELETE CASCADE,
    INDEX(cat_tip_ser),
    INDEX(nom_tip_ser)
);

CREATE TABLE pets_heaven.servicios (
    id_ser INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del servicio',
    tip_ser INT NOT NULL COMMENT 'ID del tipo de servicio',
    nom_ser VARCHAR(100) NOT NULL COMMENT 'Nombre del servicio',
    des_ser TEXT NOT NULL COMMENT 'Descripción del servicio',
    pre_ser DECIMAL(10,2) NOT NULL COMMENT 'Precio base del servicio',
    pre_act_ser DECIMAL(10,2) NOT NULL COMMENT 'Precio actual del servicio',
    cos_est_ser DECIMAL(10,2) COMMENT 'Costo estimado del servicio',
    sta_ser ENUM('DISPONIBLE', 'NO_DISPONIBLE', 'TEMPORAL') DEFAULT 'DISPONIBLE' COMMENT 'Estado del servicio',
    req TEXT DEFAULT 'No-registrado' COMMENT 'Requisitos previos para el servicio',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización',
    FOREIGN KEY (tip_ser) REFERENCES tipos_servicios(id_tip_ser) ON UPDATE CASCADE ON DELETE CASCADE,
    INDEX(tip_ser),
    INDEX(nom_ser),
    INDEX(pre_act_ser)
);

CREATE TABLE pets_heaven.procedimientos (
    id_pro INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del procedimiento',
    nom_pro VARCHAR(100) NOT NULL COMMENT 'Nombre del procedimiento',
    des_pro TEXT NOT NULL COMMENT 'Descripción del procedimiento',
    cat_pro INT NOT NULL COMMENT 'ID de la categoría del procedimiento',
    niv_rie_pro ENUM('BAJO', 'MODERADO', 'ALTO', 'CRITICO') COMMENT 'Nivel de riesgo del procedimiento',
    dur_min_pro INT COMMENT 'Duración mínima del procedimiento en minutos',
    pro_pro TEXT DEFAULT 'No-registrado' COMMENT 'Protocolo / Pasos del procedimiento',
    con_esp_pro TEXT DEFAULT 'No-registrado' COMMENT 'Consideraciones especiales',
    FOREIGN KEY (cat_pro) REFERENCES categorias_servicios(id_cat) ON UPDATE CASCADE ON DELETE CASCADE,
    INDEX(nom_pro),
    INDEX(cat_pro),
    INDEX(niv_rie_pro)
);
CREATE TABLE pets_heaven.servicios_procedimientos (
    id_ser INT NOT NULL COMMENT 'ID del servicio',
    id_pro INT NOT NULL COMMENT 'ID del procedimiento',
    es_principal BOOLEAN DEFAULT TRUE COMMENT 'Indica si el procedimiento es principal',
    ord_eje SMALLINT COMMENT 'Orden de ejecución del procedimiento',
    PRIMARY KEY (id_ser, id_pro),
    FOREIGN KEY (id_ser) REFERENCES servicios(id_ser) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_pro) REFERENCES procedimientos(id_pro) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE pets_heaven.tipos_pruebas (
    id_tip_pru INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID único del tipo de prueba',
    cod_tip_pru VARCHAR(20) UNIQUE NOT NULL COMMENT 'Código identificador de la prueba',
    nom_tip_pru VARCHAR(100) NOT NULL COMMENT 'Nombre del tipo de prueba',
    des_tip_pru TEXT DEFAULT 'No-registrado' COMMENT 'Descripción de la prueba',
    cat_tip_pru ENUM('HEMATOLOGIA', 'BIOQUIMICA', 'MICROBIOLOGIA', 'PATOLOGIA', 'GENETICA') NOT NULL COMMENT 'Categoría de la prueba',
    met_est_tip_pru VARCHAR(100) COMMENT 'Método estándar utilizado',
    tie_est_hrs_tip_pru INT COMMENT 'Tiempo estimado en horas para el resultado',
    cos_est_tip_pru DECIMAL(10,2) NOT NULL COMMENT 'Costo estimado en el resultado',
    ins_pre_tip_pru TEXT DEFAULT 'No-registrado' COMMENT 'Instrucciones de preparación para la prueba',
    par_ref_tip_pru TEXT DEFAULT 'No-registrado' COMMENT 'Parámetros de referencia',
    INDEX(cod_tip_pru),
    INDEX(cat_tip_pru)
);

CREATE TABLE pets_heaven.pruebas_laboratorio (
    id_pru_lab INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID único de la prueba de laboratorio',
    cod_ord_pru_lab VARCHAR(20) UNIQUE NOT NULL COMMENT 'Código de orden de la prueba',
    id_mas_pru_lab INT NOT NULL COMMENT 'ID de la mascota',
    id_vet_sol_pru_lab INT NOT NULL COMMENT 'ID del veterinario solicitante',
    id_tip_pru_lab INT NOT NULL COMMENT 'ID del tipo de prueba',
    id_ser_pru_lab INT COMMENT 'ID del servicio asociado (opcional)',
    fec_sol_pru_lab DATETIME NOT NULL COMMENT 'Fecha y hora de solicitud de la prueba',
    fec_mue_pru_lab DATETIME COMMENT 'Fecha y hora de toma de muestra',
    fec_pro_pru_lab DATETIME COMMENT 'Fecha y hora de procesamiento de la muestra',
    fec_res_pru_lab DATETIME COMMENT 'Fecha y hora de resultado disponible',
    est_pru_lab ENUM('REGISTRADO', 'MUESTRA_TOMADA', 'EN_PROCESO', 'COMPLETADO', 'ENTREGADO', 'CANCELADO') DEFAULT 'REGISTRADO' COMMENT 'Estado de la prueba',
    pri_pru_lab ENUM('ROUTINA', 'URGENTE', 'STAT') DEFAULT 'ROUTINA' COMMENT 'Prioridad de la prueba',
    obs_mue_pru_lab TEXT COMMENT 'Observaciones sobre la muestra',
    cos_fin_pru_lab DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Costo final de la prueba',
    res_pru_lab TEXT DEFAULT 'No-registrado' COMMENT 'Resultados de la prueba en formato',
    id_vet_rev_pru_lab INT COMMENT 'ID del veterinario revisor',
    FOREIGN KEY (id_mas_pru_lab) REFERENCES mascotas(id_mas) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_vet_sol_pru_lab) REFERENCES veterinarios(id_vet) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_tip_pru_lab) REFERENCES tipos_pruebas(id_tip_pru) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_ser_pru_lab) REFERENCES servicios(id_ser) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_vet_rev_pru_lab) REFERENCES veterinarios(id_vet) ON UPDATE CASCADE ON DELETE CASCADE,
    INDEX(id_mas_pru_lab),
    INDEX(fec_sol_pru_lab),
    INDEX(fec_res_pru_lab),
    INDEX(est_pru_lab)
);

CREATE TABLE pets_heaven.consultorios (
    id_con INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID único del consultorio',
    cod_con VARCHAR(10) UNIQUE NOT NULL COMMENT 'Código identificador del consultorio',
    nom_con VARCHAR(100) NOT NULL COMMENT 'Nombre del consultorio',
    des_con TEXT DEFAULT 'No-registrado' COMMENT 'Descripción del consultorio',
    tip_con ENUM('CONSULTA', 'CIRUGIA', 'HOSPITALIZACION', 'LABORATORIO', 'IMAGENES') NOT NULL COMMENT 'Tipo de consultorio',
    equ_con TEXT DEFAULT 'No-registrado' COMMENT 'Equipamiento disponible en formato JSON',
    cap_con INT DEFAULT 1 COMMENT 'Capacidad máxima del consultorio',
    est_con BOOLEAN DEFAULT 1 COMMENT 'Estado de actividad del consultorio',
    INDEX(tip_con)
);

CREATE TABLE pets_heaven.citas (
    id_cit INT AUTO_INCREMENT COMMENT 'ID de la cita',
    fec_reg_cit DATE DEFAULT(CURRENT_DATE()) NOT NULL COMMENT 'Fecha de registro de la cita',
    fec_cit DATE NOT NULL COMMENT 'Fecha de la cita',
    hor_ini_cit TIME NOT NULL COMMENT 'Hora de inicio de la cita',
    hor_fin_cit TIME NOT NULL COMMENT 'Hora de fin de la cita',
    mot_cit TEXT DEFAULT 'No-registrado' COMMENT 'Motivo de la consulta',
    est_cit ENUM('PENDIENTE', 'CONFIRMADA', 'EN_PROGRESO', 'COMPLETADA', 'CANCELADA', 'NO_ASISTIO') NOT NULL COMMENT 'Estado de la cita',
    fec_cre_cit TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
    fec_act_cit TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización',
    con_cit INT NOT NULL COMMENT 'ID del consultorio',
    ser_cit INT NOT NULL COMMENT 'ID del servicio',
    vet_cit INT NOT NULL COMMENT 'ID del veterinario',
    mas_cit INT NOT NULL COMMENT 'ID de la mascota',
    PRIMARY KEY (id_cit, mas_cit),
    FOREIGN KEY (con_cit) REFERENCES consultorios(id_con) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (ser_cit) REFERENCES servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (vet_cit) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (mas_cit) REFERENCES mascotas(id_mas) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX(est_cit),
    INDEX(con_cit),
    INDEX(ser_cit),
    INDEX(vet_cit),
    INDEX(mas_cit)
);

CREATE TABLE pets_heaven.vacunas (
    id_vac INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la vacuna',
    nom_vac VARCHAR(255) NOT NULL COMMENT 'Nombre de la vacuna',
    efe_sec_vac VARCHAR(255) NOT NULL COMMENT 'Efectos secundarios de la vacuna',
    cat_vac VARCHAR(100) NOT NULL COMMENT 'Categoría de la vacuna',
    dos_rec_cac_vac VARCHAR(100) NOT NULL COMMENT 'Dosis recomendada cachorro',
    dos_rec_adu_vac VARCHAR(100) NOT NULL COMMENT 'Dosis recomendada adulto',
    dos_rec_adu_jov_vac VARCHAR(100) NOT NULL COMMENT 'Dosis recomendada adulto joven',
    lot_vac VARCHAR(255) UNIQUE NOT NULL COMMENT 'Lote de la vacuna',
    fec_ven_vac DATE NOT NULL COMMENT 'Fecha de vencimiento',
    fec_cre_vac DATE NOT NULL COMMENT 'Fecha de creación',
    fre_vac INT NOT NULL COMMENT 'Frecuencia de vacunación en días',
    des_vac TEXT DEFAULT 'No-registrado' COMMENT 'Descripción de la vacuna',
    pre_vac DECIMAL(10,2) NOT NULL COMMENT 'Precio de la vacuna',
    sta_vac BOOLEAN DEFAULT 1 NOT NULL COMMENT 'Estado de la vacuna (disponible / no disponible)',
    pro_vac INT NOT NULL COMMENT 'ID del procedimiento asociado',
    FOREIGN KEY (pro_vac) REFERENCES procedimientos(id_pro) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX(nom_vac),
    INDEX(cat_vac),
    INDEX(lot_vac),
    INDEX(pro_vac),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización'
);

CREATE TABLE pets_heaven.vacunacion (
    id_vacn INT COMMENT 'ID de la vacuna',
    id_cit_vacn INT COMMENT 'ID de la cita',
    fec_vacn TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de vacunación',
    PRIMARY KEY (id_vacn, id_cit_vacn),
    FOREIGN KEY (id_vacn) REFERENCES vacunas(id_vac) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_cit_vacn) REFERENCES citas(id_cit) ON UPDATE CASCADE ON DELETE CASCADE,
    INDEX(id_vacn),
    INDEX(id_cit_vacn)
);

CREATE TABLE pets_heaven.motivos_consultas (
    id_mot_con INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del motivo de consulta',
    mot_con TEXT NOT NULL COMMENT 'Motivo de consulta'
);

CREATE TABLE pets_heaven.tratamientos_consultas (
    id_tra_con INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del tratamiento aplicado',
    nom_tra_con VARCHAR(100) NOT NULL COMMENT 'Tratamiento aplicado',
    des_tra_con TEXT NOT NULL COMMENT 'Descripción del tratamiento',
    INDEX(nom_tra_con)
);

CREATE TABLE pets_heaven.consultas (
    id_con INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la consulta',
    pes_mas_con DECIMAL(5,2) COMMENT 'Peso en kg',
    tem_mas_con SMALLINT COMMENT 'Temperatura en °C',
    dia_con TEXT COMMENT 'Diagnóstico',
    med_con TEXT COMMENT 'Medicamentos recetados',
    fec_con DATE DEFAULT(CURRENT_DATE()) NOT NULL COMMENT 'Fecha de la consulta',
    mot_con INT NOT NULL COMMENT 'ID del motivo de consulta',
    tra_con INT NOT NULL COMMENT 'ID del tratamiento aplicado',
    cit_con INT NOT NULL COMMENT 'ID de la cita asociada',
    FOREIGN KEY (mot_con) REFERENCES motivos_consultas(id_mot_con) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (tra_con) REFERENCES tratamientos_consultas(id_tra_con) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (cit_con) REFERENCES citas(id_cit) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX(fec_con),
    INDEX(mot_con),
    INDEX(tra_con),
    INDEX(cit_con)
);