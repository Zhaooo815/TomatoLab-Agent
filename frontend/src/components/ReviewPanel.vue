<script setup lang="ts">
import { ref } from 'vue'
import { review, type ReviewResult } from '../adapters/review'

const text = ref('')
const result = ref<ReviewResult | null>(null)
const error = ref('')

function check(): void {
  try {
    error.value = ''
    result.value = review(text.value)
  } catch (e) {
    result.value = null
    error.value = (e as Error).message
  }
}
</script>

<template>
  <h1>报告自查</h1>
  <p class="lead">把写好的报告段落或实验记录贴进来，检查要素是否齐全、有没有笼统表述。只给清单与改法，不打分、不代写。</p>

  <label for="r">你的文字</label>
  <textarea id="r" v-model="text" style="min-height: 180px" placeholder="粘贴实验记录或报告段落，至少 40 字" />
  <button class="primary" @click="check">检查</button>
  <div v-if="error" class="err">{{ error }}</div>

  <div v-if="result" class="card">
    <div style="margin-bottom: 8px">要素覆盖 {{ result.covered }} / {{ result.items.length }}</div>
    <table>
      <thead>
        <tr><th style="width: 128px">要素</th><th style="width: 86px">状态</th><th>该写什么</th></tr>
      </thead>
      <tbody>
        <tr v-for="i in result.items" :key="i.key">
          <td>{{ i.label }}</td>
          <td>
            <span class="tag" :class="i.found ? '' : 'warn'">{{ i.found ? '已覆盖' : '缺失' }}</span>
          </td>
          <td>{{ i.hint }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="result.warnings.length" style="margin-top: 12px">
      <strong style="font-size: 14px">需要留意的表述</strong>
      <ul style="margin: 6px 0 0; padding-left: 18px; font-size: 14px">
        <li v-for="w in result.warnings" :key="w">{{ w }}</li>
      </ul>
    </div>

    <div class="meta">自查规则按关键词判断，属于结构性提示，不等于内容正确；数据本身必须来自你自己的实操记录。</div>
  </div>
</template>
