import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Antd from 'ant-design-vue';
import {Button, message} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Axios from "axios"

Vue.config.productionTip = false

Vue.use(Axios)
Vue.use(Antd);
Vue.use(Button);
Vue.prototype.$message = message;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
