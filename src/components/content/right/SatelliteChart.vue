<script>
import ChartBox from "@/components/content/ChartBox.vue";
export default {
  components: {
    ChartBox
  },
  data() {
    return {
      // satellites: [
      //   { id: 1, name: "天仪33卫星", temp: 22, speed: 7.5 },
      //   { id: 2, name: "丽泽一号", temp: 18, speed: 7.4 },
      //   { id: 3, name: "宝酝号", temp: 25, speed: 7.6 },
      //   { id: 4, name: "创星雷神号", temp: 25, speed: 7.4 },
      //   { id: 5, name: "元光号", temp: 25, speed: 7.4 },
      //   { id: 6, name: "北邮一号", temp: 25, speed: 7.4 },
      //   { id: 7, name: "北邮二号", temp: 25, speed: 7.4 },
      //   { id: 8, name: "北邮三号", temp: 25, speed: 7.4 },
      // ],
      satellites: [
        "天仪33卫星",
        "丽泽一号",
        "宝酝号",
        "创星雷神号",
        "元光号",
        "北邮一号",
        "北邮二号",
        "北邮三号"
      ],
      tableData: []
    };
  },
  methods: {
    shuffleData() {
      // 模拟数据变化：随机打乱顺序 + 更新数值
      this.tableData = this.tableData
          .map(sat => ({
            ...sat,
            temp: (50 + (Math.random() - 0.5) * 20).toFixed(2),
            duration: (Math.random() * 100).toFixed(2),
          }))
          .sort((a, b) => a.duration - b.duration)
          .slice(0, 5);
    }
  },
  mounted() {
    const now = new Date();
    let initData = []
    for (let i = 0; i < this.satellites.length; i++) {
      initData.push({
        id: i,
        name: this.satellites[i],
        temp: (50 + (Math.random() - 0.5) * 20).toFixed(2),
        duration: (Math.random() * 100).toFixed(2),
        time: new Date(now.getTime() - Math.random() * 1000 * 60 * 100).toLocaleString(),
        status: true
      })
    }
    this.tableData = initData.sort((a, b) => a.distance - b.distance).slice(0, 5);


    setInterval(() => {
      this.shuffleData()
    }, 2000)
  }
};

</script>

<template>
  <chart-box>
    <template #title><span class="ground-station-name">华东站</span>天线状态信息</template>
    <template #content>
      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <th>卫星</th>
            <th>总时长</th>
            <th>过境时间</th>
          </tr>
          </thead>
          <!-- 注意 Vue2 里要用 <transition-group tag="tbody"> -->
          <transition-group tag="tbody" name="list">
            <tr v-for="sat in tableData" :key="sat.id">
              <td>{{ sat.name }}</td>
              <td>{{ sat.duration }}</td>
              <td>{{ sat.time }}</td>
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