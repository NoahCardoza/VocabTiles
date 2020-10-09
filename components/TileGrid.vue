<template>
  <div :disabled="disabled">
    <div v-for="row in rows" :key="row" class="flex justify-center">
      <div
        v-for="col in columns"
        :key="col"
        class="flex ma1 justify-center items-center tile-box"
        :disabled="!tile(row, col)"
        :style="{
          width: boxScale + '%',
        }"
      >
        <component
          :is="type"
          v-if="!disabled && tile(row, col)"
          v-bind="tile(row, col)"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
// %
const SIZE_OPTIONS = ['sm', 'md', 'lg'];
const SIZE_MULTIPLIERS = {
  sm: 5,
  md: 2,
  lg: 1,
};

export default {
  components: {
    color: () => import('@/components/tiles/Color'),
  },
  props: {
    mode: {
      required: true,
      type: Number,
    },
    size: {
      required: true,
      type: String,
      validator(value) {
        return SIZE_OPTIONS.includes(value);
      },
    },
    disabled: {
      default: false,
      required: false,
      type: Boolean,
    },
    tiles: {
      default: null,
      required: false,
      type: Array,
    },
  },
  data() {
    return {
      type: 'color',
    };
  },
  computed: {
    rows() {
      return this.mode;
    },
    columns() {
      return this.mode === 1 ? 2 : this.mode;
    },
    boxClass() {
      return `tile-box-${this.size}`;
    },
    numberOfBoxes() {
      return Math.pow(2, this.mode);
    },
    sizeMultiplyer() {
      return SIZE_MULTIPLIERS[this.size];
    },
    boxScale() {
      return 100 / this.sizeMultiplyer / this.mode;
    },
  },
  methods: {
    tile(row, col) {
      const start = (row - 1) * this.columns;
      return this.tiles && this.tiles[start + col - 1];
    },
  },
};
</script>

<style scoped>
.tile-box {
  cursor: pointer;
  border-radius: 10%;
  box-shadow: 2px 2px 2px 0px rgba(169, 169, 169, 0.74118);
  overflow: hidden;
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
