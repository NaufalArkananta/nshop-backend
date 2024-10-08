import multer from "multer";
import { ROOT_DIRECTORY } from "../config";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) => {
        const storagePath = `${ROOT_DIRECTORY}/public/image-product/`
        callback(null, storagePath)
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) => {
        const fileName = `${Math.random()}-${file.originalname}`
        callback(null, fileName)
    }
})

// define funtion to filtering file
const filterFile = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    // ddefine allowed extension
    const allowedFile = /png|jpg|jpeg|gif/
    // check file extension of uploud
    const isAllow = allowedFile.test(file.mimetype)

    if(isAllow){
        callback(null, true)
    }else {
        callback(new Error(`your file is not allow to uploud`))
    }
}

const uploudProductPhoto = multer({
    storage,
    fileFilter: filterFile,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB
})

export { uploudProductPhoto }