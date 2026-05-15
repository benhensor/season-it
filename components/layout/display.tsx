'use client'

import ProduceCard from '@/components/ui/produce-card'
import { isInSeason, type Month, type Produce } from '@/lib/produce'
import type { View } from './app'

type Props = {
  items: Produce[]
  selectedMonth: Month
  currentMonth: Month
  view: View
  searchQuery: string
  onToggleInList: (id: number) => void
  onToggleMarked: (id: number) => void
  onRemove: (id: number) => void
}

export default function Display({
  items,
  selectedMonth,
  currentMonth,
  view,
  searchQuery,
  onToggleInList,
  onToggleMarked,
  onRemove,
}: Props) {
  const isCurrent = selectedMonth === currentMonth

  return (
    <main className='z-10 flex-1 px-2 pt-32 pb-20.25'>
      {items.length === 0 ? (
        <EmptyState view={view} searchQuery={searchQuery} />
      ) : (
        <ul className='flex flex-col gap-2'>
          {items.map((item) => {
            if (view === 'list') {
              return (
                <li key={item.id}>
                  <ProduceCard
                    item={item}
                    showMarked
                    onClick={() => onToggleMarked(item.id)}
                    onRemove={() => onRemove(item.id)}
                  />
                </li>
              )
            }
            const canAdd = isInSeason(item, currentMonth)
            return (
              <li key={item.id}>
                <ProduceCard
                  item={item}
                  disabled={!canAdd}
                  onClick={canAdd ? () => onToggleInList(item.id) : undefined}
                />
              </li>
            )
          })}
        </ul>
      )}

      {view === 'season' && !isCurrent && (
        <p className='mt-4 rounded-xl bg-amber-50/90 px-2 py-2 text-sm text-amber-900 ring-1 ring-amber-200'>
          You&apos;re browsing {selectedMonth}. Only items in season{' '}
          <strong>now</strong> ({currentMonth}) can be added to your list.
        </p>
      )}
    </main>
  )
}

function EmptyState({
  view,
  searchQuery,
}: {
  view: View
  searchQuery: string
}) {
  const q = searchQuery.trim()
  let message: string
  if (q) {
    message =
      view === 'list'
        ? `Nothing in your list matches "${q}".`
        : `No produce matches "${q}".`
  } else if (view === 'list') {
    message =
      'Your shopping list is empty. Tap items in the in-season view to add them.'
  } else {
    message = 'Nothing in season for this month.'
  }
  return (
    <div className='rounded-2xl bg-white/70 p-8 text-center shadow-sm ring-1 ring-black/5 backdrop-blur-sm'>
      <p className='text-sm text-stone-700'>{message}</p>
    </div>
  )
}
