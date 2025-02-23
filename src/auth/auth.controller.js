import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

export const register = async(req, res)=>{ 
    try{
        let data = req.body
        const user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'CLIENT'
        await user.save()
        res.status(201).json({message: `Registered user:  ${user.username}`})
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const login = async(req, res)=>{
    try{
        //Capturar los datos (body)
        let { userLoggin, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({
            $or: 
            [
            {username: userLoggin},
             {email: userLoggin}
            ]
        }
    )
        if(user && await checkPassword(user.password, password)) {
            let loggedUser = { //No puede ir data sensible
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            //PENDIENTE: generar el Token
            let token = await generateJwt(loggedUser)
            //Responder al usuario
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Wrong email or password'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function'})
    }
}