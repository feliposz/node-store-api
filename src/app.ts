import express, { Application, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import config from './config';
import Debug from 'debug';
const debug = Debug('store:app');

const app: Application = express();

import { connect } from 'mongoose';
connect(config.connectionString);

import './models/product';
import './models/customer';
import './models/order';

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
    debug(`${req.method} ${req.url}`);
    next();
});

import indexRoute from './routes/index-route';
import productRoute from './routes/product-route';
import customerRoute from './routes/customer-route';
import orderRoute from './routes/order-route';

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

export default app;