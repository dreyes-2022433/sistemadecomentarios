'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import User from '../src/user/user.model.js'
import authRoutes from '../src/auth/auth.routes.js'
import postRoutes from '../src/post/post.routes.js'
import categoryRoutes from '../src/categorys/categorys.routes.js'
import commentRoutes from '../src/comments/comments.routes.js'
import userRoutes from '../src/user/user.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(morgan("dev"))
    app.use(helmet())
    app.use(cors())
}



const routes = (app)=>{
    app.use(authRoutes)
    app.use('/post',postRoutes)
    app.use('/category',categoryRoutes)
    app.use('/comment',commentRoutes)
    app.use('/user',userRoutes)
}

export const initServer = async()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
            console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.error('Server failed', err)
    }
}