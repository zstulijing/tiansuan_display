<script>
import World from "@/components/content/center/World.vue";

export default {
  components: {
    World,
  },
  data() {

    const now = new Date();
    return {
      dataSize: "120.1781",
      runTime: this.getMin(),
      now: now,
      settings: {
        sate_id: "北邮一号",
        auto_rotate: true,
        tail: true,
        show_orbit: false,
        show_coverage: false,
        time_before: new Date(
          2025,
          4,
          28,
          now.getHours() - 1,
          now.getMinutes(),
          now.getSeconds(),
          now.getMilliseconds()
        ),
        time_after: new Date(
          2025,
          4,
          28,
          now.getHours() + 1,
          now.getMinutes(),
          now.getSeconds(),
          now.getMilliseconds()
        ),
        cover_angle: 25,
      },
      timer1: null,
      timer2: null,
      showBigData: false,
      data: null, // If `this.data` is used in the template, it must be declared here
    };
  },
  mounted() {
    this.timer1 = setInterval(() => {
      // Update data transfer size
      this.dataSize = (parseFloat(this.dataSize) + Math.random() * 0.1).toFixed(4);
    }, 1000 * 2);

    this.timer2 = setInterval(() => {
      this.runTime = this.getMin();
    }, 1000 * 60 * 5);
  },
  beforeDestroy() {
    if (this.timer1) {
      clearInterval(this.timer1);
    }
    if (this.timer2) {
      clearInterval(this.timer2);
    }
  },
  methods: {
    getMin() {
      // Note: Months are 0-indexed in JavaScript, so 5 represents June.
      const startDate = new Date(2023, 5, 1);
      const now = new Date();
      const diffInMilliseconds = now - startDate;
      const millisecondsInMinute = 1000 * 60 * 60;
      return (diffInMilliseconds / millisecondsInMinute).toFixed(2);
    },
    getData(data) {
      this.data = data;
    },
    zoomTo(data) {
      this.$refs.world.zoomSpace(data.coord[0], data.coord[1]);
      if (data.name === "北京大数据分析") {
        this.timer2 = setTimeout(() => {
          this.showBigData = true;
        }, 300);
      } else if (data.name === "天算华东站") {
        this.timer2 = setTimeout(() => {
          this.$router.push({ name: 'monitor' });
        }, 300);
      }
    },
  },
};
</script>

<template>
  <div class="center-content">
    <div class="statistics-box">
      <div class="statistics">
        <div class="left">
          <div class="title">
            <p>在轨运行时间(Hour)</p>
          </div>
          <div class="data">
            <p>{{runTime}}</p>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <p>数据传输总量(GB)</p>
          </div>
          <div class="data">
            <p>{{dataSize}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="world">
<!--      <world-->
<!--        ref="world"-->
<!--        style="width: 100%;height:100%;"-->
<!--        :settings="settings"-->
<!--        @data="getData"-->
<!--        @zoom-event="zoomTo"-->
<!--      />-->
    </div>
  </div>
</template>

<style scoped lang="less">
  .center-content{
    height: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
    .statistics-box {
      flex: 1;
      background: rgba(101, 132, 226, .1);
      .statistics {
        height: 100%;
        display: flex;
        box-sizing: border-box;
        padding: 20px;

        .left, .right {
          height: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .left .data {
          border: 1px solid rgba(25,186,139,.17);
          border-right: none;
          position: relative;
          p {
            border-right: 1px solid #888888AA;
          }
        }
        .left .data:after {
          position: absolute;
          width: 20px;
          height: 12px;
          content: "";
          border-top: 2px solid #02a6b5;
          border-left: 2px solid #02a6b5;
          top: 0;
          left: 0;
        }

        .right .data {
          border: 1px solid rgba(25,186,139,.17);
          border-left: none;
          position: relative;
        }
        .right .data:before {
          position: absolute;
          width: 20px;
          height: 12px;
          content: "";
          border-bottom: 2px solid #02a6b5;
          border-right: 2px solid #02a6b5;
          bottom: 0;
          right: 0;
        }

        .title {
          p {
            font-size: 20px;
            color: #AAAAAA;
            line-height: 32px;
          }
        }
        .data {
          p {
            font-family: 'ds-digit';
            font-size: 80px;
            color: #FFEB7B;
          }
        }

      }

    }
    .world {
      flex: 4;
      height: 100%;
      box-sizing: border-box;
    }
  }
</style>
