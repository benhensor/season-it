'use client'

import { useState } from 'react'
import {
  NUTRIENT_KEYS,
  NUTRIENT_LABEL,
  NUTRIENT_NAME,
  PRODUCE_TYPES,
  TYPE_LABEL,
  type NutrientKey,
  type ProduceType,
} from '@/lib/produce'

type Props = {
  query: string
  onQueryChange: (q: string) => void
  activeNutrients: NutrientKey[]
  onToggleNutrient: (n: NutrientKey) => void
  activeTypes: ProduceType[]
  onToggleType: (t: ProduceType) => void
  onClearFilters: () => void
}

export default function SearchFilter({
  query,
  onQueryChange,
  activeNutrients,
  onToggleNutrient,
  activeTypes,
  onToggleType,
  onClearFilters,
}: Props) {
  const [open, setOpen] = useState(false)
  const count = activeNutrients.length + activeTypes.length

  return (
    <div className='fixed inset-x-0 top-17 z-30 bg-white backdrop-blur-md ring-1 ring-black/5'>
      <div className='flex items-stretch gap-2 px-3 py-2'>
        <div className='relative w-2/3'>
          <SearchIcon
            className='pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-stone-400'
          />
          <input
            type='search'
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder='Search produce'
            aria-label='Search produce'
            className='h-9 w-full rounded-md bg-stone-100 pr-3 pl-8 text-sm text-stone-900 ring-1 ring-stone-200 placeholder:text-stone-500 focus:ring-emerald-400 focus:outline-none'
          />
        </div>
        <button
          type='button'
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls='filter-sheet'
          className={[
            'flex h-9 w-1/3 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium ring-1 transition',
            count > 0 || open
              ? 'bg-emerald-500 text-white ring-emerald-500'
              : 'bg-white text-stone-800 ring-stone-200 hover:bg-stone-50',
          ].join(' ')}
        >
          <FilterIcon className='h-4 w-4' />
          <span>Filter{count > 0 ? ` · ${count}` : ''}</span>
        </button>
      </div>
      {open && (
        <div
          id='filter-sheet'
          className='border-t border-black/5 px-3 pt-2 pb-3'
        >
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-xs font-medium text-stone-600'>Filter</span>
            {count > 0 && (
              <button
                type='button'
                onClick={onClearFilters}
                className='text-xs font-medium text-emerald-700 hover:underline'
              >
                Clear
              </button>
            )}
          </div>
          <div className='mb-3'>
            <div className='mb-1.5 text-[10px] font-medium tracking-wide text-stone-500 uppercase'>
              Type
            </div>
            <div className='flex flex-wrap gap-1.5'>
              {PRODUCE_TYPES.map((t) => {
                const active = activeTypes.includes(t)
                return (
                  <button
                    key={t}
                    type='button'
                    onClick={() => onToggleType(t)}
                    aria-pressed={active}
                    className={[
                      'rounded-md px-2 py-1 text-xs font-medium ring-1 transition',
                      active
                        ? 'bg-emerald-600 text-white ring-emerald-600'
                        : 'bg-emerald-200/50 text-stone-700 ring-stone-200 hover:bg-emerald-200',
                    ].join(' ')}
                  >
                    {TYPE_LABEL[t]}
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <div className='mb-1.5 text-[10px] font-medium tracking-wide text-stone-500 uppercase'>
              Notable nutrients
            </div>
            <div className='flex flex-wrap gap-1.5'>
              {NUTRIENT_KEYS.map((n) => {
                const active = activeNutrients.includes(n)
                return (
                  <button
                    key={n}
                    type='button'
                    onClick={() => onToggleNutrient(n)}
                    aria-pressed={active}
                    aria-label={NUTRIENT_NAME[n]}
                    className={[
                      'rounded-md px-2 py-1 text-xs font-medium ring-1 transition',
                      active
                        ? 'bg-emerald-600 text-white ring-emerald-600'
                        : 'bg-emerald-200/50 text-stone-700 ring-stone-200 hover:bg-emerald-200',
                    ].join(' ')}
                  >
                    {NUTRIENT_LABEL[n]}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden
    >
      <circle cx='11' cy='11' r='7' />
      <path d='m20 20-3.5-3.5' />
    </svg>
  )
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden
    >
      <path d='M3 6h18M6 12h12M10 18h4' />
    </svg>
  )
}
