<script>
import ChartBox from "@/components/content/ChartBox.vue";
import * as echarts from 'echarts';

export default {
  components: {
    ChartBox
  },
  data() {
    return {
      cpuData: [],
      memData: [],
      timeList: [],
      lastDate: new Date(),
      intervalId: null, // Used to store the timer ID for cleanup
      utilizationChart: null,
    };
  },
  mounted() {
    // Initialize data
    for (let i = 0; i < 10; i++) {
      this.cpuData.push(this.simulateData(60, 20));
      this.memData.push(this.simulateData(50, 20));

      const t = new Date(this.lastDate.getTime() + (i - 9) * 3000);
      const h = String(t.getHours()).padStart(2, "0");
      const m = String(t.getMinutes()).padStart(2, "0");
      const s = String(t.getSeconds()).padStart(2, "0");
      this.timeList.push(`${h}:${m}:${s}`);
    }

    const utilizationOption = {
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          let result = params[0].name + '<br/>';
          params.forEach(param => {
            const seriesName = param.seriesIndex === 0 ? 'CPU' : 'Memory';
            result += `${seriesName}: ${param.value.toFixed(1)}%<br/>`;
          });
          return result;
        }
      },
      legend: {
        data: ['CPU', 'Memory'],
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
        axisLabel: {
          color: '#AAAAAA',
          formatter: '{value}%'
        },
        splitLine: {
          show: false
        },
      },
      series: [
        {
          name: 'CPU',
          data: this.cpuData,
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
          name: 'Memory',
          data: this.memData,
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
    const utilizationDom = this.$refs.utilization;

    // Initialize ECharts instance
    this.utilizationChart = echarts.init(utilizationDom);
    this.utilizationChart.setOption(utilizationOption);

    // Set up a timer to update data every 3 seconds
    this.intervalId = setInterval(() => {
      // Add new data points
      const newCpuValue = this.simulateData(60, 20);
      const newMemValue = this.simulateData(50, 20);
      const newTime = this.getNextTime();

      // Keep data length at 10, remove the oldest data
      if (this.cpuData.length >= 10) {
        this.cpuData.shift();
        this.memData.shift();
        this.timeList.shift();
      }

      // Add new data
      this.cpuData.push(newCpuValue);
      this.memData.push(newMemValue);
      this.timeList.push(newTime);

      // Update chart
      this.utilizationChart.setOption({
        xAxis: {
          data: this.timeList
        },
        series: [{
          data: this.cpuData
        }, {
          data: this.memData
        }]
      });
    }, 3000);

    // Add resize listener
    window.addEventListener('resize', () => {
      if (this.utilizationChart) {
        this.utilizationChart.resize();
      }
    });
  },
  beforeDestroy() {
    // Clear the timer before the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    // Dispose of the ECharts instance to prevent memory leaks
    if (this.utilizationChart) {
      this.utilizationChart.dispose();
    }
    // Remove the resize listener
    window.removeEventListener('resize', () => {
      if (this.utilizationChart) {
        this.utilizationChart.resize();
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
};
</script>

<template>
  <chart-box>
    <template #title>CPU/内存占用记录</template>
    <template #content>
      <div class="echarts" ref="utilization">
      </div>
    </template>
  </chart-box>
</template>

<style scoped lang="less">

</style>
