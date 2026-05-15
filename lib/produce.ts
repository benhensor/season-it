import produceData from '@/produce.json'

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export type Month = (typeof MONTHS)[number]

export type ProduceType = 'fruit' | 'vegetable'

export const PRODUCE_TYPES = ['fruit', 'vegetable'] as const satisfies readonly ProduceType[]

export const TYPE_LABEL: Record<ProduceType, string> = {
  fruit: 'Fruit',
  vegetable: 'Vegetable',
}

export const NUTRIENT_KEYS = [
  'a', 'c', 'd', 'e', 'k', 'b6', 'b9', 'b12',
  'fe', 'ca', 'mg', 'zn', 'pot',
  'fib', 'prot',
] as const

export type NutrientKey = (typeof NUTRIENT_KEYS)[number]

export const NUTRIENT_LABEL: Record<NutrientKey, string> = {
  a: 'A', c: 'C', d: 'D', e: 'E', k: 'K',
  b6: 'B6', b9: 'B9', b12: 'B12',
  fe: 'Iron', ca: 'Calcium', mg: 'Magnesium', zn: 'Zinc', pot: 'Potassium',
  fib: 'Fibre', prot: 'Protein',
}

export const NUTRIENT_NAME: Record<NutrientKey, string> = {
  a: 'Vitamin A', c: 'Vitamin C', d: 'Vitamin D', e: 'Vitamin E', k: 'Vitamin K',
  b6: 'Vitamin B6', b9: 'Vitamin B9 (Folate)', b12: 'Vitamin B12',
  fe: 'Iron', ca: 'Calcium', mg: 'Magnesium', zn: 'Zinc', pot: 'Potassium',
  fib: 'Fibre', prot: 'Protein',
}

export type Produce = {
  id: number
  name: string
  type: ProduceType
  image: string
  months: Month[]
  marked: boolean
  isInList: boolean
  nutrients?: NutrientKey[]
}

export const PRODUCE: Produce[] = produceData as Produce[]

export function currentMonth(): Month {
  return MONTHS[new Date().getMonth()]
}

export function isInSeason(item: Produce, month: Month): boolean {
  return item.months.includes(month)
}
