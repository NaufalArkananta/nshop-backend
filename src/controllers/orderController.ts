import { Request, Response } from "express";
import { OrderService } from "../services/ordersService";

const orderService = new  OrderService()

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderService.createOrder(req.body)
        return res.status(200).json({
            message: `Order created successfully`,
            order
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

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