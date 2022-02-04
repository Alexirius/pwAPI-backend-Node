const Router = require ('express');
const { body } = require('express-validator');
const protectedController = require('../controllers/protectedController');
const authMW = require('../middleware/authMW');

const router = new Router();

router.get('/user-info', authMW, protectedController.userInfo);
router.get('/transactions', authMW, protectedController.transactionsList);
router.post('/users/list', authMW, protectedController.usersList);
router.post('/transactions',
    body('amount').toInt(),
    authMW, protectedController.createTransaction);

module.exports = router;