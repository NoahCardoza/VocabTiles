<template>
  <div
    v-resize-text="{
      maxFontSize: 200,
      minFontSize: 10,
      delay: 100,
    }"
    class="flex justify-center items-center w-100 h-100 tile--text"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'VtText',
  components: {},
  props: {
    text: {
      required: true,
      type: String,
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style scoped>
.tile--text {
  /* font-size: 3vw; */
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 10px inset;
}
</style>
