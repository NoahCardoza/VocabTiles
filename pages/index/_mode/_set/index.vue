<template>
  <div class="ph3 w-100" style="max-width: 800px">
    <TileGrid
      ref="quiz"
      :mode="modeIndex + 1"
      size="lg"
      :tiles="tiles"
      @complete="onComplete"
    />
  </div>
</template>

<script>
import TileGrid from '@/components/TileGrid';
import toSlug from '@/utils/toSlug';
import loaderMixin from '@/mixins/loader';
export default {
  name: 'Game',
  components: { TileGrid },
  mixins: [loaderMixin],
  async asyncData({ route, $content }) {
    const { modes } = await $content('/modes').fetch();
    const { quizzes } = await $content('/quizzes').fetch();
    const selection = route.params.set.split(',');
    const sections = quizzes.filter(({ title }) =>
      selection.includes(toSlug(title))
    );
    const quizSets = sections.map((s) => s.title);
    const tiles = sections.reduce(
      (collecter, { type, tiles }) => [
        ...collecter,
        ...tiles.map((tile) => ({ type, ...tile })),
      ],
      []
    );
    return {
      modes,
      quizSets,
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
  methods: {
    async onComplete(answers) {
      const loading = this.$loader(this.$refs.quiz.$el);
      try {
        await this.$axios.put('/api/quiz', answers);
      } catch (e) {
        // TODO: notify the user that the quiz failed to save
        // TODO: save to local storage and upload later?
      }

      loading.close();

      // TODO: show user thier stats
      this.$router.push({ path: '/' });
    },
  },
};
</script>
