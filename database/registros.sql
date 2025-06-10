-- Active: 1746130779175@@127.0.0.1@3306@pets_heaven
INSERT INTO pets_heaven.roles (nom_rol) VALUES
('Administrador'),
('Veterinario'),
('Usuario');

INSERT INTO pets_heaven.personas (nom_per, ape_per, fec_nac_per, tip_doc_per, doc_per, dir_per, cel_per, cel2_per, email_per, cont_per,gen_per,fot_per) VALUES
('Juan', 'Pérez',NOW(), 'CC', '12345678', 'Calle 123 #45-67', '3001234567', NULL, 'juan.perez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Masculino',DEFAULT),
('María', 'Gómez',NOW(), 'CC', '87654321', 'Av. Principal #12-34', '3102345678', '3203456789', 'maria.gomez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Femenino',DEFAULT),
('Carlos', 'Rodríguez',NOW(), 'CE', 'AB123456', 'Carrera 56 #78-90', '3154567890', NULL, 'carlos.rod@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Masculino',DEFAULT),
('Ana', 'Martínez',NOW(), 'CC', '11223344', 'Diagonal 34 #56-78', '3175678901', NULL, 'ana.martinez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Femenino',DEFAULT),
('Luis', 'García',NOW(), 'TI', '98765432', 'Transversal 12 #34-56', '3186789012', '3197890123', 'luis.garcia@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Masculino',DEFAULT),
('Nikola', 'Tesla',NOW(), 'CC', '1298765432', 'Trasversal 12 #34-56', '3186789012', '', 'admin@gmail.com', '$2b$15$P3DlhprB7vdchCiVoGq7SOrvG/ZOJyVVyTInPk7QZPbaKbUNPPQa6','Masculino','https://imgs.search.brave.com/JheS1cTjYH1Y1E7rp1FADfQDL9uXw20FxZAFfjZwEaY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2Q0L04uVGVzbGEu/SlBH'),
('Marie', 'Curie',NOW(), 'CC', '658790781', 'calle 12 #34-56', '3121141801', '', 'vet@gmail.com', '$2b$15$TDXtAUTWojmNW0MtBmCCQO4Y.6R9OzUAmg9QItKhQVqNUlOD/CTVe','Femenino','https://imgs.search.brave.com/rL6dnhwCDXLvz02lsRs2QjVj1F8o-8D0o4pTYhmHah8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2M4L01h/cmllX0N1cmllX2Mu/XzE5MjBzLmpwZy81/MTJweC1NYXJpZV9D/dXJpZV9jLl8xOTIw/cy5qcGc'),
('Thomas', 'Edison',NOW(), 'CC', '908990781', 'calle 34 #56', '3121141801', '', 'user@gmail.com', '$2b$15$qxcK9ianAu/jeuG1jBFGReW2iF6E7sfSyPho9ERGAtiJvqwb1MnNm','Masculino','https://imgs.search.brave.com/kWZPq0vRV5Hl9y9RS9CtH5o-SRhsHFZfA8twL1VUavI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9nZXR0/eWltYWdlcy02MTUz/MTI2MzQuanBnP2Ny/b3A9MXh3OjEuMHho/O2NlbnRlcix0b3Am/cmVzaXplPTY0MDoq'),
('Sofía', 'López', NOW(), 'CC', '55667788', 'Calle 89 #10-11', '3001122334', NULL, 'sofia.lopez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Femenino',DEFAULT),
('Pedro', 'Hernández', NOW(), 'CC', '99887766', 'Av. 68 #23-45', '3102233445', '3203344556', 'pedro.hernandez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Masculino',DEFAULT),
('Laura', 'Díaz', NOW(), 'CE', 'CD987654', 'Carrera 12 #34-56', '3154455667', NULL, 'laura.diaz@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Femenino',DEFAULT),
('Jorge', 'Sánchez', NOW(), 'CC', '33445566', 'Diagonal 78 #90-12', '3175566778', NULL, 'jorge.sanchez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Masculino',DEFAULT),
('Elena', 'Ramírez', NOW(), 'TI', '11223355', 'Transversal 45 #67-89', '3186677889', '3197788990', 'elena.ramirez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Femenino',DEFAULT),
('Ricardo', 'Torres', NOW(), 'CC', '66778899', 'Calle 34 #56-78', '3009988776', NULL, 'ricardo.torres@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Masculino',DEFAULT),
('Carmen', 'Vargas', NOW(), 'CC', '22334455', 'Av. 56 #78-90', '3108877665', '3207766554', 'carmen.vargas@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Femenino',DEFAULT),
('Fernando', 'Castro', NOW(), 'CE', 'EF654321', 'Carrera 78 #90-12', '3156655443', NULL, 'fernando.castro@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Masculino',DEFAULT),
('Patricia', 'Ortega', NOW(), 'CC', '77889900', 'Diagonal 12 #34-56', '3175544332', NULL, 'patricia.ortega@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Femenino',DEFAULT),
('Roberto', 'Mendoza', NOW(), 'CC', '88990011', 'Transversal 34 #56-78', '3184433221', '3193322110', 'roberto.mendoza@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Masculino',DEFAULT);


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

INSERT INTO pets_heaven.categorias_ser (nom_cat,img_cat, tec_des_cat) VALUES
('Consulta General','https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/consulta.jpg', 'Examen físico completo, revisión de historial médico, recomendaciones nutricionales.'),
('Vacunación','https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/vacunacion.jpg', 'Aplicación de vacunas según calendario, control de temperatura, seguimiento post-vacunación.'),
('Cirugía','https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/cirugia.jpg', 'Evaluación pre-quirúrgica, anestesia monitorizada, equipo esterilizado, recuperación asistida.'),
('Emergencias 24h','https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/urgencias.jpg', 'Equipo de emergencias disponible 24/7, unidad de cuidados intensivos, monitoreo constante.'),
('Spa y Baño','https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/ba%C3%B1o.jpg', 'Baño con productos hipoalergénicos, secado profesional, corte según raza, cuidado de uñas y oídos.');

INSERT INTO pets_heaven.servicios (cat_ser, nom_ser, pre_ser, des_ser, tec_des_ser) VALUES
(1, 'Consulta Preventiva', 50.00, 'Examen completo de salud para tu mascota con recomendaciones personalizadas.', 'Examen físico completo, revisión de historial médico, recomendaciones nutricionales.'),
(2, 'Medicina Preventiva', 35.00, 'Programa completo de vacunación para prevenir enfermedades comunes.', 'Aplicación de vacunas según calendario, control de temperatura, seguimiento post-vacunación.'),
(3, 'Cirugía', 200.00, 'Procedimientos quirúrgicos realizados por especialistas con equipos de última generación.', 'Evaluación pre-quirúrgica, anestesia monitorizada, equipo esterilizado, recuperación asistida.'),
(4, 'Urgencias', 80.00, 'Atención inmediata para situaciones urgentes a cualquier hora del día.', 'Equipo de emergencias disponible 24/7, unidad de cuidados intensivos, monitoreo constante.'),
(5, 'Estética y Bienestar', 45.00, 'Servicio completo de baño, corte de pelo, limpieza de oídos y corte de uñas para tu mascota.', 'Baño con productos hipoalergénicos, secado profesional, corte según raza, cuidado de uñas y oídos.'),
(3, 'Castración de perro macho', 150.00, 'Castración quirúrgica para perros machos.', 'Anestesia general, procedimiento estéril, recuperación asistida.'),
(3, 'Limpieza dental felina', 80.00, 'Limpieza y cuidado dental para gatos.', 'Limpieza con ultrasonido, pulido dental, anestesia ligera.'),
(3, 'Resección tumor mamario', 300.00, 'Cirugía para extirpación de tumores mamarios.', 'Anestesia general, cuidado postquirúrgico, control del dolor.'),
(3, 'Fijación de fractura', 350.00, 'Procedimiento para estabilización de fracturas óseas.', 'Uso de placas y tornillos, anestesia general, fisioterapia postquirúrgica.'),
(3, 'Laparotomía exploratoria', 400.00, 'Cirugía abdominal para diagnóstico y tratamiento.', 'Anestesia general, monitorización, cuidados intensivos.'),
(3, 'Extracción cuerpo extraño gastrointestinal', 250.00, 'Cirugía para extracción de objetos ingeridos.', 'Anestesia general, cuidado postoperatorio.'),
(3, 'Castración de gato macho', 120.00, 'Castración quirúrgica para gatos machos.', 'Anestesia general, procedimiento estéril, recuperación rápida.'),
(3, 'Corrección de luxación patelar', 280.00, 'Cirugía para corregir luxación en rodilla.', 'Anestesia general, inmovilización y fisioterapia.'),
(3, 'Orquiectomía en perro macho', 150.00, 'Extirpación de testículos en perros.', 'Anestesia general, cuidado postquirúrgico.'),
(3, 'Cierre herida traumática', 100.00, 'Cierre quirúrgico de heridas traumáticas.', 'Sutura estéril, limpieza profunda, seguimiento postoperatorio.');

INSERT INTO pets_heaven.cirugias (fec_cir, des_cir, res_cir, com_cir, obv_cir, ser_cir) VALUES
('2025-01-10', 'Castración de perro macho', 'Éxito total', 'Sin complicaciones', 'Recuperación rápida', 6),
('2025-01-15', 'Limpieza dental para gato', 'Mejora notable', 'Sangrado leve', 'Paciente muy calmado', 7),
('2025-02-05', 'Resección de tumor mamario', 'Tumor extirpado completamente', 'Inflamación postquirúrgica', 'Controlar antibióticos', 8),
('2025-02-20', 'Fijación de fractura en pata', 'Fractura estabilizada', 'Inflamación leve', 'Reposo absoluto', 9),
('2025-03-01', 'Laparotomía exploratoria abdominal', 'Diagnóstico confirmado', 'Adherencias internas', 'Monitorear signos vitales', 10),
('2025-03-10', 'Extracción de cuerpo extraño gastrointestinal', 'Objeto retirado sin daño', 'Infección leve', 'Administrar antibióticos', 11),
('2025-03-15', 'Castración de gato macho', 'Procedimiento exitoso', 'Sin complicaciones', 'Paciente con buena recuperación', 12),
('2025-04-01', 'Corrección quirúrgica de luxación patelar', 'Luxación corregida', 'Inflamación y dolor moderado', 'Reposo y fisioterapia', 13),
('2025-04-12', 'Orquiectomía en perro macho', 'Sin complicaciones', 'Pequeña infección en la herida', 'Control antibiótico', 14),
('2025-04-20', 'Cierre quirúrgico de herida traumática', 'Herida cerrada correctamente', 'Ligera inflamación', 'Mantener limpieza diaria', 15);


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

INSERT INTO pets_heaven.categorias_veterinario (nom_cat)
VALUES 
('Generalista'),
('Especialista en Cirugía'),
('Dermatología'),
('Cardiología'),
('Odontología');

INSERT INTO pets_heaven.personas (nom_per, ape_per, fec_nac_per, tip_doc_per, doc_per, dir_per, cel_per, email_per, cont_per, gen_per)
VALUES
('Juan', 'Pérez', '1980-04-25', 'DNI', '12345222678', 'Calle Ficticia 123', '555-1234', 'juan.peresdfsfz@email.com', 'contraseña123', 'Masculino'),
('María', 'Gómez', '1990-08-15', 'DNI', '876333954321', 'Avenida Real 456', '555-5678', 'maria.gsdfsfomez@email.com', 'contraseña456', 'Femenino'),
('Carlos', 'López', '1985-12-05', 'DNI', '114444223344', 'Calle Nueva 789', '555-9101', 'carlos.losdfsdpez@email.com', 'contraseña789', 'Masculino');

INSERT INTO pets_heaven.veterinarios (id_vet, especialidad, horarios, fot_vet)
VALUES
(1, 'Generalista', 'Lunes a Viernes 9:00 - 18:00', 'https://img.freepik.com/vector-gratis/lindo-perro-medico-estetoscopio-dibujos-animados-vector-icono-ilustracion-animal-salud-icono-aislado_138676-5182.jpg'),
(2, 'Cirujano', 'Lunes a Viernes 10:00 - 16:00', 'https://img.freepik.com/vector-gratis/lindo-perro-medico-estetoscopio-dibujos-animados-vector-icono-ilustracion-animal-salud-icono-aislado_138676-5182.jpg'),
(3, 'Especialista en Dermatología', 'Martes a Jueves 9:00 - 14:00','https://img.freepik.com/vector-gratis/lindo-perro-medico-estetoscopio-dibujos-animados-vector-icono-ilustracion-animal-salud-icono-aislado_138676-5182.jpg'),
(7, 'Cirujano', 'Lunes a Viernes 10:00 - 16:00', 'https://img.freepik.com/vector-gratis/lindo-perro-medico-estetoscopio-dibujos-animados-vector-icono-ilustracion-animal-salud-icono-aislado_138676-5182.jpg'),
(6, 'Dermatologo', 'Martes a Jueves 9:00 - 14:00','https://img.freepik.com/vector-gratis/lindo-perro-medico-estetoscopio-dibujos-animados-vector-icono-ilustracion-animal-salud-icono-aislado_138676-5182.jpg');

INSERT INTO pets_heaven.otorgar_categoria_vet (id_cat,id_per)
VALUES
(1,1),
(2,2),
(3,3),
(2,7),
(3,6);

INSERT INTO pets_heaven.citas (fec_cit, hor_ini_cit, hor_fin_cit, ser_cit, vet_cit, mas_cit, estado) VALUES
('2025-06-16', '09:00:00', '10:00:00', 1, 1, 1, 'REALIZADO'),  -- Lunes, Consulta General
('2025-06-17', '11:00:00', '12:00:00', 2, 1, 1, 'PENDIENTE'),   -- Martes, Vacunación
('2025-06-18', '14:00:00', '15:00:00', 3, 2, 2, 'REALIZADO'),   -- Miércoles, Cirugía
('2025-06-19', '10:30:00', '11:30:00', 1, 2, 2, 'EN-ESPERA'),   -- Jueves, Consulta General
('2025-06-20', '16:00:00', '17:00:00', 4, 3, 3, 'REALIZADO'),   -- Viernes, Emergencias
('2025-06-21', '09:30:00', '10:30:00', 2, 3, 3, 'CANCELADO'),   -- Sábado, Vacunación
('2025-06-22', '13:00:00', '14:00:00', 5, 1, 4, 'REALIZADO'),   -- Domingo, Spa y Baño
('2025-06-23', '15:30:00', '16:30:00', 1, 1, 4, 'PENDIENTE'),   -- Lunes, Consulta General
('2025-06-24', '11:30:00', '12:30:00', 3, 2, 5, 'REALIZADO'),   -- Martes, Cirugía
('2025-06-25', '17:00:00', '18:00:00', 4, 7, 5, 'PENDIENTE'),   -- Miércoles, Emergencias
('2025-06-25', '17:00:00', '18:00:00', 5, 6, 5, 'PENDIENTE'),   -- Miércoles, Emergencias
('2025-06-25', '17:00:00', '18:00:00', 5, 6, 5, 'PENDIENTE'),   -- Miércoles, Emergencias
('2025-06-25', '17:00:00', '18:00:00', 3, 7, 5, 'PENDIENTE');   -- Miércoles, Emergencias