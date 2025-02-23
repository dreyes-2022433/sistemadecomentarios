import {Router} from 'express'
import {createComment, updateComment, deleteComment} from "../comments/comments.controller.js"

const api = Router()

api.post('/create', createComment)
api.put('/update', updateComment)
api.delete('/delete', deleteComment)

export default api