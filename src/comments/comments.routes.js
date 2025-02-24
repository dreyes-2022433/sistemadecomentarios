import {Router} from 'express'
import {createComment, updateComment, deleteComment} from "../comments/comments.controller.js"
import { validateJwt } from '../../Middlewares/validate.jwt.js'
import {commentValidator,updateCommentValidator} from '../../helpers/validators.js'
const api = Router()

api.post('/create',[validateJwt,commentValidator], createComment)
api.put('/update', [validateJwt,updateCommentValidator],updateComment)
api.put('/delete',[validateJwt],deleteComment)

export default api