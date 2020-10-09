<template>
  <div
    class="w-100 h-100"
    :style="{
      'background-color': hex,
    }"
  ></div>
</template>

<script>
export default {
  name: 'Color',
  components: {},
  props: {
    hex: {
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
