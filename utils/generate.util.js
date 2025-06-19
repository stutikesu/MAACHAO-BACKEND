import jwt from "jsonwebtoken";
import crypto from 'crypto';

const accessToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return token;
};

const password = async () => {
    return crypto.randomUUID();
};

export { accessToken, password };