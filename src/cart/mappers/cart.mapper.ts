import { Cart } from "../entities/Cart";

export const mapperToCartDTO = (cart: Cart) => {
    return {
      id: cart.id,
      userId: cart.userId,
      date: cart.date,
      totalProducts: cart.products.reduce((sum, p) => sum + p.quantity, 0),
      products: cart.products.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
      })),
    }
}
