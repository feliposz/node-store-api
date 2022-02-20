import OrderModel from '../models/order';

export async function getAll() {
    return await OrderModel
        .find({}, 'number')
        .populate('customer', 'name')
        .populate('items.product', 'title price');
};

export async function create(data: { customer: any; number: string; items: any; }) {
    const order = new OrderModel(data);
    return await order.save();
};