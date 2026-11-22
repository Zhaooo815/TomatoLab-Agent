<script setup lang="ts">
import { ref } from 'vue'
import HomePanel from './components/HomePanel.vue'
import QaPanel from './components/QaPanel.vue'
import DosePanel from './components/DosePanel.vue'
import LedgerPanel from './components/LedgerPanel.vue'
import MessagePanel from './components/MessagePanel.vue'
import ReviewPanel from './components/ReviewPanel.vue'
import ReferencePanel from './components/ReferencePanel.vue'
import { CHECKS, SAFETY } from './data/tomato'

const NAV = [
  ['home', '工作台'],
  ['qa', '资料问答'],
  ['dose', '配药计算'],
  ['ledger', '进度台账'],
  ['message', '师生沟通'],
  ['review', '报告自查'],
  ['reference', '原文摘录'],
] as const

type PanelKey = (typeof NAV)[number][0]
const active = ref<PanelKey>('home')

function go(panel: string): void {
  const hit = NAV.find((n) => n[0] === panel)
  if (hit) active.value = hit[0]
}
</script>

<template>
  <div class="app">
    <nav class="nav">
      <div class="brand">
        TomatoLab-Agent<span class="badge-demo">DEMO</span>
        <small>番茄遗传转化 · 实验学习助手</small>
      </div>
      <button v-for="n in NAV" :key="n[0]" :class="{ on: active === n[0] }" @click="active = n[0]">
        {{ n[1] }}
      </button>
    </nav>

    <main class="panel">
      <HomePanel v-if="active === 'home'" @go="go" />
      <QaPanel v-else-if="active === 'qa'" />
      <DosePanel v-else-if="active === 'dose'" />
      <LedgerPanel v-else-if="active === 'ledger'" />
      <MessagePanel v-else-if="active === 'message'" />
      <ReviewPanel v-else-if="active === 'review'" />
      <ReferencePanel v-else />
    </main>

    <aside class="side">
      <h3>数据性质</h3>
      <ul>
        <li>全部内容为课程 protocol 摘录与本地规则计算，DEMO / SAMPLE 性质，不连接任何线上大模型。</li>
        <li>台账存在本机 localStorage，换设备不跟随，需要时导出 JSON。</li>
        <li>协议原文属课程资料，未随本项目分发。</li>
      </ul>

      <h3>待核对 {{ CHECKS.length }} 处</h3>
      <ul>
        <li v-for="c in CHECKS.slice(0, 3)" :key="c.id">{{ c.where }}</li>
        <li style="color: #6b7a72">…完整清单见「原文摘录」</li>
      </ul>

      <h3>安全底线</h3>
      <ul>
        <li v-for="s in SAFETY.slice(0, 2)" :key="s">{{ s }}</li>
      </ul>

      <h3>使用边界</h3>
      <ul>
        <li>不代写完整实验报告，不生成原始数据。</li>
        <li>参数冲突只提示差异，不替你改数。</li>
        <li>未收录的问题直接说「协议未覆盖」。</li>
      </ul>
    </aside>
  </div>
</template>
