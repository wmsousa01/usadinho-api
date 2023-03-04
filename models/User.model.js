
import mongoose from 'mongoose'
import validator from 'validator'
const { model, Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value)
        }
    },
    passwordHash: {
        type: String,
        required: true
    },

    product: [{
        type: Schema.Types.ObjectId,
        ref:"Product"
    }]
    
}, {timestamps: true})

export default model('User', userSchema)