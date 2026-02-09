<script>
import Report from "@/pages/agent/report.vue";
import Assistant from "@/pages/agent/assistant.vue";
export default {
  name: "Agent",
  components: {
    Report, Assistant
  }
}
</script>

<template>
  <div class="agent">
    <div class="report-box">
      <report/>
    </div>
    <div class="assistant-box">
      <assistant/>
    </div>

  </div>
</template>

<style scoped lang="less">
  .agent {
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    min-height: calc(100vh - 64px);
    display: flex;
    .report-box {
      flex: 1;

    }
    .assistant-box {
      width: 480px;
      background-color: #ffffff;
      box-shadow: -4px 0 8px -4px rgba(0, 0, 0, 0.15);
      border-left: 1px solid rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
    }
  }

</style>