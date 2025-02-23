import { initServer } from "./configs/app.js"
import { config } from "dotenv"
import { connect } from "./configs/mongo.js"
import { adminCreation } from "./src/user/user.controller.js"
import {defaultCategory} from './src/categorys/categorys.controller.js'

config()
initServer()
connect()
adminCreation()
defaultCategory()