import { AppDataSource } from '../../database/data-source'
import { Cart } from '../entities/cart.entity'

const cartRepo = AppDataSource.getRepository(Cart)

export const CartRepository = {
  findAll: () => cartRepo.find({
    relations: ['products'],
  }),

  findById: (id: number) => cartRepo.findOne({
    where: { id },
    relations: ['products'],
  }),

  clear: () => cartRepo.clear(),

  saveMany: async (carts: Partial<Cart>[]) => {
    const entities = cartRepo.create(carts)
    return cartRepo.save(entities)
  },
}
