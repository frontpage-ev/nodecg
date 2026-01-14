<template>
  <div v-if="loaded">
    <label for="startDate">Startdatum</label>
    <input v-model="startDate" @change="saveChangesToReplicant" type="datetime-local">
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { ref, watch } from 'vue';
import { parseISOLocal } from "../../browser_shared/util";
import type { CountdownSettings } from '../../types';

const loaded = ref(false);

// @ts-ignore
const startDate = ref<Date>()
useHead({ title: 'Countdown Settings' }); // set the title of this page

function updateFromReplicants() {
  // @ts-ignore
  startDate.value = parseISOLocal(countdownSettings.value.startDate).toISOString().slice(0, 16);

  if (!loaded.value) {
    loaded.value = true;
  }
}

const countdownSettings = nodecg.Replicant<CountdownSettings>('countdownSettings', {
  defaultValue: { startDate: new Date().toISOString().slice(0, 16) },
  persistent: true
});

NodeCG.waitForReplicants(countdownSettings).then(() => {
  updateFromReplicants();

  countdownSettings.on('change', updateFromReplicants);
});

function saveChangesToReplicant() {
  // @ts-ignore
  countdownSettings.value.startDate = parseISOLocal(startDate.value).toISOString()
}

</script>