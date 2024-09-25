import { Router } from "express";
import { createUser, deleteUser, getUserByEmail, getUserById, updateUser } from "../controllers/userController";

const router = Router()
router.post(`/`, createUser)
router.get(`/:id`, getUserById)
router.get(`/:email`, getUserByEmail)
router.put(`/:id`, updateUser)
router.delete(`/:id`, deleteUser)

export default router