<template>
  <div
    class="flex items-center justify-center vt-timer"
    :class="{
      'vt-timer--success': success,
      'vt-timer--warning': warning,
      'vt-timer--danger': danger,
    }"
  >
    <div>{{ value }}s</div>
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  components: {},
  props: {
    value: {
      required: true,
      type: Number,
    },
    total: {
      required: true,
      type: Number,
    },
    pause: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      time: this.value,
      success: true,
      warning: false,
      danger: false,
    };
  },
  watch: {
    pause(v) {
      if (v) {
        this.clearTimer();
      } else {
        this.initTimer();
      }
    },
    value(v) {
      const percentage = v / this.total;
      if (percentage <= 0.333333333333336) {
        this.success = false;
        this.warning = false;
        this.danger = true;
      } else if (percentage <= 0.6666666666666666) {
        this.success = false;
        this.warning = true;
        this.danger = false;
      } else {
        this.success = true;
        this.warning = false;
        this.danger = false;
      }
    },
  },
  mounted() {
    if (!this.pause) {
      this.initTimer();
    }
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    initTimer() {
      let sendTimeout = true;

      this.interval = setInterval(() => {
        if (this.value === 0) {
          if (sendTimeout) {
            this.$emit('timeout');
            sendTimeout = false;
          }
        } else {
          this.$emit('input', this.value - 1);
          sendTimeout = true;
        }
      }, 1000);
    },
    clearTimer() {
      clearInterval(this.interval);
      this.interval = null;
    },
  },
};
</script>

<style lang="css" scoped>
.vt-timer--success {
  background-color: rgb(117 255 71 / 42%);
}

.vt-timer--warning {
  background-color: rgb(255 198 71 / 42%);
}

.vt-timer--danger {
  background-color: rgb(255 71 71 / 42%);
}

.vt-timer {
  border-radius: 100%;
  box-shadow: inset 0px 0px 5px #13131361;
  height: 64px;
  width: 64px;
}
</style>
