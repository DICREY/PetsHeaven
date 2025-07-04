-- Active: 1751051171820@@127.0.0.1@3306@pets_heaven
CREATE TABLE pets_heaven.auditoria_usuarios (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    campo_modificado VARCHAR(50) NOT NULL,
    valor_anterior TEXT,
    valor_nuevo TEXT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_responsable VARCHAR(100),
    accion ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL
);

CREATE TRIGGER pets_heaven.tr_auditoria_usuarios
AFTER UPDATE ON pets_heaven.personas
FOR EACH ROW
BEGIN
    -- Verificar cambios en cada campo relevante
    IF NEW.nom_per != OLD.nom_per THEN
        INSERT INTO auditoria_usuarios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_per, 'nom_per', OLD.nom_per, NEW.nom_per, 'UPDATE');
    END IF;
    
    IF NEW.ape_per != OLD.ape_per THEN
        INSERT INTO auditoria_usuarios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_per, 'ape_per', OLD.ape_per, NEW.ape_per, 'UPDATE');
    END IF;
    
    IF NEW.doc_per != OLD.doc_per THEN
        INSERT INTO auditoria_usuarios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_per, 'doc_per', OLD.doc_per, NEW.doc_per, 'UPDATE');
    END IF;
    
    IF NEW.email_per != OLD.email_per THEN
        INSERT INTO auditoria_usuarios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_per, 'email_per', OLD.email_per, NEW.email_per, 'UPDATE');
    END IF;
    
    IF NEW.estado != OLD.estado THEN
        INSERT INTO auditoria_usuarios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_per, 'estado', OLD.estado, NEW.estado, 'UPDATE');
    END IF;
    
END //
CREATE TABLE pets_heaven.historial_mascotas (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_mascota INT NOT NULL,
    campo_modificado VARCHAR(50) NOT NULL,
    valor_anterior TEXT,
    valor_nuevo TEXT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_responsable VARCHAR(100),
    accion ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mas)
);

CREATE TRIGGER pets_heaven.tr_historial_mascotas
AFTER UPDATE ON pets_heaven.mascotas
FOR EACH ROW
BEGIN
    -- Registrar cambios en campos importantes
    IF NEW.nom_mas != OLD.nom_mas THEN
        INSERT INTO historial_mascotas (id_mascota, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_mas, 'nom_mas', OLD.nom_mas, NEW.nom_mas, 'UPDATE');
    END IF;
    
    IF NEW.pes_mas != OLD.pes_mas THEN
        INSERT INTO historial_mascotas (id_mascota, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_mas, 'pes_mas', OLD.pes_mas, NEW.pes_mas, 'UPDATE');
    END IF;
    
    IF NEW.est_rep_mas != OLD.est_rep_mas THEN
        INSERT INTO historial_mascotas (id_mascota, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_mas, 'est_rep_mas', OLD.est_rep_mas, NEW.est_rep_mas, 'UPDATE');
    END IF;
    
    IF NEW.estado != OLD.estado THEN
        INSERT INTO historial_mascotas (id_mascota, campo_modificado, valor_anterior, valor_nuevo, accion)
        VALUES (NEW.id_mas, 'estado', OLD.estado, NEW.estado, 'UPDATE');
    END IF;
    
END //