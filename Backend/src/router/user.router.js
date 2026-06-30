import { Router } from "express";
import { UserLoginController, UserRegister, userForgetPassword } from "../controller/user.controller.js";
export const UserRouter= Router();
UserRouter.route('/login').post(UserLoginController);
UserRouter.route('/register').post(UserRegister);
UserRouter.route('/forget-password').post(userForgetPassword);