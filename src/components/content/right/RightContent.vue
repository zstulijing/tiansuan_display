<script>
import AntennaChart from "@/components/content/right/AntennaChart.vue";
import NetworkChart from "@/components/content/right/NetworkChart.vue";
import TaskChart from "@/components/content/right/TaskChart.vue";
export default {
  name: 'RightContent',
  components: {
    TaskChart,
    AntennaChart,
    NetworkChart,
  }
}

</script>

<template>
  <div class="right-content">
    <div class="antenna chart-part">
      <antenna-chart/>
    </div>
    <div class="task chart-part">
      <task-chart/>
    </div>
    <div class="network chart-part">
      <network-chart/>
    </div>
  </div>
</template>

<style scoped lang="less">
.right-content{
  padding-right: 24px;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 20px;
  .chart-part {
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }
  .antenna {
    flex: 1;
    width: 100%;
  }
  .task {
    flex: 3;
    width: 100%;
  }
  .network {
    flex: 2;
    width: 100%;
  }
}
</style>
