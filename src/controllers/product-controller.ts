import { Request, Response, NextFunction } from 'express';
import * as guid from 'guid';
import * as repository from '../repositories/product-repository';
import * as storageService from '../services/storage-service';
import ValidationContract from '../validators/fluent-validator';

export async function get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        var data = await repository.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({});
    }
};

export async function getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        var data = await repository.getBySlug(req.params.slug);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({});
        }
    } catch (e) {
        res.status(400).send({});
    }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        var data = await repository.getById(req.params.id);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({});
        }
    } catch (e) {
        res.status(400).send({});
    }
}

export async function getByTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({});
    }
}

export async function post(req: Request, res: Response, next: NextFunction): Promise<void> {
    const contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'Title must have at least 3 characters');
    contract.hasMinLen(req.body.slug, 3, 'Slug must have at least 3 characters');
    contract.hasMinLen(req.body.description, 3, 'Description must have at least 3 characters');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors());
        return;
    }

    try {
        let filename: string = guid.raw().toString() + '.jpg';
        const success = await storageService.storeImageBase64(filename, 'product-images', req.body.image);
        if (!success) {
            filename = 'default-product.png'
        }

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            tags: req.body.tags,
            image: filename
        });
        res.status(201).send({
            message: "Product created successfully"
        });
    } catch (e) {
        res.status(400).send({
            message: "Failed to create product"
        });
    }
};

export async function put(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await repository.update(req.params.id, req.body);
        res.status(201).send({
            message: "Product updated successfully"
        });
    } catch (e) {
        res.status(400).send({
            message: "Failed to update product"
        });
    }
};

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await repository.remove(req.params.id);
        res.status(201).send({
            message: "Product deleted successfully"
        });
    } catch (e) {
        res.status(400).send({
            message: "Failed to delete product"
        });
    }
};