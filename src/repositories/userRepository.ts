import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
    async createUser(data: { name: string, email: string, password: string, address: string }) {
        return await prisma.user.create({
            data
        });
    }

    async findUserById(id: number) {
        return await prisma.user.findUnique({
            where: { id }
        });
    }

    async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async updateUser(id: number, data: Partial<{ name: string, email: string, password: string, address: string }>) {
        return await prisma.user.update({
            where: { id },
            data
        });
    }

    async deleteUser(id: number) {
        return await prisma.user.delete({
            where: { id }
        });
    }
}
