<template>
  <div v-if="loaded">
    <label for="startDate">Startdatum</label>
    <input :value="startDate" type="datetime-local" :min="minDate" @change="saveChangesToReplicant">
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { ref, watch } from 'vue';
import type { CountdownSettings } from '../../types';

const loaded = ref(false);

const minDate = new Date().toISOString().slice(0, 16);

const startDate = ref<string>()
useHead({ title: 'Countdown Settings' }); // set the title of this page

function updateFromReplicants() {
  // @ts-ignore
  startDate.value = countdownSettings.value.startDate;

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

function saveChangesToReplicant(event: Event) {
  // @ts-ignore
  countdownSettings.value.startDate = (event.target as HTMLInputElement).value;
  startDate.value = countdownSettings.value?.startDate;
}

</script>