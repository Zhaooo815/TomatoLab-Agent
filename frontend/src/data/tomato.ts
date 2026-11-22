// 课程 protocol 摘录数据。所有条目均标注协议小节，未经原文核对不得改写数值。
// 来源：课程实验讲义《tomato Protocol-转基因修订版最新 2022-9-2》，属课程内部资料，不随仓库分发。

export type Tag = '资料' | '待核对' | '未覆盖'

export type Stage = {
  key: string
  name: string
  window: string
  action: string
  criteria: string
  source: string
}

export type Param = {
  key: string
  topic: string
  value: string
  source: string
}

export type Medium = {
  name: string
  base: string
  note: string
}

export type Stock = { name: string; mgPerMl: number; source: string }

export type MediaRow = {
  medium: string
  base: string
  zt: number
  iaa: number
  kan: number
  hyg: number
  tim: number
}

export type Check = { id: string; where: string; text: string; impact: string }

export type QaEntry = {
  id: string
  keywords: string[]
  question: string
  answer: string
  source: string
  tag: Tag
}

export const STAGES: Stage[] = [
  { key: 'seed', name: '灭种', window: 'D-7', action: '200 粒种子，75% 乙醇 30 s，27 mL 无菌水 + 3 mL 84 消毒液，200 rpm 摇 1 h，洗 5 遍，4 ℃ 保存', criteria: '种皮轻微脱色', source: '协议·一、灭种' },
  { key: 'sow', name: '播种', window: 'D-6', action: '1/2MS，不含激素与抗生素，约 50 粒/瓶，25 ℃，12 h/12 h', criteria: '5 天后子叶完全展开、无真叶', source: '协议·二、播种' },
  { key: 'cut', name: '剪叶与小摇', window: 'D0', action: '叶尖与近叶柄各剪一刀，叶片在 MSO 中不超过 1 h，同日小摇 24 h，28 ℃，200 rpm', criteria: 'OD600 约 1.0', source: '协议·三、剪叶片' },
  { key: 'shake', name: '大摇', window: 'D+1', action: '120 μL 转接至 50 mL YEB，约 16 h，28 ℃，200 rpm', criteria: 'OD600 0.6–0.7', source: '协议·三、注 2' },
  { key: 'infect', name: '侵染与共培养', window: 'D+1', action: '4000 rpm 离心 10 min，MSO 等体积轻柔重悬，黑暗 5 min，叶背朝上，暗培养 48 h', criteria: '叶片不褐化、无菌落', source: '协议·四、侵染' },
  { key: 'plate', name: '倒板 A2', window: 'D+3', action: '叶面朝上，叶片间留间隙，每 20 天倒板一次，全程 1.5–2 个月', criteria: '出现愈伤组织与芽点', source: '协议·五、倒板' },
  { key: 'a3', name: '转 A3', window: 'D+50', action: '苗约 2 cm，基部不带过多愈伤时转入，培养约 1 个月', criteria: '苗高约 5 cm', source: '协议·六、脱分化与再分化' },
  { key: 'a4', name: '转 A4', window: 'D+80', action: '生根培养基，约 10 天', criteria: '根系强壮', source: '协议·六、脱分化与再分化' },
  { key: 'transplant', name: '炼苗移栽', window: 'D+90', action: '开盖加水炼苗后移入营养土', criteria: '移栽后不萎蔫', source: '协议·六、脱分化与再分化' },
]

export const PARAMS: Param[] = [
  { key: 'seed-count', topic: '灭种种子数', value: '200 粒/批', source: '协议·一、灭种' },
  { key: 'etoh', topic: '表面消毒', value: '75% 乙醇 30 s', source: '协议·一、灭种' },
  { key: 'bleach', topic: '消毒液配比', value: '27 mL 无菌水 + 3 mL 84 消毒液', source: '协议·一、灭种' },
  { key: 'wash', topic: '清洗次数', value: '无菌水洗 5 遍', source: '协议·一、灭种' },
  { key: 'sow-medium', topic: '播种培养基', value: '1/2MS，无激素、无抗生素', source: '协议·二、播种' },
  { key: 'sow-density', topic: '播种密度', value: '约 50 粒/瓶', source: '协议·二、播种' },
  { key: 'growth-room', topic: '培养条件', value: '25 ℃，12 h/12 h', source: '协议·二、播种' },
  { key: 'cut-day', topic: '剪叶时机', value: '播种后 5 天，子叶完全展开且无真叶', source: '协议·三、剪叶片' },
  { key: 'cut-shape', topic: '外植体', value: '叶尖与近叶柄各剪一刀', source: '协议·三、剪叶片' },
  { key: 'mso-hold', topic: 'MSO 浸泡上限', value: '不超过 1 h', source: '协议·三、剪叶片' },
  { key: 'small-shake', topic: '小摇', value: '24 h，28 ℃，200 rpm，OD600 约 1.0', source: '协议·三、剪叶片' },
  { key: 'big-shake', topic: '大摇', value: '120 μL 转 50 mL YEB，约 16 h，OD600 0.6–0.7', source: '协议·三、注 2' },
  { key: 'spin', topic: '集菌', value: '4000 rpm，10 min', source: '协议·四、侵染' },
  { key: 'cocult', topic: '共培养', value: '叶背朝上，黑暗 48 h', source: '协议·四、侵染' },
  { key: 'plate-cycle', topic: '倒板周期', value: '每 20 天一次，A2 全程 1.5–2 个月', source: '协议·五、倒板' },
  { key: 'a3-size', topic: '转 A3 判据', value: '苗约 2 cm，基部不带过多愈伤', source: '协议·六、脱分化与再分化' },
  { key: 'a4-time', topic: '生根', value: 'A4 约 10 天', source: '协议·六、脱分化与再分化' },
]

export const STOCKS: Stock[] = [
  { name: 'ZT', mgPerMl: 1, source: '协议·八、抗生素和激素配制' },
  { name: 'IAA', mgPerMl: 1, source: '协议·八、抗生素和激素配制' },
  { name: 'Kan', mgPerMl: 100, source: '协议·八、抗生素和激素配制' },
  { name: 'Hyg', mgPerMl: 25, source: '协议·八、抗生素和激素配制' },
  { name: 'Timentin', mgPerMl: 300, source: '协议·八、抗生素和激素配制' },
]

// 每 1 L 培养基所需母液体积（mL），取自协议·七、培养基配制
export const MEDIA: MediaRow[] = [
  { medium: 'A1', base: 'MS', zt: 2, iaa: 0.1, kan: 0, hyg: 0, tim: 0 },
  { medium: 'A2', base: 'MS', zt: 2, iaa: 0.1, kan: 1, hyg: 0, tim: 1 },
  { medium: 'A3', base: 'MS', zt: 1, iaa: 0.1, kan: 0.5, hyg: 0, tim: 1 },
  { medium: 'A4', base: '1/2MS', zt: 0, iaa: 0.3, kan: 0.3, hyg: 0, tim: 0.5 },
  { medium: 'T1', base: 'MS', zt: 2, iaa: 0.1, kan: 0, hyg: 0, tim: 0 },
  { medium: 'T2', base: 'MS', zt: 2, iaa: 0.1, kan: 0, hyg: 0.24, tim: 1 },
  { medium: 'T3', base: 'MS', zt: 1, iaa: 0.1, kan: 0, hyg: 0.24, tim: 1 },
  { medium: 'T4', base: '1/2MS', zt: 0, iaa: 0.3, kan: 0, hyg: 0.24, tim: 0.5 },
]

export const CHECKS: Check[] = [
  {
    id: 'as',
    where: '八、6 AS 配制 / 七、2 MSO',
    text: '称 196.2 mg 定容 10 mL，实为约 19.62 mg/mL；原文标注「浓度：1 mg/mL」',
    impact: '相差约 20 倍：按标注值每升 1 mL 仅 1 mg/L，侵染效率会明显下降；按称量值约 19.6 mg/L 更接近常规。须确认母液真实浓度',
  },
  {
    id: 'disinfect',
    where: '一、灭种「试剂」行',
    text: '试剂行写「75% 无菌水」，正文为「75% 的酒精」',
    impact: '应为 75% 乙醇；按「无菌水」操作等于没有消毒',
  },
  {
    id: 'cocult-time',
    where: '四、侵染与五、倒板',
    text: '一处写暗培养 48 h，一处写「侵染后的第二天倒板」',
    impact: '两种表述不一致，建议按 48 小时执行，并与教师确认倒板时点',
  },
  {
    id: 'd2',
    where: '三、剪叶片与四、侵染',
    text: '「剪叶片后的第 2 天进行侵染」，未说明当天是否计为第 1 天',
    impact: '影响大摇起始时间，建议按教师实际排期确认',
  },
  {
    id: 'sugar',
    where: '七、注 1 播种 1/2MS',
    text: '播种培养基不加蔗糖，与多数组培播种配方不同',
    impact: '不加糖可能延缓子叶展开，发芽慢时先核对是否按教师要求执行',
  },
  {
    id: 'bleach-dose',
    where: '一、灭种 bleach 用量',
    text: '「按比例适当增加」未给上限',
    impact: '浓度过高会伤种，建议固定 3 mL/30 mL 体系并记录',
  },
]

export const QA: QaEntry[] = [
  {
    id: 'od-high',
    keywords: ['OD', 'OD600', '大摇', '冲到', '1.0', '超标', '过夜'],
    question: '大摇 OD600 冲到 1.0 还能直接侵染吗？',
    answer: '不能直接用。原文给的侵染窗口是 OD600 0.6–0.7。超标时倒出 30 mL，补 30 mL 新鲜 YEB，再培养 5 h 以上重新测 OD；不到 0.6 则继续培养并复测。',
    source: '协议·三、注 2',
    tag: '资料',
  },
  {
    id: 'kan-a3',
    keywords: ['卡那霉素', 'Kan', '50', '100', 'A3', '降'],
    question: 'A3 里卡那霉素为什么降到 50 mg/L？',
    answer: '按加药表，A2 加 Kan 母液 1 mL/L，A3 加 0.5 mL/L；Kan 母液为 100 mg/mL，折算终浓度分别为 100 mg/L 与 50 mg/L。筛选压力在芽诱导后下调，兼顾筛选与生长。',
    source: '协议·七、培养基配制 / 八、抗生素和激素配制',
    tag: '资料',
  },
  {
    id: 'as-stock',
    keywords: ['AS', '乙酰丁香酮', '母液', '浓度', '19.62', '1 mg/mL'],
    question: 'AS 母液到底按 1 mg/mL 还是按称量值算？',
    answer: '称 196.2 mg 定容 10 mL，实际约 19.62 mg/mL，与原文标注的 1 mg/mL 相差约 20 倍。这条属于协议内部不一致，工具不替你改数：先与教师确认母液真实浓度，再决定每升加多少毫升。',
    source: '协议·八、6 / 七、2（待核对项 1）',
    tag: '待核对',
  },
  {
    id: 'plate-time',
    keywords: ['倒板', '第二天', '48', '几天', '共培养'],
    question: '侵染后到底 48 h 倒板还是第二天倒板？',
    answer: '协议两处表述不一致：四、侵染写暗培养 48 h，五、倒板写「侵染后的第二天倒板」。按 48 h 执行更稳妥，但倒板时点请与教师确认，别自己改。',
    source: '协议·四、侵染 / 五、倒板（待核对项 3）',
    tag: '待核对',
  },
  {
    id: 'cut-d2',
    keywords: ['剪叶', '第2天', '第 2 天', '侵染时间', 'D0'],
    question: '「剪叶片后的第 2 天侵染」当天算不算第 1 天？',
    answer: '原文没说清。若把剪叶当天记作第 1 天，侵染落在剪叶次日；若从次日算起，就顺延一天。本工具统一用 D0 = 剪叶日、D+1 = 侵染与大摇，排期以教师课表为准。',
    source: '协议·三、剪叶片（待核对项 4）',
    tag: '待核对',
  },
  {
    id: 'sugar',
    keywords: ['蔗糖', '播种', '1/2MS', '发芽慢', '糖'],
    question: '播种培养基为什么不加蔗糖？',
    answer: '协议注 1 明确播种用 1/2MS 且不加蔗糖，与多数组培播种配方不同。不加糖会延缓子叶展开，所以剪叶判据写成「完全展开且无真叶」，不要凭天数硬剪。',
    source: '协议·七、注 1（待核对项 5）',
    tag: '待核对',
  },
  {
    id: 'a2-duration',
    keywords: ['A2', '多久', '1.5', '两个月', '愈伤', '不动'],
    question: '叶片在 A2 里要放多久？',
    answer: 'A2 全程 1.5–2 个月，每 20 天倒板一次。判据是出现愈伤组织与芽点；到点没有愈伤，先查激素与抗生素配制，再考虑材料状态，不要盲目延长。',
    source: '协议·五、倒板',
    tag: '资料',
  },
  {
    id: 'a3-transfer',
    keywords: ['转A3', '转 A3', '2cm', '2 cm', '苗高'],
    question: '多高的苗可以转 A3？',
    answer: '苗约 2 cm、基部不带过多愈伤时转入 A3，之后培养约 1 个月，长到约 5 cm 再转 A4。带愈伤转接容易在 A3 上继续愈伤化而不出芽。',
    source: '协议·六、脱分化与再分化',
    tag: '资料',
  },
  {
    id: 'contam',
    keywords: ['污染', '细菌', '真菌', '浑浊', '菌落', '发霉'],
    question: '培养基污染了怎么办？',
    answer: '这份协议没有给污染处置流程。能确定的是：污染材料不要与其他材料混放，先隔离并记录出现时间与形态，处置方式按实验室规定执行——这一条协议未覆盖，请直接问教师或实验员。',
    source: '未覆盖',
    tag: '未覆盖',
  },
  {
    id: 'browning',
    keywords: ['褐化', '褐变', '变黑', '氧化'],
    question: '叶片褐化是失败了吗？',
    answer: '协议只把「叶片不褐化」写成共培养的观察判据，没有给褐化的处置方案。少量褐化常见于剪切损伤与光照，若整片变黑并伴培养基变色，请拍照记录后向教师报告。',
    source: '协议·四、侵染（观察项）',
    tag: '未覆盖',
  },
  {
    id: 'bleach',
    keywords: ['84', '消毒液', '漂白', '用量', '按比例'],
    question: '84 消毒液「按比例适当增加」到底加多少？',
    answer: '原文只写 27 mL 无菌水 + 3 mL 84 消毒液，并说可按比例增加，没给上限。浓度过高会伤种，本工具固定按 3 mL/30 mL 记录并写进台账，改动前先问教师。',
    source: '协议·一、灭种（待核对项 6）',
    tag: '待核对',
  },
]

export const SAFETY = [
  '农杆菌操作按实验室规定的生物安全等级执行，全程戴手套并在超净台内操作。',
  '含菌废液与污染材料必须先高压灭菌再处置。',
  '卡那霉素、潮霉素、利福平、特美汀称量分装时戴口罩手套，避免吸入粉尘；潮霉素毒性较强尤需注意。',
  'AS 与 Rif 用 DMSO 配制，DMSO 易透皮，必须戴手套。',
  '84 消毒液稀释需通风，严禁与酸性物质混用。',
  '紫外灯照射期间人员离开，不可直视。',
]
