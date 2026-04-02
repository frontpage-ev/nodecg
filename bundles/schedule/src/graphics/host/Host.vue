<template>
  <p
    class="font-inter"
    :style="{
      'font-size': fontSize,
      color: fontColor,
      'font-weight': fontWeight,
      'line-height': '.75em',
      'text-align': textAlign
    }"
  >
    {{ text }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref<string|null>();
const fontSize = ref('16px');
const fontColor = ref('white');
const fontWeight = ref('400');
const textAlign = ref('start');

interface EventData {
  title: string
  custom: {
    Subtitle: string|null
    Presenter: string|null
    DayOfWeek: string|null
    HostName1: string|null
    HostDescription1: string|null
    HostName2: string|null
    HostDescription2: string|null
  }
  type: string
  note: string
  timerType: string
  timeStart: number
  timeEnd: number
  flag: boolean
  id: string
}

const searchParams = new URLSearchParams(window.location.search)
const attribute = searchParams.get('attribute') as string

fontSize.value = searchParams.get('size') as string ?? '16px'
fontColor.value = searchParams.get('color') as string ?? 'white'
fontWeight.value = searchParams.get('weight') as string ?? '400'
textAlign.value = searchParams.get('align') as string ?? 'start'

nodecg.listenFor('event', async ({payload}: {payload: { eventNow: EventData }}) => {
  // @ts-expect-error should be dynamic
  text.value = payload.eventNow.custom[attribute] as string
})
</script>
