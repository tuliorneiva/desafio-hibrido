import { DataSource } from 'typeorm'
import { Cart } from '../cart/entities/cart.entity'
import { CartProduct } from '../cart/entities/cartProduct.entity'

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'database.sqlite',
  synchronize: true,
  entities: [Cart, CartProduct],
  logging: true,
})
