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

        /*preguntasRespuestas.rows.forEach(element => {
            console.log(element.id_pregunta);
            console.log(JSON.stringify({pregunta:[element.pregunta], opcion_respuesta:[element.opcion_respuesta]}));
        });*/



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
    const { id_agrupador } = req.body;
    let preguntas = await pool.query(" SELECT p.id as id, p.descripcion as pregunta, p.tipo_pregunta as tipo_pregunta, ap.id_agrupador_pregunta as agrupador  FROM pregunta as p \
    left join agrupador_pregunta as ap on ap.id = p.id_agrupador_pregunta \
    where ap.id_agrupador_pregunta = $1 order by id", [id_agrupador]);
    //console.log(preguntas);
    var todas = [];
    if (preguntas.rows.length > 0) {
        var arr2 = [];

        for (const element of preguntas.rows) {
            tablarespuesta = { 'id_pregunta': element.id, 'pregunta': element.pregunta, 'respuestas': [] };

            let respuestas = await pool.query(" SELECT  p.id as id_pregunta, ore.id as id_respuesta, ore.descripcion as descripcion FROM opcion_respuesta as ore \
            left join pregunta as p on p.id = ore.id_pregunta where p.id = $1 order by ore.id", [element.id]);

            for (const respuesta of respuestas.rows) {

                let id = respuesta.id_respuesta;
                tablarespuesta.respuestas.push({ id: respuesta.id_respuesta, respuesta: respuesta.descripcion });

            }

            //console.log(tablarespuesta);
            todas.push(tablarespuesta);

        }


        data = {
            "code": "0",
            "data2": todas,
        };




    } else {
        data = {
            "code": "1",
            "error": "No existen preguntas"

        };
    }
    res.status(200).json(data);

});





module.exports = router;