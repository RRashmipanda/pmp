import { Router } from "express";
import * as controller from './auth-user.controller';
import { validate } from "../../middlewares/validator-middleware";
import { userChangeCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator,userRegisterValidator, userResetForgotPasswordValidator } from "../../validators";

const router = Router();


router.post("/register",userRegisterValidator(),validate,controller.registerUser);
router.get("/login",userLoginValidator(), validate, controller.login);
router.get("/verify-email/:verificationToken",controller.refreshAccessToken);
router.get("/login",userLoginValidator(), validate, controller.login);
router.post("/refresh-token",controller.refreshAccessToken);
router.post("/forgot-password",userForgotPasswordValidator,validate,controller.forgotPasswordRequest);
router.post("/reset-password/:resetToken",userResetForgotPasswordValidator,validate,controller.resetForgotPassword);


router.post("/logout",controller.logoutUser);
router.get("/me", controller.getCurrentUser);
router.post("/change-password",userChangeCurrentPasswordValidator(),validate,controller.changeCurrentPassword);
router.post("/resend-email-verification",controller.resendEmailVerification);





export default router;