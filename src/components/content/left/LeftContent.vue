<script>
import UtilizationChart from "@/components/content/left/UtilizationChart.vue";
import ConstellationChart from "@/components/content/left/ConstellationChart.vue";
import OrbitalChart from "@/components/content/left/OrbitalChart.vue";
export default {
  name: "LeftContent",
  components: {
    UtilizationChart,
    ConstellationChart,
    OrbitalChart,
  }
}
</script>

<template>
  <div class="left-content">

    <div class="chart-part">
      <utilization-chart/>
    </div>

    <div class="chart-part">
      <constellation-chart/>
    </div>
    <div class="chart-part">
      <orbital-chart/>
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
      flex: 1;
      width: 100%;
    }
  }
</style>
