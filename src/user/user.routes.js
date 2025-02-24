import {Router} from 'express'
import {updateUser, updatePassword} from './user.controller.js'
import { validateJwt } from '../../Middlewares/validate.jwt.js'
import {UpdateValidator,passUpdatevalidator} from '../../helpers/validators.js'

const api = Router()

api.put('/update',[validateJwt,UpdateValidator] ,updateUser)

api.put('/password',[validateJwt],passUpdatevalidator,updatePassword)

export default api