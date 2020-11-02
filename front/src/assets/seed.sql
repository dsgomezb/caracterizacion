CREATE TABLE IF NOT EXISTS finca(
  id serial NOT NULL,
  nombre character varying(20) NOT NULL,
  id_vereda character varying(50) NOT NULL,
  id_tipo_via integer,
  id_estado_via integer,
  id_gas integer,
  longitud character varying(250),
  latitud character varying(250),
  altitud character varying(250),
  analisis_suelos_2_anos boolean,
  area_total_hectareas double precision,
  disponibilidad_vias_acceso boolean,
  distancia_cabecera double precision,
  id_agua integer,
  electricidad boolean,
  acueducto boolean,
  pozo_septico boolean,
  internet boolean,
  celular boolean,
  infraestructura_productiva_existente text,
  fecha timestamp without time zone NOT NULL DEFAULT now(),
  television boolean,
  id_opeador_tv integer,
  id_estado_tendencia_tierra integer,
  documento_tecnico character varying,
  id_organizacion integer,
  adscrita_organizacion boolean
);

CREATE TABLE municipio
(
  id serial NOT NULL,
  id_departamento_dane character varying(7) NOT NULL,
  id_municipio_dane character varying(10) NOT NULL,
  nombre_departamento character varying(50) NOT NULL,
  nombre_municipio character varying(60),
  CONSTRAINT municipio_pkey PRIMARY KEY (id)
);

INSERT INTO municipio (id_departamento_dane, id_municipio_dane, nombre_departamento, nombre_municipio) VALUES 
("5","5001","Antioquia","Medellín"), ("5","5002","Antioquia","Abejorral");