<script>
import ChartBox from "@/components/content/ChartBox.vue";
import itemStyle from "echarts/src/model/mixin/itemStyle";
import BreathLight from "@/components/content/BreathLight.vue";
export default {
  components: {
    BreathLight,
    ChartBox
  },
  data() {
    return {
      lastTaskNum: 800,
      satellites: [
        "TY33卫星",
        "丽泽一号",
        "宝酝号",
        "创星雷神号",
        "元光号",
        "北邮一号",
        "北邮二号",
        "北邮三号"
      ],
      groundStations: [
        "黑河站",
        "天算华东站",
        "长沙站",
        "天算华南站",
        "酒泉站",
        "库尔勒站",
        "达坂城站",
      ],
      allData: [],
      tableData: []
    };
  },
  methods: {
    shuffleData() {
      // 模拟数据变化：随机打乱顺序 + 更新数值
      for (let i = 0; i < this.allData.length; i++) {
        let countDown =  this.allData[i].countDown
        let duration =  this.allData[i].duration
        if (countDown < -duration) {
          this.lastTaskNum = this.lastTaskNum + Math.floor(Math.random() * 100)
          this.allData[i].groundStations = this.getRandomElement(this.groundStations)
          this.allData[i].countDown = Math.floor(10 * 60 + Math.random() * 20 * 60),
          this.allData[i].taskNumber = this.lastTaskNum
        } else {
          this.allData[i].countDown = countDown - 1
        }

      }
      this.tableData = this.allData.sort((a, b) => a.countDown - b.countDown).slice(0, 5)
    },
    getRandomElement(arr) {
      if (!arr.length) return undefined; // 空数组保护
      const index = Math.floor(Math.random() * arr.length);
      return arr[index];
    }
  },
  mounted() {

    for (let i = 0; i < this.satellites.length; i++) {
      this.lastTaskNum = this.lastTaskNum + Math.floor(Math.random() * 100)
      this.allData.push({
        id: i,
        name: this.satellites[i],
        groundStation: this.getRandomElement(this.groundStations),
        countDown: Math.floor(10 * 60 + Math.random() * 30 * 60),
        taskNumber: this.lastTaskNum,
        duration: Math.floor( 50 + Math.random() * 50)
      })
    }
    this.tableData = this.allData.sort((a, b) => a.countDown - b.countDown).slice(0, 5);

    setInterval(() => {
      this.shuffleData()
    }, 1000)
  }
};

</script>

<template>
  <chart-box>
    <template #title>
      <div class="table-title">过境信息</div>
    </template>
    <template #content>
      <div class="table-wrapper">
        <table>
          <thead>
          <tr class="table-header">
            <th>卫星</th>
            <th>下次过境</th>
            <th>过境倒计时</th>
<!--            <th>任务编号</th>-->
          </tr>
          </thead>
          <!-- 注意 Vue2 里要用 <transition-group tag="tbody"> -->
          <transition-group tag="tbody" name="list">
            <tr v-for="sat in tableData" :key="sat.id" class="table-body" :class="sat.countDown < 0 ? 'success' : 'warning'">
              <td>
                <div class="status">
                  <breath-light color="#007bff" v-if="sat.countDown < 0"/>
                  <breath-light color="#ffb67b" v-if="sat.countDown >= 0"/>
                  <span>{{ sat.name }}</span>
                </div>
              </td>
              <td>{{ sat.groundStation }}</td>
              <td>{{ sat.countDown < 0 ? '正在过境' : sat.countDown }}</td>
<!--              <td>{{ sat.taskNumber }}</td>-->
            </tr>
          </transition-group>
        </table>
      </div>
    </template>
  </chart-box>
</template>

<style scoped lang="less">
.ground-station-name {
  font-weight: bold;
}
.table-title {
  margin-bottom: 12px;
}
.table-wrapper {

  color: #ffffffAA;
  height: 100%;
  box-sizing: border-box;
  table {
    width: 100%;
    height: 100%;
    margin-bottom: 8px;
    border-collapse: collapse;
    box-sizing: border-box;
    tr {
      height: calc(100% / 6);
    }
    th, td {
      vertical-align: middle;
      padding: 8px 12px;
      text-align: center;
      border-bottom: 1px solid #2a3d5c;
      white-space: nowrap; // 防止文字换行
    }
    .table-header {
      border: 1px solid #2a3d5c;
    }
    .table-body:last-child td,
    .table-body:last-child th {
      border-bottom: none; // 最后一行不需要底部边框
    }
    .success {
      color: #297EC8AA;
    }

    .warning {
      color: #ffb67bAA;
    }

    .status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    th {
      border-bottom: 1px solid #2a3d5c;
    }

    /* Vue2 里的过渡 class 写法 */
    .list-move {
      transition: transform 0.5s;
    }
  }
}



</style>