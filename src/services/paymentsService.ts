import { PaymentRepository } from "../repositories/paymentRepository";

export class PaymentsService {
    private paymentsRepository = new PaymentRepository()
    
    constructor() {
        this.paymentsRepository = new PaymentRepository()
    }

    async createPayment(data: {orders_id: number, paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER', paymentStatus: 'PAID' | 'PENDING' | 'FAILED', paymentDate?: Date }) {
        return await this.paymentsRepository.createPayment(data)
    }

    async findPaymentByOrderId(orders_id: number) {
        return await this.paymentsRepository.findPaymentByOrderId(orders_id)
    }

    async updatePayment(id: number, data: Partial<{ paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER', paymentStatus: 'PAID' | 'PENDING' | 'FAILED', paymentDate: Date }>) {
        return await this.paymentsRepository.updatePayment(id, data)
    }

    async deletePayment(id: number) {
        return await this.paymentsRepository.deletePayment(id)
    }
}