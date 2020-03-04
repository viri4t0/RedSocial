const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/redsocial', {
    //configuracion para evitar deprecates
    useMongoClieant: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(db => console.log('DB CONNECTED'))
    .catch(err => console.log(err));
//esto pilla las peticiones antes de que lleguen a la ejecucion en el servidor
//y te las muestra por consola
app.use(morgan('dev'));
//me permite usar los parametros de url y forms
app.use(bodyParser.json);
//me permite usar formatos json
app.use(express.json());

//routes
app.use(require('./routes/index.js'));

app.listen(3000, () => {
    console.log('Server on port 3000 running');
});