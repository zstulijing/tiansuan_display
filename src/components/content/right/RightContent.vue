<script>

import ChartBox from "@/components/content/ChartBox.vue";
import AntennaChart from "@/components/content/right/AntennaChart.vue";
import GroundStationChart from "@/components/content/right/GroundStationChart.vue";
import LogTable from "@/components/content/right/LogChart.vue";
export default {
  name: 'RightContent',
  components: {
    LogTable,
    GroundStationChart,
    AntennaChart,
    ChartBox,
  }
}

</script>

<template>
  <div class="right-content">
    <div class="antenna">
      <antenna-chart/>
    </div>
    <div class="chart-part">
      <ground-station-chart/>
    </div>
    <div class="log">
      <log-table/>
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
  .antenna {
    flex: 1;
    width: 100%;
  }
  .log {
    flex: 1;
    width: 100%;
  }
  .chart-part {
    flex: 2;
    width: 100%;
  }
}
</style>
