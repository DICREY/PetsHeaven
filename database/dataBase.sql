-- Active: 1746130779175@@127.0.0.1@3306@pets_heaven
DROP DATABASE IF EXISTS pets_heaven;
CREATE DATABASE IF NOT EXISTS pets_heaven;

/* USERS  */
CREATE TABLE pets_heaven.roles(
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nom_rol VARCHAR(100) NOT NULL,
    fot_rol TEXT DEFAULT("https://imgs.search.brave.com/rL6dnhwCDXLvz02lsRs2QjVj1F8o-8D0o4pTYhmHah8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2M4L01h/cmllX0N1cmllX2Mu/XzE5MjBzLmpwZy81/MTJweC1NYXJpZV9D/dXJpZV9jLl8xOTIw/cy5qcGc") NOT NULL
);

CREATE TABLE pets_heaven.permisos(
    id_pem INT AUTO_INCREMENT PRIMARY KEY,
    nom_pem VARCHAR(100) NOT NULL
);

/* DIVIDIR USUARIOS EN DOS TABLAS USUARIOS Y PERSONAS LOS USUARIOS TENDRAN LA INFORMACION RELEVANTE CON LA AUTENTICACION Y LAS PERSONAS EL RESTO DE INFORMACION */
CREATE TABLE pets_heaven.personas(
    id_per INT AUTO_INCREMENT PRIMARY KEY,
    nom_per VARCHAR(100) NOT NULL,
    ape_per VARCHAR(100) NOT NULL,
    fec_nac_per DATE NOT NULL,
    tip_doc_per VARCHAR(10) NOT NULL,
    doc_per VARCHAR(20) UNIQUE NOT NULL,INDEX(doc_per),
    dir_per VARCHAR(100) NOT NULL,
    cel_per VARCHAR(20) NOT NULL,
    cel2_per VARCHAR(20),
    email_per VARCHAR(100) UNIQUE NOT NULL,INDEX(email_per),
    cont_per VARCHAR(255) NOT NULL,
    gen_per VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT(1) NOT NULL,
    fec_cre_per DATE DEFAULT(NOW()) NOT NULL
);

CREATE TABLE pets_heaven.otorgar_roles(
    id_rol INT NOT NULL,INDEX(id_rol),FOREIGN KEY(id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE ON UPDATE CASCADE,
    id_per INT NOT NULL,INDEX(id_per),FOREIGN KEY(id_per) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    fec_oto DATE DEFAULT(NOW()) NOT NULL,
    PRIMARY KEY(id_rol,id_per)
);

CREATE TABLE pets_heaven.otorgar_permisos(
    id_pem INT NOT NULL,INDEX(id_pem),FOREIGN KEY(id_pem) REFERENCES permisos(id_pem) ON DELETE CASCADE ON UPDATE CASCADE,
    id_per INT NOT NULL,INDEX(id_per),FOREIGN KEY(id_per) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    fec_oto DATE DEFAULT(NOW()) NOT NULL,
    PRIMARY KEY(id_pem,id_per)
);

CREATE TABLE pets_heaven.categorias_veterinario(
    id_cat INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nom_cat VARCHAR(100) NOT NULL
);

CREATE TABLE pets_heaven.otorgar_categoria_vet(
    id_cat INT NOT NULL,INDEX(id_cat),FOREIGN KEY(id_cat) REFERENCES categorias_veterinario(id_cat) ON DELETE CASCADE ON UPDATE CASCADE,
    id_per INT NOT NULL,INDEX(id_per),FOREIGN KEY(id_per) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    fec_oto DATE DEFAULT(NOW()) NOT NULL,
    PRIMARY KEY(id_cat,id_per)
);

CREATE TABLE pets_heaven.veterinarios(
    id_vet INT PRIMARY KEY,INDEX(id_vet),FOREIGN KEY(id_vet)  REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    especialidad VARCHAR(100) NOT NULL,
    horarios VARCHAR(100) NOT NULL,
    num_tar_vet VARCHAR(100) DEFAULT("no-registrado") NOT NULL,
    fot_tar_vet TEXT DEFAULT("no-registrado") NOT NULL,
    fot_vet TEXT DEFAULT("https://img.freepik.com/vector-gratis/lindo-perro-medico-estetoscopio-dibujos-animados-vector-icono-ilustracion-animal-salud-icono-aislado_138676-5182.jpg") NOT NULL
);

/* PETS  */
CREATE TABLE pets_heaven.mascotas(
    id_mas INT AUTO_INCREMENT PRIMARY KEY,
    nom_mas VARCHAR(100) NOT NULL,
    esp_mas VARCHAR(100) NOT NULL,
    col_mas VARCHAR(100) NOT NULL,
    raz_mas VARCHAR(100) NOT NULL,
    ali_mas VARCHAR(100) NOT NULL,
    fec_nac_mas DATE NOT NULL,
    pes_mas FLOAT(12,2) UNSIGNED NOT NULL,
    gen_mas VARCHAR(20) NOT NULL,
    id_pro_mas INT NOT NULL,INDEX(id_pro_mas),FOREIGN KEY (id_pro_mas) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    est_rep_mas VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT(1) NOT NULL,
    fot_mas TEXT NOT NULL,
    fec_cre_mas DATE DEFAULT(NOW()) NOT NULL
);


CREATE TABLE pets_heaven.categorias_ser(
    id_cat INT AUTO_INCREMENT PRIMARY KEY,
    nom_cat VARCHAR(100) NOT NULL,INDEX(nom_cat)
);

CREATE TABLE pets_heaven.servicios(
    id_ser INT AUTO_INCREMENT PRIMARY KEY,
    cat_ser INT NOT NULL,INDEX(cat_ser), FOREIGN KEY(cat_ser) REFERENCES categorias_ser(id_cat) ON DELETE CASCADE ON UPDATE CASCADE,
    nom_ser VARCHAR(100) NOT NULL,
    pre_ser DECIMAL(10,2) NOT NULL,
    des_ser TEXT NOT NULL,
    tec_des_ser TEXT NOT NULL,  # Descripción tecnica
    img_ser TEXT NOT NULL,
    estado BOOLEAN DEFAULT(1) NOT NULL
);

CREATE TABLE pets_heaven.cirugias(
    id_cir INT AUTO_INCREMENT PRIMARY KEY,
    fec_cir DATE DEFAULT(NOW()) NOT NULL,
    res_cir VARCHAR(200),   # Resultados
    com_cir VARCHAR(200),   # complicacions
    obv_cir TEXT DEFAULT("No-Registrado") NOT NULL,  # Observaciones
    ser_cir INT NOT NULL,INDEX(ser_cir), FOREIGN KEY(ser_cir) REFERENCES servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE,
    vet_cir INT NOT NULL,INDEX(vet_cir),FOREIGN KEY(vet_cir) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE,
    mas_cir INT NOT NULL,INDEX(mas_cir),FOREIGN KEY(mas_cir) REFERENCES mascotas(id_mas) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pets_heaven.vacunas (
    id_vac INT AUTO_INCREMENT PRIMARY KEY,
    nom_vac VARCHAR(255) NOT NULL,INDEX(nom_vac),
    efe_sec_vac VARCHAR(255) NOT NULL,  # Efectos Secundarios
    cat_vac VARCHAR(100) NOT NULL,INDEX(cat_vac),
    dos_rec_vac VARCHAR(100) NOT NULL, # Dosis recomendada
    des_vac TEXT NOT NULL,
    des_tec_vac TEXT NOT NULL,
    lot_vac VARCHAR(255) NOT NULL,INDEX(cat_vac),
    fec_ven_vac DATE NOT NULL,
    pre_vac DECIMAL(10,2) NOT NULL,
    ser_vac INT NOT NULL,INDEX(ser_vac), FOREIGN KEY(ser_vac) REFERENCES servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pets_heaven.citas(
    id_cit INT AUTO_INCREMENT,
    fec_reg_cit DATE DEFAULT(NOW()) NOT NULL,
    fec_cit DATE NOT NULL,
    hor_ini_cit TIME NOT NULL,
    hor_fin_cit TIME NOT NULL,
    lug_ate_cit VARCHAR(100) NOT NULL COMMENT 'lugar de atención',
    ser_cit INT NOT NULL,INDEX(ser_cit),FOREIGN KEY(ser_cit) REFERENCES servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE,
    vet_cit INT NOT NULL,INDEX(vet_cit),FOREIGN KEY(vet_cit) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE,
    mas_cit INT NOT NULL,INDEX(mas_cit),FOREIGN KEY(mas_cit) REFERENCES mascotas(id_mas) ON DELETE CASCADE ON UPDATE CASCADE,
    estado ENUM("PENDIENTE","EN-ESPERA","CANCELADO","RECHAZADO","REALIZADO") NOT NULL,
    PRIMARY KEY (id_cit,mas_cit)
);


/* tablas aparte para evitar la insercion repetida de 'Motivo de consulta' y 'Tratamiento aplicado' */
CREATE TABLE pets_heaven.motivos_consultas(
    id_mot_con INT AUTO_INCREMENT PRIMARY KEY,
    mot_con TEXT NOT NULL COMMENT 'Motivo de consulta'
);
CREATE TABLE pets_heaven.tratamientos_consultas(
    id_tra_con INT AUTO_INCREMENT PRIMARY KEY,
    nom_tra_con VARCHAR(100) NOT NULL COMMENT 'Tratamiento aplicado',
    des_tra_con TEXT NOT NULL
);

CREATE TABLE pets_heaven.consultas(
    id_con INT AUTO_INCREMENT PRIMARY KEY,
    pes_mas_con DECIMAL(5,2) COMMENT 'Peso en kg',
    tem_mas_con SMALLINT COMMENT 'Temperatura en °C',
    dia_con TEXT COMMENT 'diagnostico',
    med_con TEXT COMMENT 'Medicamentos',
    fec_con DATE DEFAULT(NOW()) NOT NULL,INDEX(fec_con),
    mot_con INT NOT NULL,INDEX(mot_con),FOREIGN KEY (mot_con) REFERENCES motivos_consultas(id_mot_con) ON DELETE RESTRICT ON UPDATE CASCADE,
    nom_tra INT NOT NULL,INDEX(nom_tra),FOREIGN KEY (nom_tra) REFERENCES tratamientos_consultas(id_tra_con) ON DELETE RESTRICT ON UPDATE CASCADE,
    cit_con INT NOT NULL,INDEX (cit_con),FOREIGN KEY (cit_con) REFERENCES citas(id_cit) ON DELETE CASCADE ON UPDATE CASCADE,
    pro_mas_con INT NOT NULL,INDEX (pro_mas_con),FOREIGN KEY (pro_mas_con) REFERENCES personas(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    vet_con INT NOT NULL,INDEX (vet_con),FOREIGN KEY (vet_con) REFERENCES veterinarios(id_vet) ON DELETE RESTRICT ON UPDATE CASCADE,
    mas_con INT NOT NULL,INDEX (mas_con),FOREIGN KEY (mas_con) REFERENCES mascotas(id_mas) ON DELETE RESTRICT ON UPDATE CASCADE
);