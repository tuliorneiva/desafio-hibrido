import { ShoppingCart, User, Calendar, Package } from 'lucide-react'
import { format } from 'date-fns'
import type { Cart } from '../types/cart'

interface CartCardProps {
  cart: Cart
}

export function CartCard({ cart }: CartCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-center gap-2 text-blue-600">
        <ShoppingCart size={20} />
        <span className="font-bold text-lg">Carrinho #{cart.id}</span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <User size={16} />
          <span>Usuário <strong>#{cart.userId}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{format(new Date(cart.date), 'dd/MM/yyyy')}</span>
        </div>

        <div className="flex items-center gap-2">
          <Package size={16} />
          <span><strong>{cart.totalProducts}</strong> produtos</span>
        </div>
      </div>
    </div>
  )
}
