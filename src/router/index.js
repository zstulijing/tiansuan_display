import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入页面组件
import Dashboard from '@/pages/dashboard/Dashboard.vue'
import Home from '@/pages/Home.vue'
import Station from "@/pages/station/Station.vue";
import Orbit from "@/pages/orbit/Orbit.vue";
import Satellite from "@/pages/satellite/Satellite.vue";
import Analyze from "@/pages/analyze/Analyze.vue"
import AppCtl from "@/pages/app-ctl/AppCtl.vue"
import Monitor from "@/pages/monitor/Monitor.vue";
import Upload from "@/pages/upload/Upload.vue";
import Agent from "@/pages/agent/agent.vue";

// 定义路由表
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/home', // 一级路由路径
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'orbit',
        name: 'Orbit',
        component: Orbit
      },
      {
        path: 'station',
        name: 'Station',
        component: Station
      },
      {
        path: 'monitor',
        name: 'Monitor',
        component: Monitor
      },
      {
        path: 'satellite',
        name: 'Satellite',
        component: Satellite
      },
      {
        path: 'analyze',
        name: 'Analyze',
        component: Analyze
      },
      {
        path: 'upload',
        name: 'Upload',
        component: Upload
      },
      {
        path: 'app-ctl',
        name: 'AppCtl',
        component: AppCtl
      },
      {
        path: 'agent',
        name: 'Agent',
        component: Agent
      }
    ]
  },
  {
    path: '/',
    redirect: '/dashboard',
    replace: true,
  }

]

// 创建并导出 router 实例
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router