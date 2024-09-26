import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    address: Joi.string().required()
})

const createValidation = (req: Request, res: Response, next: NextFunction) => {
    const validate = createSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if(validate.error) {
        return res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", ")
        })
    }
    next();
}

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).optional(),
    address: Joi.string().optional()
})

const updateValidation = (req: Request, res: Response, next: NextFunction) => {
    const validate = updateSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if(validate.error) {
        return res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", ")
        })
    }
    next();
}

export { createValidation, updateValidation}