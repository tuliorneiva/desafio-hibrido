import { Router } from 'express'
import { CartController } from '../controllers/cart.controller'

const router = Router()

router.get('/', CartController.findAll)
router.get('/:id', CartController.findById)

export default router
