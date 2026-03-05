import type { NodeCGServerAPI } from '../types/index.js';
import { set } from './util/nodecg.js';
import axios from "axios";

export default async (nodecg: NodeCGServerAPI) => {
  set(nodecg); // set nodecg "context" before anything else

  setInterval(async () => {
    const baseUrl = new URL(nodecg.bundleConfig.scheduleUrl ?? 'http://localhost:4001').toString()
    try {
      const response = await axios.get(new URL('data/rundowns/current', baseUrl).toString());
      nodecg.sendMessage('schedule', response.data);
    } catch (e) {
      console.error(e)
    }

    try {
      const response = await axios.get(new URL('api/poll', baseUrl));
      nodecg.sendMessage('event', response.data);
    } catch (e) {
      console.error(e)
    }
  }, 2000);
};
