
import { model, Schema } from 'mongoose'

const productSchema = new Schema({
    product: {
        type: String,
        required: true
    },

    picture: {
        type: String,
        required: false
    },

    price: {
        type: Number,
        required: true
    },

    condition: {
        type: String,
        enum: ['novo', 'usado', 'semi-novo'],
        required : false
    },

    desc: {
        type: String,
        required: true
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],

    user: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }

}, { timestamps: true })

export default model('Product', productSchema)