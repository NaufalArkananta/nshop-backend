import { Router } from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "../controllers/orderController";

const router = Router()

router.post(`/`, createOrder)
router.get(`/`, getAllOrders)
router.get(`/:id`, getOrderById)
router.put(`/:id`, updateOrder)
router.delete(`/:id`, deleteOrder)

export default router