import { Request, Response } from "express";
import { ProductsService } from "../services/productsService";
import { productsRepository } from "../repositories/productsRepository";
import { error } from "console";

const productRepository = new productsRepository();
const productService = new ProductsService(productRepository);

const addProduct = async (req: Request, res: Response) => {
    try{
        const product = await productService.addProduct(req, res)

        return res.status(200).json({
            message: `Product created successfully`,
            data: product
        })
    } catch {
        return res.status(500).json(error)
    }
}

const getAllProduct = async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();  // Memanggil fungsi

        if (!products || products.length === 0) {
            return res.status(404).json({
                message: `No product found`
            });
        }

        return res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.updateProduct(req, res)

        if(!product){
            return res.status(404).json({
                message: `No product found`
            })
        }

        return res.status(200).json({
            message: `Product update successfully`,
            data: product
        })
    } catch {
        return res.status(500).json(error)
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.deleteProduct(parseInt(req.params.id))
        if(!product){
            return res.status(404).json({
                message: `No product found`
            })
        }

        
        return res.status(200).json({
            message: "product has ben removed",
            data: product
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export { getAllProduct, addProduct, updateProduct, deleteProduct };