import Vue from 'vue'

import App from './App'

import * as echarts from 'echarts';
import './style.css'

Vue.prototype.$echarts = echarts

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}



Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
