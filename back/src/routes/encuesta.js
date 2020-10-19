const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn } = require('../lib/auth');
const pool = require('../database');
const helpers = require('../lib/helpers');



//Api para obtener las encuestas activas
router.post('/api/get_encuesta', async (req, res) => {
    let encuesta = await pool.query("SELECT id, nombre FROM encuesta where activo is true order by nombre");
    if (encuesta.rows.length > 0) {
        data = {
            "code": "0",
            "data": encuesta.rows

        };
    } else {
        data = {
            "code": "1",
            "error": "No existen encuestas activas"

        };
    }
    res.status(200).json(data);
});

//Api para obtener preguntas con opciones de respuesta by agrupador
router.post('/api/get_pregutas_respuestas', async (req, res) => {
    const { id_agrupador } = req.body;
    let preguntasRespuestas = await pool.query("SELECT ore.id_pregunta as id_pregunta, p.descripcion as pregunta, ore.descripcion as opcion_respuesta, p.tipo_pregunta as tipo_pregunta  FROM opcion_respuesta as ore \
    left join pregunta as p on p.id = ore.id_pregunta  left join agrupador_pregunta as ap on ap.id = p.id_agrupador_pregunta \
    where ap.id_agrupador_pregunta = $1", [id_agrupador]);
    if (preguntasRespuestas.rows.length > 0) {
        data = {
            "code": "0",
            "data": preguntasRespuestas.rows

        };
    } else {
        data = {
            "code": "1",
            "error": "No existen encuestas activas"
        };
    }
    res.status(200).json(data);
});



//Api para obtener preguntas con opciones de respuesta by agrupador
router.post('/api/get_pregutas_respuestas_separado', async (req, res) => {
    const { id_finca } = req.body;

    let actividades_productivas = await pool.query(" SELECT fap.id as id, fap.id_finca as finca, fap.id_actividades_productivas as actividades_productivas, ap.id as agrupador, \
     ap.descripcion FROM finca_actividades_productivas as fap left join  agrupador_pregunta  as ap on ap.id =fap.id_actividades_productivas  where id_finca = $1 order by id", [id_finca]);

    var actividadesComa = [];
    for (const actividades of actividades_productivas.rows) {
        actividadesComa.push(actividades.actividades_productivas);

    }

    var todas = [];
    if (actividades_productivas.rows.length > 0) {
        var arr2 = [];

        for (const ap of actividades_productivas.rows) {

            let preguntas = await pool.query(" SELECT p.id as id, p.descripcion as pregunta, p.tipo_pregunta as tipo_pregunta, ap.id_agrupador_pregunta as id_agrupador, \
            app.descripcion as agrupador  FROM pregunta as p left join agrupador_pregunta as ap on ap.id = p.id_agrupador_pregunta \
            left join agrupador_pregunta as app on ap.id_agrupador_pregunta= app.id \
            where ap.id_agrupador_pregunta = $1 order by  ap.id_agrupador_pregunta, p.orden ", [ap.agrupador]);

            tablarespuesta = { 'id_agrupador': ap.agrupador, 'nombre_agrupador': ap.descripcion, 'preguntas': [] };
            var i = 0;

            for (const element of preguntas.rows) {
                tablarespuesta.preguntas.push({ 'tipo_pregunta': element.tipo_pregunta, 'id_pregunta': element.id, 'pregunta': element.pregunta, 'respuestaspreguntas': [] });
                let respuestas = await pool.query(" SELECT  p.id as id_pregunta, ore.id as id_respuesta, ore.descripcion as descripcion FROM opcion_respuesta as ore \
                                                    left join pregunta as p on p.id = ore.id_pregunta where p.id = $1 order by ore.id", [element.id]);
                for (const respuesta of respuestas.rows) {
                    let id = respuesta.id_respuesta;
                    tablarespuesta.preguntas[i].respuestaspreguntas.push({ id: respuesta.id_respuesta, respuesta: respuesta.descripcion });
                }
                i++;
            }
            todas.push(tablarespuesta);
        }
        data = {
            "code": "0",
            "data": todas,
        };
    } else {
        data = {
            "code": "1",
            "error": "No existen preguntas"
        };
    }
    res.status(200).json(data);

});



//Agregar informacion de la organizacion
router.post('/api/save_encuesta', async (req, res) => {
    var data = req.body;
    const id_finca = data.id_finca;//req.body;

    const finca;

    const encuesta_respuesta = await pool.query("SELECT * FROM encuesta_respuesta where id_finca = $1 ", [id_finca]);

    for (let i in data.answers) {

        var pregunta = i;
        var respuesta = data.answers[i];
              
       var tem = respuesta * 1

        if (!isNaN(tem)) {
             finca = await pool.query('INSERT INTO encuesta_detalle_respuesta(id_encuesta_respuesta, id_pregunta, id_opcion_respuesta) VALUES ($1, $2, $3)', [encuesta_respuesta.rows[0].id, pregunta, respuesta]);

        } else {
          
             finca = await pool.query('INSERT INTO encuesta_detalle_respuesta(id_encuesta_respuesta, id_pregunta, texto) VALUES ($1, $2, $3)', [encuesta_respuesta.rows[0].id, pregunta, respuesta]);

        }


    }


    if (finca) {


        data = {
            "code": "0",
            "message": "Información de la encuesta guardada correctamente",           
            "save": true
        };
    } else {
        data = {
            "code": "1",
            "update": false,
            "error": "Error al guardar los datos dela encuesta"
        };
    }


    res.status(200).json(data);
});


module.exports = router;