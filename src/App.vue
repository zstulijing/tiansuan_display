<template>
  <div id="app">
    <div
        class="nav-trigger"
        @mouseenter="showNav = true"
    />

    <div
      class="floating-nav"
      :class="{ 'nav-visible': showNav }"
      @mouseenter="showNav = true"
      @mouseleave="showNav = false"
    >
      <el-menu
        router
        :default-active="defaultActive"
        class="nav-menu"
        background-color="#2A394C"
        :collapse="true"
      >
        <el-menu-item index="/dashboard">
          <i class="el-icon-position"></i>
          <span slot="title">数据大屏</span>
        </el-menu-item>

        <el-menu-item index="/home/orbit">
          <i class="el-icon-link"></i>
          <span slot="title">航天运管系统</span>
        </el-menu-item>

        <el-menu-item index="/home/station">
          <i class="el-icon-place"></i>
          <span slot="title">地面站信息</span>
        </el-menu-item>

        <el-menu-item index="/home/monitor">
          <i class="el-icon-monitor"></i>
          <span slot="title">地面站监控</span>
        </el-menu-item >

        <el-menu-item index="/home/satellite">
          <i class="el-icon-odometer"></i>
          <span slot="title">卫星状态信息</span>
        </el-menu-item >

        <el-menu-item index="/home/analyze">
          <i class="el-icon-data-line"></i>
          <span slot="title">卫星状态分析</span>
        </el-menu-item >

        <el-menu-item index="/home/upload">
          <i class="el-icon-folder-opened"></i>
          <span slot="title">文件传输模块</span>
        </el-menu-item >

        <el-menu-item index="/home/app-ctl">
          <i class="el-icon-box"></i>
          <span slot="title">卫星应用部署</span>
        </el-menu-item >

      </el-menu>
    </div>

    <div class="app-content">
      <router-view/>
    </div>

  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      showNav: false,
      defaultActive: '',
      tableData: [
        { name: '张三', age: 25, address: '北京市朝阳区' },
        { name: '李四', age: 30, address: '上海市浦东新区' },
        { name: '王五', age: 28, address: '广州市天河区' }
      ]
    }
  },
  methods: {
    handleMenuSelect(key, keyPath) {
      console.log('选择菜单:', key, keyPath);
      // 这里可以添加路由跳转逻辑
    }
  },
  mounted() {
    console.log(this.$route.path);
    this.defaultActive = this.$route.path
  }
}
</script>

<style scoped lang="less">
#app {
  position: relative;
  min-width: 1280px;
  min-height: 720px;
  width: 100%;
  height: 100%;
}
.nav-trigger {
  position: fixed;
  left: 0;
  top: 0;
  width: 20px;
  height: 100vh;
  z-index: 998;
  background: transparent;
}

/* 浮动导航容器 */
.floating-nav {
  position: fixed;
  left: -65px; /* 默认隐藏在左侧 */
  top: 0;
  width: 65px;
  height: 100vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease-in-out;
  z-index: 999;
  overflow-y: auto;
}

/* 显示状态 */
.floating-nav.nav-visible {
  left: 0;
}

/* 导航菜单样式 */
.nav-menu {
  border: none;
  height: 100%;
}

/* ElementUI 菜单项样式调整 */
.nav-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
  margin: 2px 0;
}

.nav-menu .el-submenu .el-submenu__title {
  height: 50px;
  line-height: 50px;
}

.nav-menu .el-menu-item:hover {
  background-color: #00000033 !important;
}

.nav-menu .el-menu-item.is-active {
  background-color: #1677ff !important;
  color: #fff !important;
}

/* 滚动条样式 */
.floating-nav::-webkit-scrollbar {
  width: 6px;
}

.floating-nav::-webkit-scrollbar-track {
  background: #2c3e50;
}

.floating-nav::-webkit-scrollbar-thumb {
  background: #34495e;
  border-radius: 3px;
}

.floating-nav::-webkit-scrollbar-thumb:hover {
  background: #4a6fa5;
}
</style>
