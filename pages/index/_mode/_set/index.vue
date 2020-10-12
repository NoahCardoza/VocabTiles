<template>
  <div class="ph3 w-100" style="max-width: 800px">
    <client-only>
      <vs-popup
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
      :mode="modeId"
      size="lg"
      :tiles="tiles"
      @complete="onComplete"
      @answered="onAnswered"
      @next="onNext"
    />
    <div class="flex items-center justify-between w-100 mt3">
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
  async asyncData({ params, $content, $axios }) {
    const { modes } = await $content('/modes').fetch();

    const categories = await $axios.$get(`/api/quiz/${params.set}`);
    const tiles = categories.flatMap((c) => c.tiles);
    console.log(tiles);
    return {
      modes,
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
      answers: [],
    };
  },
  computed: {
    modeIndex() {
      const { mode } = this.$route.params;
      return this.modeSlugs.indexOf(mode);
    },
    modeId() {
      return this.modeIndex + 1;
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

      this.answers.push({
        question_id: quiz.currentTile.id,
        correct: false,
      });

      quiz.animateTile(null, quiz.currentTileEl);
    },
    replayAudio() {
      this.$refs.quiz.playAudio();
    },
    onAnswered({ id, correct }) {
      this.timer = TIME_PER_TILE;
      this.pauseTimer = true;
      this.answers.push({ question_id: id, correct });
    },
    onNext() {
      this.pauseTimer = false;
    },
    async onComplete() {
      const loading = this.$loader(this.$refs.quiz.$el);
      try {
        const { id } = await this.$axios.$post('/api/user/quiz', {
          mode: this.modeId,
          answers: this.answers,
        });

        this.$router.push({ path: `/quiz/${id}` });
      } catch (e) {
        // TODO: notify the user that the quiz failed to save
        // TODO: save to local storage and upload later?
      }

      loading.close();
    },
  },
};
</script>
