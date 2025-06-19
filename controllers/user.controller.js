import * as response from '../helpers/response.helper.js';
import Cart from '../models/cart.model.js';
import User from '../models/user.model.js';
import * as generate from '../utils/generate.util.js';

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user_data = await User.findOne({ email });

    if (user_data && (user_data.password === password)) {
        const access_token = generate.accessToken(user_data._id);
        return response.success(res, { data: { access_token }, message: `Welcome back, ${user_data.name}!` });
    } else {
        return response.error(res, { message: 'Invalid credentials!' });
    }
};

const register = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.error(res, { message: 'Email already registered!' });
        }

        const newUser = new User({ name, email, password, phone });
        const savedUser = await newUser.save();
        const access_token = generate.accessToken(savedUser._id);
        return response.success(res, { data: { access_token }, message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        return response.error(res, { message: 'Registration failed!' });
    }
};

const sendOTP = async (req, res) => {
    const phone = req.body.phone;
    const test = req.body.test;

    const user_data = await User.findOne({ phone });
    // TODO: Implement OTP sending logic (e.g., mtalkz integration)

    if (test) {
        return response.success(res, { message: `OTP sent, ${phone}!` });
    } else {
        return response.error(res, { message: `Failed to send OTP to ${phone}!` });
    }
};

const verifyOTP = async (req, res) => {
    const phone = req.body.phone;
    // Note: OTP verification logic needed
    const user_data = await User.findOne({ phone });

    if (user_data) {
        const access_token = generate.accessToken(user_data._id);
        return response.success(res, { data: { access_token }, message: `Welcome back, ${user_data.name}!` });
    } else {
        return response.error(res, { message: 'Invalid credentials!' });
    }
};

const profile = async (req, res) => {
    try {
        const user_id = req.user._id;
        const user_data = await User.findById(user_id);
        response.success(res, { data: user_data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getCart = async (req, res) => {
    try {
        const user_id = req.user._id;
        const cart_data = await Cart.find(user_id);
        response.success(res, { data: cart_data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const updateProfile = async (req, res) => {
    const user_id = req.user._id;
    const { avatar, name, phone, whatsapp, telegram, address } = req.body;

    try {
        const user_data = await User.findById(user_id).select('email');
        if (user_data) {
            user_data.avatar = avatar;
            user_data.name = name;
            user_data.phone = phone;
            user_data.whatsapp = whatsapp;
            user_data.telegram = telegram;
            user_data.address = address;

            const updated_user_data = await user_data.save();
            if (updated_user_data) {
                return response.success(res, { message: 'Profile data updated successfully!' });
            }
            return response.error(res, { message: 'Failed to update data!' });
        }
    } catch {
        return response.error(res, { message: 'Invalid user request!' });
    }
    return response.error(res, { message: 'Something went wrong!' });
};

const getBookings = async (req, res) => {
    // Dummy response for now - replace with DB logic
    return response.success(res, { data: [], message: 'User bookings fetched!' });
};

const sendFeedback = async (req, res) => {
    const { message } = req.body;
    // You could save this to DB or send as an email
    return response.success(res, { message: 'Thank you for your feedback!' });
};

export {
    login,
    profile,
    updateProfile,
    sendOTP,
    verifyOTP,
    register,
    getBookings,
    sendFeedback,
    getCart
};
