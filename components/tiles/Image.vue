<template>
  <div class="flex justify-center items-center w-100 h-100">
    <img :src="image" style="max-width: 100%" />
  </div>
</template>

<script>
export default {
  name: 'VtImage',
  components: {},
  props: {
    image: {
      required: true,
      type: String,
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>
