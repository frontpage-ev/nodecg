<template>
  <div class="flex flex-col gap-0" v-if="loaded">
    <div v-if="text && text !== ''"
         class="text-right text-white" :style="{
      fontSize: fontSizeText + 'px',
      fontFamily: fontText,
      fontWeight: fontWeightText
    }">
      {{ text }}
    </div>
    <div
        class="text-right text-white leading-none"
        :style="{
      fontSize: fontSizeDate + 'px',
      fontFamily: fontDate,
      fontWeight: fontWeightDate
    }">
      {{ toHumanReadable(remaining) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import type {CountdownSettings} from "../../types";

const loaded = ref(false);

const fontSizeText = ref(60)
const fontText = ref('Chivo')
const fontWeightText = ref(400)
const text = ref("Gleich geht's los")

const fontSizeDate = ref(120)
const fontDate = ref('Chivo')
const fontWeightDate = ref(700)

const dateTime = ref(new Date())

const fonts = new Set()

const oneMinute = 60 * 1000;
const oneHour = 60 * oneMinute
const oneDay = 24 * oneHour;

function loadFont(fontFamily: string) {
  if (fonts.has(fontFamily)) {
    return
  }

  const link = document.createElement('link')
  link.href = `https://fonts.bunny.net/css?family=${fontFamily.replace(' ', '+')}`
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  fonts.add(fontFamily)
}

watch(fontText, (newValue) => loadFont(newValue));
loadFont(fontText.value);
watch(fontDate, (newValue) => loadFont(newValue));
loadFont(fontDate.value);

//@ts-ignore
function updateFromReplicants() {
  // @ts-ignore
  dateTime.value = parseISOLocal(countdownSettings.value.startDate);

  if (!loaded.value) {
    loaded.value = true;
  }
}

const countdownSettings = nodecg.Replicant<CountdownSettings>('countdownSettings', {
  defaultValue: {startDate: new Date().toISOString().slice(0, 16)},
  persistent: true
});

NodeCG.waitForReplicants(countdownSettings).then(() => {
  updateFromReplicants();

  countdownSettings.on('change', updateFromReplicants);
});

const remaining = ref(0)

setInterval(() => {
  //@ts-ignore
  const remainingMillis = dateTime.value - new Date(new Date().toUTCString())
  if (remainingMillis > 0) {
    remaining.value = remainingMillis
  } else {
    remaining.value = 0
  }
}, 1000)

function toHumanReadable(remaining: number) {
  let days = Math.floor(remaining / oneDay)
  const hours = Math.floor((remaining % oneDay) / oneHour)
  const minutes = Math.floor((remaining % oneHour) / oneMinute)
  const seconds = Math.floor((remaining % oneMinute) / 1000)

  let timeString = ''

  if (days > 0) {
    if (days < 10) {
      timeString += '0'
    }
    timeString += days + ':'
  }

  if (hours > 0 || days > 0) {
    if (hours < 10) {
      timeString += '0'
    }
    timeString += hours + ':'
  }

  if (minutes > 0 || hours > 0 || days > 0) {
    if (minutes < 10) {
      timeString += '0'
    }
    timeString += minutes + ':'
  }

  if (seconds < 10) {
    timeString += '0'
  }
  timeString += seconds

  return timeString
}

function parseISOLocal(s: string) {
  const b = s.split(/\D/);
  // @ts-ignore
  return new Date(Number.parseInt(b[0]), Number.parseInt(b[1]) - 1, Number.parseInt(b[2]), Number.parseInt(b[3]), Number.parseInt(b[4]), 0);
}

</script>
