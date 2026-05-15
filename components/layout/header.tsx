import Image from 'next/image'
import Logo from '@/assets/logo.svg'

type Props = {
  heading: string
  count: number
}

export default function Header({ heading, count }: Props) {
  return (
    <header className='fixed top-0 z-50 bg-emerald-50 w-full'>
      <div className='flex items-center justify-between gap-3 px-3 py-3 backdrop-blur-md ring-1 ring-black/5'>
        <div className='flex items-center gap-3'>
          <Image src={Logo} alt='Season It' className='h-8 w-8' priority />
          <div className='flex flex-col leading-tight'>
            <span className='text-lg font-semibold tracking-tight text-stone-900'>
              Season It
            </span>
            <span className='text-xs text-stone-600'>Eat Fresh</span>
          </div>
        </div>
        <div className='flex flex-col items-end leading-tight text-right'>
          <span className='text-sm font-semibold tracking-tight text-stone-900'>
            {heading}
          </span>
          <span className='text-xs text-stone-600'>
            {count} item{count === 1 ? '' : 's'}
          </span>
        </div>
      </div>
    </header>
  )
}
