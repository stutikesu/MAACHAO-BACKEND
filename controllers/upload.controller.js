import multer from "multer";
import path from "path";
import * as response from '../helpers/response.helper.js';
import User from "../models/user.model.js";
import fs from 'fs';

// Set up storage engine
const storage = (destinationPath) => multer.diskStorage({
    destination: (req, file, cb) => {
        // Use the passed destinationPath or fallback to a default directory
        cb(null, destinationPath || "./uploads/others/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

// Initialize multer with dynamic storage
const uploadWithDynamicDestination = (destinationPath) => multer({
    storage: storage(destinationPath),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

export const upload = (req, res, destinationPath) => {
    return new Promise((resolve, reject) => {
        const upload = uploadWithDynamicDestination(destinationPath);
        upload.single("photo")(req, res, (err) => {
            if (err) {
                reject(err);  // Reject the promise if there's an error
            }
            if (!req.file) {
                reject(new Error('No file uploaded!'));
            }
            resolve(req.file);  // Resolve the promise with the file data
        });
    });
}

// Function to delete a file with dynamic filePath
export const deleteFile = async (filePath) => {
    try {
        fs.unlink(filePath, (err) => {
            if (err) {
                return true;
            }
            return true;
        });
    } catch (err) {
        return true;
    }
};;

export const updateProfilePhoto = async (req, res) => {

    try {
        const destinationPath = "./uploads/profiles";
        const file = await upload(req, res, destinationPath);

        const avatar = file.path;

        const user_id = await req.user._id;

        try {
            const user_data = await User.findById(user_id).select('email, avatar');

            await deleteFile(user_data.avatar);

            if (user_data) {
                user_data.avatar = avatar;

                const updated_user_data = await user_data.save();
                if (updated_user_data) {
                    return response.success(res, { message: 'Profile photo uploaded successfully!' });
                }
                return response.success(res, { message: 'Failed to upload profile photo!' });
            }
        } catch (err) {
            return response.error(res, { message: err.message })
        }
        return response.error(res, { message: 'Something went wrong!' })
    } catch (err) {
        return response.error(res, { message: err.message });
    }
}
