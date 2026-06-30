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

// every product route requires a logged-in (authenticated) user
ProductRouter.use(AuthMiddleware);

// specific routes must come BEFORE "/:id" so they are not treated as an id
ProductRouter.route("/featured").get(GetFeaturedProducts);
ProductRouter.route("/price").get(GetProductsByPrice);
ProductRouter.route("/rating").get(GetProductsByRating);

ProductRouter.route("/")
    .post(AddProduct)      // add a product
    .get(GetAllProducts);  // get all products

ProductRouter.route("/:id")
    .put(UpdateProduct)    // update a product
    .delete(DeleteProduct); // delete a product
