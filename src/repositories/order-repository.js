const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.getAll = async () => {
    return await Order
        .find({}, 'number')
        .populate('customer', 'name')
        .populate('items.product', 'title price');
};

exports.create = async (data) => {
    const order = new Order(data);
    return await order.save();
};