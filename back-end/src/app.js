const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const cors = require('cors');

mongoose.connect('mongodb://localhost/redsocial', {
    //configuracion para evitar deprecates
    //useMongoClient: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(db => console.log('DB CONNECTED'))
    .catch(err => console.log(err));


app.use(cors());
//esto pilla las peticiones antes de que lleguen a la ejecucion en el servidor
//y te las muestra por consola
app.use(morgan('dev'));
//me permite usar los parametros de url y forms
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// ===========================
// Puerto
// ===========================

process.env.PORT = process.env.PORT || 3000;

// ===========================
// Entorno
// ===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================
// Vencimiento de token
// ===========================

process.env.CADUCIDAD_TOKEN = '48h';

// ===========================
// SEED de autenticación
// ===========================

process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION || 'este-es-el-seed-desarrollo';

// =======================
// SECRETO TOKEN - DEBERIA SER VARIABLE DE ENVIROMENT
// =======================

process.env.ACCESS_TOKEN_SECRET = 'misecreto'

//routes
app.use(require('./routes/index.js'));


app.listen(3000, () => {
    console.log('Server on port 3000 running');
});