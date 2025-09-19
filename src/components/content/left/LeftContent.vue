<script>
import UtilizationChart from "@/components/content/left/UtilizationChart.vue";
import ConstellationChart from "@/components/content/left/ConstellationChart.vue";
import TransitChart from "@/components/content/left/TransitChart.vue";
import VideoChart from "@/components/content/left/VideoChart.vue";
export default {
  name: "LeftContent",
  components: {
    VideoChart,
    UtilizationChart,
    ConstellationChart,
    TransitChart,
  }
}
</script>

<template>
  <div class="left-content">

    <div class="chart-part">
      <utilization-chart/>
    </div>

    <div class="chart-part">
      <video-chart/>
    </div>
    <div class="chart-part">
      <transit-chart/>
    </div>
  </div>
</template>

<style scoped lang="less">
  .left-content{
    padding-left: 24px;
    display: flex;
    height: 100%;
    flex-direction: column;
    gap: 20px;
    .chart-part {
      overflow: hidden;
      flex: 1;
      width: 100%;
      min-height: 0;
      min-width: 0;
    }
  }
</style>
