import { countdownSettings } from './util/replicants.js';

// Access/set a replicant (also see ./util/replicants).
countdownSettings.value = { startDate: new Date().toISOString() };