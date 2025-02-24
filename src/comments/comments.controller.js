import Comments from "./comments.model.js"
import Post from "../post/post.model.js"


export const createComment = async(req, res)=>{
    try{
        const idUser = req.user.uid
        let data = req.body
        let post = await Post.findOne({_id: data.post})
        if(!post) return res.status(404).send({message: 'Post not found'})
        if(post.status === false) return res.status(404).send({message: 'Post not found'})
        const comment = await new Comments({...data, user: idUser})
        post.comments.push(comment._id)
        comment.save()
        post.save()
        return res.send({message: 'Comment created', comment})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with creating a comment', err})
    }
}

export const updateComment = async(req, res)=>{
    try{
        let {id} = req.body
        let newdata = req.body
        let idUser = req.user.uid
        let owncomment = await Comments.findOne({_id: id, user: idUser})
        if(!owncomment) return res.status(401).send({message: 'Unauthorized, this is not your comment'})
        let comment = await Comments.findByIdAndUpdate(id, newdata, {new: true})
        if(!comment) return res.status(404).send({message: 'Comment not found'})
        return res.send({message: 'Comment updated', comment})    
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with updating a comment', err})
    }
}

export const deleteComment = async(req, res)=>{
    try{
        let {id} = req.body
        let comment = await Comments.findByIdAndUpdate(id, {status: false}, {new: true})
        if(!comment) return res.status(404).send({message: 'Comment not found'})
        return res.send({message: 'Comment deleted', comment})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with deleting a comment', err})
    }
}