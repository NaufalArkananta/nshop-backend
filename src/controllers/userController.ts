import { Request, Response } from "express"
import { UserService } from "../services/usersService"

const userService = new UserService()

const createUser = async (req: Request, res: Response) => {
    try {
        const existingUser = await userService.getUserByEmail(req.body.email)
        if(existingUser){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const user = await userService.createUser(req.body)
        return res.status(201).json({
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id))

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            data: user
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string

        const user = await userService.getUserByEmail(email)

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            data: user
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id)

        const user = await userService.getUserById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }

        const updatedUser = await userService.updateUser(userId, req.body)

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id)

        const user = await userService.getUserById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }

        const deletedUser = await userService.deleteUser(userId)

        return res.status(200).json({
            message: `User has ben delete`,
            data: deletedUser
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export { createUser, getUserById, getUserByEmail, updateUser, deleteUser };