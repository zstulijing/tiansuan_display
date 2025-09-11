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
          head: '方位轴',
          commandAngle: '134.000',
          currentAngle: '264.970',
          error: '-130.970',
          speed: '-'
        },
        {
          id: 1,
          head: '俯仰轴',
          commandAngle: '090.000',
          currentAngle: '089.950',
          error: '000.050',
          speed: '-'
        },
        // {
        //   id: 2,
        //   head: 'X 轴',
        //   commandAngle: '000.000',
        //   currentAngle: '000.038',
        //   error: '-000.038',
        //   speed: '000.009'
        // },
        // {
        //   id: 3,
        //   head: 'Y 轴',
        //   commandAngle: '000.000',
        //   currentAngle: '-000.033',
        //   error: '000.033',
        //   speed: '-000.002'
        // },
      ]
    };
  },
  methods: {
    formatValue(value) {
      const num = Number(value);
      if (isNaN(num)) return value; // 非数值，原样返回

      const sign = num < 0 ? '-' : '';
      // 用绝对值并在此处固定 3 位小数，然后再拆分整数/小数部分
      const absStr = Math.abs(num).toFixed(3); // e.g. "2.463"
      const [intPart, decPart] = absStr.split('.');
      const paddedInt = intPart.padStart(3, '0'); // "002"
      return `${sign}${paddedInt}.${decPart}`;    // "-002.463" 或 "003.200"
    },
    shuffleData() {
      this.tableData = this.tableData.map(item => {
        return {
          ...item,
          commandAngle: this.formatValue((Math.random() * 360 - 180).toFixed(3)),
          currentAngle: this.formatValue((Math.random() * 360 - 180).toFixed(3)),
          error: this.formatValue((Math.random() * 10 - 5).toFixed(3)),
          speed: this.formatValue((Math.random() * 5 - 2.5).toFixed(3))
        }
      });
    }
  },
  mounted() {
    setInterval(() => {
      this.shuffleData()
    }, 2000)
  }
};

</script>

<template>
  <chart-box>
    <template #title> <span class="ground-station-name">华东站</span> 天线状态信息</template>
    <template #content>
      <div class="table-wrapper">
        <table>
          <thead>
          <tr class="table-header">
            <th></th>
            <th>命令角</th>
            <th>当前角</th>
            <th>误差</th>
            <th>速度</th>
          </tr>
          </thead>
          <!-- 注意 Vue2 里要用 <transition-group tag="tbody"> -->
          <transition-group tag="tbody" name="list">
            <tr class="table-body" v-for="item in tableData" :key="item.id">
              <th>{{ item.head }}</th>
              <td>{{ item.commandAngle }}</td>
              <td>{{ item.currentAngle }}</td>
              <td>{{ item.error }}</td>
              <td>{{ item.speed }}</td>
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
  color: #ffffffAA;
  height: 100%;
  box-sizing: border-box;
  padding-top: 16px;
  table {
    width: 100%;
    height: 100%;           /* 让 table 撑满容器 */
    border-collapse: collapse;
    box-sizing: border-box;
    .table-header {
      border: 1px solid #2a3d5c;
    }
    tr {
      height: calc(100% / 3);
    }
    .table-body:last-child td,
    .table-body:last-child th {
      border-bottom: none;
    }
    th, td {
      vertical-align: middle;
      padding: 8px 12px;
      text-align: center;
      border-bottom: 1px solid #2a3d5c;
    }
    th {
      font-weight: bold;
    }
  }
}


/* Vue2 里的过渡 class 写法 */
.list-move {
  transition: transform 0.5s;
}
</style>