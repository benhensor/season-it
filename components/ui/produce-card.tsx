'use client'

import Image from 'next/image'
import { NUTRIENT_LABEL, NUTRIENT_NAME, type Produce } from '@/lib/produce'

type Props = {
  item: Produce
  disabled?: boolean
  showMarked?: boolean
  onClick?: () => void
  onRemove?: () => void
}

export default function ProduceCard({
  item,
  disabled = false,
  showMarked = false,
  onClick,
  onRemove,
}: Props) {
  const marked = showMarked && item.marked
  const inList = item.isInList && !showMarked
  const accent = inList || marked

  const containerClass = [
    'flex items-stretch overflow-hidden rounded-2xl bg-white shadow-sm transition',
    disabled
      ? 'border border-stone-300'
      : accent
        ? 'border border-emerald-400'
        : 'border border-stone-200',
  ].join(' ')

  return (
    <div className={containerClass}>
      <button
        type='button'
        disabled={disabled}
        onClick={onClick}
        aria-pressed={item.isInList}
        className={[
          'flex flex-1 items-center gap-3 p-1 pr-3 text-left transition',
          disabled
            ? 'cursor-not-allowed'
            : 'hover:bg-stone-50 active:bg-stone-100',
        ].join(' ')}
      >
        <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100'>
          <Image
            src={`/imgs/${item.image}.webp`}
            alt={item.name}
            fill
            sizes='64px'
            className='object-cover'
          />
        </div>
        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <span
            className={[
              'text-base font-semibold leading-tight',
              disabled ? 'text-stone-600' : 'text-stone-900',
              marked ? 'line-through decoration-emerald-400 decoration-2' : '',
            ].join(' ')}
          >
            {item.name}
          </span>
          {item.nutrients && item.nutrients.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              {item.nutrients.map((n) => (
                <span
                  key={n}
                  aria-label={NUTRIENT_NAME[n]}
                  className='rounded-md bg-emerald-200/50 px-1.5 py-0.5 text-[10px] font-medium text-stone-700 ring-1 ring-stone-200'
                >
                  {NUTRIENT_LABEL[n]}
                </span>
              ))}
            </div>
          )}
        </div>
        <StateIcon
          disabled={disabled}
          inList={inList}
          showMarked={showMarked}
          marked={marked}
        />
      </button>
      {onRemove && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          aria-label={`Remove ${item.name} from list`}
          className='grid w-11 shrink-0 place-items-center border-l border-stone-200 text-stone-500 transition hover:bg-stone-50 hover:text-stone-700'
        >
          <XIcon />
        </button>
      )}
    </div>
  )
}

function StateIcon({
  disabled,
  inList,
  showMarked,
  marked,
}: {
  disabled: boolean
  inList: boolean
  showMarked: boolean
  marked: boolean
}) {
  if (disabled) {
    return (
      <span
        aria-label='Not in season now'
        className='grid h-7 w-7 shrink-0 place-items-center rounded-full text-stone-400'
      >
        <CalendarOffIcon />
      </span>
    )
  }
  if (inList || marked) {
    return (
      <span
        aria-hidden
        className='grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white'
      >
        <CheckIcon />
      </span>
    )
  }
  if (showMarked) {
    return (
      <span
        aria-hidden
        className='grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-stone-300'
      />
    )
  }
  return (
    <span
      aria-hidden
      className='grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-stone-300 text-stone-400'
    >
      <PlusIcon />
    </span>
  )
}

function CheckIcon() {
  return (
    <svg
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      strokeWidth={3}
      className='h-4 w-4'
      aria-hidden
    >
      <path d='M4 10l4 4 8-8' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      strokeWidth={2.5}
      className='h-4 w-4'
      aria-hidden
    >
      <path d='M10 4v12M4 10h12' strokeLinecap='round' />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      strokeWidth={2.5}
      className='h-4 w-4'
      aria-hidden
    >
      <path d='M5 5l10 10M15 5L5 15' strokeLinecap='round' />
    </svg>
  )
}

function CalendarOffIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      className='h-4 w-4'
      aria-hidden
    >
      <path d='M8 2v3M16 2v3M3 8h7M14 8h7M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3' />
      <path d='m3 3 18 18' />
    </svg>
  )
}
