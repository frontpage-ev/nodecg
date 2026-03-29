import { createHead } from '@unhead/vue/client';
import { createApp } from 'vue'
import './style.css'
import App from './Timer.vue'

const app = createApp(App);
const head = createHead();
app.use(head);
app.mount('#app');