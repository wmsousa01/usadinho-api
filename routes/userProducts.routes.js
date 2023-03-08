import { Router } from 'express'
import Product from '../models/Product.model.js'
import fileUpload from '../config/cloudinary.config.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const userProductsRouter = Router()

userProductsRouter.get('/manage', isAuthenticatedMiddleware, async (req, res) => {
    const { order } = req.query
    const query = { user: req.user.id }
    
    try {
        const userProducts = await Product.find(query)
                        .populate('comments')
                        .sort(order)
        return res.status(200).json(userProducts)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

userProductsRouter.get('/manage/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
            .populate('user comments')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })
        if(!product) {
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})


userProductsRouter.post('/manage', isAuthenticatedMiddleware, async (req, res) => {
    const payload = req.body
    console.log(payload)
    try {
        const newProduct = await Product.create({...payload, user: req.user.id})
        return res.status(201).json(newProduct)
    } catch (error) {
        console.log(error)
        if(error.name === 'ValidationError') {
            return res.status(422).json({message: "Validation error. Check your input."})
        }
        return res.status(500).json({message: "Error while creating product"})
    }
})

userProductsRouter.put('/manage/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    const payload = req.body
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            {_id: id, user: req.user.id}, 
            payload, 
            { new: true }
        )
        return res.status(200).json(updatedProduct)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

userProductsRouter.delete('/manage/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        await Product.findOneAndDelete({_id: id, user: req.user.id})
        return res.status(204).json()      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

userProductsRouter.post("/upload", isAuthenticatedMiddleware, fileUpload.single('productImage'), (req, res) => {
    res.status(201).json({url: req.file.path})
})

export default userProductsRouter