import {Router} from 'express'
import {updateUser, updatePassword} from './user.controller.js'

const api = Router()

api.put('/update', updateUser)
api.put('/password', updatePassword)

export default api