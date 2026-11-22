export type MessageInput = {
  course: string
  experiment: string
  step: string
  question: string
  tried: string
  expect: string
}

export type MessageResult = { brief: string; formal: string }

function clean(v: string): string {
  return v.trim().replace(/[。；;]+$/, '')
}

export function compose(input: MessageInput): MessageResult {
  const course = clean(input.course)
  const experiment = clean(input.experiment)
  const step = clean(input.step)
  const question = clean(input.question)
  const tried = clean(input.tried)
  const expect = clean(input.expect)
  if (!question) throw new Error('请写清具体问题，一次只问一件事')
  if (!step) throw new Error('请写清做到哪一步，教师才能定位')

  const head = [course, experiment].filter(Boolean).join('·')
  const brief = [
    `老师您好，我是${course || '本课程'}的学生。`,
    `${experiment || '实验'}做到${step}，遇到一个问题：${question}。`,
    tried ? `已经试过：${tried}。` : '',
    expect ? `想请教：${expect}。` : '想请您指点下一步怎么处理。',
  ]
    .filter(Boolean)
    .join('')

  const formal = [
    `老师您好：`,
    ``,
    `我是${course || '本课程'}的学生，正在做${head || '课程实验'}。目前进行到${step}，遇到以下问题需要请教：`,
    ``,
    `问题：${question}。`,
    tried ? `已尝试的处理：${tried}。` : `目前尚未尝试其他处理。`,
    expect ? `希望得到您的指导：${expect}。` : `希望您能指点下一步的处理方式。`,
    ``,
    `如需我补充照片或记录，随时告诉我。打扰您了，谢谢老师。`,
  ]
    .filter((line) => line !== null)
    .join('\n')

  return { brief, formal }
}
