<template>
  <div
    class="w-100 h-100"
    :style="{
      'background-color': color,
    }"
  ></div>
</template>

<script>
export default {
  name: 'Color',
  components: {},
  props: {
    color: {
      required: true,
      type: String,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>
