const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn } = require('../lib/auth');
const pool = require('../database');
const helpers = require('../lib/helpers');



//Api para obtener los tipo organizaciones activos de la base de datos
router.post('/api/get_tipo_organizacion', async (req, res) => {
    let tipoOrganzacion = await pool.query("SELECT id, nombre FROM tipo_organizacion where estado is true order by nombre");
     if (tipoOrganzacion.rows.length > 0) {
        data = {
            "code": "0",
            "data": tipoOrganzacion,

        };
    } else {
        data = {
            "code": "1",
            "error": "No existen tipos de organizaciones"

        };
    }
    res.status(200).json(data);
});


//Agregar informacion de la organizacion
router.post('/api/save_organizacion', async (req, res) => {
    const { id_tipo_organizacion, nit, nombre, fecha_organizacion, objeto,
        direccion, telefono, email, nombre_representante_legal, cedula_representante_legal,
        telefono_representante_legal, email_representante_legal, experiencia_organizacion,
        id_finca } = req.body;

    const organizacion = await pool.query('INSERT INTO organizacion(id_tipo_organizacion, nit, nombre, fecha_organizacion, objeto, \
        direccion, telefono, email, nombre_representante_legal, cedula_representante_legal, \
        telefono_representante_legal, email_representante_legal, experiencia_organizacion, \
        id_finca) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [id_tipo_organizacion, nit, nombre, fecha_organizacion, objeto,
        direccion, telefono, email, nombre_representante_legal, cedula_representante_legal,
        telefono_representante_legal, email_representante_legal, experiencia_organizacion,
        id_finca]);

       
    const idOrganizacion =  await pool.query('SELECT LASTVAL()');

  
    if (organizacion) {


        data = {
            "code": "0",
            "message": "Información de la organizacion guardada correctamente",
            "idOrganizacion": idOrganizacion.rows,
            "save": true
        };
    } else {
        data = {
            "code": "1",
            "update": false,
            "error": "Error al guardar los datos de la organizacion"
        };
    }
    res.status(200).json(data);
});


module.exports = router;