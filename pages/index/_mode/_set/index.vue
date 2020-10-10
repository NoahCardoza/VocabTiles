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
  async asyncData({ route, $content }) {
    const { modes } = await $content('/modes').fetch();
    const { quizes } = await $content('/quizes').fetch();
    const selection = route.params.set.split(',');
    const tiles = quizes
      .filter(({ title }) => selection.includes(toSlug(title)))
      .reduce(
        (collecter, { type, tiles }) => [
          ...collecter,
          ...tiles.map((tile) => ({ type, ...tile })),
        ],
        []
      );
    return {
      modes,
      modeSlugs: modes.map(toSlug),
      tiles,
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
  beforeDestroy() {},
  methods: {},
};
</script>
