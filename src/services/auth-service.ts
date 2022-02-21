import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

type Payload = { id: any, email: string, name: string, roles: string[] };

export function generateToken(data: Payload): string {
    return jwt.sign(data, global.SALT_KEY, {
        expiresIn: '1d'
    });
}

export function decodeToken(token: string): any {
    return jwt.verify(token, global.SALT_KEY);
}

export function authorize(req: Request, res: Response, next: NextFunction): void {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Restricted access'
        });
    } else {
        try {
            jwt.verify(token, global.SALT_KEY);
            next();
        } catch (e) {
            res.status(401).json({
                message: 'Invalid token'
            });
        }
    }
};

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Restricted access'
        });
    } else {
        try {
            const decoded: any = jwt.verify(token, global.SALT_KEY);
            if (decoded.roles && decoded.roles.indexOf('admin') >= 0) {
                next();
            } else {
                res.status(403).send({
                    message: 'Restricted to administrators'
                });
            }
        } catch (e) {
            res.status(401).json({
                message: 'Invalid token'
            });
        }
    }
};