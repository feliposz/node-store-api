import * as mongoose from 'mongoose';
const Product = mongoose.model('Product');

export async function getAll () {
    return await Product.find({
        active: true
    }, 'title price slug');
};

export async function getBySlug (slug) {
    return await Product.findOne({
        slug: slug,
        active: true
    }, 'title description price slug tags');
}

export async function getById (id) {
    return await Product.findById(id);
}

export async function getByTag (tag) {
    return await Product.find({
        tags: tag,
        active: true
    });
}

export async function create (data) {
    var product = new Product(data);
    await product.save();
};

export async function update (id, data) {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
};

export async function remove (id) {
    await Product.findByIdAndDelete(id);
};