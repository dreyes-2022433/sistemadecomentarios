import User from '../src/user/user.model.js'
import Category from '../src/categorys/categorys.model.js'

export const existUsername = async(username)=>{
    const alreadyUsername = await User.finOne({username})
    if(alreadyUsername){
        console.error(`Username ${username} is already taked`)
        throw new Error(`Username ${username} is already taked`)
    }
}