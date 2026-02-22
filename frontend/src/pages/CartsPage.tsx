import { useEffect, useState } from 'react'
import { CartService } from '../services/cart.service'
import { CartCard } from '../components/CartCard'
import { LoadingSpinner } from '../components/LoadingSpinner'
import type { Cart } from '../types/cart'

export function CartsPage() {
  const [carts, setCarts] = useState<Cart[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    CartService.getCarts()
      .then(setCarts)
      .catch(() => setError('Erro ao carregar os carrinhos.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  if (error) return (
    <p className="text-center text-red-500 py-20">{error}</p>
  )

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Carrinhos
      </h1>

      {carts.length === 0 ? (
        <p className="text-gray-500">Nenhum carrinho encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {carts.map((cart) => (
            <CartCard key={cart.id} cart={cart} />
          ))}
        </div>
      )}
    </main>
  )
}
