<script>
import AntennaChart from "@/components/content/right/AntennaChart.vue";
import NetworkChart from "@/components/content/right/NetworkChart.vue";
import TaskChart from "@/components/content/right/TaskChart.vue";
import VideoChart from "@/components/content/right/VideoChart.vue";
import GroundStationChart from "@/components/content/right/GroundStationChart.vue";
export default {
  name: 'RightContent',
  components: {
    GroundStationChart,
    TaskChart,
    AntennaChart,
    NetworkChart,
    VideoChart
  }
}

</script>

<template>
  <div class="right-content">
    <div class="ground-station chart-part">
      <ground-station-chart/>
    </div>
    <div class="video chart-part">
      <video-chart/>
    </div>
<!--    <div class="video chart-part">-->
<!--      <video-chart/>-->
<!--    </div>-->

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
  .ground-station {
    flex: 3;
    width: 100%;
  }
  .video {
    flex: 2;
    width: 100%;
    overflow: hidden;
  }
  .network {
    flex: 1;
    width: 100%;
  }
}
</style>
