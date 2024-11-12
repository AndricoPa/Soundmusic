    DROP DATABASE IF EXISTS soundmusic;
    CREATE DATABASE soundmusic;
    USE soundmusic;

    CREATE TABLE planos(
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome_plano VARCHAR(50) NOT NULL,
        preco_1_mes DECIMAL(10, 2) NOT NULL
    );
    CREATE TABLE usuarios(
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_plano INT NOT NULL,
        username VARCHAR(50),
        senha VARCHAR(255),
        email VARCHAR(60),
        telefone VARCHAR(50),
        foto_usuario TEXT,   
        acessibilidade BOOLEAN,
        FOREIGN KEY (id_plano) REFERENCES planos(id)
    );
    CREATE TABLE genero_musical(
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome_genero VARCHAR(50)
    );
    CREATE TABLE album(
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_usuario INT NOT NULL,
        nome_album VARCHAR(50),
        foto_album TEXT NOT NULL,
        privado BOOLEAN,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    );
    CREATE TABLE musica(
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_genero INT NOT NULL,
        id_album INT NOT NULL,
        id_usuario INT NOT NULL,
        nome_musica VARCHAR(50),
        link_musica TEXT,
        foto_musica text,
        FOREIGN KEY (id_genero) REFERENCES genero_musical(id),
        FOREIGN KEY (id_album) REFERENCES album(id),
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    );

    INSERT INTO planos (nome_plano, preco_1_mes) VALUES ('Sem plano', '0.00');
    INSERT INTO planos (nome_plano, preco_1_mes) VALUES ('Universitario', '7.99');
    INSERT INTO planos (nome_plano, preco_1_mes) VALUES ('Premium', '14.99');
    INSERT INTO planos (nome_plano, preco_1_mes) VALUES ('Familia', '25.99');

    INSERT INTO usuarios (id_plano, username, senha, foto_usuario) VALUES ('2', 'Fontana', '128Ve980', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkxKI8nHCtjr1IzghTNgCKLMAST64Izsuajg&s');

    INSERT INTO album (id_usuario, nome_album, foto_album) VALUES ('1', 'sertanejo de domingo', 'https://th.bing.com/th/id/OIP.UYzf41IKowWvtEh_iVjwSwExDM?rs=1&pid=ImgDetMain');

    INSERT INTO genero_musical (nome_genero) VALUES ('sertanejo');
    INSERT INTO genero_musical (nome_genero) VALUES ('pop');
    INSERT INTO genero_musical (nome_genero) VALUES ('rock');
    INSERT INTO genero_musical (nome_genero) VALUES ('jazz');
    INSERT INTO genero_musical (nome_genero) VALUES ('funk');