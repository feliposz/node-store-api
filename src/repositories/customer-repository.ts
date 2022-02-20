import CustomerModel from '../models/customer';

export async function create(data: { name: string; email: string; password: string; roles: string[]; }): Promise<void> {
    var customer = new CustomerModel(data);
    await customer.save();
};

export async function authenticate(data: { email: string; password: string; }) {
    return await CustomerModel.findOne({
        email: data.email,
        password: data.password
    });
};

export async function getById(id: string) {
    return await CustomerModel.findById(id);
}