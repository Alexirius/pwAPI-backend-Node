const Router = require('express');
const router = new Router;
const userRouter = require('./userRouter');
const protectedRouter = require('./protectedRouter');

router.use('/', userRouter);
router.use('/api/protected', protectedRouter);

module.exports = router;