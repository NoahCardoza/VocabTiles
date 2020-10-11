<template>
  <div :disabled="disabled">
    <overlay v-show="!disabled && isOverlayOpen">
      <div class="flex justify-center items-center h-100">
        <div
          style="
            height: 100px;
            background-color: white;
            box-shadow: 0px 0px 19px 0px #00000070;
          "
          class="w-100 flex justify-center items-center"
        >
          <vs-button style="width: 300px" @click="closeOverlay">
            Begin
          </vs-button>
        </div>
      </div>
    </overlay>
    <div
      v-for="row in rows"
      v-show="disabled || !isOverlayOpen"
      :key="row"
      class="flex justify-center"
    >
      <div
        v-for="col in columns"
        :key="col"
        class="flex ma1 justify-center items-center tile-box"
        :disabled="!tile(row, col)"
        :style="{
          width: boxScale + '%',
        }"
        @click="onTileClick($event, tile(row, col))"
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
  sm: 5,
  md: 2,
  lg: 1,
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
      isOverlayOpen: true,
      type: 'color',
      localTiles: tiles,
      progress: 0,
      tileOrder: tiles,
      animating: false,
      answers: {
        correct: [],
        incorrect: [],
      },
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
      return (this.tileOrder && this.tileOrder[this.progress]) || null;
    },
    currentTileText() {
      const tile = this.currentTile;
      return (tile && tile.text) || null;
    },
  },
  methods: {
    closeOverlay() {
      this.isOverlayOpen = false;
      this.playAudio();
    },
    playAudio() {
      // eslint-disable-next-line camelcase
      const { ql_audio } = this.currentTile;
      const { audioCache } = this;

      if (!audioCache[ql_audio]) {
        audioCache[ql_audio] = new Audio(this.currentTile.ql_audio);
      }

      const audio = audioCache[ql_audio];
      audio.autoplay = true;
      audio.muted = true;
      audio.play();
      audio.muted = false;
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
      return (this.localTiles && this.localTiles[start + col - 1]) || null;
    },

    onTileClick({ target }, tile) {
      if (this.disabled || this.animating) return;
      const isCorrect = this.currentTileText === tile.text;
      const animationClass = isCorrect ? 'pulse-success' : 'pulse-danger';
      this.answers[isCorrect ? 'correct' : 'incorrect'].push({
        text: this.currentTileText,
        category: this.currentTile.type,
      });
      this.animating = true;
      target.parentElement.classList.add(animationClass);
      setTimeout(() => {
        this.progress++;
        if (!this.currentTileText) {
          return this.$emit('complete', this.answers);
        }
        target.parentElement.classList.remove(animationClass);
        this.shuffle();
        this.animating = false;
        this.playAudio();
      }, 1300);
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

.tile-box {
  cursor: pointer;
  background-color: #fff;
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
