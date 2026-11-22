<script setup lang="ts">
import { computed, ref } from 'vue'
import { MEDIA, STOCKS } from '../data/tomato'
import { doseOf, reverseOf, type DoseResult } from '../adapters/dosing'

const medium = ref('A2')
const liters = ref(3)
const result = ref<DoseResult | null>(null)
const error = ref('')

const stock = ref('Kan')
const target = ref(50)
const rev = ref<{ ml: number; mlPerL: number } | null>(null)

function compute(): void {
  try {
    error.value = ''
    result.value = doseOf(medium.value, Number(liters.value))
  } catch (e) {
    result.value = null
    error.value = (e as Error).message
  }
}

function reverse(): void {
  try {
    error.value = ''
    rev.value = reverseOf(medium.value, Number(liters.value), stock.value, Number(target.value))
  } catch (e) {
    rev.value = null
    error.value = (e as Error).message
  }
}

const base = computed(() => MEDIA.find((m) => m.medium === medium.value)?.base ?? '')
</script>

<template>
  <h1>配药计算</h1>
  <p class="lead">按协议第七部分的加药表换算：选定培养基与体积，算出每种母液要加多少毫升，并同时给出折算终浓度，便于对照原文核对。</p>

  <div class="row">
    <div>
      <label for="m">培养基</label>
      <select id="m" v-model="medium">
        <option v-for="m in MEDIA" :key="m.medium" :value="m.medium">{{ m.medium }}（{{ m.base }}）</option>
      </select>
    </div>
    <div>
      <label for="v">配制体积（L）</label>
      <input id="v" v-model="liters" type="number" min="0.1" step="0.1" />
    </div>
  </div>
  <button class="primary" @click="compute">计算母液体积</button>
  <div v-if="error" class="err">{{ error }}</div>

  <div v-if="result" class="card">
    <div style="margin-bottom: 6px">{{ result.medium }}（{{ result.base }}）· {{ result.liters }} L</div>
    <table>
      <thead>
        <tr><th>母液</th><th>母液浓度</th><th class="num">每升用量</th><th class="num">本次用量</th><th class="num">折算终浓度</th></tr>
      </thead>
      <tbody>
        <tr v-for="r in result.rows" :key="r.stock">
          <td>{{ r.stock }}</td>
          <td>{{ r.stockMgPerMl }} mg/mL</td>
          <td class="num">{{ r.mlPerL }} mL</td>
          <td class="num">{{ r.ml }} mL</td>
          <td class="num">{{ r.mgPerL }} mg/L</td>
        </tr>
      </tbody>
    </table>
    <div class="meta">母液浓度取自协议第八部分；加药量取自第七部分加药表。计算过程按比例放大，未做任何取整修正，实际操作按移液器量程取舍。</div>
  </div>

  <div class="card">
    <h2 style="margin-top: 0">反向核对</h2>
    <p style="color: #6b7a72; font-size: 14px; margin: 0 0 4px">已知目标终浓度，反算需要加多少母液，用来核对加药表是否与自己的预期一致。</p>
    <div class="row">
      <div>
        <label for="s">母液</label>
        <select id="s" v-model="stock">
          <option v-for="s in STOCKS" :key="s.name" :value="s.name">{{ s.name }}（{{ s.mgPerMl }} mg/mL）</option>
        </select>
      </div>
      <div>
        <label for="t">目标终浓度（mg/L）</label>
        <input id="t" v-model="target" type="number" min="1" step="1" />
      </div>
    </div>
    <button class="ghost" style="margin-top: 12px" @click="reverse">反算</button>
    <p v-if="rev" style="margin: 10px 0 0">需要 {{ rev.ml }} mL（即每升 {{ rev.mlPerL }} mL），{{ base }} 体系 {{ liters }} L。</p>
  </div>
</template>

