const protectedService = require('../services/protectedService');
const ApiError = require("../error/ApiError");

class ProtectedController {

    async userInfo(req, res, next) {
        try {
            const {id} = req.user;
            const userData = await protectedService.userInfo(id);
            res.json(userData);
        } catch (error) {
            next(error)
        }
    };

    async usersList(req, res, next) {
        try {
            const {filter} = req.body;
            const userData = await protectedService.usersList(filter);
            res.json(userData);
        } catch (error) {
            next(error)
        }
    };

    async transactionsList(req, res, next) {
        try {
            const {id} = req.user;
            const userData = await protectedService.transactionsList(id);
            res.json(userData);
        } catch (error) {
            next(error)
        }
    };

    async createTransaction(req, res, next) {
        try {
            const {id} = req.user;
            let {name, amount} = req.body;
            const userData = await protectedService.createTransaction(id, name, amount);
            res.json(userData);
        } catch (error) {
            next(error)
        }
    }
};

module.exports = new ProtectedController();