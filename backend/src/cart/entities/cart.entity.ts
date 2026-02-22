import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import type { CartProduct } from './cartProduct.entity'

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  date: Date

  @OneToMany('CartProduct', (cartProduct: CartProduct) => cartProduct.cart, {
    cascade: true,
  })
  products: CartProduct[]
}
