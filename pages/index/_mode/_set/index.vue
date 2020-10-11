<template>
  <div class="ph3 w-100" style="max-width: 800px">
    <client-only>
      <vs-popup
        v-if="!disabled"
        title="Are you ready?"
        :active.sync="isOverlayOpen"
        button-close-hidden
      >
        <div class="flex justify-center items-center h-100">
          <vs-button style="width: 300px" @click="isOverlayOpen = false">
            Begin
          </vs-button>
        </div>
      </vs-popup>
    </client-only>
    <TileGrid
      ref="quiz"
      :mode="modeIndex + 1"
      size="lg"
      :tiles="tiles"
      @complete="onComplete"
      @answered="onAnswered"
      @next="onNext"
    />
    <div class="flex items-center justify-between w-100 mv3">
      <vs-button icon="navigate_before" @click="$router.go(-1)">Back</vs-button>
      <CountDown
        v-model="timer"
        :total="timeout"
        :pause="pauseTimer"
        @timeout="onTimeout"
      />
      <vs-button icon="replay" @click="replayAudio">Replay</vs-button>
    </div>
  </div>
</template>

<script>
import TileGrid from '@/components/TileGrid';
import CountDown from '@/components/CountDown';
import toSlug from '@/utils/toSlug';
import loaderMixin from '@/mixins/loader';

const TIME_PER_TILE = 5;

export default {
  name: 'Game',
  components: { TileGrid, CountDown },
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
  data() {
    return {
      timeout: TIME_PER_TILE,
      timer: TIME_PER_TILE,
      pauseTimer: true,
      isOverlayOpen: true,
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
  created() {
    const unwatchIsOverlayOpen = this.$watch('isOverlayOpen', () => {
      unwatchIsOverlayOpen();
      this.replayAudio();
      this.pauseTimer = false;
    });
  },
  methods: {
    onTimeout() {
      this.timer = TIME_PER_TILE;
      this.pauseTimer = true;
      const { quiz } = this.$refs;
      quiz.animateTile(null, quiz.currentTileEl);
    },
    replayAudio() {
      this.$refs.quiz.playAudio();
    },
    onAnswered() {
      this.timer = TIME_PER_TILE;
      this.pauseTimer = true;
    },
    onNext() {
      this.pauseTimer = false;
    },
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
