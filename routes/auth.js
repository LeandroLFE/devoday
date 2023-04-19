const express = require('express');
const authController = require('../controllers/auth')
const cardController = require('../controllers/criar')

const router = express.Router();

router.post('/login', authController.login);
router.post('/cadastro', authController.register);
router.post('/verificar', authController.verificar);
router.post('/feedback', authController.avaliar);

router.post('/resultado', cardController.escolha);
router.post('/devocional', cardController.envio);

module.exports = router;
