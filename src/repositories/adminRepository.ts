import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({errorFormat: "minimal"})

export class AdminRepository {
    async createAdmin(data: { name: string, email: string, password: string, role: 'SUPER_ADMIN' | 'MANAGER' }) {
        return await prisma.admin.create({
            data
        });
    }

    async findAdminByEmail(email: string) {
        return await prisma.admin.findUnique({
            where: { email }
        });
    }

    async updateAdmin(id: number, data: Partial<{ name: string, email: string, password: string, role: 'SUPER_ADMIN' | 'MANAGER' }>) {
        return await prisma.admin.update({
            where: { id },
            data
        });
    }

    async deleteAdmin(id: number) {
        return await prisma.admin.delete({
            where: { id }
        });
    }
}
