import express from 'express'
import dotenv from 'dotenv/config'
import connectDb from './config/db.connection.js'
import productRouter from './routes/product.routes.js'
import authRouter from './routes/auth.routes.js'
import cors from 'cors'


const app = express()
connectDb()

app.use(express.json())
app.use(cors())
app.use('/products',productRouter)
app.use(authRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Usadinho API!')
})

app.listen(process.env.PORT, () => console.log('Server listening on port:', process.env.PORT))