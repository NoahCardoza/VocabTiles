<template>
  <div class="tile--image">
    <div
      class="tile--image-inner"
      :style="{
        '--image-url': `url('${image}')`,
      }"
    ></div>
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
  background: white;
  padding: 0.5vw;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 10px inset;
}

.tile--image-inner {
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-image: var(--image-url);
  background-repeat: no-repeat, repeat;
  background-position: center;
  background-size: contain;
}
</style>
