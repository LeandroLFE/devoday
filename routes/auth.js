const express = require('express');
const authController = require('../controllers/auth')
const cardController = require('../controllers/card')

const router = express.Router();

router.post('/login', authController.login);
router.post('/cadastro', authController.register);

router.post('/resultado', cardController.escolha)

module.exports = router;
