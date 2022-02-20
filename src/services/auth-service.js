const config = require('../config');
const jwt = require('jsonwebtoken');

exports.generateToken = (data) => {
    return jwt.sign(data, global.SALT_KEY, {
        expiresIn: '1d'
    });
}

exports.decodeToken = (token) => {
    return jwt.verify(token, global.SALT_KEY);
}

exports.authorize = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Restricted access'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: 'Invalid token'
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Restricted access'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'Invalid token'
                });
            } else {
                if (decoded.roles && decoded.roles.indexOf('admin') >= 0) {
                    next();
                } else {
                    res.status(403).send({
                        message: 'Restricted to administrators'
                    });
                }
            }
        });
    }
};