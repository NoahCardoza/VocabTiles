<template>
  <div :disabled="disabled">
    <div v-for="row in rows" :key="row" class="tile-row">
      <div
        v-for="col in columns"
        :key="col"
        ref="tiles"
        class="tile-box"
        :disabled="!tile(row, col)"
        :style="{
          width: boxScale + '%',
        }"
        @click="onTileClick(tile(row, col))"
      >
        <component
          :is="`vt-${tile(row, col).type}`"
          v-if="!disabled && tile(row, col)"
          v-bind="tile(row, col)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle';
import cloneDeep from 'lodash/cloneDeep';

const SIZE_OPTIONS = ['sm', 'md', 'lg'];
const SIZE_MULTIPLIERS = {
  sm: 2.5,
  lg: 0.8,
};

export default {
  components: {
    overlay: () => import('@/components/Overlay'),
    'vt-color': () => import('@/components/tiles/Color'),
    'vt-text': () => import('@/components/tiles/Text'),
    'vt-image': () => import('@/components/tiles/Image'),
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
  serverPrefetch() {
    // use store to pass SSR rendered order of tiles
    this.$store.commit('SET_PRESHUFFLE', this.localTiles);
  },
  data() {
    // don't resuffle right after SSR
    let { tiles } = this.$store.state;

    if (!tiles) {
      tiles = (this.tiles && shuffle(cloneDeep(this.tiles))) || null;
    } else {
      this.$store.commit('UNSET_PRESHUFFLE');
    }

    return {
      progress: 0,
      localTiles: tiles,
      tileOrder: tiles,
      animating: false,
      audioCache: {},
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
    currentTile() {
      return (
        (this.tileOrder && {
          el: this.$refs.tiles[this.progress],
          ...this.tileOrder[this.progress],
        }) ||
        null
      );
    },
    currentTileText() {
      const tile = this.currentTile;
      return (tile && tile.text) || null;
    },
    currentTileEl() {
      const tile = this.currentTile;
      if (tile) {
        const index = this.localTiles.findIndex(
          ({ text }) => text === tile.text
        );
        return this.$refs.tiles[index];
      }

      return null;
    },
  },
  methods: {
    playAudio() {
      const audio = new Audio(this.currentTile.audio);
      audio.play();
    },

    shuffle() {
      const tiles = shuffle(this.localTiles);
      const requiredTileIndex = tiles.findIndex(
        (tile) => tile.text === this.currentTileText
      );
      if (this.numberOfBoxes <= requiredTileIndex) {
        const swapIndex = Math.floor(Math.random() * this.numberOfBoxes);
        [tiles[requiredTileIndex], tiles[swapIndex]] = [
          tiles[swapIndex],
          tiles[requiredTileIndex],
        ];
      }
      this.localTiles = tiles;
    },

    tile(row, col) {
      const start = (row - 1) * this.columns;
      const index = start + col - 1;

      return (
        (this.localTiles &&
          this.localTiles[index] && {
            el: this.$refs.tiles && this.$refs.tiles[index],
            ...this.localTiles[index],
          }) ||
        null
      );
    },

    onTileClick(tile) {
      if (this.disabled || this.animating) return;
      const isCorrect = this.currentTileText === tile.text;

      this.$emit('answered', {
        ...this.currentTile,
        correct: isCorrect,
      });

      if (isCorrect) {
        this.animateTile(tile.el);
      } else {
        this.animateTile(this.currentTileEl, tile.el);
      }
    },

    animateTile(correctEl, incorrectEl) {
      this.animating = true;
      correctEl && correctEl.classList.add('pulse-success');
      incorrectEl && incorrectEl.classList.add('pulse-danger');

      setTimeout(() => {
        this.progress++;

        if (!this.currentTileText) {
          return this.$emit('complete');
        }

        correctEl && correctEl.classList.remove('pulse-success');
        incorrectEl && incorrectEl.classList.remove('pulse-danger');
        this.animating = false;

        this.shuffle();
        this.$emit('next');
        this.playAudio();
      }, 1000);
    },
  },
};
</script>

<style scoped>
@keyframes pulse-success {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 10px 5px rgba(0, 156, 52, 0.5);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
  }
}

@keyframes pulse-danger {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 10px 5px rgba(255, 1, 13, 0.5);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
  }
}

.pulse-success {
  background: rgba(0, 156, 52, 0.5);
  box-shadow: 0 0 0 0 rgba(0, 156, 52, 0.5);
  animation: pulse-success 1.3s;
}

.pulse-danger {
  background: rgba(255, 1, 13, 0.5);
  box-shadow: 0 0 0 0 rgba(255, 1, 13, 0.5);
  animation: pulse-danger 1.3s;
}
.tile-row {
  display: flex;
  justify-content: center;
}

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
