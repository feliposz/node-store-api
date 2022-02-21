import { Schema, model } from 'mongoose';

interface Product {
    title: string,
    slug: string,
    description: string,
    price: number,
    active: boolean,
    tags: { type: string }[],
    image: string
}

const schema = new Schema<Product>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }],
    image: {
        type: String,
        required: true,
        trim: true
    }
});

const ProductModel = model('Product', schema);

export default ProductModel;