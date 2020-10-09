<template>
  <div class="ph3 w-100" style="max-width: 800px">
    <TileGrid :mode="modeIndex + 1" size="lg" :tiles="tiles" />
  </div>
</template>

<script>
import TileGrid from '@/components/TileGrid';
import toSlug from '@/utils/toSlug';

export default {
  name: 'Game',
  components: { TileGrid },
  props: {},
  async asyncData({ $content }) {
    const { modes } = await $content('/modes').fetch();
    return {
      modes,
      modeSlugs: modes.map(toSlug),
    };
  },
  data() {
    return {
      tiles: [
        {
          name: 'white',
          hex: '#000',
        },
        {
          name: 'black',
          hex: '#fff',
        },
      ],
    };
  },
  computed: {
    modeIndex() {
      const { mode } = this.$route.params;
      return this.modeSlugs.indexOf(mode);
    },
    mode() {
      return this.modes[this.modeIndex];
    },
  },
  mounted() {
    console.log(this.modes, this.tiles);
  },
  beforeDestroy() {},
  methods: {},
};
</script>
