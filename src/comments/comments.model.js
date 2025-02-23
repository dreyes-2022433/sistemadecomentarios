import { Schema, model } from 'mongoose'

const commentsSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Category is required']
    },
    text : {
        type: String,
        required: [true, 'text is required']
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true,'Post is required']
    },
    status : {
        type: Boolean,
        default : true
    },
}
)

export default model('Comment',commentsSchema )