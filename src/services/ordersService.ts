import { orders } from "@prisma/client";
import { OrderRepository } from "../repositories/orderRepository";

export class OrderService {
    private orderRepository: OrderRepository

    constructor() {
        this.orderRepository = new OrderRepository
    }

    async createOrder(data: { user_id: number; orderStatus: 'PENDING' | 'COMPLETED' | 'CANCELED'; totalPrice: number }) {
        return await this.orderRepository.createOrder(data);
    }

    async findAllOrders(): Promise<orders[]> {
        return await this.orderRepository.findAllOrders();
    }

    async findOrderById(id: number): Promise<orders | null> {
        return await this.orderRepository.findOrderById(id);
    }

    async updateOrder(id: number, data: Partial<{ orderStatus: 'PENDING' | 'COMPLETED' | 'CANCELED'; totalPrice: number }>): Promise<orders | null> {
        const updatedOrder = await this.orderRepository.updateOrder(id, data);

        if (!updatedOrder) {
            throw new Error(`Order with id ${id} not found`);
        }

        return updatedOrder;
    }

    async deleteOrder(id: number): Promise<void> {
        const order = await this.orderRepository.findOrderById(id);

        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }

        await this.orderRepository.deleteOrder(id);
    }
}