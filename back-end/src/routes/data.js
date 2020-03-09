const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken'); 
const Usuario = require('./../models/user');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}
//estas son las rutas a las que puedes acceder
router.get('/listusers', authenticateToken,(req, res) => {
    Usuario.find({visible : true}, 'email', (err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        console.log(usuarios);
        res.send(usuarios);
    });
});

router.post('/updateUser', authenticateToken,(req, res) => {
    console.log("UPDATE REQ: ", req.body)
    let body = req.body;

    let { username, nombre, email, apellido } = body;
    if (username == '' || nombre == '' || email == '' || apellido == '') {
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