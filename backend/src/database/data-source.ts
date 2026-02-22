import { DataSource } from 'typeorm'
import { Cart } from '../cart/entities/Cart'
import { CartProduct } from '../cart/entities/CartProduct'

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'database.sqlite',
  synchronize: true,
  entities: [Cart, CartProduct],
  logging: true,
})
