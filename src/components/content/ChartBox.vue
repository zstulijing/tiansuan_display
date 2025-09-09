<script>

</script>

<template>
  <div class="chart-box">
    <div class="chart-box__title">
      <slot name="title">默认标题</slot>
    </div>
    <div class="chart-box__content">
      <slot name="content"></slot>
    </div>
    <div class="chart-box__footer"></div>
  </div>
</template>

<style scoped>
.chart-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(25,186,139,.17);
  padding: 12px;
  background: rgba(255,255,255,.04) url('~@/assets/images/background/line.png');
  background-size: 100% auto;
  position: relative;
  z-index: 10;

}
.chart-box .chart-box__title {
  text-align: center;
  color: #FFFFFF;
  font-size: 18px;
}
.chart-box .chart-box__content {
  flex: 1;
}

.chart-box:before, .chart-box:after {
  position: absolute;
  width: 12px;
  height: 12px;
  content: "";
  border-top: 2px solid #02a6b5;
  top: 0;
}
.chart-box__footer:before, .chart-box__footer:after {
  position: absolute;
  width: 12px;
  height: 12px;
  content: "";
  border-bottom: 2px solid #02a6b5;
  bottom: 0;
}
.chart-box:before,.chart-box__footer:before {
  border-left: 2px solid #02a6b5;
  left: 0;
}
.chart-box:after,.chart-box__footer:after {
  border-right: 2px solid #02a6b5;
  right: 0;
}

</style>
