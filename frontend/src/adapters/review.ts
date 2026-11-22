export type ReviewItem = { key: string; label: string; hint: string; found: boolean }
export type ReviewResult = { items: ReviewItem[]; warnings: string[]; covered: number }

const CHECKS: { key: string; label: string; hint: string; words: RegExp }[] = [
  { key: 'aim', label: '目的与背景', hint: '这段实验要回答什么，为什么做', words: /目的|背景|意义|为了|旨在/ },
  { key: 'method', label: '材料与方法', hint: '材料、试剂、培养基、关键参数与操作步骤', words: /材料|试剂|培养基|步骤|方法|处理/ },
  { key: 'result', label: '结果与现象', hint: '写看到的现象和测到的数值，带单位', words: /结果|现象|数据|OD|愈伤|发芽|生根|萌发/ },
  { key: 'error', label: '误差与异常', hint: '把差异、异常、失败单独说清并归因', words: /误差|偏差|异常|不一致|失败|原因分析/ },
  { key: 'discuss', label: '讨论与结论', hint: '结论要能回到证据，不足与下一步分开写', words: /讨论|结论|说明|推断|不足|改进/ },
  { key: 'source', label: '来源与出处', hint: '参数与结论标出处，能回溯到协议或文献', words: /协议|出处|来源|文献|参考|小节/ },
  { key: 'safety', label: '安全与操作规范', hint: '涉及菌、抗生素、消毒剂时写明防护与处置', words: /安全|消毒|灭菌|手套|超净台|防护/ },
]

export function review(text: string): ReviewResult {
  const t = text.trim()
  if (t.length < 40) throw new Error('内容太短，至少写 40 字再检查')
  const items = CHECKS.map((c) => ({ key: c.key, label: c.label, hint: c.hint, found: c.words.test(t) }))
  const warnings: string[] = []
  if (/完美|完全成功|一切正常|毫无问题/.test(t)) warnings.push('出现笼统的「完全成功」类表述：实验课里更看重可复核的判据，建议改成具体现象与数值。')
  if (/\d+\s*(?:mg|mL|g|℃|rpm|h)\b/.test(t) === false) warnings.push('通篇没有带单位的参数：参数不写单位，别人无法复现。')
  if (/我猜|应该是这样|大概就是/.test(t)) warnings.push('出现推测性表述：猜测要与观察分开写，标注「推测」并说明依据。')
  const covered = items.filter((i) => i.found).length
  return { items, warnings, covered }
}
