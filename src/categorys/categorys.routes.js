import {Router} from 'express'
import { createCategory,getAllCategories,updateCategory,deleteCategory} from "./categorys.controller.js"

const api = Router()

api.post('/create', createCategory)
api.get('/all', getAllCategories)
api.put('/update', updateCategory)
api.delete('/delete', deleteCategory)

export default api