import type { NodeCGServerAPI } from '../types/index.js';
import { set } from './util/nodecg.js';
import axios from "axios";

export default async (nodecg: NodeCGServerAPI) => {
  set(nodecg); // set nodecg "context" before anything else

  await import('./util/replicants.js');
  await import('./countdownSettings.js')
};
