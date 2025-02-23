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
//Actualizar Password
export const updatePassword = async(req, res) =>{
    try{
        let {id, newpassword, oldpassword} = req.body
        let user = await User.findById(id)     
        if(!user) return res.status(404).send({message: 'user not found'})
        if(await checkPassword(user.password, oldpassword)){
            newpassword = await encrypt(newpassword)
            await User.findByIdAndUpdate(id,{password: newpassword})
            return res.send({message: 'Contraseña actualizada'})
        } return res.send({message: 'Contraseña no coincide'}) 
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error'})
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
if(await User.findOne({username: 'dreyes'})) return console.log('Admin already exists')
admin.save()

}