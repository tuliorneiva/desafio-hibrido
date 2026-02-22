export interface CartProductDTO {
    productId: number,
    quantity: number
}

export interface CartDTO {
    id: number
    userId: number
    date: Date
    totalProducts: number
    products: CartProductDTO[]
  }
