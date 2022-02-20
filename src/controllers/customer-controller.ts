import ValidationContract from '../validators/fluent-validator';
import * as repository from '../repositories/customer-repository';
import * as emailService from '../services/email-service';
import * as authService from '../services/auth-service';
import md5 from 'md5';

export async function post (req, res, next) {
    var contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'Name must have at least 3 characters');
    contract.isEmail(req.body.email, 'Invalid e-mail');
    contract.hasMinLen(req.body.password, 6, 'Password must have at least 6 characters');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors());
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        });

        emailService.send(req.body.email, 'Welcome to Node Store', global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            message: "Customer created successfully"
        });
    } catch (e) {
        res.status(400).send({
            message: "Failed to create customer"
        });
    }
};

export async function authenticate (req, res, next) {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Invalid user or password'
            });
            return;
        }

        const token = authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(200).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(400).send({
            message: "Failed to authenticate"
        });
    }
}

export async function refresh (req, res, next) {
    try {
        const token = req.body.token || req.params.token || req.headers['x-access-token'];
        const data = authService.decodeToken(token);

        // @ts-ignore
        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: 'User not found'
            });
            return;
        }

        const newToken = authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(200).send({
            token: newToken,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(400).send({
            message: "Failed to refresh token"
        });
    }
};