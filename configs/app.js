'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(morgan("dev"))
    app.use(helmet())
    app.use(cors())
}

const routes = (app)=>{

}

export const initServer = async()=>{
    const app = express()
    try{
        configs(app)
        //routes(app
        app.listen(process.env.PORT)
            console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.error('Server failed', err)
    }
}