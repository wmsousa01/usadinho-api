import { Router } from 'express'
import Product from '../models/Product.model.js'
import fileUpload from '../config/cloudinary.config.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const productRouter = Router()

productRouter.get('/', async (req, res) => {
    const { order } = req.query
    const query = {}
    
    try {
        const products = await Product.find(query)
                        .populate('comments')
                        .sort(order)
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

productRouter.get('/:id', async (req, res) => {
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

export default productRouter