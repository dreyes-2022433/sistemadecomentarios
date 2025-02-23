import Category from './categorys.model.js'
import Post from '../post/post.model.js'

export const createCategory = async (req, res) => {
    try {
        const category = await new Category(req.body)
        category.save()
        return res.send({ message: 'Category created', category })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error with creating a category', err })
    }
}

export const defaultCategory = async () => {
    let category = await new Category({
        name: 'Default',
        description: 'Default category',
        status: true
    })
    if (await Category.findOne({ name: 'Default' })) return console.log('Default category already exists')
    category.save()
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        return res.send({ message: 'All categories', categories })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error with getting all categories', err })
    }
}

export const updateCategory = async (req, res) => {
    try{
        const {id} = req.body
        const newdata = req.body
        const category = await Category.findByIdAndUpdate(id, newdata, {new: true})
        if(!category) return res.status(404).send({message: 'Category not found'})
        return res.send({message: 'Category updated', category})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with updating a category', err})
    }
}

export const deleteCategory = async (req, res) => {
    try{
        const id = req.body.id
        let defaultCategory = await Category.findOne({name: 'Default'})
        if(defaultCategory._id == id) return res.status(400).send({message: 'Cannot delete default category'})
            let deletedCategory = await Category.deleteOne({_id: id})
        if(deletedCategory.deletedCount <= 0) return res.status(404).send({message: 'Category not found'})

        if(!defaultCategory)return res.status(404).send({message: 'Default category not found'})
            await Post.updateMany({category: id}, {category: defaultCategory._id})
        return res.send({message: 'Category deleted' })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with deleting a category', err})
    }
}