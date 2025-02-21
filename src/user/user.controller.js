import User from '../user/user.model.js'
import {encrypt} from '../../utils/encrypt.js'
export const updateUser = async(req, res)=>{
    try{
        const {id} = req.params
        const newdata = req.body
        if(newdata.password){
            return res.send({message: 'cannot update a user password'})
            
        }
        const data = await User.findByIdAndUpdate(id,newdata,{ new: true })

        if(!data) return res.status(404).send({succes: false, message: 'User not foudn'})
            return res.send({
        succes: true,
        message: 'user updated', data})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with updating an user', err})
    }
}

export const adminCreation = async()=>{
    let adminPass = await encrypt('Diego-15.!')
    let admin = await new User({
       name : 'Diego',
       surname: 'Reyes',
       username: 'dreyes',
       email : 'dreyes-2022433@kinal.edu.gt',
       password : adminPass,
       phone: '3612-4296',
       role: 'ADMIN',
    }
)
admin.save()

}