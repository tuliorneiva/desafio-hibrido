import { Request, Response } from 'express'
import { CartService } from '../services/cart.service'

export const CartController = {
  findAll: async (req: Request, res: Response): Promise<void> => {
    const carts = await CartService.findAll()
    res.json(carts)
  },

  findById: async (req: Request, res: Response): Promise<void> => {
    const cart = await CartService.findById(Number(req.params.id))
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' })
      return
    }
    res.json(cart)
  },
}
