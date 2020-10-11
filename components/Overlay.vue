<template>
  <div class="vt-overlay">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Overlay',
  components: {},
  props: {},
  data() {
    return {};
  },
  mounted() {
    if (process.browser) {
      window.vm = this;
    }
  },
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="css" scoped>
.vt-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 80%);
  z-index: 1000;
}
</style>
