import { Router } from "express"

import { login, register } from "./auth.controller.js"
import {registerValidator,loginValidator} from '../../helpers/validators.js'

const api = Router()

api.post('/register', [registerValidator],register)
api.post('/login', [loginValidator],login)

export default api