const express = require('express');
const morgan = require('morgan');
const path = require('path');
var bodyParser  = require('body-parser');

//Inicializaciones
const app = express();

//configuraciones
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'lib')));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {

// Dominio que tengan acceso (ej. 'http://example.com')
    res.setHeader('Access-Control-Allow-Origin', '*');

// Metodos de solicitud que deseas permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

// Encabecedados que permites (ej. 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Headers', '*');

next();
})

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rutas
app.use('/finca', require('./routes/finca'));
app.use('/persona', require('./routes/persona'));
app.use('/organizacion', require('./routes/organizacion'));
app.use('/encuesta', require('./routes/encuesta'));


//Starting the server
app.listen((process.env.PORT || 3000), function(){
    console.log('server port: '+app.get('port'));
});
