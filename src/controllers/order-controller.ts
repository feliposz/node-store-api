import { Request, Response, NextFunction } from 'express';
import * as repository from '../repositories/order-repository';
import * as authService from '../services/auth-service';
import * as guid from 'guid';

export async function get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const data = await repository.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({});
    }
};

export async function post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const customer = authService.decodeToken(token);
        await repository.create({
            customer: customer.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({
            message: "Order created successfully"
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            message: "Failed to create order"
        });
    }
};