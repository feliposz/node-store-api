import * as mongoose from 'mongoose';
const Customer = mongoose.model('Customer');

export async function create (data) {
    var customer = new Customer(data);
    await customer.save();
};

export async function authenticate (data) {
    return await Customer.findOne({
        email: data.email,
        password: data.password
    });
};

export async function getById (id) {
    return await Customer.findById(id);
}