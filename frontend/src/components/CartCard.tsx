import { ShoppingCart, User, Calendar, Package } from 'lucide-react'
import { format } from 'date-fns'
import type { Cart } from '../types/cart'

interface CartCardProps {
  cart: Cart
}

export function CartCard({ cart }: CartCardProps) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-800">
          <ShoppingCart size={18} className="text-blue-500" />
          <span className="font-semibold text-base">Carrinho</span>
        </div>
        <span className="rounded-full bg-blue-50 border px-3 py-1 text-xs font-bold text-blue-600">
          #{cart.id}
        </span>
      </div>

      <div className="space-y-3 text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <User size={15} className="shrink-0 text-gray-400" />
          <span>Usuário <span className="font-semibold text-gray-700">#{cart.userId}</span></span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar size={15} className="shrink-0 text-gray-400" />
          <span>{format(new Date(cart.date), 'dd/MM/yyyy')}</span>
        </div>
      </div>

      <div className="mt-auto pt-3">
        <div className="flex items-center gap-2">
          <Package size={15} className="text-blue-400" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {cart.totalProducts} {cart.totalProducts === 1 ? 'produto' : 'produtos'}
          </span>
        </div>
      </div>
    </div>
  )
}
