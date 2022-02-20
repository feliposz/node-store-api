const repository = require('../repositories/order-repository');
const authService = require('../services/auth-service');
const guid = require('guid');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({});
    }
};

exports.post = async (req, res, next) => {
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