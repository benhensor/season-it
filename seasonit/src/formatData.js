import data from './data.json'

export const formatData = (month) => {
  return data.filter(produce => produce.month === month).map(produce => ({
    id: produce.id,
    month: produce.month,
    name: produce.name,
    type: produce.type,
    img: produce.img
  }))
}

