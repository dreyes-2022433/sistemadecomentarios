import Comments from "./comments.model.js"

export const createComment = async(req, res)=>{
    try{
        const comment = await new Comments(req.body)
        comment.save()
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
        if(!owncomment) return res.status(401).send({message: 'Unauthorized'})
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