import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { AppDataSource } from './database/data-source'
import { CartService } from './cart/services/cart.service'
import cartRoutes from './cart/routes/cart.routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/carts', cartRoutes)

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected')
    await CartService.sync()
    console.log('Carts synced from Fake Store API')
    app.listen(process.env.PORT ?? 3000, () => {
      console.log(`Server running on port ${process.env.PORT ?? 3000}`)
    })
  })
  .catch((err) => {
    console.error('Error initializing database:', err)
    process.exit(1)
})
