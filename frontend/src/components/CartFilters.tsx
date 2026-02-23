import { SlidersHorizontal, X } from 'lucide-react'
import type { CartFilters } from '../hooks/useCartFilters'

interface CartFiltersProps {
  filters: CartFilters
  uniqueUserIds: number[]
  hasActiveFilters: boolean
  onUpdateFilter: <K extends keyof CartFilters>(key: K, value: CartFilters[K]) => void
  onClearFilters: () => void
}

export function CartFilters({
  filters,
  uniqueUserIds,
  hasActiveFilters,
  onUpdateFilter,
  onClearFilters,
}: CartFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mr-1">
        <SlidersHorizontal size={15} />
        <span>Filtros</span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-400">Usuário</label>
        <select
          value={filters.userId?.toString() || ''}
          onChange={(e) => onUpdateFilter('userId', e.target.value)}
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
        >
          <option value="">Todos</option>
          {uniqueUserIds.map((id) => (
            <option key={id} value={id}>
              Usuário #{id}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-400">De</label>
        <input
          type="date"
          value={filters.dateFrom || ''}
          onChange={(e) => onUpdateFilter('dateFrom', e.target.value)}
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-400">Até</label>
        <input
          type="date"
          value={filters.dateTo || ''}
          onChange={(e) => onUpdateFilter('dateTo', e.target.value)}
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-100"
        >
          <X size={14} />
          Limpar
        </button>
      )}
    </div>
  )
}
