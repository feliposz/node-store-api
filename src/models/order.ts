import { Schema, Types, model } from 'mongoose';

interface Order {
    customer: Types.ObjectId,
    number: string,
    createDate: Date,
    status: string,
    items: {
        quantity: number,
        price: number,
        product: Types.ObjectId
    }[]
}

const schema = new Schema<Order>({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
});

const OrderModel = model('Order', schema);

export default OrderModel;