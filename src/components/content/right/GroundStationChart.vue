<script>
import ChartBox from "@/components/content/ChartBox.vue";
export default {
  components: {
    ChartBox
  },
  data() {
    return {

      tableData: [
        {
          id: 0,
          name: "黑河站",
          position: "127.53, 50.22",
          altitude: 500,
          antenna: "Cross Yagi(UHF)",
          rate: 85,
          count: 18520
        },
        {
          id: 1,
          name: "天算华东站",
          position: "121.39, 37.52",
          altitude: 47.8,
          antenna: "Cross Yagi(UHF)",
          rate: 82,
          count: 9627
        },
        {
          id: 2,
          name: "长沙站",
          position: "112.59, 28.12",
          altitude: 58,
          antenna: "Cross Yagi(UHF)",
          rate: 79,
          count: 3486
        },
        {
          id: 3,
          name: "天算华南站",
          position: "109.45, 24.18",
          altitude: 150,
          antenna: "Cross Yagi(UHF)",
          rate: 76,
          count: 14237
        },
        {
          id: 4,
          name: "酒泉站",
          position: "98.5, 39.71",
          altitude: 1350,
          antenna: "Cross Yagi(UHF)",
          rate: 89,
          count: 7546
        },
        // {
        //   id: 5,
        //   name: "库尔勒站",
        //   position: "86.17, 41.72",
        //   altitude: 934,
        //   antenna: "Cross Yagi(UHF)",
        //   rate: 88,
        //   count: 15352
        // },
        // {
        //   id: 6,
        //   name: "达坂城站",
        //   position: "88.31, 43.36",
        //   altitude: 1128,
        //   antenna: "Cross Yagi(UHF)",
        //   rate: 86,
        //   count: 8520
        // },
      ]
    };
  },
  methods: {
    shuffleData() {
      // 模拟数据变化：随机打乱顺序 + 更新数值
      this.tableData = this.tableData
          .map(groundStation => ({
            ...groundStation,
            rate: (parseFloat(groundStation.rate) + Math.random() - 0.5).toFixed(2),
            count: groundStation.count + Math.floor(Math.random() * 5)
          }))
          .sort((a, b) => a.duration - b.duration)
          .slice(0, 5);
    }
  },
  mounted() {

    setInterval(() => {
      this.shuffleData()
    }, 2000)
  }
}
</script>

<template>
  <chart-box>
    <template #title>任务计划</template>
    <template #content>
<!--      <div class="table-wrapper">-->
<!--        <table>-->
<!--          <thead>-->
<!--          <tr>-->
<!--            <th>地面站</th>-->
<!--            <th>经纬度</th>-->
<!--            <th>成功率</th>-->
<!--            <th>观测次数</th>-->
<!--          </tr>-->
<!--          </thead>-->
<!--          &lt;!&ndash; 注意 Vue2 里要用 <transition-group tag="tbody"> &ndash;&gt;-->
<!--          <transition-group tag="tbody" name="list">-->
<!--            <tr v-for="sat in tableData" :key="sat.id">-->
<!--              <td>{{ sat.name }}</td>-->
<!--              <td>{{ sat.position }}</td>-->
<!--              <td>{{ sat.rate }}%</td>-->
<!--              <td>{{ sat.count }}</td>-->
<!--            </tr>-->
<!--          </transition-group>-->
<!--        </table>-->
<!--      </div>-->
    </template>
  </chart-box>
</template>

<style scoped lang="less">
.table-wrapper {
  margin-top: 20px;
  color: #ffffffAA;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px 12px;
  text-align: center;
  border-bottom: 1px solid #2a3d5c;

}
th {
  border-bottom: 1px solid #2a3d5c;
}

/* Vue2 里的过渡 class 写法 */
.list-move {
  transition: transform 0.5s;
}
</style>