import { expect, it } from 'vitest'
import { ask, suggestions } from './qa'
import { doseOf, reverseOf } from './dosing'
import { compose } from './messaging'
import { review } from './review'

it('问答命中协议条目并给出出处', () => {
  const a = ask('大摇 OD 冲到 1.0 还能直接侵染吗')
  expect(a.kind).toBe('hit')
  expect(a.source).toContain('协议')
  expect(a.text).toContain('0.6')
})

it('待核对条目标记为待核对，不擅自改数', () => {
  const a = ask('AS 母液到底按 1 mg/mL 还是按称量值算')
  expect(a.tag).toBe('待核对')
  expect(a.text).toContain('教师')
})

it('协议未覆盖的问题不编造答案', () => {
  const a = ask('今天食堂几点开饭')
  expect(a.kind).toBe('miss')
  expect(a.tag).toBe('未覆盖')
})

it('空问题抛出错误', () => {
  expect(() => ask('  ')).toThrow()
})

it('示例问题非空且可检索', () => {
  const list = suggestions()
  expect(list.length).toBeGreaterThan(5)
  for (const q of list) expect(ask(q).kind).toBe('hit')
})

it('A2 按 3 L 换算母液体积与终浓度', () => {
  const r = doseOf('A2', 3)
  expect(r.base).toBe('MS')
  const kan = r.rows.find((x) => x.stock === 'Kan')
  expect(kan?.ml).toBe(3)
  expect(kan?.mgPerL).toBe(100)
  const zt = r.rows.find((x) => x.stock === 'ZT')
  expect(zt?.ml).toBe(6)
})

it('A4 用 1/2MS 且不含 ZT', () => {
  const r = doseOf('A4', 1)
  expect(r.base).toBe('1/2MS')
  expect(r.rows.some((x) => x.stock === 'ZT')).toBe(false)
})

it('反算终浓度 50 mg/L 的 Kan 用量', () => {
  const v = reverseOf('A3', 1, 'Kan', 50)
  expect(v.ml).toBe(0.5)
})

it('体积非法时报错', () => {
  expect(() => doseOf('A2', 0)).toThrow()
})

it('沟通话术生成两版且包含问题原文', () => {
  const r = compose({
    course: '植物基因工程',
    experiment: '番茄子叶遗传转化',
    step: '倒 A2 第 2 天',
    question: '2 瓶出现白色菌落，是否整批隔离',
    tried: '已隔离并拍照',
    expect: '确认是否需要重新倒板',
  })
  expect(r.brief).toContain('白色菌落')
  expect(r.formal).toContain('老师您好')
  expect(r.brief).not.toBe(r.formal)
})

it('缺少必填项时拒绝生成', () => {
  expect(() => compose({ course: '', experiment: '', step: '', question: '怎么办', tried: '', expect: '' })).toThrow()
})

it('报告自查能识别缺失要素与笼统表述', () => {
  const r = review('本次实验一切完美，完成了转化。'.repeat(3))
  expect(r.covered).toBeLessThan(r.items.length)
  expect(r.warnings.length).toBeGreaterThan(0)
})

it('内容过短时拒绝检查', () => {
  expect(() => review('太短')).toThrow()
})
