<template>
  <div
    v-resize-text="{
      maxFontSize: 200,
      minFontSize: 5,
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
  props: {
    text: {
      required: true,
      type: String,
    },
  },
};
</script>

<style scoped>
.tile--text {
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 10px inset;
}
</style>
