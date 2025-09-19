<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
      validator: function (value) {
        return value >= 0 && value <= 100;
      }
    },
    // 小时
    hours: {
      type: Number,
      default: 0,
      validator: function (value) {
        return value >= 0;
      }
    },
    // 分钟
    minutes: {
      type: Number,
      default: 0,
      validator: function (value) {
        return value >= 0 && value <= 59;
      }
    },
    // 秒
    seconds: {
      type: Number,
      default: 0,
      validator: function (value) {
        return value >= 0 && value <= 59;
      }
    },
  },
  computed: {
    formattedTime() {
      const parts = [];

      if (this.hours > 0) {
        parts.push(this.formatTime(this.hours));
      }

      parts.push(this.formatTime(this.minutes));
      parts.push(this.formatTime(this.seconds));

      return parts.join(':');
    }
  },
  methods: {
    formatTime(value) {
      return value.toString().padStart(2, '0');
    }
  },
}
</script>

<template>
  <div class="countdown-progress">
    <div class="countdown-progress__wrapper">
      <div class="countdown-progress__bar">
        <div class="countdown-progress__fill" :style="{ width: progress + '%' }"></div>
        <div class="countdown-progress__time">{{ formattedTime }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.countdown-progress {
  width: 100%;
}

.countdown-progress__wrapper {
  position: relative;
}

.countdown-progress__bar {
  width: 100%;
  height: 20px;
  background: rgba(0, 50, 100, 0.3);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0, 150, 255, 0.3);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.countdown-progress__fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, #00Afff, #008fff, #006fff);
  border-radius: 25px;
  transition: width 0.3s ease;
  box-shadow:
      0 0 20px rgba(0, 127, 255, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.countdown-progress__time {
  position: relative;
  z-index: 1;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  font-family: 'Courier New', monospace;
}

</style>