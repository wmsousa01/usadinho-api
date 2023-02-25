import { Router } from 'express'
import Product from '../models/Product.model.js'
import User from '../models/User.model.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const productRouter = Router()

productRouter.get('/', isAuthenticatedMiddleware, async (req, res) => {
    try {
        const products = await Product.find({user: req.user.id})
        return res.status(200).json(products)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})


productRouter.post('/', isAuthenticatedMiddleware, async (req, res) => {
    const payload = req.body
    try {
        const newProduct = await Product.create(payload)
        return res.status(201).json(newProduct)
    } catch (error) {
        console.log(error)
        if(error.name === 'ValidationError') {
            return res.status(422).json({message: "Validation error. Check your input."})
        }
        return res.status(500).json({message: "Error while creating product"})
    }
})

productRouter.put('/:id', isAuthenticatedMiddleware, async (req, res) => {
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

productRouter.delete('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        await Product.findOneAndDelete({_id: id, user: req.user.id})
        return res.status(204).json()      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default productRouter