import { MEDIA, STOCKS, type MediaRow } from '../data/tomato'

export type DoseRow = {
  stock: string
  stockMgPerMl: number
  mlPerL: number
  ml: number
  mgPerL: number
}

export type DoseResult = {
  medium: string
  base: string
  liters: number
  rows: DoseRow[]
}

const STOCK_VALUE: Record<string, number> = { ZT: 0, IAA: 0, Kan: 0, Hyg: 0, Timentin: 0 }
for (const s of STOCKS) STOCK_VALUE[s.name] = s.mgPerMl

function findMedium(medium: string): MediaRow {
  const row = MEDIA.find((m) => m.medium === medium)
  if (!row) throw new Error(`没有这套培养基：${medium}`)
  return row
}

export function doseOf(medium: string, liters: number): DoseResult {
  if (!(liters > 0)) throw new Error('体积必须大于 0')
  const row = findMedium(medium)
  const pairs: [string, number][] = [
    ['ZT', row.zt],
    ['IAA', row.iaa],
    ['Kan', row.kan],
    ['Hyg', row.hyg],
    ['Timentin', row.tim],
  ]
  const rows = pairs
    .filter(([, mlPerL]) => mlPerL > 0)
    .map(([stock, mlPerL]) => {
      const stockMgPerMl = STOCK_VALUE[stock] ?? 0
      return {
        stock,
        stockMgPerMl,
        mlPerL,
        ml: round(mlPerL * liters),
        mgPerL: round(mlPerL * stockMgPerMl),
      }
    })
  return { medium: row.medium, base: row.base, liters, rows }
}

export function reverseOf(medium: string, liters: number, stock: string, targetMgPerL: number): { ml: number; mlPerL: number } {
  if (!(liters > 0)) throw new Error('体积必须大于 0')
  if (!(targetMgPerL > 0)) throw new Error('目标终浓度必须大于 0')
  const stockMgPerMl = STOCK_VALUE[stock]
  if (!stockMgPerMl) throw new Error(`未知母液：${stock}`)
  findMedium(medium)
  const ml = (targetMgPerL * liters) / stockMgPerMl
  return { ml: round(ml), mlPerL: round(ml / liters) }
}

function round(v: number): number {
  return Math.round(v * 1000) / 1000
}

