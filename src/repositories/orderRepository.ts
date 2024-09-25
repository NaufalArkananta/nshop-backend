import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({errorFormat: "minimal"})

export class OrderRepository {
    async createOrder(data: { user_id: number, orderStatus: 'PENDING' | 'COMPLETED' | 'CANCELED', totalPrice: number }) {
        return await prisma.orders.create({
            data
        });
    }

    async findAllOrders() {
        return await prisma.orders.findMany({
            include: {
                user: true,
                payment: true,
                order_details: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    async findOrderById(id: number) {
        return await prisma.orders.findUnique({
            where: { id },
            include: {
                user: true,
                payment: true,
                order_details: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    async updateOrder(id: number, data: Partial<{ orderStatus: 'PENDING' | 'COMPLETED' | 'CANCELED', totalPrice: number }>) {
        return await prisma.orders.update({
            where: { id },
            data
        });
    }

    async deleteOrder(id: number) {
        return await prisma.orders.delete({
            where: { id }
        });
    }
}
