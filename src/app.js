import express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as config from './config';
const debug = require('debug')('store:app');

const app = express();

mongoose.connect(config.connectionString);

import * as Product from './models/product';
import * as Customer from './models/customer';
import * as Order from './models/order';

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// CORS
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use((req, res, next) => {
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

module.exports = app;