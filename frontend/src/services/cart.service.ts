import axios from 'axios'
import type { Cart } from '../types/cart'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
})

export const CartService = {
    getCarts: async () : Promise<Cart[]> => {
        const response = await api.get<Cart[]>('/carts')
        return response.data
    },

    getCartById: async (id: number) : Promise<Cart> => {
        const { data } = await api.get<Cart>(`/carts/${id}`)
        return data
    },
}
