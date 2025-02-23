import Post from './post.model.js'


export const createPost = async(req, res)=>{
    try{
        const idUser = req.user.uid
        const data = req.body
        const post = await new Post({user:idUser,data})
        post.save()
        return res.send({message: 'Post created', post})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with creating a post', err})
    }
}

export const getAllPosts = async(req, res)=>{   
    try{
        const posts = await Post.find()
        .populate({path:'post',match:{status:true}})
        .populate({path:'comments',match:{status:true},select:'text -_id'})
        .populate('category', 'name -_id')
        return res.send({message: 'All posts', posts})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with getting all posts', err})
    }
}

export const getMypost = async(req, res)=>{
    try{
        const id = req.user.uid
        const post = await Post.find({user: id})
        .populate({path:'post',match:{status:true}})
        .populate({path:'comments',match:{status:true},select:'text -_id'})
        .populate('category', 'name -_id')
        if(!post) return res.status(404).send({message: 'Post not found'})
        return res.send({message: 'My posts', post})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with getting my post', err})
    }
}

export const updatePost = async(req, res)=>{
    try{
        const {id} = req.body
        const newdata = req.body
        const idUser = req.user.uid
        const ownpost = await Post.findOne({_id: id, user: idUser})
        if(!ownpost) return res.status(401).send({message: 'Unauthorized'})
        const post = await Post.findByIdAndUpdate(id, newdata, {new: true})
        if(!post) return res.status(404).send({message: 'Post not found'})
        return res.send({message: 'Post updated', post})
}catch(err){
    console.error(err)
    return res.status(500).send({message: 'General error with updating a post', err})
}
}

export const deletePost = async(req, res)=>{
    try{
        const {id} = req.body
        const post = await Post.findByIdAndUpdate(id, {status: false}, {new: true})	
        if(!post) return res.status(404).send({message: 'Post not found'})
        return res.send({message: 'Post deleted', post})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with deleting a post', err})
    }
}	