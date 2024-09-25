
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient({errorFormat: "minimal"})

export class productsRepository{

    async createProduct(req: Request, res: Response) {
        const name: string = req.body.name
        const description: string = req.body.description
        const price: number = req.body.price
        const stock: number = req.body.stock
        const photo: string = req.file?.filename || ``
        const category_id: number = req.body.category_id

        const newProduct = await prisma.products.create({
            data: {
                name,
                description,
                price,
                stock,
                photo,
                category_id,
            }
        })
        return newProduct
    }

    async findAll() {
        const data = await prisma.products.findMany()
        return data
    }

    async updateProduct(req: Request, res: Response) {
        const id: number = parseInt(req.params.id)
        const { name, description, price, stock, category_id } = req.body
        const photo: string = req.file?.filename || ""
        const updatedProduct = await prisma.products.update({
            where: { id },
            data: {
                name,
                description,
                price,
                stock,
                photo,
                category_id,
            }
        })
        return updatedProduct
    }

    async deleteProduct(id: number) {
        try {
            const product = await prisma.products.delete({
                where: { id },
            });

            return product;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
    
}