import express from "express";

import * as userController from "../controllers/user.controller.js";
import * as middleware from "../middlewares/user.middleware.js";
import * as methodHelper from "../helpers/method.helper.js";

const userRouter = express.Router();

/** Auth */
userRouter.route('/send-otp').post(userController.sendOTP);
userRouter.route('/verify-otp').post(userController.verifyOTP);
userRouter.route('/login').post(userController.login);
userRouter.route('/register').post(userController.register);

/** Profile */
userRouter
  .route('/profile')
  .get(middleware.auth, userController.profile)
  .post(middleware.auth, userController.updateProfile)
  .all(methodHelper.unknownMethod);

  userRouter
  .route('/cart')
  .get(middleware.auth, userController.getCart)
  .post(middleware.auth, userController.updateProfile)
  .all(methodHelper.unknownMethod);

/** User Bookings */
userRouter
  .route('/bookings')
  .get(middleware.auth, userController.getBookings)
  .all(methodHelper.unknownMethod);

/** User Feedback */
userRouter
  .route('/feedback')
  .post(middleware.auth, userController.sendFeedback)
  .all(methodHelper.unknownMethod);

export default userRouter;
