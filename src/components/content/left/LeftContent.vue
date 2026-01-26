<script>
import UtilizationChart from "@/components/content/left/UtilizationChart.vue";
import ConstellationChart from "@/components/content/left/ConstellationChart.vue";
import TransitChart from "@/components/content/left/TransitChart.vue";
import TaskChart from "@/components/content/left/TaskChart.vue";
import SatelliteChart from "@/components/content/left/SatelliteChart.vue";

export default {
  name: "LeftContent",
  components: {
    TaskChart,
    UtilizationChart,
    ConstellationChart,
    TransitChart,
    SatelliteChart
  },
  methods: {
    changeSate(satelliteName) {
      this.$emit("changeSate", satelliteName);
    },
    updateData(data) {
      this.$refs.satelliteChart.updateData(data);
    }

  }
}
</script>

<template>
  <div class="left-content">

    <div class="chart-part satellite-chart">
      <satellite-chart ref="satelliteChart" @changeSate="changeSate" />
    </div>

    <div class="chart-part task-chart">
      <task-chart/>
    </div>
    <div class="chart-part transit-chart">
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

    .task-chart {
      flex: 3;
    }
    .transit-chart {
      flex: 2;
    }
    .chart-part {
      overflow: hidden;
      width: 100%;
      min-height: 0;
      min-width: 0;
    }
  }
</style>
