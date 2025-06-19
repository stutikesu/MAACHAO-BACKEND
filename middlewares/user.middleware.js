import jwt from "jsonwebtoken";
import * as response from '../helpers/response.helper.js'
import User from '../models/user.model.js'

const auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return response.error(res, { status: 401, message: 'Authentication failed!' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        if (!req.user) {
            return response.error(res, { status: 401, message: 'Authentication failed!' });
        }
        next();

    } catch (error) {
        return response.error(res, { status: 401, message: 'Authentication failed!' });
    }

};

export { auth };
