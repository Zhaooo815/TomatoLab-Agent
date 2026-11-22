<script setup lang="ts">
import { CHECKS, SAFETY, STAGES } from '../data/tomato'

const emit = defineEmits<{ (e: 'go', panel: string): void }>()

const gates = [
  { day: 'D0', title: '剪叶闸门', note: '子叶完全展开且无真叶才剪；叶片在 MSO 里不超过 1 h' },
  { day: 'D+1', title: '侵染闸门', note: 'OD600 落回 0.6–0.7 才符合原文窗口，超标要稀释后复测' },
  { day: 'D+3', title: '倒板闸门', note: '共培养 48 h 后倒 A2，叶面朝上、叶片间留间隙' },
  { day: 'D+50', title: '转接闸门', note: '苗约 2 cm 且基部不带过多愈伤再转 A3' },
]
</script>

<template>
  <h1>番茄遗传转化 · 实验工作台</h1>
  <p class="lead">这个页面把课程 protocol 拆成可执行的环节、参数和判据。所有数值标了协议小节，六处原文不一致的地方集中标注、不替你改数。</p>

  <div class="card">
    <h2 style="margin-top: 0">四道闸门</h2>
    <table>
      <thead>
        <tr><th style="width: 68px">时点</th><th style="width: 130px">闸门</th><th>过关判据</th></tr>
      </thead>
      <tbody>
        <tr v-for="g in gates" :key="g.day">
          <td>{{ g.day }}</td>
          <td>{{ g.title }}</td>
          <td>{{ g.note }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card">
    <h2 style="margin-top: 0">七环节日程（D0 = 剪叶日）</h2>
    <table>
      <thead>
        <tr><th style="width: 84px">时点</th><th style="width: 118px">环节</th><th>关键动作</th><th style="width: 132px">达标判据</th></tr>
      </thead>
      <tbody>
        <tr v-for="s in STAGES" :key="s.key">
          <td>{{ s.window }}</td>
          <td>{{ s.name }}</td>
          <td>{{ s.action }}</td>
          <td>{{ s.criteria }}</td>
        </tr>
      </tbody>
    </table>
    <div class="meta">来源：课程 protocol 第一至第六部分，逐条对应，可在「原文摘录」核对。</div>
  </div>

  <div class="card" style="border-color: #c58a5e; background: #fdf6ef">
    <h3 style="margin: 0 0 6px; font-size: 15px">做之前先看：{{ CHECKS.length }} 处原文待核对</h3>
    <p style="margin: 0 0 10px; color: #7a4a24; font-size: 14px">
      协议内部有六处表述不一致或留有解释空间（AS 母液浓度、消毒试剂写法、共培养时长等）。工具只提示差异，数值以原协议原文为准，改动前请与教师确认。
    </p>
    <button class="ghost" @click="emit('go', 'reference')">查看六处原文</button>
  </div>

  <div class="card">
    <h3 style="margin: 0 0 8px; font-size: 15px">安全前提</h3>
    <ul style="margin: 0; padding-left: 18px; font-size: 14px">
      <li v-for="s in SAFETY.slice(0, 3)" :key="s">{{ s }}</li>
    </ul>
    <div class="meta">完整六条见「原文摘录」页末尾。</div>
  </div>
</template>
