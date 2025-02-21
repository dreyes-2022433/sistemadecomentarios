import { initServer } from "./configs/app.js"
import { config } from "dotenv"
import { connect } from "./configs/mongo.js"
import { adminCreation } from "./src/user/user.controller.js"

config()
initServer()
connect()
adminCreation()