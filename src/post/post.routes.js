import {Router} from 'express'
import {createPost, getAllPosts, updatePost, deletePost} from './post.controller.js'

const api = Router()

api.post('/create', createPost)
api.get('/all', getAllPosts)
api.put('/update', updatePost)
api.delete('/delete', deletePost)

export default api