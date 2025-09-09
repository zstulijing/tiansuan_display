<script>

import ChartBox from "@/components/content/ChartBox.vue";
export default {
  name: 'RightContent',
  components: {
    ChartBox,
  }
}

</script>

<template>
  <div class="right-content">
    <div class="chart-part">
      <chart-box></chart-box>
    </div>
    <div class="chart-part">
      <chart-box></chart-box>
    </div>
    <div class="chart-part">
      <chart-box></chart-box>/
    </div>
  </div>
</template>

<style scoped lang="less">
.right-content{
  padding-right: 24px;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 20px;
  .chart-part {
    flex: 1;
    width: 100%;
  }
}
</style>
