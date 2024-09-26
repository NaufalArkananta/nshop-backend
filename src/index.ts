import Express from "express";
import express from 'express';
import path from "path";
import ProductRoute from "./routes/productsRoute"
import UserRoute from "./routes/usersRouter"
import CategoryRoute from "./routes/categoriesRoute"
import OrderRoute from "./routes/ordersRoute"

const app = Express();

app.use(Express.json());

app.use("/api/products", ProductRoute);

app.use('/image-product', express.static(path.join(__dirname, '../public/image-product')));

app.use("/api/users", UserRoute)

app.use("/api/category", CategoryRoute)

app.use("/api/order", OrderRoute)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});