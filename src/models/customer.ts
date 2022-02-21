import { Schema, model } from 'mongoose';

interface Customer {
    name: string;
    email: string;
    password: string;
    roles: string[]
}

const schema = new Schema<Customer>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    }]
});

const CustomerModel = model('Customer', schema);

export default CustomerModel;