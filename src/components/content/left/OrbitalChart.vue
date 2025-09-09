<script>
import ChartBox from "@/components/content/ChartBox.vue";
import * as echarts from "echarts";

export default {
  components: {
    ChartBox,
  },
  data() {
    return {
      orbitalChart: null,
      orbitalOption: {
        // Legend customization
        legend: {
          orient: 'horizontal',
          bottom: '0%',
          left: 'center',
          textStyle: {
            color: '#AAAAAA',
            fontSize: 10,
          },
        },

        // Main pie chart configuration
        series: [
          {
            name: '轨道高度',
            type: 'pie',
            radius: ['45%', '65%'],
            data: [
              {
                value: 500,
                name: '500-800km',
                itemStyle: {
                  color: '#0763A1',
                }
              },
              {
                value: 300,
                name: '800-1200km',
                itemStyle: {
                  color: '#0777A1',
                }
              },
              {
                value: 200,
                name: '1200-2000km',
                itemStyle: {
                  color: '#078BA1',
                }
              }
            ],
          }
        ]
      }
    };
  },
  mounted() {
    // Get the DOM element using Vue's $refs
    const orbitalDom = this.$refs.orbital;

    // 2. Initialize ECharts instance
    this.orbitalChart = echarts.init(orbitalDom);
    this.orbitalChart.setOption(this.orbitalOption);

    // Add a resize listener
    window.addEventListener('resize', () => {
      this.orbitalChart.resize();
    });
  },
  beforeDestroy() {
    // Clean up the chart instance to prevent memory leaks
    if (this.orbitalChart) {
      this.orbitalChart.dispose();
    }
  }
};
</script>

<template>
  <chart-box>
    <template #title>星座轨道统计</template>
    <template #content>
      <div class="echarts" ref="orbital">
      </div>
    </template>
  </chart-box>
</template>

<style scoped lang="less">

</style>
