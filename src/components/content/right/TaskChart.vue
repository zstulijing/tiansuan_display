<script>
  import ChartBox from "@/components/content/ChartBox.vue";
  import CountDown from "@/components/content/CountDown.vue";
  const target = [ "电源", "姿轨控", "热控", "通信", "载荷" ]
  export default {
    name: 'TaskChart',
    components: {CountDown, ChartBox},
    data() {
      return {
        lastTaskNum: 800,
        tableData: [],
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
        current: {
          type: '遥测',
          entrance: new Date().toLocaleTimeString(),
          azimuth: 51,
          target: this.getRandomElement(target),
          departure: new Date(new Date().getTime() + Math.floor(Math.random() * 1000 * 60 * 20)).toLocaleTimeString(),
          elevation: 67
        },

      }
    },
    methods: {
      getRandomElement(arr) {
        if (!arr.length) return undefined; // 空数组保护
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
      },
      getCountDownData(startTime, endTime) {

        const currentTime = new Date().getTime()
        const duration = endTime - startTime
        const passed = currentTime - startTime

        // 1. 剩余进度
        let progress = (passed / duration) * 100
        if (progress < 0) progress = 0
        if (progress > 100) progress = 100

        // 2. 剩余时分秒
        let diff = endTime - currentTime
        if (diff < 0) diff = 0
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)

        return {
          progress,
          hours,
          minutes,
          seconds,
        }
      },
      shuffleData() {
        const first = this.tableData[0]
        const last = this.tableData[this.tableData.length - 1]
        const now = new Date().getTime()


        this.tableData = this.tableData.map(item => {
          const {progress, hours, minutes, seconds} = this.getCountDownData(item.startTime, item.endTime)
          return {
            ...item,
            progress,
            hours,
            minutes,
            seconds
          }
        })

        if (first.endTime < now) {
          // 删除首个，新增一个
          this.current = {
            type: first.type,
            entrance: new Date(first.endTime).toLocaleTimeString(),
            azimuth: Math.floor(50 + (Math.random() - 0.5) * 40),
            target: first.type === "遥测" ? this.getRandomElement(target) : '-',
            departure: new Date(first.endTime + Math.floor(Math.random() * 1000 * 60 * 20)).toLocaleTimeString(),
            elevation: Math.floor(70 + (Math.random() - 0.5) * 20)
          }
          this.lastTaskNum = this.lastTaskNum + Math.floor(Math.random() * 100)
          this.tableData.splice(0, 1)

          const endTime = last.endTime + Math.floor(Math.random() * 1000 * 60 * 100)
          const startTime = last.endTime - Math.floor(Math.random() * 1000 * 30 * 100)

          const {progress, hours, minutes, seconds} = this.getCountDownData(startTime, endTime)

          this.tableData.push({
            id: last.id + 1,
            num: this.lastTaskNum,
            type: Math.random() > 0.5 ? "遥测" : "数传" ,
            satellite: this.getRandomElement(this.satellites),
            startTime,
            endTime,
            progress,
            hours,
            minutes,
            seconds
          })
        }
      }

    },
    mounted() {
      const now = new Date().getTime();
      for (let i = 0; i < 4; i++) {
        this.lastTaskNum = this.lastTaskNum + Math.floor(Math.random() * 100)
        const endTime = now + Math.floor(Math.random() * 1000 * 60 * 100) // 未来时间
        const startTime = now - Math.floor(Math.random() * 1000 * 30 * 100)

        const {progress, hours, minutes, seconds} = this.getCountDownData(startTime, endTime)

        this.tableData.push({
          id: i,
          num: this.lastTaskNum,
          type: Math.random() > 0.5 ? "遥测" : "数传" ,
          satellite: this.getRandomElement(this.satellites),
          startTime,
          endTime,
          progress,
          hours,
          minutes,
          seconds
        })
      }
      // 排序
      this.tableData.sort((a, b) => a.endTime - b.endTime);


      setInterval(() => {
        this.shuffleData()
      }, 1000)

    }
  }
</script>

<template>
  <chart-box>
    <template #title>任务计划</template>
    <template #content>
      <div class="task">
        <div class="task-current">
          <div class="task-current__title">
            <p>当前任务: </p>
          </div>
          <div class="task-current__content">
            <div class="task-current__content__row">
              <div class="task-current__content__col">任务类型: {{current.type}}</div>
              <div class="task-current__content__col">进站时间: {{current.entrance}}</div>
              <div class="task-current__content__col">进站方位角: {{current.azimuth}}°</div>
            </div>
            <div class="task-current__content__row">
              <div class="task-current__content__col">目标名称: {{current.target}}</div>
              <div class="task-current__content__col">出站时间: {{current.departure}}</div>
              <div class="task-current__content__col">最高仰角: {{current.elevation}}°</div>
            </div>
          </div>
        </div>
        <div class="task-list">
          <div class="task-list__title">
            <p>任务列表: </p>
          </div>
          <div class="task-list__table">
            <table>
              <thead>
              <tr class="task-list__table__header">
                <th>序号</th>
                <th>任务类型</th>
                <th>卫星名称</th>
                <th class="count-down">倒计时</th>
              </tr>
              </thead>
              <!-- 注意 Vue2 里要用 <transition-group tag="tbody"> -->
              <transition-group tag="tbody" name="list">
                <tr class="table-body" v-for="task in tableData" :key="task.id">
                  <td>{{ task.num }}</td>
                  <td>{{ task.type }}</td>
                  <td>{{ task.satellite }}</td>
                  <td>
                    <count-down
                        :progress="task.progress"
                        :hours="task.hours"
                        :minutes="task.minutes"
                        :seconds="task.seconds"/>
                  </td>
                </tr>
              </transition-group>
            </table>
          </div>

        </div>
      </div>

    </template>
  </chart-box>
</template>

<style scoped lang="less">
.task {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.task-current {
  margin-top: 12px;
  .task-current__title {
    color: #ffffff;
  }
  .task-current__content {
    //border: 1px solid #2a3d5c;
    box-sizing: border-box;
    //padding: 0 8px;
    margin-top: 8px;
    .task-current__content__row {
      display: flex;
      height: 40px;
      gap: 20px;
      .task-current__content__col {
        color: #ffffffAA;
        flex: 1;
        line-height: 40px;
      }
    }
  }

}
.task-list {
  flex: 1;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  .task-list__title {
    p {
      color: #ffffff;
    }
  }
  .task-list__table {
    flex: 1;
    margin-top: 12px;
    .task-list__table__header {
      border: 1px solid #2a3d5c;
    }
    color: #ffffffAA;
    table {
      height: 100%;
      width: 100%;
      border-collapse: collapse;
      box-sizing: border-box;
    }
    tr {
      height: calc(100% / 4);
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
      border-bottom: 1px solid #2a3d5c;
    }
    .count-down {
      width: 160px;
    }
    /* Vue2 里的过渡 class 写法 */
    .list-move {
      transition: transform 0.5s;
    }
  }
}





</style>