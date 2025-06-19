import mongoose from "mongoose";

const OtpSchema = mongoose.Schema(
    {
        user_id: {
            type: String,
            required: [true, "user_id is required!"],
            ref: 'user'
        },
        otp: {
            type: String,
            required: [true, "otp is required!"],
        }
    },
    {
        timestamps: true,
    }
);


const Otp = mongoose.model("otp", OtpSchema);

export default Otp;