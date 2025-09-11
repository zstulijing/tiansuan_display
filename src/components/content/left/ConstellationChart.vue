<script>
import ChartBox from "@/components/content/ChartBox.vue";
import * as echarts from "echarts";

export default {
  components: {
    ChartBox,
  },
  data() {
    return {
      constellationChart: null,
      constellationOption: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['数量', '累计增长'],
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
          data: ['2021', '2022', '2023', '2024', '2025'],
          axisLabel: {
            color: '#AAAAAA'
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#AAAAAA'
            },
            splitLine: {
              show: false
            },
          },
          {
            type: 'value',
            position: 'right',
            axisLabel: {
              color: '#AAAAAA'
            },
            splitLine: {
              show: false
            },
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            data: [50, 80, 120, 200, 280],
            color: '#297EC8',
            barWidth: 30
          },
          {
            name: '累计增长',
            type: 'line',
            yAxisIndex: 1,
            data: [50, 130, 250, 450, 730],
            color: '#07ABA1',
            lineWidth: 2
          }
        ],
      },
    };
  },
  mounted() {
    // Get the DOM element using Vue's $refs
    const constellationDom = this.$refs.constellation;

    // Initialize ECharts instance
    this.constellationChart = echarts.init(constellationDom);
    this.constellationChart.setOption(this.constellationOption);

    // Add a resize listener
    window.addEventListener('resize', () => {
      if (this.constellationChart) {
        this.constellationChart.resize();
      }
    });
  },
  beforeDestroy() {
    // Clean up the chart instance to prevent memory leaks
    if (this.constellationChart) {
      this.constellationChart.dispose();
    }
  }
};
</script>
<template>
  <chart-box>
    <template #title>网络信息</template>
    <template #content>
<!--      <div class="echarts" ref="constellation">-->
<!--      </div>-->
    </template>
  </chart-box>
</template>

<style scoped lang="less">

</style>
