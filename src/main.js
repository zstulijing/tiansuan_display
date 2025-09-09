import Vue from 'vue'

import App from './App'

import * as filters from './filters' // global filters
import * as echarts from 'echarts';
import './style.css'

Vue.prototype.$echarts = echarts

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}


// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
