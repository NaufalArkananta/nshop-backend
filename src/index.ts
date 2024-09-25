import Express from "express";
import express from 'express';
import path from "path";
import ProductRoute from "./routes/productsRoute"

const app = Express();

app.use(Express.json());

app.use("/api/products", ProductRoute);

app.use('/image-product', express.static(path.join(__dirname, '../public/image-product')));

app.use("/api/users")

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});