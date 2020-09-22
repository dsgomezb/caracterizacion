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



module.exports = router;