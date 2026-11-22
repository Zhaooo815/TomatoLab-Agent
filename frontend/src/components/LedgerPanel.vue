<script setup lang="ts">
import { ref } from 'vue'
import {
  STAGE_ORDER,
  create,
  daysSince,
  exportJson,
  list,
  move,
  patch,
  remove,
  stages,
  type Ledger,
  type StageName,
} from '../adapters/ledger'

const items = ref<Ledger[]>(list())
const name = ref('')
const stage = ref<StageName>('预习')
const error = ref('')
const hint = ref('')

function refresh(): void {
  items.value = list()
}

function add(): void {
  try {
    error.value = ''
    hint.value = ''
    create(name.value, stage.value)
    name.value = ''
    refresh()
  } catch (e) {
    error.value = (e as Error).message
  }
}

function step(item: Ledger, dir: 1 | -1): void {
  try {
    error.value = ''
    const idx = STAGE_ORDER.indexOf(item.stage)
    const next = STAGE_ORDER[idx + dir]
    if (!next) {
      hint.value = dir > 0 ? '已经是最后一阶段。' : '已经是第一阶段。'
      return
    }
    move(item.id, next, item.todo)
    hint.value = ''
    refresh()
  } catch (e) {
    error.value = (e as Error).message
  }
}

function save(item: Ledger): void {
  try {
    error.value = ''
    patch(item.id, { blocks: item.blocks, todo: item.todo, milestone: item.milestone })
    refresh()
    hint.value = `已保存「${item.name}」`
  } catch (e) {
    error.value = (e as Error).message
  }
}

function drop(id: string): void {
  remove(id)
  refresh()
}

function download(): void {
  const blob = new Blob([exportJson()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'tomato-lab-ledger.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <h1>实验进度台账</h1>
  <p class="lead">五字段固定结构，阶段限定六个。数据只存在本机浏览器里，换设备或清缓存会丢；需要交付时导出 JSON 交给自己或教师。</p>

  <div class="card">
    <div class="row">
      <div>
        <label for="n">实验名称</label>
        <input id="n" v-model="name" placeholder="例：番茄子叶遗传转化 A 批" />
      </div>
      <div>
        <label for="st">当前阶段</label>
        <select id="st" v-model="stage">
          <option v-for="s in stages()" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
    </div>
    <button class="primary" @click="add">新增实验</button>
  </div>

  <div v-if="error" class="err">{{ error }}</div>
  <p v-if="hint" class="meta">{{ hint }}</p>

  <div v-if="items.length === 0" class="card">还没有记录。先新增一条，之后每完成一个环节更新一次阶段。</div>

  <div v-for="item in items" :key="item.id" class="card">
    <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 10px">
      <strong>{{ item.name }}</strong>
      <span class="tag">{{ item.stage }}</span>
    </div>
    <div class="meta">记录于 {{ item.createdAt.slice(0, 10) }} · 已 {{ daysSince(item.createdAt) }} 天 · 更新 {{ item.updatedAt.slice(0, 10) }}</div>

    <div style="display: flex; gap: 8px; margin: 10px 0">
      <button class="ghost" @click="step(item, -1)">回退一阶段</button>
      <button class="ghost" @click="step(item, 1)">推进一阶段</button>
    </div>

    <label>里程碑（写进〔〕，例：A2 愈伤诱导 D+18／第 1 次倒板已完成）</label>
    <input v-model="item.milestone" />

    <label>难点与问题</label>
    <textarea v-model="item.blocks" placeholder="例：第 2 瓶出现 2 个菌落，已隔离" />

    <label>待办事项</label>
    <textarea v-model="item.todo" placeholder="例：3 天后复测 OD；回退阶段时在此写明返工原因" />

    <div style="display: flex; gap: 8px; margin-top: 12px">
      <button class="ghost" @click="save(item)">保存修改</button>
      <button class="ghost" @click="drop(item.id)">删除</button>
    </div>
  </div>

  <div v-if="items.length" class="card">
    <button class="ghost" @click="download">导出 JSON</button>
  </div>
</template>
