import { Router } from "express";
import { UserLoginController } from "../controller/user.controller.js";
export const UserRouter= Router();
UserRouter.route('/login').post(UserLoginController);