const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken'); 

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
router.get('/', authenticateToken,(req, res) => {
    res.json({
        "Desc" : "REDSOCIAL RUTA RAIZ"
    });
});

module.exports = router;