import { createApp } from 'vue';

// vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// Vee Validate
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// 自訂
import { date } from './methods/filters';

// 原生
import App from './App.vue';
import router from './router';
import store from './store';

// Vee Validate
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]); // 載入規則
});
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
};

app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.component('ErrorMessage', ErrorMessage);
app.component('VField', Field);
app.component('VForm', Form);
app.mount('#app');
