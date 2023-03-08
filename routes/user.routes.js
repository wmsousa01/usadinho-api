import { Router } from 'express'
import User from '../models/User.model.js'
import fileUpload from '../config/cloudinary.config.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const userRouter = Router()

userRouter.get('/users', isAuthenticatedMiddleware, async (req, res) => {
    const { order } = req.query
    const query = { user: req.user.id }
    
    try {
        const users = await User.find(query)
                        .sort(order)
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

userProductsRouter.get('/user/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
            .populate('user comments')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })
        if(!user) {
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})


export default userRouter