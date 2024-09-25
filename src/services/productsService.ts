import { productsRepository } from "../repositories/productsRepository";

export class ProductsService{
    constructor(private productsRepository: productsRepository) {} 

    async addProduct(req: any, res: any) {
        try{
            const product = await this.productsRepository.createProduct(req, res)
            return product
        } catch { 
            throw new Error(`Failed to create product.`)
        }
    }

    async getAllProducts() {
        try{
            const products = await this.productsRepository.findAll();
            return products
        } catch {
            throw new Error('Error fecthing products: ')
        }
    }

    async updateProduct(req: any, res: any) {
        try{
            const product = await this.productsRepository.updateProduct(req, res)
            return product
        } catch {
            throw new Error(`Failed to update product.`)
        }
    }

    async deleteProduct(id: number) {
        try {
            const product = await this.productsRepository.deleteProduct(id);
            return product;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw new Error("Failed to delete product.");
        }
    }
}