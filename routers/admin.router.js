import express from "express";

import * as adminController from "../controllers/admin.controller.js";
import * as middleware from '../middlewares/admin.middleware.js'
import * as methodHelper from "../helpers/method.helper.js";

const adminRouter = express.Router();
adminRouter.route('/login').post(adminController.login).all(methodHelper.unknownMethod);
adminRouter.route('/profile').get(middleware.auth, adminController.profile).all(methodHelper.unknownMethod);

export default adminRouter;