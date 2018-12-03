const express = require('express');
const router = express.Router();

router.use('/character', require('./modules/character/characterRoutes'));


router.route('/')
    .get(function (req, res) {
            res.send('Page d\'accueil de gestionnaire de personnages');
        }
    )
    .post(function (req, res) {
        res.send('Accueil EN POST');
    });


module.exports = router;