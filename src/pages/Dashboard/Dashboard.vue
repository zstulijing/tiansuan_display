<script>

import Particle from "@/components/background/Particle.vue";
import DashboardHeader from "@/components/header/DashboardHeader.vue";
import DashboardContent from "@/components/content/DashboardContent.vue";

export default {
  name: 'Dashboard',
  components: {DashboardContent, DashboardHeader, Particle}
}
</script>

<template>
  <div class="satellite-dashboard">
    <Particle/>
    <div class="header">
      <dashboard-header/>
    </div>

    <div class="content">
      <dashboard-content/>
    </div>

  </div>
</template>

<style scoped lang="less">
.satellite-dashboard {
  width: 100%;
  aspect-ratio: 16 / 9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-image: url('~@/assets/images/background/background.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  .content {
    flex: 1;
  }
}
</style>