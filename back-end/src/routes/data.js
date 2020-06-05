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



router.post('/updateUser', authenticateToken,(req, res) => {
    console.log("UPDATE REQ: ", req.body)
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
