const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn } = require('../lib/auth');
const pool = require('../database');
const helpers = require('../lib/helpers');
var fs = require('fs');

//Api para obtener los tipo person activos de la base de datos: Mayordomo - propietario
router.post('/api/get_tipo_persona', async (req, res) => {
    let tipoPersona = await pool.query("SELECT id, nombre FROM tipo_persona where estado is true order by nombre");
    if (tipoPersona.rows.length > 0) {
        data = {
            "code": "0",
            "data": tipoPersona.rows
        };
    } else {
        data = {
            "code": "1",
            "error": "No existen tipo persona"
        };
    }
    res.status(200).json(data);
});

//Api para obtener los estado civil activos de la base de datos
router.post('/api/get_estados_civil', async (req, res) => {
    let estadosCiviles = await pool.query("SELECT id, nombre FROM estado_civil where estado is true order by nombre");
    if (estadosCiviles.rows.length > 0) {
        data = {
            "code": "0",
            "data": estadosCiviles.rows
        };
    } else {
        data = {
            "code": "1",
            "error": "No existen estados civiles"
        };
    }
    res.status(200).json(data);
});


//Api para obtener los tipo documento activos de la base de datos
router.post('/api/get_tipo_documento', async (req, res) => {
    let tipoDocumento = await pool.query("SELECT id, nombre FROM tipo_documento where estado is true order by nombre");
    if (tipoDocumento.rows.length > 0) {
        data = {
            "code": "0",
            "data": tipoDocumento.rows
        };
    } else {
        data = {
            "code": "1",
            "error": "No existen tipos de documentos"
        };
    }
    res.status(200).json(data);
});


//Api para obtener los géneros activos de la base de datos
router.post('/api/get_generos', async (req, res) => {
    let generos = await pool.query("SELECT id, nombre FROM genero where estado is true order by nombre");
    if (generos.rows.length > 0) {
        data = {
            "code": "0",
            "data": generos.rows
        };
    } else {
        data = {
            "code": "1",
            "error": "No existen generos"
        };
    }
    res.status(200).json(data);
});

//Api para obtener las ocupacion activos de la base de datos
router.post('/api/get_ocupacion', async (req, res) => {
    let ocupacion = await pool.query("SELECT id, nombre FROM ocupacion where estado is true order by nombre");
    if (ocupacion.rows.length > 0) {
        data = {
            "code": "0",
            "data": ocupacion.rows
        };
    } else {
        data = {
            "code": "1",
            "error": "No existen ocupaciones"
        };
    }
    res.status(200).json(data);
});

//Api para obtener las nivel de escolaridad activos de la base de datos
router.post('/api/get_nivel_escolaridad', async (req, res) => {
    let nivelEscolaridad = await pool.query("SELECT id, nombre FROM nivel_escolaridad where estado is true order by nombre");
    if (nivelEscolaridad.rows.length > 0) {
        data = {
            "code": "0",
            "data": nivelEscolaridad.rows
        };
    } else {
        data = {
            "code": "1",
            "error": "No existen niveles de escolaridad"
        };
    }
    res.status(200).json(data);
});


//Api para obtener las nivel de tipo_afiliacion activos de la base de datos
router.post('/api/get_tipo_afiliacion', async (req, res) => {
    let tipoAfiliacion = await pool.query("SELECT id, nombre FROM tipo_afiliacion where estado is true order by nombre");
    if (tipoAfiliacion.rows.length > 0) {
        data = {
            "code": "0",
            "data": tipoAfiliacion.rows
        };
    } else {
        data = {
            "code": "1",
            "error": "No existen niveles de tipos de afiliacion"
        };
    }
    res.status(200).json(data);
});

//Api para obtener las nivel de tipo_poblacion activos de la base de datos
router.post('/api/get_tipo_poblacion', async (req, res) => {
    let tiposPoblacion = await pool.query("SELECT id, nombre FROM tipo_poblacion where estado is true order by nombre");
    if (tiposPoblacion.rows.length > 0) {
        data = {
            "code": "0",
            "data": tiposPoblacion.rows
        };
    } else {
        data = {
            "code": "1",
            "error": "No existen tipos de población"
        };
    }
    res.status(200).json(data);
});


//Api para obtener las nivel de grupo_etnico activos de la base de datos
router.post('/api/get_grupo_etnico', async (req, res) => {
    let grupoEtnico = await pool.query("SELECT id, nombre FROM grupo_etnico where estado is true order by nombre");
    if (grupoEtnico.rows.length > 0) {
        data = {
            "code": "0",
            "data": grupoEtnico.rows
        };
    } else {
        data = {
            "code": "1",
            "error": "No existen grupos etnicos"
        };
    }
    res.status(200).json(data);
});


//Agregar informacion de la persona ya sea mayordomo o propietario
router.post('/api/save_persona', async (req, res) => {
    const { id_tipo_persona, id_tipo_documento, id_municipio, id_genero, id_estado_civil, id_ocupacion,
        id_nivel_escolaridad, id_tipo_afiliacion, id_grupo_etnico, id_tipo_poblacion, documento, nombre,
        apellidos, direccion, barrio, telefono, email, fecha_nacimiento, num_personas_cargo, foto_documento,
        vive_finca, tiempo_lleva_finca, id_finca, extension_documento } = req.body;
    const persona = await pool.query('INSERT INTO persona(id_tipo_persona, id_tipo_documento, id_genero, id_estado_civil, id_ocupacion, \
        id_nivel_escolaridad, id_tipo_afiliacion, id_grupo_etnico, id_tipo_poblacion, documento, nombre, \
        apellidos, direccion, barrio, telefono, email, fecha_nacimiento, num_personas_cargo, \
        vive_finca, tiempo_lleva_finca, id_municipio, id_finca) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)', 
        [id_tipo_persona, id_tipo_documento, id_genero, id_estado_civil, id_ocupacion,
        id_nivel_escolaridad, id_tipo_afiliacion, id_grupo_etnico, id_tipo_poblacion, documento, nombre,
        apellidos, direccion, barrio, telefono, email, fecha_nacimiento, num_personas_cargo,
        vive_finca, tiempo_lleva_finca, id_municipio, id_finca]);

    if (persona) {
        if(foto_documento && extension_documento){
            const idPersona = await pool.query('SELECT LASTVAL()');
            let ultimoIdPersona = idPersona.rows[0].lastval;
            let base64String = foto_documento;
            //creo carpeta de la finca
            let path = "src/public/fincas/"+id_finca;
            if(!fs.existsSync(path)){
                fs.mkdirSync(path, 0777);
            }
            let file = path+"/"+ultimoIdPersona+'.'+extension_documento;
            let name_file = 'http://31.220.56.195:3000/fincas/'+id_finca+"/"+ultimoIdPersona+'.'+extension_documento;
            fs.writeFile(file, base64String, {encoding: 'base64'}, async function(err) {
                if (err) {
                    console.log("Error al crear la imagen");
                } else {
                    let image = await pool.query('UPDATE persona SET foto_documento = $1 WHERE id = $2', [name_file, ultimoIdPersona]);
                }
            });
        }
        data = {
            "code": "0",
            "message": "Información de la persona guardada correctamente",
            "save": true
        };
    } else {
        data = {
            "code": "1",
            "update": false,
            "error": "Error al guardar los datos de la persona"
        };
    }
    res.status(200).json(data);
});

module.exports = router;