const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const Usuario = require('./../models/user');
const jwt = require('jsonwebtoken'); 

//estas son las rutas a las que puedes acceder
router.get('/', (req, res) => {
    res.json({
        "Desc" : "REDSOCIAL RUTA RAIZ"
    });
});

router.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (erro, usuarioDB)=>{
        if (erro) {
            return res.status(500).json({
                ok: false,
                err: erro
            })
        }

        // Verifica que exista un usuario con el mail escrita por el usuario.
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            })
        } 

        // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
        if (! bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }

        // Genera el token de autenticación
        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED_AUTENTICACION, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
        })

    })
    
});

router.post('/register', function (req, res) {
    let body = req.body;

    let { nombre, email, password, role } = body;
    let usuario = new Usuario({
      nombre,
      email,
      password: bcrypt.hashSync(password, 10),
      role
    });

    usuario.save((err, usuarioDB) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              err,
          });
      }

      

      res.json({
          ok: true,
          usuario: usuarioDB
      });

    })
});


module.exports = router;