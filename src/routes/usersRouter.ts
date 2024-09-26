import { Router } from "express";
import { createUser, deleteUser, getUserByEmail, getUserById, updateUser } from "../controllers/userController";
import { createValidation, updateValidation } from "../middlewares/usersValidation";

const router = Router()
router.post(`/`, [createValidation], createUser)
router.get(`/:id`, getUserById)
router.get(`/`, getUserByEmail)
router.put(`/:id`, [updateValidation], updateUser)
router.delete(`/:id`, deleteUser)

export default router