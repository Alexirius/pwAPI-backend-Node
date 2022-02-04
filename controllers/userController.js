const {validationResult} = require('express-validator');
const userService = require('../services/userService');
const ApiError = require("../error/ApiError");

class UserController {

    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation Error: ', errors.array({ onlyFirstError: true })))
            }
            const {email, username, password} = req.body;
            const userData = await userService.register(email, username, password);
            res.json(userData);
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.json(userData);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController();