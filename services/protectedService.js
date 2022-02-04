const { Op } = require('sequelize');
const ApiError = require("../error/ApiError");
const { User, Transaction } = require('../models/models');

class ProtectedService {
    async userInfo(id) {
        const user = await User.findOne({where: {id}});
        const {username, email, balance} = user;
        return {user_info_token: {id, name: username, email, balance}};
    };

    async usersList(filter) {
        const usersList = await User.findAll({
            attributes: ['id', ['username', 'name']],
            where: {username:{
                [Op.iLike]: `%${filter}%`
            }}});
        return usersList;
    };

    async transactionsList(id) {
        const transactions = (await Transaction.findAll({
            include: [{
                model: User,
                as: 'toUser',
            }],
            where: {fromUserId: id}}))
            .map((i) => { 
                const d = new Date(i.createdAt);
                return (
                    {id: i.id,
                    date: `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`,
                    username: i.toUser.username,
                    amount: i.amount,
                    balance: i.balance
                })
            })
        return {trans_token: transactions};
    };

    async createTransaction(id, name, amount) {
        if (!amount) {
            return next(ApiError.badRequest('Amount is not specified'));
        };
        const user = await User.findOne({where: {id}});
        if (amount > user.balance) {
            return next(ApiError.badRequest('Balance exceeded'));
        };
        const recipient = await User.findOne({where: {username: name}});
        if (!recipient) {
            return next(ApiError.badRequest('User not found'));
        };
        const transaction = await Transaction.create({
            fromUserId: user.id,
            toUserId: recipient.id,
            amount: -amount,
            balance: user.balance - amount});
        await Transaction.create({
            fromUserId: recipient.id,
            toUserId: user.id,
            amount: amount,
            balance: recipient.balance + amount});
        await User.update({balance: user.balance - amount},{where: {id: user.id,}});
        await User.update({balance: recipient.balance + amount},{where: {id: recipient.id,}});

        return {trans_token: {
            id: transaction.id,
            date: transaction.createdAt,
            username: recipient.username,
            amount: -amount,
            balance: recipient.balance - amount}};
    }
}

module.exports = new ProtectedService();