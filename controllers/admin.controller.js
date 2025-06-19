import * as response from '../helpers/response.helper.js'
import Admin from '../models/admin.model.js'
import * as generate from '../utils/generate.util.js';

const login = async (req, res) => {

    const email = await req.body.email;
    const token = await req.body.token;

    const admin_data = await Admin.findOne({ email });

    if (admin_data && (admin_data.token == token)) {
        const access_token = generate.accessToken(admin_data._id)
        return response.success(res, { data: access_token, message: 'Login successfull!' });

    } else {
        return response.error(res, { message: 'Invalid credentials!' });

    }

}

const profile = async (req, res) => {

    try {
        const user_id = await req.user._id;
        const admin_data = await Admin.findById(user_id);
        response.success(res, { data: admin_data });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });

    }

}


export { login, profile };