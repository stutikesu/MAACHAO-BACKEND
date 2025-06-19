import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {
        category_id: {
            type: Number,
            required: [true, "category_id is required!"],
            ref: 'category'
        },
        sub_category_id: {
            type: Number,
            default: 0,
            ref: 'sub_category'
        },
        product_type: {
            type: String,
            required: [true, "product_type is required!"]
            /**
             * product type stand for addons, cakes, decorations, gifts, photographer, makeup_artist, clothing, gaming,
             */
        },
        has_varient: {
            type: Number,
            default: 0
        },
        varients: {
            type: { Object },
            default: null
            /**
             * {
             *  "color": "red",
             *  "weight": "1pound",
             *  "price": "100",
             * }
             */
        },
        price: {
            type: Number,
            required: [true, "price is required!"]
        },
        product_name: {
            type: String,
            required: [true, "product_name is required!"]
        },
        product_description: {
            type: String,
            required: [true, "product_description is required!"]
        }
    },
    {
        timestamps: true,
    }
);


const Product = mongoose.model("product", ProductSchema);

export default Product;