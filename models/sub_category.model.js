import mongoose from "mongoose";

const SubCategorySchema = mongoose.Schema(
    {
        category_id: {
            type: String,
            required: [true, "category_id is required!"],
            ref: 'category'
        },
        sub_category_name: {
            type: String,
            required: [true, "sub_category_name is required!"]
        },
        sub_category_description: {
            type: String,
            required: [true, "sub_category_description is required!"]
        }
    },
    {
        timestamps: true,
    }
);


const SubCategory = mongoose.model("sub_category", SubCategorySchema);

export default SubCategory;