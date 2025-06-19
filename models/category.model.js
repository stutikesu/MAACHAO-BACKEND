import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
    {
        category_name: {
            type: String,
            required: [true, "category_name is required!"]
        },
        category_description: {
            type: String,
            required: [true, "category_description is required!"]
        }
    },
    {
        timestamps: true,
    }
);


const Category = mongoose.model("category", CategorySchema);

export default Category;