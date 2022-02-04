// const { type } = require('express/lib/response');
const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    // id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    balance: {type: DataTypes.INTEGER},
    // role: {type: DataTypes.STRING, defaultValue: 'user'},
});

const Transaction = sequelize.define('transaction', {
    // id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER},
    balance: {type: DataTypes.INTEGER},
});

User.hasMany(Transaction, {
    as: 'fromUser',
    foreignKey: 'fromUserId'
});
User.hasMany(Transaction, {
    as: 'toUser',
    foreignKey: 'toUserId'
});
Transaction.belongsTo(User, {
    as: 'fromUser',
    foreignKey: 'fromUserId'
});
Transaction.belongsTo(User, {
    as: 'toUser',
    foreignKey: 'toUserId'
});

module.exports = {
    User,
    Transaction
}