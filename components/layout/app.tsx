'use client'

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react'
import Header from './header'
import Display from './display'
import Controls from './controls'
import SearchFilter from './search-filter'
import {
  currentMonth,
  isInSeason,
  type Month,
  type NutrientKey,
  type Produce,
  type ProduceType,
} from '@/lib/produce'

export type View = 'season' | 'list'

type Overrides = { isInList: boolean; marked: boolean }
type ListState = Record<number, Overrides>

const STORAGE_KEY = 'season-it:list-state:v1'
const EMPTY_SNAPSHOT = '{}'

const listeners = new Set<() => void>()

function getSnapshot(): string {
  if (typeof window === 'undefined') return EMPTY_SNAPSHOT
  return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT
}

function getServerSnapshot(): string {
  return EMPTY_SNAPSHOT
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
  }
}

function writeStore(next: ListState): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  listeners.forEach((l) => l())
}

export default function App({ produce }: { produce: Produce[] }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const listState = useMemo<ListState>(() => {
    try {
      return JSON.parse(snapshot) as ListState
    } catch {
      return {}
    }
  }, [snapshot])

  const [selectedMonth, setSelectedMonth] = useState<Month>(currentMonth())
  const [view, setView] = useState<View>('season')
  const [query, setQuery] = useState('')
  const [activeNutrients, setActiveNutrients] = useState<NutrientKey[]>([])
  const [activeTypes, setActiveTypes] = useState<ProduceType[]>([])
  const today = useMemo(() => currentMonth(), [])

  const items = useMemo<Produce[]>(
    () =>
      produce.map((p) => {
        const overrides = listState[p.id]
        return overrides ? { ...p, ...overrides } : p
      }),
    [produce, listState]
  )

  const visible = useMemo<Produce[]>(() => {
    const q = query.trim().toLowerCase()
    const hasSearch = q.length > 0

    let base: Produce[]
    if (view === 'list') {
      base = items.filter((i) => i.isInList)
    } else if (hasSearch) {
      base = items
    } else {
      base = items.filter((i) => isInSeason(i, selectedMonth))
    }

    let result = base
    if (hasSearch) {
      result = result.filter((i) => i.name.toLowerCase().includes(q))
    }
    if (activeNutrients.length > 0) {
      result = result.filter((i) =>
        i.nutrients?.some((n) => activeNutrients.includes(n))
      )
    }
    if (activeTypes.length > 0) {
      result = result.filter((i) => activeTypes.includes(i.type))
    }
    return view === 'list'
      ? result
      : result.sort((a, b) => a.name.localeCompare(b.name))
  }, [items, view, selectedMonth, query, activeNutrients, activeTypes])

  const heading =
    view === 'list'
      ? 'Shopping List'
      : selectedMonth === today
        ? 'In Season Now'
        : `In Season in ${selectedMonth}`

  const patch = useCallback(
    (id: number, next: Overrides) => {
      writeStore({ ...listState, [id]: next })
    },
    [listState]
  )

  const toggleInList = useCallback(
    (id: number) => {
      const current = listState[id] ?? { isInList: false, marked: false }
      const isInList = !current.isInList
      patch(id, { isInList, marked: isInList ? current.marked : false })
    },
    [listState, patch]
  )

  const toggleMarked = useCallback(
    (id: number) => {
      const current = listState[id] ?? { isInList: false, marked: false }
      patch(id, { ...current, marked: !current.marked })
    },
    [listState, patch]
  )

  const removeFromList = useCallback(
    (id: number) => {
      patch(id, { isInList: false, marked: false })
    },
    [patch]
  )

  const selectMonth = useCallback((m: Month) => {
    setSelectedMonth(m)
    setView('season')
  }, [])

  const toggleListView = useCallback(() => {
    setView((v) => (v === 'list' ? 'season' : 'list'))
  }, [])

  const toggleNutrient = useCallback((n: NutrientKey) => {
    setActiveNutrients((curr) =>
      curr.includes(n) ? curr.filter((k) => k !== n) : [...curr, n]
    )
  }, [])

  const toggleType = useCallback((t: ProduceType) => {
    setActiveTypes((curr) => (curr.includes(t) ? [] : [t]))
  }, [])

  const clearFilters = useCallback(() => {
    setActiveNutrients([])
    setActiveTypes([])
  }, [])

  const listCount = useMemo(
    () => items.filter((i) => i.isInList).length,
    [items]
  )

  return (
    <div className='relative flex min-h-svh flex-col'>
      <div className='absolute inset-0 bg-black/30 z-0'></div>
      <Header heading={heading} count={visible.length} />
      <SearchFilter
        query={query}
        onQueryChange={setQuery}
        activeNutrients={activeNutrients}
        onToggleNutrient={toggleNutrient}
        activeTypes={activeTypes}
        onToggleType={toggleType}
        onClearFilters={clearFilters}
      />
      <Display
        items={visible}
        selectedMonth={selectedMonth}
        currentMonth={today}
        view={view}
        searchQuery={query}
        onToggleInList={toggleInList}
        onToggleMarked={toggleMarked}
        onRemove={removeFromList}
      />
      <Controls
        selectedMonth={selectedMonth}
        view={view}
        listCount={listCount}
        onSelectMonth={selectMonth}
        onToggleList={toggleListView}
      />
    </div>
  )
}
