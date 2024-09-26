import { CategoryRepository } from "../repositories/categoryRepository";

export class CategoryService{
    private categoryRepository: CategoryRepository

    constructor() {
        this.categoryRepository = new CategoryRepository
    }

    async createCategory(data: { name: string }) {
        return await this.categoryRepository.createCategory(data)
    }

    async findAllCategories() {
        return await this.categoryRepository.findAllCategories()
    }

    async findCategoryById(id: number) {
        return await this.categoryRepository.findCategoryById(id)
    }

    async findCategoryByCategory(category: string) {
        return await this.categoryRepository.findCategoryByCategory(category)
    }

    async updateCategory(id: number, data: Partial<{ name: string }>) {
        return await this.categoryRepository.updateCategory(id, data)
    }

    async deleteCategory(id: number) {
        return await this.categoryRepository.deleteCategory(id)
    }
}