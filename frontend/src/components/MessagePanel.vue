<script setup lang="ts">
import { ref } from 'vue'
import { compose, type MessageInput, type MessageResult } from '../adapters/messaging'

const form = ref<MessageInput>({
  course: '植物基因工程',
  experiment: '番茄子叶遗传转化',
  step: '',
  question: '',
  tried: '',
  expect: '',
})
const result = ref<MessageResult | null>(null)
const error = ref('')
const copied = ref('')

function build(): void {
  try {
    error.value = ''
    result.value = compose(form.value)
  } catch (e) {
    result.value = null
    error.value = (e as Error).message
  }
}

async function copy(text: string, which: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = which
  } catch {
    copied.value = '复制失败，请手动选择文本'
  }
}
</script>

<template>
  <h1>师生沟通</h1>
  <p class="lead">把要说的事情按四要素填清，生成简洁版与正式礼貌版两段话。这里只做结构化组装，不替你编造实验情况。</p>

  <label for="c">课程 / 身份</label>
  <input id="c" v-model="form.course" />

  <label for="e">实验名称</label>
  <input id="e" v-model="form.experiment" />

  <label for="s">做到哪一步（必填）</label>
  <input id="s" v-model="form.step" placeholder="例：侵染后第 3 天，倒 A2 第 2 天" />

  <label for="q">具体问题（一次只问一件事，必填）</label>
  <input id="q" v-model="form.question" placeholder="例：其中 2 瓶培养基出现白色菌落，是否整批隔离" />

  <label for="t">已经尝试过什么</label>
  <input id="t" v-model="form.tried" placeholder="例：已把这 2 瓶单独移出培养室，拍了照片" />

  <label for="w">希望得到什么答复</label>
  <input id="w" v-model="form.expect" placeholder="例：确认是否需要整批重新倒板" />

  <button class="primary" @click="build">生成两版消息</button>
  <div v-if="error" class="err">{{ error }}</div>
  <p v-if="copied" class="meta">{{ copied }}</p>

  <div v-if="result" class="split">
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <strong>简洁版</strong>
        <button class="ghost" @click="copy(result.brief, '已复制简洁版')">复制</button>
      </div>
      <p style="margin: 10px 0 0; white-space: pre-wrap">{{ result.brief }}</p>
    </div>
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <strong>正式礼貌版</strong>
        <button class="ghost" @click="copy(result.formal, '已复制正式版')">复制</button>
      </div>
      <p style="margin: 10px 0 0; white-space: pre-wrap">{{ result.formal }}</p>
    </div>
  </div>
</template>
