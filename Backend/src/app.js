import express, { json } from "express";
import { Router } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from "./router/user.router.js";
import { ProductRouter } from "./router/product.router.js";
export const app = express();

app.use(express.json())
app.use(cors({
    origin:process.env.ALLOWEDSITE,
    credentials: true
}))
app.use(cookieParser());
// user api point
app.use("/user",UserRouter);
// product api point
app.use("/products",ProductRouter);
