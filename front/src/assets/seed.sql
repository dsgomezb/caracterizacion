CREATE TABLE IF NOT EXISTS municipio(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_departamento_dane TEXT,
  id_municipio_dane TEXT,
  nombre_departamento TEXT,
  nombre_municipio TEXT
);
INSERT or IGNORE INTO municipio (id_departamento_dane, id_municipio_dane, nombre_departamento, nombre_municipio) VALUES ('5','5001','Antioquia','Medellín');