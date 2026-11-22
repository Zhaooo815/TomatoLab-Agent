export const STAGE_ORDER = ['预习', '待实操', '已实操', '数据处理中', '报告撰写', '已提交'] as const
export type StageName = (typeof STAGE_ORDER)[number]

export type Ledger = {
  id: string
  name: string
  stage: StageName
  blocks: string
  todo: string
  milestone: string
  createdAt: string
  updatedAt: string
}

const KEY = 'tomato-lab-ledger-v1'

export function stages(): readonly StageName[] {
  return STAGE_ORDER
}

export function isStage(v: string): v is StageName {
  return (STAGE_ORDER as readonly string[]).includes(v)
}

export function list(): Ledger[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as Ledger[]
  } catch {
    return []
  }
}

export function create(name: string, stage: string): Ledger {
  const n = name.trim()
  if (!n) throw new Error('实验名称不能为空')
  if (!isStage(stage)) throw new Error('阶段不在固定六阶段内')
  const now = new Date().toISOString()
  const item: Ledger = { id: crypto.randomUUID(), name: n, stage, blocks: '', todo: '', milestone: '', createdAt: now, updatedAt: now }
  localStorage.setItem(KEY, JSON.stringify([item, ...list()]))
  return item
}

export function patch(id: string, delta: Partial<Omit<Ledger, 'id' | 'createdAt'>>): Ledger {
  const items = list()
  const target = items.find((i) => i.id === id)
  if (!target) throw new Error('台账里没有这条记录')
  if (delta.stage && !isStage(delta.stage)) throw new Error('阶段不在固定六阶段内')
  Object.assign(target, delta, { updatedAt: new Date().toISOString() })
  localStorage.setItem(KEY, JSON.stringify(items))
  return target
}

// 阶段只能相邻推进或回退；回退必须在待办里写明返工原因
export function move(id: string, next: StageName, reason = ''): Ledger {
  const target = list().find((i) => i.id === id)
  if (!target) throw new Error('台账里没有这条记录')
  const from = STAGE_ORDER.indexOf(target.stage)
  const to = STAGE_ORDER.indexOf(next)
  if (Math.abs(to - from) > 1) throw new Error('阶段只能相邻推进或回退，跨阶段请补中途里程碑')
  if (to < from && !reason.trim()) throw new Error('回退时必须在待办里写明返工原因')
  const todo = to < from ? `${reason.trim()}（返工原因）${target.todo ? '／' + target.todo : ''}` : target.todo
  return patch(id, { stage: next, todo })
}

export function remove(id: string): void {
  localStorage.setItem(KEY, JSON.stringify(list().filter((i) => i.id !== id)))
}

export function exportJson(): string {
  return JSON.stringify(list(), null, 2)
}

export function clear(): void {
  localStorage.removeItem(KEY)
}

export function daysSince(iso: string): number {
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return 0
  return Math.max(0, Math.floor((Date.now() - t) / 86400000))
}
