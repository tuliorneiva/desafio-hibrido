import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import type { Cart } from './Cart'

@Entity('cart_products')
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  productId: number

  @Column()
  quantity: number

  @ManyToOne('Cart', (cart: Cart) => cart.products)
  @JoinColumn({ name: 'cartId' })
  cart: Cart
}
