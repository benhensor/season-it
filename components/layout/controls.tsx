'use client'

import { MONTHS, type Month } from '@/lib/produce'
import type { View } from './app'

type Props = {
  selectedMonth: Month
  view: View
  listCount: number
  onSelectMonth: (m: Month) => void
  onToggleList: () => void
}

export default function Controls({
  selectedMonth,
  view,
  listCount,
  onSelectMonth,
  onToggleList,
}: Props) {
  const onList = view === 'list'

  return (
    <nav
      className='fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-stone-100 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2'
      aria-label='Primary'
    >
      <div className='mx-auto grid max-w-3xl grid-cols-2 items-stretch gap-2'>
        <label className='relative flex cursor-pointer flex-col items-stretch justify-center gap-1 rounded-2xl bg-white px-2 py-2 shadow-sm ring-1 ring-stone-200'>
          <span className='text-center text-[10px] font-medium uppercase tracking-wide text-stone-500'>
            Month
          </span>
          <span className='text-center text-sm font-semibold text-stone-900'>
            {selectedMonth}
          </span>
          <select
            value={selectedMonth}
            onChange={(e) => onSelectMonth(e.target.value as Month)}
            className='absolute inset-0 cursor-pointer appearance-none opacity-0 focus:outline-none'
            aria-label='Select month'
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <button
          type='button'
          onClick={onToggleList}
          aria-pressed={onList}
          className={[
            'flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium shadow-sm ring-1 transition',
            onList
              ? 'bg-emerald-500 text-white ring-emerald-500'
              : 'bg-white text-stone-800 ring-stone-200 hover:bg-stone-50',
          ].join(' ')}
        >
          <span className='flex items-center gap-1.5'>
            <BasketIcon />
            {listCount > 0 && (
              <span
                aria-label={`${listCount} items`}
                className={[
                  'inline-flex min-w-5 items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] font-bold leading-none',
                  onList ? 'bg-white text-stone-900' : 'bg-emerald-500 text-white',
                ].join(' ')}
              >
                {listCount}
              </span>
            )}
          </span>
          <span>Shopping List</span>
        </button>
      </div>
    </nav>
  )
}

function BasketIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      className='h-5 w-5'
      aria-hidden
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3 8h18l-2 11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 8Z'
      />
      <path strokeLinecap='round' d='M8 8V6a4 4 0 0 1 8 0v2' />
    </svg>
  )
}
