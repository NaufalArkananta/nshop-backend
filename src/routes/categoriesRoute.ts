import { Router } from "express";
import { createCategory, deleteCategry, findAllCategories, findCategoryByCategory, findCategoryById, updateCategory } from "../controllers/categoriesController";

const router = Router()
router.post(`/`, createCategory)
router.get(`/`, findAllCategories)
router.get(`/:id`, findCategoryById)
router.get(`/`, findCategoryByCategory)
router.put(`/:id`, updateCategory)
router.delete(`/:id`, deleteCategry)

export default router