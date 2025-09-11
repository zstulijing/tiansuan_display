<script>
import ChartBox from "@/components/content/ChartBox.vue";
import BreathLight from "@/components/content/BreathLight.vue";
export default {
  components: {
    BreathLight,
    ChartBox
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    addNewData() {
      const now = new Date().getTime();
      this.tableData.splice(0, 1)
      this.tableData.push({
        id: now + Math.random(),
        time: new Date().toLocaleTimeString(),
        content: 'Parent of RectTransform is being...',
        status: Math.random() > 0.5 ? 'success' : 'warning',
      });

      // 平滑滚动到底部
      this.$nextTick(() => {
        const tableWrapper = this.$refs.tableWrapper;
        if (tableWrapper) {
          tableWrapper.scrollTo({
            top: tableWrapper.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    }
  },
  mounted() {
    // 初始化一些数据
    const now = new Date().getTime();
    for (let i = 4; i >= 1; i--) {
      let time = new Date(now - Math.random() * 1000 * 60 * i);
      this.tableData.push({
        id: time.getTime() + Math.random(),
        time: time.toLocaleTimeString(),
        content: `Parent of RectTransform is being... [${i}]`,
        status: Math.random() > 0.5 ? 'success' : 'warning',
      });
    }

    // 初始滚动到底部
    this.$nextTick(() => {
      const tableWrapper = this.$refs.tableWrapper;
      if (tableWrapper) {
        tableWrapper.scrollTop = tableWrapper.scrollHeight;
      }
    });

    // 定时添加新数据
    setInterval(() => {
      this.addNewData();
    }, 2000);
  }
};
</script>

<template>
  <chart-box>
    <template #title>
      下发日志
    </template>
    <template #content>
      <div class="table-wrapper" ref="tableWrapper">
        <table>
          <tbody>
          <tr class="table-body" v-for="item in tableData" :key="item.id">
            <th>{{ item.time }}</th>
            <td :class="item.status === 'success' ? 'success' : 'warning'">{{ item.content }}</td>
            <td>
              <div class="status">
                <breath-light color="#007bff" v-if="item.status === 'success'"/>
                <breath-light color="#ffb67b" v-if="item.status === 'warning'"/>
                <span :class="item.status === 'success' ? 'success' : 'warning'">{{ item.status }}</span>
              </div>
            </td>
          </tr>
          </tbody>
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
    height: 100%;
    border-collapse: collapse;
    box-sizing: border-box;

    tr {
      height: calc(100% / 4); // 确保4行平分高度

      // 新添加的行有一个淡入效果
      &:last-child {
        animation: fadeIn 0.5s ease-in;
      }
    }

    .table-body:last-child td,
    .table-body:last-child th {
      border-bottom: none; // 最后一行不需要底部边框
    }

    th, td {
      vertical-align: middle;
      padding: 8px 12px;
      text-align: center;
      border-bottom: 1px solid #2a3d5c;
      white-space: nowrap; // 防止文字换行
    }

    th {
      font-weight: bold;
      min-width: 80px;
    }

    .success {
      color: #297EC8CC;
    }

    .warning {
      color: #ffb67bCC;
    }

    .status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  }
}

// 新行淡入动画
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 悬停效果
.table-body {
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
}
</style>