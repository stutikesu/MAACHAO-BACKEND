import express from "express";

import * as publicController from "../controllers/public.controller.js";
import * as methodHelper from "../helpers/method.helper.js";

const publicRouter = express.Router();

/**common */
publicRouter.route('/test').get(publicController.test).all(methodHelper.unknownMethod);

export default publicRouter;