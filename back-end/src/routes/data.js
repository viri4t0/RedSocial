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
    Usuario.find({visible : true}, 'email -_id', (err, usuarios) => {
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

module.exports = router;