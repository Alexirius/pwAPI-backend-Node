const Router = require ('express');
const router = new Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.post('/users',
    body('email','You must send valid email').isEmail(),
    body('password', 'Password must be at least 6 chars long').isLength({ min: 6 }),
    userController.register);
router.post('/sessions/create', userController.login);

module.exports = router;