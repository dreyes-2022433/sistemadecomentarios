import { Schema, model } from 'mongoose'

const postSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref : 'User',
            required : [true, 'User is required']
        },
        title : {
            type: String,
            required : [true, 'title is required']
        },
        category: {
            type: Schema.Types.ObjectId,
            ref : 'Category',
            required : [true,'Category is required']
        },
        mainText : {
            type: String,
            required : [true, 'Main text is required']
        },
        status : {
            type: Boolean,
            default : true
        },
        comments : [{
            type: Schema.Types.ObjectId,
            ref : 'Comments'
        }]
    }
)

export default model('Post',postSchema)