import { Router } from "express";
import * as controller from './auth-user.controller';
import { validate } from "../../middlewares/validator-middleware";
import { userLoginValidator,userRegisterValidator } from "../../validators";

const router = Router();


router.post("/register",userRegisterValidator(),validate,controller.registerUser);
router.get("/login",userLoginValidator(), validate, controller.login);
router.get("/logout",controller.logoutUser);
router.get("/me", controller.getCurrentUser);





export default router;