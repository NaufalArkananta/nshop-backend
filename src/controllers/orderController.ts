import { Request, Response } from "express";
import { OrderService } from "../services/ordersService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const orderService = new  OrderService()

const createOrder = async (req: Request, res: Response) => {
    try {
        const { user_id, orderStatus, order_details } = req.body;

        // Validasi bahwa order_details adalah array
        if (!Array.isArray(order_details)) {
            return res.status(400).json({
                message: 'order_details must be an array'
            });
        }

        // Ambil ID produk untuk validasi dan pengambilan harga
        const productIds = order_details.map((detail: any) => detail.product_id);

        // Ambil produk dari database
        const availableProducts = await prisma.products.findMany({
            where: { id: { in: productIds } }
        });

        // Cek apakah ada produk yang tidak tersedia
        const unavailableProducts = productIds.filter(
            (id: number) => !availableProducts.find((product: any) => product.id === id)
        );

        if (unavailableProducts.length > 0) {
            return res.status(400).json({
                message: 'Some products are unavailable',
                unavailableProducts
            });
        }

        // Hitung totalPrice dari semua produk yang dipesan
        let totalPrice = 0;
        const orderDetailsData = order_details.map((detail: any) => {
            const product = availableProducts.find((p: any) => p.id === detail.product_id);

            // Pastikan product dan price tidak undefined
            if (!product || product.price === undefined) {
                throw new Error(`Product with ID ${detail.product_id} does not exist or has no price.`);
            }

            const price = product.price * detail.quantity; // Harga produk * kuantitas
            totalPrice += price; // Tambahkan ke totalPrice

            return {
                orders_id: 0, // Ini akan diisi setelah order dibuat
                product_id: detail.product_id,
                quantity: detail.quantity,
                price: product.price // Simpan harga produk
            };
        });

        // Buat pesanan utama dengan totalPrice yang dihitung
        const order = await orderService.createOrder({
            user_id,
            orderStatus,
            totalPrice // Simpan totalPrice ke dalam pesanan
        });

        // Simpan orderDetails setelah mendapatkan ID pesanan
        const orderDetailsWithOrderId = orderDetailsData.map(detail => ({
            ...detail,
            orders_id: order.id // Masukkan ID pesanan
        }));

        await prisma.order_details.createMany({
            data: orderDetailsWithOrderId
        });

        return res.status(201).json({
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};




const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await orderService.findAllOrders()
        return res.status(200).json({
            message: `Orders fetched successfully`,
            orders
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await orderService.findOrderById(parseInt(req.params.id))
        if(!order){
            return res.status(404).json({
                message: "Order not found"
            })
        }
        return res.status(200).json({
            message: "Order fetched successfully",
            order
        })
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderService.updateOrder(parseInt(req.params.id), req.body)
        if(!order){
            return res.status(404).json({
                message: "Order not found"
            })
        }
        return res.status(200).json({
            message: "Order updated successfully",
            order
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    try {
        await orderService.deleteOrder(parseInt(req.params.id))
        return res.status(200).json({
            message: "Order deleted successfully"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder }