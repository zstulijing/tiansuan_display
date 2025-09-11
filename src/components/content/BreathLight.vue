<template>
  <div class="breath-light" :style="lightStyle"></div>
</template>

<script>
export default {
  name: "BreathLight",
  props: {
    color: {
      type: String,
      default: "#007bff" // 默认绿色
    },
    size: {
      type: Number,
      default: 10 // 默认直径 10px
    },
    speed: {
      type: String,
      default: "3s" // 呼吸周期，默认 2s
    }
  },
  computed: {
    lightStyle() {
      return {
        background: this.color,
        width: this.size + "px",
        height: this.size + "px",
        animationDuration: this.speed,
        boxShadow: `0 0 10px ${this.color}`
      };
    }
  }
};
</script>

<style scoped>
.breath-light {
  border-radius: 50%;
  animation-name: breathe;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  margin-right: 8px;
}

@keyframes breathe {
  0% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.3;
    transform: scale(0.95);
  }
}
</style>