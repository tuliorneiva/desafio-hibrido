import { useState, useMemo } from 'react'
import type { Cart } from '../types/cart'

export interface CartFilters {
  userId: string
  dateFrom: string
  dateTo: string
}

const INITIAL_FILTERS: CartFilters = {
  userId: '',
  dateFrom: '',
  dateTo: '',
}

export function useCartFilters(carts: Cart[]) {
  const [filters, setFilters] = useState<CartFilters>(INITIAL_FILTERS)

  const filteredCarts = useMemo(() => {
    return carts.filter((cart) => {
      if (filters.userId && cart.userId !== Number(filters.userId)) {
        return false
      }

      const cartDate = new Date(cart.date)

      if (filters.dateFrom) {
        const from = new Date(filters.dateFrom)
        from.setHours(0, 0, 0, 0)
        if (cartDate < from) return false
      }

      if (filters.dateTo) {
        const to = new Date(filters.dateTo)
        to.setHours(23, 59, 59, 999)
        if (cartDate > to) return false
      }

      return true
    })
  }, [carts, filters])

  const uniqueUserIds = useMemo(
    () => [...new Set(carts.map((c) => c.userId))].sort((a, b) => a - b),
    [carts],
  )

  const hasActiveFilters = Object.values(filters).some((v) => v !== '')

  const onUpdateFilter = <K extends keyof CartFilters>(key: K, value: CartFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const onClearFilters = () => {
    setFilters(INITIAL_FILTERS)
  }

  return {
    filters,
    filteredCarts,
    uniqueUserIds,
    hasActiveFilters,
    onUpdateFilter,
    onClearFilters,
  }
}
