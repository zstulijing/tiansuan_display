<script>

import ChartBox from "@/components/content/ChartBox.vue";
import CountDown from "@/components/content/CountDown.vue";

export default {
  name: 'TaskChart',
  components: {CountDown, ChartBox},
  data() {
    const now = new Date();
    return {
      preSecondInterval: null,
      satellite: {
        name: '北邮二号',
        timeLocal: now.toString(),
        timeUTC: now.toUTCString(),
        latitude: "0",
        longitude: "0",
        altitude: "0",
      },
      satelliteList: [
        "天仪33卫星",
        "丽泽一号",
        "宝酝号",
        "创星雷神号",
        "元光号",
        "北邮一号",
        "北邮二号",
        "北邮三号",
        "天算9号",
        "天算10号",
        "天算11号",
        "天算12号",
        "天算13号",
        "天算14号",
        "天算15号",
        "天算16号",
        "天算17号",
        "天算18号",
        "天算19号",
        "天算20号",
        "天算21号",
        "天算22号",
        "天算23号",
        "天算24号",
        "天算25号",
        "天算26号",
        "天算27号",
        "天算28号",
        "天算29号"
      ]
    }
  },
  methods: {
    showSate(){
      // this.$refs.world.chooseSate(this.satellite.name)
      this.$emit('changeSate', this.satellite.name)
    },
    updateData(data) {
      console.log("****", data)
      this.satellite = data;
    }
  },
  mounted() {
    this.preSecondInterval = setInterval(() => {

    })
  },
  destroyed() {
    clearInterval(this.preSecondInterval);
  }
}

</script>

<template>
  <chart-box>
    <template #title>卫星状态</template>
    <template #content>
      <div class="task-current__content">
        <div class="task-current__content__row">

          <div class="task-current__content__col flex x2">
            卫星名称:
            <select
              v-model="satellite.name"
              id="satellite__select"
              @change="showSate"
            >
              <option v-for="(item, index) in satelliteList" :key="index">{{item}}</option>
            </select>
          </div>
          <div class="task-current__content__col">纬度: {{parseFloat(satellite.latitude).toFixed(3)}}°</div>
          <div class="task-current__content__col">经度: {{parseFloat(satellite.longitude).toFixed(3)}}°</div>
        </div>
        <div class="task-current__content__row">
          <div class="task-current__content__col x3">UTC时间: {{satellite.timeUTC}}</div>
          <div class="task-current__content__col">高度: {{satellite.altitude}}km</div>
        </div>

        <div class="task-current__content__row">
          <div class="task-current__content__col">当地时间: {{satellite.timeLocal}}</div>
        </div>
      </div>
    </template>

  </chart-box>


</template>

<style scoped lang="less">
.task-current__content {
  //border: 1px solid #2a3d5c;
  box-sizing: border-box;
  //padding: 0 8px;
  margin-top: 8px;
  font-size: 16px;
  #satellite__select {
    margin-left: 4px;
    //appearance: none;
    //-webkit-appearance: none; /* Safari / Chrome */
    //-moz-appearance: none;    /* Firefox */
    background: none;
    border: none;
    outline: none;
    color: #ffffffAA;
    font-size: 16px;
    text-decoration: underline;
  }

  .task-current__content__row {
    display: flex;
    height: 40px;
    .task-current__content__col {
      color: #ffffffAA;
      flex: 1;
      line-height: 40px;
    }
    .flex {
      display: flex;
    }
    .x2 {
      flex: 2 !important;
    }
    .x3 {
      flex: 3 !important;
    }

  }
}
</style>