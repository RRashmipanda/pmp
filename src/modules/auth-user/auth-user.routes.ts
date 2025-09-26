import { Router } from "express";
import * as controller from './auth-user.controller';
import { validate } from "../../middlewares/validator-middleware";
import { userForgotPasswordValidator, userLoginValidator,userRegisterValidator, userResetForgotPasswordValidator } from "../../validators";

const router = Router();


router.post("/register",userRegisterValidator(),validate,controller.registerUser);
router.get("/login",userLoginValidator(), validate, controller.login);
router.get("/verify-email/:verificationToken",controller.refreshAccessToken);
router.get("/login",userLoginValidator(), validate, controller.login);
router.post("/refresh-token",controller.refreshAccessToken);
router.post("/forgot-password",userForgotPasswordValidator,validate,controller.forgotPasswordRequest);
router.post("/reset-password/:resetToken",userResetForgotPasswordValidator,validate,controller.resetForgotPassword);


router.get("/logout",controller.logoutUser);
router.get("/me", controller.getCurrentUser);



//secure routes
// router.route("/logout").post(verifyJWT, logoutUser);
// router.route("/current-user").post(verifyJWT, getCurrentUser);
// router
//   .route("/change-password")
//   .post(
//     verifyJWT,
//     userChangeCurrentPasswordValidator(),
//     validate,
//     changeCurrentPassword,
//   );
// router
//   .route("/resend-email-verification")
//   .post(verifyJWT, resendEmailVerification);

// export default router;



export default router;