const { Router } = require('express');
const router = Router();
const async = require('async')
const jwt = require('jsonwebtoken');
const Usuario = require('./../models/user');
const Relaciones = require('./../models/relaciones');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      //console.log(user)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}


//estas son las rutas a las que puedes acceder
//LISTAMOS LOS USUARIOS QUE SON AMIGOS

router.post('/listusers', authenticateToken,  (req, res) => {


  Relaciones.find({$or: [  {'user1': req.body._id}, {'user2': req.body._id } ] , status : 2} ,  (err, relaciones) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              err,
          });
      }

      let contenedor = [];

      for (let i = 0 ; i < relaciones.length; i++)
      {
        let mirespuesta = {};
        mirespuesta.user1 = relaciones[i].user1;
        mirespuesta.user2 = relaciones[i].user2;

        if (relaciones[i].user1 == req.body._id)
        {
          mirespuesta.statususer = relaciones[i].statusUser1;
          mirespuesta.nombre = relaciones[i].nombreUser2;

        }
        else
        {
          mirespuesta.statuser = relaciones[i].statusUser2;
          mirespuesta.nombre = relaciones[i].nombreUser1;
        }

        contenedor.push(mirespuesta);

      }
      console.log("contenedor",contenedor)
      res.send(contenedor);
  });
});


//LISTAMOS TODOS LOS USUARIOS PARA EL PANEL PRINCIPAL
router.post('/listarUsers', authenticateToken,  (req, res) => {

  Usuario.find({"_id": {"$ne": req.body._id}},{"_id": 1,"nombre": 1,"apellido": 1} ,  (err, relaciones) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              err,
          });
      }
      console.log("contenedor",relaciones)
      res.send(relaciones);
  });
});

//CREAR RELACION SI NO EXISTE SINO OBTENER
router.post('/relacionarUsuarios', authenticateToken,(req, res) => {
  Relaciones.find({ "$and": [ {"$or": [  {'user1': req.body.user1}, {'user2': req.body.user1 } ] } , {"$or": [  {'user1': req.body.user2}, {'user2': req.body.user2 } ] }]},  (err, relaciones) => {
    if (err) {
      return res.status(400).json({
          ok: false,
          err,
      });
    }
    //console.log("REQ CUERPO", req.body);
    if (!relaciones.length) {
      // Create a new one
      var model = new Relaciones(); //use the defaults in the schema
      model.user1 = req.body.user1;
      model.user2 = req.body.user2;
      model.status = 0;
      model.statusUser1 = 0;
      model.statusUser2 = 0;
      model.nombreUser1 = req.body.nombreUser1;
      model.nombreUser2 = req.body.nombreUser2;
      model.action_user = req.body.user1;

      //console.log("GUARDAMOS ESTO", model);
      model.save(function(error) {
          if (error) { throw error; }

      });
      //console.log("envio esto", model);
      jsonResponse = {};
      jsonResponse.value = model.statusUser1;
      res.send(jsonResponse);
    }

    else
    {
      console.log("dimelo", relaciones[0].statusUser1)
      jsonResponse = {};
      jsonResponse.value = relaciones[0].statusUser1;
      console.log("json",jsonResponse )
      res.send(jsonResponse);
    }
  });
});

router.post('/updateUser', authenticateToken,(req, res) => {
    //console.log("UPDATE REQ: ", req.body)
    let body = req.body;

    let { username, nombre, email, apellido, cp} = body;
    if (username == '' || nombre == '' || email == '' || apellido == '' || cp == '') {
        return res.status(400).json({
            ok: false,
            respuesta: "NO PUEDES VACIAR UN CAMPO",
        });
    }
    Usuario.findByIdAndUpdate(req.body._id, body, (err, doc) =>{
        if (err) {
            console.log(err)
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        return res.json({ok:true});
    });
});

router.post('/updateUserPrivate', authenticateToken,(req, res) => {
  console.log("UPDATE REQ: ", req.body)
  let body = req.body;

  let {perfil, perfilPublico, puedeVerPublico,puedeVerConocido,puedeVerAmigo,postPublic,postConocido,postAmigo} = body;
  console.log("buscame", perfilPublico.sector)
  /*DEBERIAMOS COMPROBAR QUE TODAS LAS DEMAS ENTRADAS SEAN O TRUE O FALSE*/
  if (perfil == '') {
      return res.status(400).json({
          ok: false,
          respuesta: "NO SE ADMITE ESTOS PARÁMETROS",
      });
  }
  Usuario.findByIdAndUpdate(req.body._id, body, (err, doc) =>{
      if (err) {
          console.log(err)
          return res.status(400).json({
              ok: false,
              err,
          });
      }
      return res.json({ok:true});
  });
});

router.post('/cambiarRelacion', authenticateToken,(req, res) => {

  if (req.body.newStatus != 0)
  {
    Relaciones.findOneAndUpdate({ "$and": [ {"$or": [  {'user1': req.body.user1}, {'user2': req.body.user1 } ] } , {"$or": [  {'user1': req.body.user2}, {'user2': req.body.user2 } ] }]},
    { "$set": { "status": 2, "statusUser1": req.body.newStatus, "statusUser2": req.body.newStatus,  } },{ "new": true, }, (err, doc) =>{
      if (err) {
        console.log(err)
        return res.status(400).json({
            ok: false,
            err,
        });
      }
      console.log("devolvemos lo siguiente", doc.statusUser1)
      return res.json(doc.statusUser1);
    });
    }
  //SI NO SON NI AMIGOS NI CONOCIDOS EL VALOR DE STATUS DEBE ESTABLECERSE A 0
  else
  {
    Relaciones.findOneAndUpdate({ "$and": [ {"$or": [  {'user1': req.body.user1}, {'user2': req.body.user1 } ] } , {"$or": [  {'user1': req.body.user2}, {'user2': req.body.user2 } ] }]},
    { "$set": { "status": 0, "statusUser1": req.body.newStatus, "statusUser2": req.body.newStatus,  } },{ "new": true, }, (err, doc) =>{
      if (err) {
        console.log(err)
        return res.status(400).json({
            ok: false,
            err,
        });
      }
      console.log("devolvemos lo siguiente", doc.statusUser1)
      return res.json(doc.statusUser1);
    });
  }
});

router.post('/quePuedoVer', authenticateToken,  (req, res) => {

  Promise.all([
    Usuario.find({ _id: req.body.user1 }),
    Relaciones.find({ "$and": [ {"$or": [  {'user1': req.body.user1}, {'user2': req.body.user1 } ] } , {"$or": [  {'user1': req.body.user2}, {'user2': req.body.user2 } ] }]})
  ]).then( ([ user, relacion ]) => {

    let respuesta = {
      username : '',
      nombre : '',
      apellido : '',
      email : '',
      sector : '',
      aficiones : '',
      fechaNacimiento : '',
      cp : '',
      trabajo : ''
    };


    switch (relacion[0].statusUser1)
    {
      case 0:
        if(user[0].perfil != "privado")
        {
          respuesta.username = user[0].username;
          respuesta.nombre = user[0].nombre;
          respuesta.apellido = user[0].apellido;
          if (user[0].puedeVerPublico.correo)
            respuesta.email = user[0].email;
          if(user[0].puedeVerPublico.sector)
            respuesta.sector = user[0].sector;
          if(user[0].puedeVerPublico.aficiones)
            respuesta.aficiones = user[0].aficiones;
          if(user[0].puedeVerPublico.edad)
            respuesta.fechaNacimiento = user[0].fechaNacimiento;
          if(user[0].puedeVerPublico.cp)
            respuesta.cp = user[0].cp;
          if(user[0].puedeVerPublico.trabajo)
            respuesta.trabajo = user[0].trabajo;
        }
        break;

      case 1:
          respuesta.username = user[0].username;
          respuesta.nombre = user[0].nombre;
          respuesta.apellido = user[0].apellido;
          if (user[0].puedeVerConocido.correo)
            respuesta.email = user[0].email;
          if(user[0].puedeVerConocido.sector)
            respuesta.sector = user[0].sector;
          if(user[0].puedeVerConocido.aficiones)
            respuesta.aficiones = user[0].aficiones;
          if(user[0].puedeVerConocido.edad)
            respuesta.fechaNacimiento = user[0].fechaNacimiento;
          if(user[0].puedeVerConocido.cp)
            respuesta.cp = user[0].cp;
          if(user[0].puedeVerConocido.trabajo)
            respuesta.trabajo = user[0].trabajo;
          break;

      case 2:
          respuesta.username = user[0].username;
          respuesta.nombre = user[0].nombre;
          respuesta.apellido = user[0].apellido;
          if (user[0].puedeVerAmigo.correo)
            respuesta.email = user[0].email;
          if(user[0].puedeVerAmigo.sector)
            respuesta.sector = user[0].sector;
          if(user[0].puedeVerAmigo.aficiones)
            respuesta.aficiones = user[0].aficiones;
          if(user[0].puedeVerAmigo.edad)
            respuesta.fechaNacimiento = user[0].fechaNacimiento;
          if(user[0].puedeVerAmigo.cp)
            respuesta.cp = user[0].cp;
          if(user[0].puedeVerAmigo.trabajo)
            respuesta.trabajo = user[0].trabajo;
          break;
    }
    console.log("devolvi9endo esto", respuesta)
    return res.send(respuesta);
  });
});

module.exports = router;
