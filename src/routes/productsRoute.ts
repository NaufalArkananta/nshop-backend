import { Router } from "express";
import { addProduct, deleteProduct, getAllProduct, updateProduct } from "../controllers/productsController";
import { uploudProductPhoto } from "../middlewares/uploadProductPhoto";

const router = Router();
router.post(`/`, [uploudProductPhoto.single(`photo`)], addProduct)
router.get(`/`, getAllProduct)
router.put(`/:id`, [uploudProductPhoto.single(`photo`)], updateProduct)
router.delete(`/:id`, deleteProduct)
export default router;