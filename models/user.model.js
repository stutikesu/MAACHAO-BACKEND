import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required!"]
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            required: [true, "name is required!"]
        },
        has_password: {
            type: Number,
            default: 0
        },
        password: {
            type: String,
        },
        balance: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            required: [true, "role is required!"]
        }
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model("user", UserSchema);

export default User;