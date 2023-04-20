const express = require('express');
const authController = require('../controllers/auth')
const cardController = require('../controllers/criar')

const router = express.Router();

router.post('/login', authController.login);
router.post('/cadastro', authController.register);
router.post('/verificar', authController.verificar);
router.post('/feedback', authController.avaliar);
router.post('/alterar', authController.alterar);
router.get('/deletar', authController.deletar);
router.get('/sair', authController.sair);


router.post('/resultado', cardController.escolha);
router.post('/devocional', cardController.envio);

module.exports = router;
