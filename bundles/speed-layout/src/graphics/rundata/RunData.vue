<template>
  <p
    v-if="loaded"
    class="font-inter"
    :style="{
      'font-size': fontSize,
      color: fontColor,
      'font-weight': fontWeight,
      'line-height': '.75em',
    }"
  >
    {{ text }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type {RunData} from "nodecg-speedcontrol/src/types";

const loaded = ref(false);

const text = ref<string|null>();
const fontSize = ref('16px');
const fontColor = ref('white');
const fontWeight = ref('400');

const searchParams = new URLSearchParams(window.location.search)
const attribute = searchParams.get('attribute') as string

fontSize.value = searchParams.get('size') as string ?? '16px'
fontColor.value = searchParams.get('color') as string ?? 'white'
fontWeight.value = searchParams.get('weight') as string ?? '400'

const runDataActiveRun = nodecg.Replicant<RunData>('runDataActiveRun', 'nodecg-speedcontrol');

function updateFromReplicants() {
  const value =  runDataActiveRun?.value as RunData
  if (! value) {
    return;
  }

  // @ts-ignore
  const attributeValue = value[attribute] as string
  if (! attributeValue) {
    return;
  }

  text.value = attributeValue;

  if (!loaded.value) {
    loaded.value = true;
  }
}

NodeCG.waitForReplicants(runDataActiveRun).then(() => {
  updateFromReplicants();

  runDataActiveRun.on('change', updateFromReplicants);
});
</script>
