import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({errorFormat: "minimal"})

export class CategoryRepository {
    async createCategory(data: { name: string }) {
        return await prisma.categories.create({
            data
        });
    }

    async findAllCategories() {
        return await prisma.categories.findMany({
            include: {
                products: true
            }
        });
    }

    async findCategoryById(id: number) {
        return await prisma.categories.findUnique({
            where: { id },
            include: {
                products: true
            }
        });
    }

    async updateCategory(id: number, data: Partial<{ name: string }>) {
        return await prisma.categories.update({
            where: { id },
            data
        });
    }

    async deleteCategory(id: number) {
        return await prisma.categories.delete({
            where: { id }
        });
    }
}