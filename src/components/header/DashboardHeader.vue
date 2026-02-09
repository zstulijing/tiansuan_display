<script>
import screenfull from "screenfull";

export default {
  data() {
    return {
      // 时间字符串
      time: new Date().toLocaleString(),
      // 是否全屏
      isFullScreen: false
    };
  },
  mounted() {
    console.log("***", screenfull)
    // 挂载生命周期，修改时间
    setInterval(() => {
      this.time = new Date().toLocaleString();
    }, 1000);
  },
  methods: {
    // 点击全屏
    fullScreen() {

      if (!this.isFullScreen && screenfull.enabled) {
        this.isFullScreen = true;
        screenfull.toggle(document.body);
        return;
      }
      if (this.isFullScreen) {
        this.isFullScreen = false;
        screenfull.exit();
      }
    }
  }
};
</script>

<template>
  <header class="satellite-dashboard__header">
    <div class="left" @click="fullScreen">
      <img v-if="!isFullScreen" src="@/assets/images/icon/fullscreen.png" alt="fullscreen" />
      <img v-else-if="isFullScreen" src="@/assets/images/icon/fullscreen-exit.png" alt="fullscreen-exit">
    </div>
    <div class="center">
      <h1>天算星座 · 太空算力的先行者与实践者</h1>
      <div class="underline"></div>
    </div>
    <div class="right">
      <p>{{time}}</p>
    </div>
  </header>
</template>

<style scoped lang="less">

.satellite-dashboard__header {
  display: flex;
  justify-content: center;
  background-image: url('~@/assets/images/background/title_background.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto;
  height: 84px;
  position: relative;
  .left {
    position: absolute;
    left: 0;
    margin: 12px 0 12px 24px;
    line-height: 32px;
    img {
      width: 24px;
      height: 24px;
      opacity: 0.5;
    }
  }
  .left:hover {
    cursor: pointer;
  }
  .center {
    position: relative;
    h1 {
      font-size: 40px;
      color: #FFFFFF;
      line-height: 80px;
    }
    .underline {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%); /* 居中 */
      width: 800px;
      height: 100px;
      background-image: url('~@/assets/images/background/light.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: auto;
    }
  }
  .right {
    position: absolute;
    right: 0;
    margin: 12px 24px 12px 0;
    font-size: 18px;
    line-height: 32px;
    color: #FFFFFF;
    opacity: 0.5;
  }
}

</style>
