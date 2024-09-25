import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({errorFormat: "minimal"})

export class PaymentRepository {
    async createPayment(data: { orders_id: number, paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER', paymentStatus: 'PAID' | 'PENDING' | 'FAILED', paymentDate?: Date }) {
        return await prisma.payments.create({
            data
        });
    }

    async findPaymentByOrderId(orders_id: number) {
        return await prisma.payments.findMany({
            where: { orders_id }
        });
    }

    async updatePayment(id: number, data: Partial<{ paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER', paymentStatus: 'PAID' | 'PENDING' | 'FAILED', paymentDate: Date }>) {
        return await prisma.payments.update({
            where: { id },
            data
        });
    }

    async deletePayment(id: number) {
        return await prisma.payments.delete({
            where: { id }
        });
    }
}
