import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({errorFormat: "minimal"})

export class OrderDetailsRepository {
    async createOrderDetail(data: { orders_id: number, product_id: number, quantity: number, price: number }) {
        return await prisma.order_details.create({
            data
        });
    }

    async findOrderDetailsByOrderId(orders_id: number) {
        return await prisma.order_details.findMany({
            where: { orders_id },
            include: {
                product: true,
                orders: true
            }
        });
    }

    async deleteOrderDetail(id: number) {
        return await prisma.order_details.delete({
            where: { id }
        });
    }
}
