-- Active: 1751161037637@@127.0.0.1@3306@pets_heaven
INSERT INTO pets_heaven.roles (nom_rol) VALUES
('Administrador'),
('Veterinario'),
('Usuario');

INSERT INTO pets_heaven.personas (nom_per, ape_per, fec_nac_per, tip_doc_per, doc_per, dir_per, cel_per, cel2_per, email_per, cont_per,gen_per,fot_per) VALUES
('Juan', 'Pérez',CURRENT_DATE(), 'CC', '12345678', 'Calle 123 #45-67', '3001234567', NULL, 'juan.perez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Masculino',DEFAULT),
('María', 'Gómez',CURRENT_DATE(), 'CC', '87654321', 'Av. Principal #12-34', '3102345678', '3203456789', 'maria.gomez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Femenino',DEFAULT),
('Carlos', 'Rodríguez',CURRENT_DATE(), 'CE', 'AB123456', 'Carrera 56 #78-90', '3154567890', NULL, 'carlos.rod@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Masculino',DEFAULT),
('Ana', 'Martínez',CURRENT_DATE(), 'CC', '11223344', 'Diagonal 34 #56-78', '3175678901', NULL, 'ana.martinez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Femenino',DEFAULT),
('Luis', 'García',CURRENT_DATE(), 'CC', '98765432', 'Transversal 12 #34-56', '3186789012', '3197890123', 'luis.garcia@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Masculino',DEFAULT),
('Nikola', 'Tesla',CURRENT_DATE(), 'CC', '1298765432', 'Trasversal 12 #34-56', '3186789012', '', 'admin@gmail.com', '$2b$15$P3DlhprB7vdchCiVoGq7SOrvG/ZOJyVVyTInPk7QZPbaKbUNPPQa6','Masculino','https://imgs.search.brave.com/JheS1cTjYH1Y1E7rp1FADfQDL9uXw20FxZAFfjZwEaY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2Q0L04uVGVzbGEu/SlBH'),
('Marie', 'Curie',CURRENT_DATE(), 'CC', '658790781', 'calle 12 #34-56', '3121141801', '', 'vet@gmail.com', '$2b$15$TDXtAUTWojmNW0MtBmCCQO4Y.6R9OzUAmg9QItKhQVqNUlOD/CTVe','Femenino','https://imgs.search.brave.com/rL6dnhwCDXLvz02lsRs2QjVj1F8o-8D0o4pTYhmHah8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2M4L01h/cmllX0N1cmllX2Mu/XzE5MjBzLmpwZy81/MTJweC1NYXJpZV9D/dXJpZV9jLl8xOTIw/cy5qcGc'),
('Thomas', 'Edison',CURRENT_DATE(), 'CC', '908990781', 'calle 34 #56', '3121141801', '', 'user@gmail.com', '$2b$15$qxcK9ianAu/jeuG1jBFGReW2iF6E7sfSyPho9ERGAtiJvqwb1MnNm','Masculino','https://imgs.search.brave.com/kWZPq0vRV5Hl9y9RS9CtH5o-SRhsHFZfA8twL1VUavI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9nZXR0/eWltYWdlcy02MTUz/MTI2MzQuanBnP2Ny/b3A9MXh3OjEuMHho/O2NlbnRlcix0b3Am/cmVzaXplPTY0MDoq'),
('Sofía', 'López', CURRENT_DATE(), 'CC', '55667788', 'Calle 89 #10-11', '3001122334', NULL, 'sofia.lopez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Femenino',DEFAULT),
('Pedro', 'Hernández', CURRENT_DATE(), 'CC', '99887766', 'Av. 68 #23-45', '3102233445', '3203344556', 'pedro.hernandez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Masculino',DEFAULT),
('Laura', 'Díaz', CURRENT_DATE(), 'CE', 'CD987654', 'Carrera 12 #34-56', '3154455667', NULL, 'laura.diaz@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Femenino',DEFAULT),
('Jorge', 'Sánchez', CURRENT_DATE(), 'CC', '33445566', 'Diagonal 78 #90-12', '3175566778', NULL, 'jorge.sanchez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Masculino',DEFAULT),
('Elena', 'Ramírez', CURRENT_DATE(), 'CC', '11223355', 'Transversal 45 #67-89', '3186677889', '3197788990', 'elena.ramirez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Femenino',DEFAULT),
('Ricardo', 'Torres', CURRENT_DATE(), 'CC', '66778899', 'Calle 34 #56-78', '3009988776', NULL, 'ricardo.torres@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Masculino',DEFAULT),
('Carmen', 'Vargas', CURRENT_DATE(), 'CC', '22334455', 'Av. 56 #78-90', '3108877665', '3207766554', 'carmen.vargas@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Femenino',DEFAULT),
('Fernando', 'Castro', CURRENT_DATE(), 'CE', 'EF654321', 'Carrera 78 #90-12', '3156655443', NULL, 'fernando.castro@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Masculino',DEFAULT),
('Patricia', 'Ortega', CURRENT_DATE(), 'CC', '77889900', 'Diagonal 12 #34-56', '3175544332', NULL, 'patricia.ortega@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Femenino',DEFAULT),
('Roberto', 'Mendoza', CURRENT_DATE(), 'CC', '88990011', 'Transversal 34 #56-78', '3184433221', '3193322110', 'roberto.mendoza@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Masculino',DEFAULT);
INSERT INTO pets_heaven.otorgar_roles (id_rol, id_per) VALUES
(1,1),
(2,1),
(3,1),
(1,2),
(2,2),
(3,2),
(1,3),
(2,3),
(3,3),
(2,4),
(1,5),
(2,5),
(3,5),
(1,6),
(2,6),
(3,6),
(2,7),
(3,7),
(3,8),
(3,9),
(3,10),
(3,11),
(3,12),
(3,13),
(3,14),
(3,15),
(3,16),
(3,17),
(3,18);

INSERT INTO pets_heaven.categorias_veterinario (nom_cat)
VALUES 
('Generalista'),
('Especialista en Cirugía'),
('Dermatología'),
('Cardiología'),
('Odontología');

INSERT INTO pets_heaven.veterinarios (id_vet, especialidad, horarios)
VALUES
(1, 'Generalista', 'Lunes a Viernes 9:00 - 18:00'),
(2, 'Cirujano', 'Lunes a Viernes 10:00 - 16:00'),
(3, 'Especialista en Dermatología', 'Martes a Jueves 9:00 - 14:00'),
(7, 'Cirujano', 'Lunes a Viernes 10:00 - 16:00'),
(6, 'Dermatologo', 'Martes a Jueves 9:00 - 14:00');

INSERT INTO pets_heaven.otorgar_categoria_vet (id_cat,id_vet)
VALUES
(1,1),
(2,2),
(3,3),
(2,7),
(3,6);
INSERT INTO pets_heaven.mascotas 
(nom_mas, esp_mas, col_mas, raz_mas, ali_mas, fec_nac_mas, pes_mas, gen_mas, id_pro_mas, est_rep_mas, fot_mas) VALUES
('Max', 'Perro', 'Marrón', 'Labrador Retriever', 'Purina Dog Chow', '2018-05-15', 28.5, 'M', 1, 'No esterilizado', 'https://www.javer-keleb.com/wp-content/uploads/2024/02/2.jpg'),
('Luna', 'Gato', 'Negro', 'Siamés', 'Whiskas', '2019-11-22', 4.2, 'F', 2, 'Esterilizado', 'https://elgatosiames.com/wp-content/uploads/2018/09/gato-negro.jpg'),
('Rocky', 'Perro', 'Blanco', 'Bulldog Francés', 'Royal Canin', '2020-03-10', 12.7, 'M', 3, 'No esterilizado', 'https://blog.dogfydiet.com/wp-content/uploads/2024/02/Preguntas-frecuentes-sobre-el-Bulldog-Frances-blanco-.jpg'),
('Bella', 'Gato', 'Gris', 'Persa', "Hill's Science Diet", '2017-07-30', 5.1, 'F', 4, 'Esterilizado', 'https://parcerosfelinos.com/wp-content/uploads/2020/06/parceros-6.jpg'),
('Charlie', 'Perro', 'Dorado', 'Golden Retriever', 'Pedigree', '2019-01-25', 32.0, 'M', 5, 'No esterilizado', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPq2Bq0BvX-vNuOnoo4ruQA1sBuWdNru7Tw&s'),
('Milo', 'Gato', 'Atigrado', 'Mestizo', 'Friskies', '2021-02-14', 3.8, 'M', 1, 'No esterilizado', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Female_European_shorthair_in_cat_show_Helsinki_2005-07-31.JPG/320px-Female_European_shorthair_in_cat_show_Helsinki_2005-07-31.JPG'),
('Lucy', 'Perro', 'Blanco y Negro', 'Border Collie', 'Eukanuba', '2016-09-05', 20.3, 'F', 2, 'Esterilizado', 'https://ventadecachorros.com.co/wp-content/uploads/2020/10/cachorros-border-collie-hembras-y-machos-D_NQ_NP_886207-MCO33051173463_112019-F.jpg'),
('Oliver', 'Gato', 'Naranja', 'Maine Coon', 'Blue Buffalo', '2018-12-18', 7.5, 'M', 3, 'Esterilizado', ''),
('Daisy', 'Perro', 'Crema', 'Poodle', 'Nutro', '2020-06-08', 6.8, 'F', 4, 'No esterilizado', 'https://img.freepik.com/fotos-premium/lindo-cachorro-caniche-crema-poco-peludo_126745-916.jpg'),
('Leo', 'Perro', 'Negro y Fuego', 'Doberman', 'Canidae', '2017-04-20', 34.2, 'M', 5, 'Esterilizado', 'https://tucachorrotienda.com/wp-content/uploads/2019/12/doberman-cachorro5.jpg'),
('Toby', 'Perro', 'Blanco', 'Bichón Frisé', 'Purina Pro Plan', '2020-08-12', 5.2, 'M', 6, 'Esterilizado', ''),
('Mía', 'Gato', 'Calicó', 'Mestizo', 'Whiskas', '2019-04-25', 3.9, 'F', 7, 'No esterilizado', ''),
('Thor', 'Perro', 'Negro', 'Rottweiler', 'Royal Canin', '2018-11-30', 45.0, 'M', 8, 'No esterilizado', ''),
('Lola', 'Gato', 'Blanco', 'Angora Turco', 'Hill\'s Science Diet', '2021-01-15', 4.5, 'F', 9, 'Esterilizado', ''),
('Bruno', 'Perro', 'Marrón', 'Beagle', 'Pedigree', '2019-07-20', 15.3, 'M', 10, 'No esterilizado', ''),
('Nina', 'Gato', 'Gris', 'Británico de Pelo Corto', 'Friskies', '2020-03-05', 5.8, 'F', 6, 'Esterilizado', ''),
('Zeus', 'Perro', 'Negro', 'Pastor Alemán', 'Eukanuba', '2017-12-10', 38.7, 'M', 7, 'Esterilizado', ''),
('Luna', 'Gato', 'Blanco', 'Ragdoll', 'Blue Buffalo', '2021-05-18', 6.2, 'F', 8, 'No esterilizado', ''),
('Rex', 'Perro', 'Marrón', 'Boxer', 'Nutro', '2018-09-22', 30.5, 'M', 9, 'Esterilizado', ''),
('Molly', 'Gato', 'Negro', 'Sphynx', 'Canidae', '2020-10-30', 3.5, 'F', 10, 'No esterilizado', ''),
('Rocky', 'Perro', 'Blanco', 'Bull Terrier', 'Purina Dog Chow', '2019-06-14', 25.8, 'M', 6, 'No esterilizado', ''),
('Chloe', 'Gato', 'Gris', 'Scottish Fold', 'Whiskas', '2021-02-28', 4.1, 'F', 7, 'Esterilizado', ''),
('Max', 'Perro', 'Negro', 'Dálmata', 'Royal Canin', '2018-04-17', 28.3, 'M', 8, 'No esterilizado', ''),
('Bella', 'Gato', 'Blanco', 'Persa', 'Hill\'s Science Diet', '2020-11-09', 5.5, 'F', 9, 'Esterilizado', ''),
('Simba', 'Perro', 'Dorado', 'Labrador Retriever', 'Pedigree', '2019-08-25', 31.2, 'M', 10, 'No esterilizado', ''),
('Lily', 'Gato', 'Atigrado', 'Maine Coon', 'Friskies', '2020-07-03', 7.8, 'F', 6, 'No esterilizado', ''),
('Toby', 'Perro', 'Blanco y Negro', 'Border Collie', 'Eukanuba', '2017-10-12', 21.5, 'M', 7, 'Esterilizado', ''),
('Mia', 'Gato', 'Naranja', 'Mestizo', 'Blue Buffalo', '2021-04-20', 4.3, 'F', 8, 'No esterilizado', ''),
('Bruno', 'Perro', 'Crema', 'Caniche', 'Nutro', '2020-09-15', 7.2, 'M', 9, 'Esterilizado', ''),
('Lola', 'Gato', 'Negro', 'Bombay', 'Canidae', '2019-12-24', 4.0, 'F', 10, 'Esterilizado', '');

INSERT INTO pets_heaven.categorias_servicios 
(nom_cat, slug, des_cat, col_hex, img_cat) 
VALUES
('Consulta General', 'consulta-general', 'Servicios de consulta y diagnóstico básico', '#4b8ef5', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/consulta.jpg'),
('Vacunación', 'vacunacion', 'Programas de inmunización para mascotas', '#2ecc71', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/vacunacion.jpg'),
('Cirugía', 'cirugia', 'Procedimientos quirúrgicos para mascotas', '#e74c3c', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/cirugia.jpg'),
('Laboratorio', 'laboratorio', 'Pruebas diagnósticas y análisis clínicos', '#9b59b6', 'https://example.com/img/laboratorio.jpg'),
('Estética', 'estetica', 'Servicios de belleza y cuidado para mascotas', '#f39c12', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/ba%C3%B1o.jpg'),
('Emergencias', 'emergencias', 'Atención médica urgente 24/7', '#e74c3c', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/urgencias.jpg');
INSERT INTO pets_heaven.tipos_servicios 
(cat_tip_ser, nom_tip_ser, des_tip_ser, tec_des_cat, req_equ_esp, dur_min_tip_ser) 
VALUES
(1, 'Consulta Preventiva', 'Revisión general de salud', 'Examen físico completo, revisión de historial médico', FALSE, 1),
(1, 'Consulta Especializada', 'Consulta con veterinario especialista', 'Evaluación detallada por especialidad', FALSE, 1),
(2, 'Vacunación Básica', 'Vacunas esenciales para mascotas', 'Protocolo estándar de vacunación', FALSE, 1),
(2, 'Vacunación Premium', 'Vacunación completa con refuerzos', 'Incluye todas las vacunas y seguimiento', FALSE, 1),
(3, 'Castración', 'Procedimiento de esterilización', 'Anestesia general, procedimiento estéril', TRUE, 2),
(3, 'Cirugía Mayor', 'Intervenciones quirúrgicas complejas', 'Equipo quirúrgico completo, monitoreo', TRUE, 4),
(4, 'Análisis de Sangre', 'Perfil bioquímico completo', 'Toma de muestra sanguínea, análisis automatizado', TRUE, 24),
(4, 'Examen Coprológico', 'Análisis de muestras fecales', 'Examen microscópico para parásitos', TRUE, 24),
(5, 'Baño Completo', 'Limpieza y cuidado básico', 'Shampoo especializado, secado profesional', FALSE, 2),
(5, 'Corte de Pelo', 'Estilizado profesional', 'Técnicas según raza y estándares', FALSE, 2),
(6, 'Urgencia Básica', 'Atención inmediata para casos no críticos', 'Evaluación primaria, estabilización', TRUE, 1),
(6, 'Trauma Crítico', 'Atención para emergencias graves', 'Equipo de trauma, monitoreo constante', TRUE, 3);

INSERT INTO pets_heaven.servicios 
(tip_ser, nom_ser, des_ser, pre_ser, pre_act_ser, cos_est_ser, req) 
VALUES
(1, 'Chequeo Anual', 'Revisión completa de salud anual', 50.00, 45.00, 20.00, 'Mascota en ayunas de 4 horas'),
(1, 'Consulta Dermatológica', 'Evaluación especializada de piel', 65.00, 65.00, 30.00, 'No bañar 48h antes'),
(2, 'Consulta Cardiológica', 'Evaluación cardíaca especializada', 80.00, 80.00, 40.00, 'Traer historial médico'),
(3, 'Vacuna Triple Felina', 'Protección contra panleucopenia, calicivirus y rinotraqueitis', 35.00, 35.00, 15.00, 'Mascota saludable'),
(4, 'Vacuna Antirrábica', 'Protección contra la rabia', 40.00, 40.00, 18.00, 'Mascota mayor de 3 meses'),
(5, 'Castración Canina', 'Esterilización para perros', 150.00, 140.00, 70.00, 'Ayuno de 12h antes'),
(6, 'Extracción de Cuerpo Extraño', 'Remoción quirúrgica de objetos ingeridos', 300.00, 300.00, 150.00, 'Estabilización previa'),
(7, 'Perfil Bioquímico Completo', 'Análisis de 12 parámetros sanguíneos', 60.00, 60.00, 25.00, 'Ayuno de 8h'),
(8, 'Examen Parasitológico', 'Detección de parásitos intestinales', 25.00, 25.00, 10.00, 'Muestra fresca'),
(9, 'Baño Medicado', 'Baño con shampoo especial para condiciones dermatológicas', 45.00, 45.00, 20.00, 'No requisitos'),
(10, 'Corte de Raza', 'Estilizado profesional según estándar de raza', 55.00, 55.00, 25.00, 'Cepillado previo'),
(11, 'Atención de Urgencia', 'Evaluación y estabilización inicial', 90.00, 90.00, 45.00, 'Ninguno'),
(12, 'Reanimación', 'Atención crítica para pacientes graves', 200.00, 200.00, 100.00, 'Ninguno');

INSERT INTO pets_heaven.procedimientos 
(nom_pro, des_pro, cat_pro, niv_rie_pro, dur_min_pro, pro_pro, con_esp_pro) 
VALUES
('Examen Físico', 'Evaluación general de salud', 1, 'BAJO', 30, '1. Inspección visual\n2. Palpación\n3. Auscultación', 'Mascota debe estar calmada'),
('Vacunación SC', 'Administración subcutánea de vacuna', 2, 'BAJO', 15, '1. Preparar vacuna\n2. Desinfectar zona\n3. Inyectar', 'Observar reacciones alérgicas'),
('Ovariohisterectomía', 'Esterilización de hembras', 3, 'MODERADO', 90, '1. Anestesia\n2. Asepsia\n3. Incisión\n4. Ligadura', 'Manejo postquirúrgico del dolor'),
('Intubación', 'Manejo de vía aérea', 1, 'ALTO', 10, '1. Preparar equipo\n2. Posicionar\n3. Visualizar cuerdas\n4. Insertar tubo', 'Requiere monitorización constante'),
('Toma de Muestra Sanguínea', 'Obtención de sangre para análisis', 4, 'BAJO', 10, '1. Localizar vena\n2. Desinfectar\n3. Extraer muestra\n4. Presionar', 'Evitar hemólisis'),
('Limpieza Dental', 'Profilaxis dental completa', 5, 'MODERADO', 60, '1. Anestesia\n2. Remoción de sarro\n3. Pulido\n4. Fluoruro', 'Evaluar extracciones necesarias'),
('Radiografía', 'Imagen diagnóstica por rayos X', 1, 'BAJO', 30, '1. Posicionar\n2. Proteger\n3. Tomar imagen\n4. Revelar', 'Minimizar exposición');

INSERT INTO pets_heaven.servicios_procedimientos 
(id_ser, id_pro, es_principal, ord_eje) 
VALUES
(1, 1, TRUE, 1),
(2, 1, TRUE, 1),
(4, 2, TRUE, 1),
(5, 2, TRUE, 1),
(6, 3, TRUE, 1),
(7, 3, FALSE, 2),
(8, 5, TRUE, 1),
(9, 5, FALSE, 1),
(11, 1, TRUE, 1),
(12, 4, TRUE, 1),
(12, 1, FALSE, 2);

INSERT INTO pets_heaven.tipos_pruebas 
(cod_tip_pru, nom_tip_pru, des_tip_pru, cat_tip_pru, met_est_tip_pru, tie_est_hrs_tip_pru, ins_pre_tip_pru, par_ref_tip_pru) 
VALUES
('HEM-001', 'Hemograma Completo', 'Evaluación de células sanguíneas', 'HEMATOLOGIA', 'Automated hematology analyzer', 2, 'Ayuno de 8 horas', 'WBC: 6-17 x10³/μL, RBC: 5.5-8.5 x10⁶/μL'),
('BIO-002', 'Perfil Renal', 'Evaluación función renal', 'BIOQUIMICA', 'Espectrofotometría', 24, 'Ayuno de 12 horas', 'BUN: 10-30 mg/dL, Creat: 0.5-1.8 mg/dL'),
('MIC-003', 'Cultivo Bacteriano', 'Identificación de bacterias', 'MICROBIOLOGIA', 'Medios de cultivo', 72, 'Muestra estéril', 'Reporte cualitativo'),
('PAT-004', 'Citología', 'Evaluación celular', 'PATOLOGIA', 'Tinción Wright-Giemsa', 48, 'Muestra fresca', 'Interpretación patológica'),
('GEN-005', 'Test de ADN', 'Pruebas genéticas', 'GENETICA', 'PCR en tiempo real', 168, 'Hisopado bucal', 'Resultado positivo/negativo'),
('BIO-006', 'Perfil Hepático', 'Evaluación función hepática', 'BIOQUIMICA', 'Espectrofotometría', 24, 'Ayuno de 12 horas', 'ALT: 10-100 U/L, ALP: 20-150 U/L');

INSERT INTO pets_heaven.pruebas_laboratorio 
(cod_ord_pru_lab, id_mas_pru_lab, id_vet_sol_pru_lab, id_tip_pru_lab, id_ser_pru_lab, fec_sol_pru_lab, fec_mue_pru_lab, est_pru_lab, pri_pru_lab, res_pru_lab) 
VALUES
('LAB-2025-001', 1, 1, 1, 8, '2025-05-10 09:00:00', '2025-05-10 09:30:00', 'COMPLETADO', 'ROUTINA', 'WBC: 12.5 (H), RBC: 7.2, HCT: 45%'),
('LAB-2025-002', 2, 2, 2, NULL, '2025-05-11 10:00:00', '2025-05-11 10:15:00', 'ENTREGADO', 'URGENTE', 'BUN: 28, Creat: 1.6 - Función renal normal'),
('LAB-2025-003', 3, 1, 3, NULL, '2025-05-12 11:00:00', '2025-05-12 11:20:00', 'EN_PROCESO', 'ROUTINA', NULL),
('LAB-2025-004', 4, 3, 4, NULL, '2025-05-13 14:00:00', '2025-05-13 14:30:00', 'MUESTRA_TOMADA', 'ROUTINA', NULL),
('LAB-2025-005', 5, 2, 5, NULL, '2025-05-14 16:00:00', '2025-05-14 16:45:00', 'REGISTRADO', 'STAT', NULL);

INSERT INTO pets_heaven.consultorios 
(cod_con, nom_con, des_con, tip_con, equ_con, cap_con) 
VALUES
('CON-101', 'Consultorio General 101', 'Consultorio para atención básica', 'CONSULTA', '["Estetoscopio", "Termómetro", "Otoscopio"]', 1),
('CON-102', 'Consultorio Cirugía', 'Sala para procedimientos quirúrgicos', 'CIRUGIA', '["Mesa quirúrgica", "Anestesia", "Monitor vitales"]', 1),
('LAB-201', 'Laboratorio Clínico', 'Área de toma de muestras y análisis', 'LABORATORIO', '["Microscopio", "Centrífuga", "Analizador bioquímico"]', 2),
('EMG-301', 'Sala de Emergencias', 'Área para atención de urgencias', 'HOSPITALIZACION', '["Oxígeno", "Carro de emergencia", "Monitor multiparámetro"]', 1),
('EST-202', 'Sala de Estética', 'Área para baño y cuidado de mascotas', 'CONSULTA', '["Bañera", "Secador", "Mesa de trabajo"]', 1);

INSERT INTO pets_heaven.citas (
    fec_cit, hor_ini_cit, hor_fin_cit, mot_cit, est_cit, 
    con_cit, ser_cit, vet_cit, mas_cit
) VALUES
('2025-07-10', '09:00:00', '10:00:00', 'Chequeo anual rutinario', 'COMPLETADA', 1, 1, 1, 1),
('2025-07-13', '09:00:00', '10:00:00', 'Vacunación antirrábica', 'COMPLETADA', 1, 5, 2, 1),
('2025-07-10', '11:00:00', '12:30:00', 'Vacunación antirrábica', 'COMPLETADA', 1, 5, 2, 2),
('2025-07-15', '14:00:00', '15:00:00', 'Problemas dermatológicos', 'COMPLETADA', 1, 2, 6, 3),
('2025-07-15', '14:00:00', '15:00:00', 'Consulta cardiología', 'COMPLETADA', 1, 2, 1, 4),
('2025-07-15', '14:00:00', '15:00:00', 'Problemas dermatológicos', 'COMPLETADA', 1, 2, 6, 5),
('2025-07-15', '14:00:00', '15:00:00', 'Refuerzo vacunal', 'COMPLETADA', 1, 2, 2, 6),
('2025-07-15', '14:00:00', '15:00:00', 'Problemas dermatológicos', 'COMPLETADA', 1, 2, 6, 7),
('2025-07-15', '14:00:00', '15:00:00', 'Refuerzo vacunal', 'COMPLETADA', 1, 2, 2, 8),
('2025-07-15', '14:00:00', '15:00:00', 'Consulta cardiología', 'COMPLETADA', 1, 2, 1, 9),
('2025-07-15', '14:00:00', '15:00:00', 'Problemas dermatológicos', 'COMPLETADA', 1, 2, 3, 10),
('2025-07-15', '14:00:00', '15:00:00', 'Problemas dermatológicos', 'COMPLETADA', 1, 2, 3, 11),
('2025-08-05', '10:30:00', '12:00:00', 'Castración canina', 'CONFIRMADA', 2, 6, 2, 4),
('2025-08-12', '16:00:00', '17:00:00', 'Consulta cardiología', 'PENDIENTE', 1, 3, 1, 5),
('2025-08-20', '09:30:00', '10:00:00', 'Refuerzo vacunal', 'CONFIRMADA', 1, 4, 6, 1),
('2025-08-03', '13:00:00', '14:30:00', 'Cirugía de tumor mamario', 'CONFIRMADA', 2, 7, 7, 2),
('2025-08-08', '15:00:00', '16:00:00', 'Baño medicado', 'PENDIENTE', 5, 9, 3, 3),
('2025-08-18', '08:00:00', '09:00:00', 'Análisis de sangre completo', 'CONFIRMADA', 3, 8, 1, 4),
('2025-08-02', '11:00:00', '12:00:00', 'Control postoperatorio', 'PENDIENTE', 1, 1, 2, 5),
('2025-08-15', '17:00:00', '18:00:00', 'Emergencia - Vómitos persistentes', 'CONFIRMADA', 4, 12, 1, 1),
('2025-08-22', '10:00:00', '11:30:00', 'Corte de pelo según raza', 'PENDIENTE', 5, 10, 7, 2),
('2025-08-05', '14:30:00', '15:30:00', 'Consulta geriátrica', 'CONFIRMADA', 1, 1, 7, 3),
('2025-08-12', '09:00:00', '10:30:00', 'Extracción de cuerpo extraño', 'PENDIENTE', 2, 7, 2, 4),
('2025-08-19', '16:00:00', '17:00:00', 'Vacunación polivalente', 'CONFIRMADA', 1, 4, 7, 5),
('2025-09-07', '13:30:00', '15:00:00', 'Limpieza dental profesional', 'PENDIENTE', 2, 6, 2, 1),
('2025-09-14', '10:00:00', '11:00:00', 'Control de peso', 'CONFIRMADA', 1, 1, 1, 2),
('2025-09-21', '15:30:00', '16:30:00', 'Examen coprológico', 'PENDIENTE', 3, 9, 3, 3),
('2025-09-03', '08:30:00', '10:00:00', 'Revisión post-trauma', 'CONFIRMADA', 1, 1, 2, 4),
('2025-09-17', '11:30:00', '12:30:00', 'Test genético', 'PENDIENTE', 3, 8, 1, 5),
-- Now
(CURRENT_DATE, '08:30:00', '10:00:00', 'Revisión post-trauma', 'CONFIRMADA', 1, 1, 6, 4),
(CURRENT_DATE, '11:30:00', '12:30:00', 'Test genético', 'PENDIENTE', 3, 8, 6, 5),
(CURRENT_DATE, '08:30:00', '10:00:00', 'Revisión post-trauma', 'CONFIRMADA', 1, 1, 6, 4),
(CURRENT_DATE, '11:30:00', '12:30:00', 'Test genético', 'PENDIENTE', 3, 8, 6, 5);

INSERT INTO pets_heaven.vacunas (
    nom_vac, efe_sec_vac, cat_vac, dos_rec_vac, lot_vac, fec_ven_vac, fre_vac, pro_vac
) VALUES
-- Vacunas básicas para perros
('Vacuna Antirrábica', 'Letargo leve, dolor en el sitio de inyección', 'Rabia', '1 mL', 'LOT-RAB-2025', '2026-12-31', 365, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
('Vacuna Moquillo Canino', 'Fiebre leve, pérdida de apetito temporal', 'Moquillo', '1 mL', 'LOT-MOQ-2025', '2026-06-15', 365 * 3, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
('Vacuna Parvovirus', 'Hinchazón en el sitio de inyección', 'Parvovirosis', '1 mL', 'LOT-PAR-2025', '2026-08-20', 365, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
('Vacuna Leptospirosis', 'Dolor local, fiebre baja', 'Leptospirosis', '1 mL', 'LOT-LEP-2025', '2026-05-30', 365, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
-- Vacunas para gatos
('Vacuna Triple Felina', 'Somnolencia leve', 'Panleucopenia/Calicivirus/Rinotraqueitis', '1 mL', 'LOT-TRF-2025', '2026-09-10', 365, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
('Vacuna Leucemia Felina', 'Malestar general', 'Leucemia Viral Felina', '1 mL', 'LOT-LEU-2025', '2026-11-25', 365, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
-- Vacunas especiales
('Vacuna Bordetella', 'Estornudos leves', 'Tos de las perreras', '0.5 mL', 'LOT-BOR-2025', '2026-04-15', 365, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
('Vacuna Coronavirus Canino', 'Malestar gastrointestinal leve', 'Coronavirus', '1 mL', 'LOT-COR-2025', '2026-07-22', 365, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
('Vacuna Giardia', 'Diarrea leve', 'Giardiasis', '1 mL', 'LOT-GIA-2025', '2026-10-05', 180, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
-- Vacunas combinadas
('Vacuna Polivalente V8', 'Fiebre leve, dolor local', 'Combinada Canina', '1 mL', 'LOT-V8-2025', '2026-03-18', 365, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
('Vacuna Felina V4', 'Decaimiento temporal', 'Combinada Felina', '1 mL', 'LOT-V4-2025', '2026-02-28', 365, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC')),
('Vacuna Influenza Canina', 'Tos leve', 'Influenza', '1 mL', 'LOT-INF-2025', '2026-01-15', 365, 
    (SELECT id_pro FROM pets_heaven.procedimientos WHERE nom_pro LIKE 'Vacunación SC'));

INSERT INTO pets_heaven.vacunacion ( id_vacn, id_cit_vacn ) VALUES 
(1,2),
(1,3),
(7,3),
(7,9),
(7,15),
(10,24);
-- Motivos de consulta
INSERT INTO pets_heaven.motivos_consultas (mot_con) VALUES
('Chequeo anual rutinario'),
('Vacunación antirrábica'),
('Problemas dermatológicos'),
('Consulta cardiología'),
('Refuerzo vacunal'),
('Castración canina'),
('Cirugía de tumor mamario'),
('Baño medicado'),
('Análisis de sangre completo'),
('Control postoperatorio'),
('Emergencia - Vómitos persistentes'),
('Corte de pelo según raza'),
('Consulta geriátrica'),
('Extracción de cuerpo extraño'),
('Vacunación polivalente'),
('Limpieza dental profesional'),
('Control de peso'),
('Examen coprológico'),
('Revisión post-trauma'),
('Test genético');

-- Tratamientos aplicados
INSERT INTO pets_heaven.tratamientos_consultas (nom_tra_con, des_tra_con) VALUES
('Antibióticos', 'Administración de antibióticos de amplio espectro según peso y especie.'),
('Antiinflamatorios', 'Tratamiento con antiinflamatorios no esteroideos para control del dolor.'),
('Vacunación', 'Aplicación de vacuna correspondiente al protocolo.'),
('Cirugía menor', 'Procedimiento quirúrgico menor bajo anestesia local.'),
('Cirugía mayor', 'Procedimiento quirúrgico mayor bajo anestesia general.'),
('Desparasitación', 'Administración de antiparasitarios orales.'),
('Limpieza dental', 'Profilaxis dental completa con ultrasonido.'),
('Control de peso', 'Plan nutricional y seguimiento de peso.'),
('Terapia de fluidos', 'Administración intravenosa de líquidos.'),
('Tratamiento dermatológico', 'Uso de shampoo medicado y pomadas tópicas.');

-- Consultas (ejemplo con datos reales de tus citas y llaves foráneas)
INSERT INTO pets_heaven.consultas (
    pes_mas_con, tem_mas_con, dia_con, med_con, fec_con, mot_con, tra_con, cit_con
) VALUES
(28.5, 38, 'Chequeo general, sin hallazgos patológicos.', 'Complejo vitamínico', '2025-07-10', 1, 1, 1),
(28.5, 38, 'Vacunación antirrábica aplicada. Sin reacciones adversas.', 'Vacuna Antirrábica', '2025-07-13', 2, 3, 2),
(4.2, 39, 'Vacunación antirrábica aplicada. Sin reacciones adversas.', 'Vacuna Antirrábica', '2025-07-10', 2, 3, 3),
(12.7, 38, 'Dermatitis alérgica tratada.', 'Antiinflamatorio tópico', '2025-07-15', 3, 10, 4),
(5.1, 38, 'Soplo cardíaco grado II detectado.', 'Cardiotónico', '2025-07-15', 4, 2, 5),
(32.0, 38, 'Refuerzo vacunal aplicado.', 'Vacuna Polivalente', '2025-07-15', 5, 3, 6),
(3.8, 39, 'Chequeo general, sin hallazgos patológicos.', 'Complejo vitamínico', '2025-07-15', 1, 1, 7),
(20.3, 38, 'Problemas dermatológicos tratados.', 'Tratamiento dermatológico', '2025-07-15', 3, 10, 8),
(7.5, 39, 'Refuerzo vacunal aplicado.', 'Vacuna Polivalente', '2025-07-15', 5, 3, 9),
(6.8, 38, 'Soplo cardíaco grado I detectado.', 'Cardiotónico', '2025-07-15', 4, 2, 10);