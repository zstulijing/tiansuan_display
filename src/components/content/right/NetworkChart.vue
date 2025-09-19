<script>
import ChartBox from "@/components/content/ChartBox.vue";
import * as echarts from 'echarts';
export default {
  name: "NetworkChart",
  components: {
    ChartBox
  },
  data() {
    return {
      uploadData: [],
      downloadData: [],
      timeList: [],
      lastDate: new Date(),
      intervalId: null, // Used to store the timer ID for cleanup
      networkChart: null,
    };
  },
  mounted() {
    // Initialize data
    for (let i = 0; i < 10; i++) {
      this.uploadData.push(this.simulateData(60, 20));
      this.downloadData.push(this.simulateData(50, 20));

      const t = new Date(this.lastDate.getTime() + (i - 9) * 3000);
      const h = String(t.getHours()).padStart(2, "0");
      const m = String(t.getMinutes()).padStart(2, "0");
      const s = String(t.getSeconds()).padStart(2, "0");
      this.timeList.push(`${h}:${m}:${s}`);
    }

    const networkOption = {
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          let result = params[0].name + '<br/>';
          params.forEach(param => {
            const seriesName = param.seriesIndex === 0 ? '上行' : '下行';
            result += `${seriesName}: ${param.value.toFixed(1)}Mbps<br/>`;
          });
          return result;
        }
      },
      legend: {
        data: ['上行', '下行'],
        textStyle: {
          color: '#AAAAAA'
        },
        top: '5%'
      },
      grid: {
        top: '10%',
        bottom: '0%',
        left: '0%',
        right: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.timeList,
        axisLabel: {
          color: '#AAAAAA'
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        name: 'Mbps',
        nameTextStyle: {
          color: '#AAAAAA',
          align: 'right', // 文字和轴对齐
          padding: [0, 0, -20, 40] // 微调位置
        },
        axisLabel: {
          color: '#AAAAAA',
          // formatter: '{value}Mbps'
        },
        splitLine: {
          show: false
        },
      },
      series: [
        {
          name: '上行',
          data: this.uploadData,
          type: 'line',
          smooth: true,
          color: '#007bff',
          lineWidth: 2,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 123, 255, 0.3)' },
              { offset: 1, color: 'rgba(0, 123, 255, 0.1)' }
            ])
          }
        },
        {
          name: '下行',
          data: this.downloadData,
          type: 'line',
          smooth: true,
          color: '#52c41a',
          lineWidth: 2,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(82, 196, 26, 0.3)' },
              { offset: 1, color: 'rgba(82, 196, 26, 0.1)' }
            ])
          }
        }
      ]
    };

    // Get DOM element using $refs
    const networkDom = this.$refs.network;

    // Initialize ECharts instance
    this.networkChart = echarts.init(networkDom);
    this.networkChart.setOption(networkOption);

    // Set up a timer to update data every 3 seconds
    this.intervalId = setInterval(() => {
      // Add new data points
      const newCpuValue = this.simulateData(60, 20);
      const newMemValue = this.simulateData(50, 20);
      const newTime = this.getNextTime();

      // Keep data length at 10, remove the oldest data
      if (this.uploadData.length >= 10) {
        this.uploadData.shift();
        this.downloadData.shift();
        this.timeList.shift();
      }

      // Add new data
      this.uploadData.push(newCpuValue);
      this.downloadData.push(newMemValue);
      this.timeList.push(newTime);

      // Update chart
      this.networkChart.setOption({
        xAxis: {
          data: this.timeList
        },
        series: [{
          data: this.uploadData
        }, {
          data: this.downloadData
        }]
      });
    }, 3000);

    // Add resize listener
    window.addEventListener('resize', () => {
      if (this.networkChart) {
        this.networkChart.resize();
      }
    });
  },
  beforeDestroy() {
    // Clear the timer before the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    // Dispose of the ECharts instance to prevent memory leaks
    if (this.networkChart) {
      this.networkChart.dispose();
    }
    // Remove the resize listener
    window.removeEventListener('resize', () => {
      if (this.networkChart) {
        this.networkChart.resize();
      }
    });
  },
  methods: {
    // Generate new time labels
    getNextTime() {
      this.lastDate = new Date(this.lastDate.getTime() + 3000);
      const h = String(this.lastDate.getHours()).padStart(2, "0");
      const m = String(this.lastDate.getMinutes()).padStart(2, "0");
      const s = String(this.lastDate.getSeconds()).padStart(2, "0");
      return `${h}:${m}:${s}`;
    },
    // Simulate data generation
    simulateData(baseValue, variance = 10) {
      return baseValue + (Math.random() - 0.5) * variance;
    }
  }
}
</script>

<template>
  <chart-box>
    <template #title>实时流量</template>
    <template #content>
      <div class="echarts" ref="network">
      </div>
    </template>
  </chart-box>
</template>

<style scoped lang="less">

</style>