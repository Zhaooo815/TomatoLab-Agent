import { QA } from '../data/tomato'

export type Answer = {
  kind: 'hit' | 'miss'
  text: string
  source: string
  tag: '资料' | '待核对' | '未覆盖'
  matched: string[]
  mode: 'rule_retrieval'
}

const MISS_TEXT =
  '这份课程 protocol 里没有这一条，工具不推测。建议把问题写清楚（做到哪一步、看到什么现象、已经试过什么）再问教师；如果属于仪器或污染处置，按实验室规定执行。'

export function ask(question: string): Answer {
  const q = question.trim().toLowerCase()
  if (!q) throw new Error('请先输入问题')
  let bestIdx = -1
  let bestHits: string[] = []
  for (let i = 0; i < QA.length; i += 1) {
    const entry = QA[i]
    const hits = entry.keywords.filter((k) => q.includes(k.toLowerCase()))
    if (hits.length > bestHits.length) {
      bestIdx = i
      bestHits = hits
    }
  }
  if (bestIdx < 0) {
    return { kind: 'miss', text: MISS_TEXT, source: '未覆盖', tag: '未覆盖', matched: [], mode: 'rule_retrieval' }
  }
  const entry = QA[bestIdx]
  return { kind: 'hit', text: entry.answer, source: entry.source, tag: entry.tag, matched: bestHits, mode: 'rule_retrieval' }
}

export function suggestions(): string[] {
  return QA.map((e) => e.question)
}
