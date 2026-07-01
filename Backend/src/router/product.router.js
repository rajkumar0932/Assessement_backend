import { Router } from "express";
import { AuthMiddleware } from "../middleware/Authentication.js";
import {
    AddProduct,
    GetAllProducts,
    UpdateProduct,
    DeleteProduct,
    GetFeaturedProducts,
    GetProductsByPrice,
    GetProductsByRating,
} from "../controller/product.controller.js";

export const ProductRouter = Router();

ProductRouter.use(AuthMiddleware);

ProductRouter.route("/featured").get(GetFeaturedProducts);
ProductRouter.route("/price").get(GetProductsByPrice);
ProductRouter.route("/rating").get(GetProductsByRating);

ProductRouter.route("/").post(AddProduct).get(GetAllProducts);
ProductRouter.route("/:id").put(UpdateProduct).delete(DeleteProduct);
