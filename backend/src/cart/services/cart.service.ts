import axios from 'axios'
import { CartRepository } from '../repositories/cart.repository'
import { Cart } from '../entities/Cart'
import { CartDTO } from '../dto/cart.dto'
import { mapperToCartDTO } from '../mappers/cart.mapper'


export const CartService = {
    sync: async (): Promise<void> => {
        const { data } = await axios.get<any[]>('https://fakestoreapi.com/carts')
    
        const carts: Partial<Cart>[] = data.map((item) => ({
          id: item.id,
          userId: item.userId,
          date: new Date(item.date),
          products: item.products.map((p: { productId: number; quantity: number }) => ({
            productId: p.productId,
            quantity: p.quantity,
          })),
        }))
    
        await CartRepository.saveMany(carts)
    },

    findAll: async (): Promise<CartDTO[]> => {
        const carts = await CartRepository.findAll()
        return carts.map(mapperToCartDTO)
      },

      findById: async (id: number): Promise<CartDTO | null> => {
        const cart = await CartRepository.findById(id)
        return cart ? mapperToCartDTO(cart) : null
      },
      
}
