const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        const message = err.message + ((err.errors.length > 0) ? err.errors[0].msg : '');
        return res.status(err.status).send(message);
    };
    return res.status(500).send('Internal server error!');
}