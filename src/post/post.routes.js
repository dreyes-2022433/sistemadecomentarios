import {Router} from 'express'
import {createPost, getAllPosts, updatePost, deletePost,getMypost} from './post.controller.js'
import { validateJwt } from '../../Middlewares/validate.jwt.js'
import {postValidator,updatePostValidator} from '../../helpers/validators.js'
const api = Router()

api.post('/create',[validateJwt,postValidator], createPost)
api.get('/all', [validateJwt],getAllPosts)
api.get('/myPost', [validateJwt],getMypost)
api.put('/update',[validateJwt,updatePostValidator] ,updatePost)
api.put('/delete',[validateJwt], deletePost)

export default api