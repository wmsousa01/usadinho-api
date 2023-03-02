import { Router } from "express";
import Comment from '../models/Comments.model.js'
import Product from '../models/Product.model.js'

const commentsRouter = Router()

commentsRouter.post('/products/:productId/comments', async (req, res) => {
    const { productId } = req.params
    const payload = req.body
    try {
        const newComment = await Comment.create(payload)
        const product = await Product.findOneAndUpdate({_id: productId}, {$push: {comments: newComment._id}})
        return res.status(201).json(newComment)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default commentsRouter