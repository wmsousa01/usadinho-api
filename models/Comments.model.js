
import { model, Schema } from 'mongoose'

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

export default model('Comment', commentSchema)