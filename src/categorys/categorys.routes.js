import {Router} from 'express'
import { createCategory,getAllCategories,updateCategory,deleteCategory} from "./categorys.controller.js"
import { validateJwt,verifyAdminRole} from '../../Middlewares/validate.jwt.js'
import {categoryValidator,updateCategoryValidator} from '../../helpers/validators.js'
const api = Router()

api.post('/create',[validateJwt,verifyAdminRole,categoryValidator],createCategory)
api.get('/all', [validateJwt],getAllCategories)
api.put('/update',[validateJwt, verifyAdminRole,updateCategoryValidator] ,updateCategory)
api.delete('/delete',[validateJwt,verifyAdminRole] ,deleteCategory)

export default api