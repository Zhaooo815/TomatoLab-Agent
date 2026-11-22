<script setup lang="ts">
import { CHECKS, MEDIA, PARAMS, SAFETY, STAGES, STOCKS } from '../data/tomato'
</script>

<template>
  <h1>原文摘录与出处</h1>
  <p class="lead">
    以下内容逐条摘录自课程 protocol，标出小节位置，供核对。协议原文属课程内部资料，未随本项目公开分发，需要原文时向教师索取。
    <a href="/protocol/tomato-protocol.pdf" target="_blank" rel="noopener" style="margin-left: 4px">打开课程原文 PDF（内部使用）</a>
  </p>

  <h2>一、七环节与关键参数</h2>
  <table>
    <thead>
      <tr><th style="width: 78px">时点</th><th style="width: 112px">环节</th><th>关键动作</th><th style="width: 126px">判据</th><th style="width: 138px">出处</th></tr>
    </thead>
    <tbody>
      <tr v-for="s in STAGES" :key="s.key">
        <td>{{ s.window }}</td>
        <td>{{ s.name }}</td>
        <td>{{ s.action }}</td>
        <td>{{ s.criteria }}</td>
        <td class="meta">{{ s.source }}</td>
      </tr>
    </tbody>
  </table>

  <h2>二、参数卡</h2>
  <table>
    <thead><tr><th style="width: 150px">参数</th><th>取值</th><th style="width: 168px">出处</th></tr></thead>
    <tbody>
      <tr v-for="p in PARAMS" :key="p.key">
        <td>{{ p.topic }}</td>
        <td>{{ p.value }}</td>
        <td class="meta">{{ p.source }}</td>
      </tr>
    </tbody>
  </table>

  <h2>三、培养基加药表（每 1 L 母液体积，mL）</h2>
  <table>
    <thead><tr><th>培养基</th><th>基础</th><th class="num">ZT</th><th class="num">IAA</th><th class="num">Kan</th><th class="num">Hyg</th><th class="num">Timentin</th></tr></thead>
    <tbody>
      <tr v-for="m in MEDIA" :key="m.medium">
        <td>{{ m.medium }}</td>
        <td>{{ m.base }}</td>
        <td class="num">{{ m.zt || '—' }}</td>
        <td class="num">{{ m.iaa || '—' }}</td>
        <td class="num">{{ m.kan || '—' }}</td>
        <td class="num">{{ m.hyg || '—' }}</td>
        <td class="num">{{ m.tim || '—' }}</td>
      </tr>
    </tbody>
  </table>
  <div class="meta">母液浓度：{{ STOCKS.map((s) => `${s.name} ${s.mgPerMl} mg/mL`).join('、') }}。A4 与 T4 用 1/2MS，其余 MS。</div>

  <h2>四、六处待核对</h2>
  <div v-for="c in CHECKS" :key="c.id" class="card">
    <div><span class="tag warn">待核对</span> <strong style="margin-left: 6px">{{ c.where }}</strong></div>
    <p style="margin: 8px 0 4px">原文：{{ c.text }}</p>
    <p style="margin: 0; color: #7a4a24">影响与建议：{{ c.impact }}</p>
  </div>

  <h2>五、安全提醒</h2>
  <ul style="margin: 8px 0 0; padding-left: 18px">
    <li v-for="s in SAFETY" :key="s" style="margin-bottom: 6px">{{ s }}</li>
  </ul>
</template>
