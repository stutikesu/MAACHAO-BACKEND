import mongoose from "mongoose";

const CartSchema = mongoose.Schema(
    {
        user_id: {
            type: String,
            required: [true, "user_id is required!"],
            ref: 'user'
        },
        category_id: {
            type: String,
            required: [true, "category_id is required!"],
            ref: 'category'
        },
        sub_category_id: {
            type: String,
            ref: 'sub_category'
        },
        product_type: {
            type: String,
            required: [true, "product_type is required!"],
            /**
             * product type stand for cakes, decorations, gifts, photographer, videographer, makeup_artist, clothing, gaming,
             */
        },
        addons: {
            type: [String]
        },
        features: {
            type: { Object },
            required: [true, "features is required"]
            /**
             * cakes
             * {
             *  date_slot: 
             *  time_slot:
             *  weight:
             *  shape:
             *  cake_message:
             *  gift_card_message:
             *  photo_url: (if uploaded)
             * }
             * 
             * decorations,
             * gifts
             * {}
             * 
             * photographer
             * {
             *  number_of_photos:
             *  duration_hours:
             * }
             * 
             * videographer
             * {
             *  number_of_clips:
             *  duration_hours:
             * }
             * 
             * makeup_artist
             * {
             *  package:
             * }
             * 
             * clothing,
             * gaming
             * {
             *  security_deposit:
             *  from_date:
             *  to_date:
             * }
             */
        },
        notes: {
            type: String, //customer notes
        },
        label: {
            type: String, //admin label
        },
    },
    {
        timestamps: true,
    }
);


const Cart = mongoose.model("cart", CartSchema);

export default Cart;