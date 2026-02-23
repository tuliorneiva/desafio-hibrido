import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { CartService } from '../services/cart.service'
import { CartCard } from '../components/CartCard'
import { LoadingSpinner } from '../components/LoadingSpinner'
import type { Cart } from '../types/cart'
import { useCartFilters } from '../hooks/useCartFilters'
import { CartFilters } from '../components/CartFilters'

export function CartsPage() {
  const [carts, setCarts] = useState<Cart[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const {
    filters,
    filteredCarts,
    uniqueUserIds,
    hasActiveFilters,
    onUpdateFilter,
    onClearFilters,
  } = useCartFilters(carts)

  useEffect(() => {
    CartService.getCarts()
      .then(setCarts)
      .catch(() => setError('Erro ao carregar os carrinhos.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-5 shadow-sm">
        <div className="mx-auto max-w-6xl flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
            <ShoppingBag size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Automax</h1>
            <p className="text-xs text-gray-400">Painel de carrinhos</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-center text-red-500 py-20">{error}</p>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Carrinhos</h2>
              <p className="text-sm text-gray-400 mt-1">
                {filteredCarts.length}{' '}
                {filteredCarts.length === 1 ? 'carrinho encontrado' : 'carrinhos encontrados'}
                {hasActiveFilters && (
                  <span className="ml-1 text-gray-300">
                    (de {carts.length} no total)
                  </span>
                )}
              </p>
            </div>

            <CartFilters
              filters={filters}
              uniqueUserIds={uniqueUserIds}
              hasActiveFilters={hasActiveFilters}
              onUpdateFilter={onUpdateFilter}
              onClearFilters={onClearFilters}
            />

            {filteredCarts.length === 0 ? (
              <p className="text-center text-gray-400 py-20">
                Nenhum carrinho encontrado com os filtros aplicados.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCarts.map((cart) => (
                  <CartCard key={cart.id} cart={cart} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
