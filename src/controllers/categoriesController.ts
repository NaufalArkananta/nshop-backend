import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

const categoryService = new CategoryService()

const createCategory = async (req: Request, res: Response) => {
    try {
        const existingCategory = await categoryService.findCategoryByCategory(req.body.name)
        if(existingCategory) {
            return res.status(400).json({
                message: "Category already exists"
            })
        }

        const category = await categoryService.createCategory(req.body)
        return res.status(200).json({
            message: `Category created successfully`,
            data: category
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const findAllCategories = async (req: Request, res: Response) => {
    const categories = await categoryService.findAllCategories()
}

const findCategoryById = async (req: Request, res: Response) => {
    try {
    const category = await categoryService.findCategoryById(parseInt(req.params.id))
    if(!category){
        return res.status(404).json({
            message: "Category not found"
        })
    }
    return res.status(200).json({
        message: "Category found successfully",
        data: category
    })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const findCategoryByCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.findCategoryByCategory(req.body)
        if(!category) {
            return res.status(404).json({
                message: `Category not found`
            })
        }

        return res.status(200).json({
            message: `Category found`,
            data: category
        })
    } catch(error) {
        return res.status(500).json(error)
    }
}

const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)

        const category = await categoryService.findCategoryById(id)
        if(!category){
            return res.status(404).json({
                message: `Category not found`
            })
        }
    
        const updatedCategory = await categoryService.updateCategory(id, req.body)
        return res.status(200).json({
            message: `Category updated successfuly`,
            data: updatedCategory
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteCategry = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)

        const category = await categoryService.findCategoryById(id)
        if(!category){
            return res.status(404).json({
                message: `Category not found`
            })
        }

        const deletedCategory = await categoryService.deleteCategory(id)
        return res.status(200).json({
            message: `Category successfuly delete`,
            data: deletedCategory
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export { createCategory, findAllCategories, findCategoryById, findCategoryByCategory, updateCategory, deleteCategry }