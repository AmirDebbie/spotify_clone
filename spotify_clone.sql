ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'momo1momo2';

CREATE DATABASE spotify_clone;

USE spotify_clone;
CREATE TABLE songs(
	id INT AUTO_INCREMENT NOT NULL,
    youtube_link VARCHAR(400),
    album_id INT NOT NULL,
    artist_id INT NOT NULL,
    title VARCHAR(40) NOT NULL,
    length TIME,
    track_number INT,
    lyrics text,
    created_at date, 
    upload_at date,
    PRIMARY KEY(id)
);

CREATE TABLE albums(
	id INT AUTO_INCREMENT NOT NULL,
    artist_id INT NOT NULL,
    name VARCHAR(40) NOT NULL,
    cover_img VARCHAR(400),
    created_at date, 
    upload_at date,
    PRIMARY KEY(id)
);

CREATE TABLE artists(
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(40) NOT NULL,
    cover_img VARCHAR(400),
    upload_at date,
    PRIMARY KEY(id)
);

ALTER TABLE songs
ADD FOREIGN KEY (album_id) REFERENCES albums(id),
ADD FOREIGN KEY (artist_id) REFERENCES artists(id);

ALTER TABLE albums
ADD FOREIGN KEY (artist_id) REFERENCES artists(id);

CREATE TABLE playlists(
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(40) NOT NULL,
    cover_img VARCHAR(400),
    upload_at date,
    PRIMARY KEY(id)
);

CREATE TABLE songsInPlaylists(
	id INT AUTO_INCREMENT NOT NULL,
    playlist_id INT NOT NULL,
    song_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);

CREATE TABLE users(
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at date,
    password VARCHAR(40) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    remember_token BOOLEAN DEFAULT false,
    prefrences JSON,
    PRIMARY KEY(id)
);

CREATE TABLE interactions(
	id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    song_id INT NOT NULL,
    play_count INT DEFAULT 0,
    liked BOOLEAN DEFAULT false,
    created_at date,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);

