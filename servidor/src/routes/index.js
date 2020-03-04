const { Router } = require('express');
const router = Router();

//estas son las rutas a las que puedes acceder
router.get('/', (req, res) => {
    res.json({
        "Desc" : "REDSOCIAL RUTA RAIZ"
    });
});

router.get('/prueba', (req, res) => {
    const data = {
        "nombre" : "Luis",
        "edad" : 12
    }
    res.json(data);
});

module.exports = router;