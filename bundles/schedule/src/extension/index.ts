import type { NodeCGServerAPI } from '../types/index.js';
import { set } from './util/nodecg.js';
import axios from "axios";

export default async (nodecg: NodeCGServerAPI) => {
  set(nodecg); // set nodecg "context" before anything else

  setInterval(async () => {
    try {
      const response = await axios.get(nodecg.bundleConfig.scheduleUrl ??  `http://localhost:4001/data/rundowns/current`);
      nodecg.sendMessage('schedule', response.data);
    } catch (e) {}
  }, 2000);
};
