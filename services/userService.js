const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require("../error/ApiError");
const { User } = require('../models/models');

class UserService {

    async register(email, username, password) {
        if (!username || !email || !password) {
            throw ApiError.BadRequest('You must send email, username and password');
        };

        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            throw ApiError.BadRequest(`A user with email ${email} already exists`);
        };

        const candidateName = await User.findOne({where: {username}});
        if (candidateName) {
            throw ApiError.BadRequest(`A user with name ${username} already exists`);
        };

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({username, email, password: hashPassword, balance: 500});
        const token = jwt.sign({id: user.id, username, email},
            process.env.SECRET_KEY,
            {expiresIn: '24h'});
        return {id_token: token};
    }

    async login(email, password) {
        if (!email || !password) {
            throw ApiError.BadRequest('You must send email and password');
        };
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.BadRequest('Invalid email or password');
        };
        const comparePassword = await bcrypt.compareSync(password, user.password);
        if (!user || !comparePassword) {
            throw ApiError.BadRequest('Invalid email or password');
        };
        
        const token = jwt.sign({id: user.id, username: user.username, email},
            process.env.SECRET_KEY,
            {expiresIn: '24h'});
        return {id_token: token};
    }
}

module.exports = new UserService();