const { RequestError } = require('../helpers');

const { User } = require('../models/user');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    try {
        const { authorization = '' } = req.headers;
        // Разделяем отдельно на токен и слово Bearer
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer') {
            throw RequestError(401);
        }

        // Проверем мы ли выдавали токен
        // и зашифрован ли он с помощью нашего ключа

        const { id } = jwt.verify(token, SECRET_KEY);

        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            throw RequestError(401);
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.status) {
            error.status = 401;
            error.message = 'Not authorized';
        }
        next(error);
    }
};

module.exports = authenticate;