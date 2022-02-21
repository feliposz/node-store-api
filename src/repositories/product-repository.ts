import ProductModel from '../models/product';

export async function getAll() {
    return await ProductModel.find({
        active: true
    }, 'title price slug');
};

export async function getBySlug(slug: string) {
    return await ProductModel.findOne({
        slug: slug,
        active: true
    }, 'title description price slug tags');
}

export async function getById(id: string) {
    return await ProductModel.findById(id);
}

export async function getByTag(tag: string) {
    return await ProductModel.find({
        tags: tag,
        active: true
    });
}

export async function create(data: { title: string; slug: string; description: string; price: number; tags: any; image: string; }) {
    var product = new ProductModel(data);
    await product.save();
};

export async function update(id: string, data: { title: string; description: string; price: number; slug: string; }) {
    await ProductModel.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
};

export async function remove(id: string) {
    await ProductModel.findByIdAndDelete(id);
};