import { createApp } from 'vue';

// vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// 自訂
import { date } from './methods/filters';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
};

app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
