import * as mongoose from 'mongoose';
const Order = mongoose.model('Order');

export async function getAll () {
    return await Order
        .find({}, 'number')
        .populate('customer', 'name')
        .populate('items.product', 'title price');
};

export async function create (data) {
    const order = new Order(data);
    return await order.save();
};