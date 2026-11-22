<script setup lang="ts">
import { ref } from 'vue'
import { ask, suggestions, type Answer } from '../adapters/qa'

const input = ref('')
const answer = ref<Answer | null>(null)
const error = ref('')
const examples = suggestions()

function submit(): void {
  try {
    error.value = ''
    answer.value = ask(input.value)
  } catch (e) {
    answer.value = null
    error.value = (e as Error).message
  }
}

function useExample(q: string): void {
  input.value = q
  submit()
}
</script>

<template>
  <h1>资料问答</h1>
  <p class="lead">输入操作中遇到的问题，返回协议里的原文结论、出处小节，以及是否需要找教师确认。答案只来自课程 protocol 摘录的条目，未收录的问题不猜。</p>

  <label for="q">你的问题</label>
  <textarea id="q" v-model="input" placeholder="例：大摇 OD 冲到 1.0 还能直接侵染吗" />
  <button class="primary" @click="submit">查答案</button>
  <div v-if="error" class="err">{{ error }}</div>

  <div class="card">
    <div style="font-size: 13px; color: #6b7a72; margin-bottom: 6px">示例问题</div>
    <button v-for="q in examples" :key="q" class="ghost" style="margin: 0 8px 8px 0" @click="useExample(q)">{{ q }}</button>
  </div>

  <div v-if="answer" class="card">
    <div style="margin-bottom: 8px">
      <span class="tag" :class="answer.tag === '待核对' ? 'warn' : answer.tag === '未覆盖' ? 'mute' : ''">{{ answer.tag }}</span>
      <span class="meta" style="margin-left: 8px">出处：{{ answer.source }}</span>
    </div>
    <p style="margin: 0">{{ answer.text }}</p>
    <div class="meta">
      检索模式：{{ answer.mode }} · 命中关键词：{{ answer.matched.length ? answer.matched.join('、') : '无' }}
    </div>
  </div>
</template>
