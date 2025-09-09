<template>
  <div id="app" class="satellite-dashboard">
<!--    <Particle/>-->
    <div class="header">
      <dashboard-header/>
    </div>

    <div class="content">
      <dashboard-content/>
    </div>

  </div>
</template>

<script>
import DashboardHeader from "@/components/header/DashboardHeader.vue";
// import Particle from "@/components/background/Particle.vue";
import DashboardContent from "@/components/content/DashboardContent.vue";

export default {
  name: 'App',
  components: {
    DashboardHeader,
    // Particle,
    DashboardContent,
  }
}
</script>

<style scoped lang="less">
.satellite-dashboard {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url('~@/assets/images/background/background.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  .content {
    flex: 1;
  }
}
</style>
