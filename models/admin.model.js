import mongoose from "mongoose";

const AdminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },

        email: {
            type: String,
            required: [true, "Email is required"]
        },

        token: {
            type: String,
            required: [true, "Token is required"]
        }
    },
    {
        timestamps: true,
    }
);

// AdminSchema.methods.checkPassword = async function (spassword) {
//     if (spassword == this.password) {
//         return true;
//     } else {
//         return false;
//     }
// };

const Admin = mongoose.model("admin", AdminSchema);

export default Admin;