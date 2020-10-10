<template>
  <div class="flex justify-center items-center w-100 h-100 tile--image">
    <img :src="image" style="max-width: 100%" />
  </div>
</template>

<script>
export default {
  name: 'VtImage',
  props: {
    image: {
      required: true,
      type: String,
    },
  },
};
</script>

<style lang="css" scoped>
.tile--image {
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 10px inset;
}
</style>
