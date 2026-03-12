<script >
import ChartBox from "@/components/content/ChartBox.vue";
import axios from "axios";
export default {
  name: "VideoChart",
  components: {
    ChartBox,
  },
  data() {
    return {
      heartbeatTimer: 0,
      reconnectCount: 0,
      player: null,
      intervalNum: 0,
      groundStationTime: new Date().toLocaleString()
    }
  },
  methods: {
    handleResize() {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => {

      }, 1000);
    },
    getAccessToken(){

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://open.ys7.com/api/lapp/token/get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          appKey: '1ae1753d81634e99bb0555424b665e17',
          appSecret: '93ea2fb9b362d9619750776a879b9876'
        }
        // data: {
        //   appKey: '9da629e7cff843b598c913e6d6da34e1',
        //   appSecret: 'e4f780fb0ad656c97a85de16c5d91299'
        // }
      };

      axios(config)
          .then((response) => {
            this.accessToken = response.data.data.accessToken;
            this.getUrl()
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getUrl() {
      axios({
        method: 'POST',
        url: 'https://open.ys7.com/api/lapp/v2/live/address/get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          accessToken: this.accessToken,
          deviceSerial: 'BA3307138'
          // deviceSerial: 'K69691233'
        }
      }).then((response) => {
        this.url = response.data.data.url;
      }).catch((error) => {
        this.url = 'ezopen://open.ys7.com/BA3307138/1.live'
        console.error(error);
      }).finally(() => {
        this.createVideo();
      });
    },
    createVideo(){
      const myDiv = document.getElementById('video-chart__video');
      const width = myDiv.offsetWidth;
      const height = myDiv.offsetHeight;

      this.player = new EZUIKit.EZUIKitPlayer({
        id: 'video-container', // 视频容器ID
        accessToken: this.accessToken,
        url: this.url,
        width: width,
        height: height,
        audio: false,
        handleError: (err) => {
          if (err.type === "handleRunTimeInfoError" && err.data.nErrorCode === 5) {
            // 加密设备密码错误
          }
        }
      })
    },


  },
  mounted() {
    this.getAccessToken();
    // window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() { // Vue2 写法
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>

<template>
  <chart-box>
    <template #title>
      <div class="video-chart__title">
        华东站 实时监控
      </div>
    </template>
    <template #content>
      <div id="video-chart__video">
        <div ref="video-container" id="video-container"></div>

      </div>

    </template>
  </chart-box>
</template>

<style scoped lang="less">
.video-chart__title {
  margin-bottom: 12px;
}
#video-chart__video {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  #video-container {
    width: 100%;
    height: 100%;
  }
}

</style>