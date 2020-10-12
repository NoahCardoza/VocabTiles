<template>
  <div
    class="tile-box"
    :disabled="disabled || !tile"
    @click="$emit('click', { el: $el, ...tile })"
  >
    <component :is="`vt-${tile.type}`" v-if="!disabled && tile" v-bind="tile" />
  </div>
</template>

<script>
export default {
  name: 'Tile',
  components: {
    'vt-color': () => import('@/components/tiles/Color'),
    'vt-text': () => import('@/components/tiles/Text'),
    'vt-image': () => import('@/components/tiles/Image'),
  },
  props: {
    tile: {
      default: null,
      type: Object,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.tile, this.disabled);
  },
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="css" scoped>
.tile-box {
  display: flex;
  align-items: stretch;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;
  margin: 0.5vw;
  border-radius: 10%;
  box-shadow: 2px 2px 2px 0px rgba(169, 169, 169, 0.74118);
  overflow: hidden;
  text-align: center;
}

.tile-box::after {
  content: '';
  display: block;
  padding-bottom: 100%;
}

.tile-box[disabled],
[disabled] .tile-box {
  cursor: auto;
  background-color: rgb(0 0 0 / 10%);
  box-shadow: 1px 1px 2px 0px rgba(169, 169, 169, 0.74118);
}
</style>
