import { Router } from "express"

import { login, register } from "./auth.controller.js"

const api = Router()

api.post('/register', register)
api.post('/login', login)