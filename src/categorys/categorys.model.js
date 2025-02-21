import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name : {
        type : String,
        required: [true,'Name is required'],
        toupperCase: true,
        maxLength : [25, 'can not overcome 25']
    },
    description : {
        type : String,
        required : [true,'description is required'],
        maxLength: [70,'Can`t overcome 70']

    }
})

export default model('Category', categorySchema)