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
      model.status = 2;
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
      res.send(model);
    }

    else
      res.send(relaciones);
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

router.post('/addfriend', authenticateToken,(req, res) => {
    /*Usuario.findByIdAndUpdate(req.body.id, {$push : {"friends" : req.body.friend_id}}, (err, doc) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        console.log(doc);
        return res.status(200).json({
            ok: true
        });
    })
    Usuario.findById(req.body.id, (errfinduser, user) => {
        if (errfinduser) {
            return res.status(400).json({
                ok: false,
                errfinduser,
            });
        }
        user.updateOne({$push : {"friends" : req.body.friend_id}}, (errpush, updateduser) => {
            if (errpush) {
                return res.status(400).json({
                    ok: false,
                    errpush,
                });
            }
            console.log(updateduser);
            return res.sendStatus(200);
        });
    });*/
});



module.exports = router;
