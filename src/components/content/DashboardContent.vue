<script>

import LeftContent from "@/components/content/left/LeftContent.vue";
import CenterContent from "@/components/content/center/CenterContent.vue";
import RightContent from "@/components/content/right/RightContent.vue";

export default {
  name: 'DashboardContent',
  components: {
    LeftContent,
    CenterContent,
    RightContent,
  },
  methods: {
    changeSate(satelliteName) {
      this.$refs.centerContent.changeSate(satelliteName)
    },
    getData(data) {
      this.$refs.leftContent.updateData(data);
    }

  }
}
</script>

<template>
  <div class="dashboard-content">
    <div class="left">
      <left-content ref="leftContent" @changeSate="changeSate"/>
    </div>
    <div class="center">
      <center-content ref="centerContent" @data="getData"/>
    </div>
    <div class="right">
      <right-content/>
    </div>
  </div>
</template>

<style scoped lang="less">
  .dashboard-content {
    padding: 24px 0;
    display: flex;
    gap: 24px;
    height: 100%;
    box-sizing: border-box;
    .left, .right {
      flex: 2;
    }
    .center {
      flex: 3;
    }
    .left, .center, .right {
      height: 100%;
      min-height: 0;
      min-width: 0;
      overflow: hidden;
    }
  }
</style>
