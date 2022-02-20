import * as config from '../config';
import * as jwt from 'jsonwebtoken';

export function generateToken (data) {
    return jwt.sign(data, global.SALT_KEY, {
        expiresIn: '1d'
    });
}

export function decodeToken (token) {
    return jwt.verify(token, global.SALT_KEY);
}

export function authorize (req, res, next) {
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

export function isAdmin (req, res, next) {
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