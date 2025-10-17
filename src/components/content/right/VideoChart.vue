<script >
import ChartBox from "@/components/content/ChartBox.vue";
export default {
  name: "VideoChart",
  components: {
    ChartBox,
  },
  data() {
    return {
      intervalNum: 0,
      groundStationTime: new Date().toLocaleString()
    }
  },
  mounted() {
    this.intervalNum = setInterval(() => {
      this.groundStationTime = new Date().toLocaleString()
    }, 1000)
  },
  destroyed() {
    // clearInterval(this.intervalNum)
  }
}
</script>

<template>
  <chart-box>
    <template #title>
      <div class="video-chart__title">
        实时监控
      </div>
    </template>
    <template #content>
      <div class="video-chart__video">
        <video
            :src="require('@/assets/video/test.mp4')"
            autoplay
            loop
            muted
            playsinline
        ></video>
        <p class="ground-station-name">华东站</p>
        <p class="ground-station-time">{{groundStationTime}}</p>
      </div>

    </template>
  </chart-box>
</template>

<style scoped lang="less">
.video-chart__title {
  margin-bottom: 12px;
}
.video-chart__video {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  video {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ground-station-time, .ground-station-name {
    color: #FFF;
    position: absolute;
  }
  .ground-station-name {
    right: 12px;
    bottom: 8px;
  }
  .ground-station-time {
    left: 12px;
    top: 8px;
  }
}

</style>