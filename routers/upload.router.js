import express from "express";

import * as uploadController from "../controllers/upload.controller.js";
import * as middleware from '../middlewares/user.middleware.js'
import * as methodHelper from "../helpers/method.helper.js";

const uploadRouter = express.Router();
uploadRouter.route('/avatar').post(middleware.auth, uploadController.updateProfilePhoto).all(methodHelper.unknownMethod);

export default uploadRouter;