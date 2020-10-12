<template>
  <div class="ph3" style="width: 50vh; max-width: 800px">
    <vs-popup
      title="Which sets would you like to practice?"
      :active.sync="isPopupOpen"
    >
      <div>
        <div v-for="quizSet in quizSets" :key="quizSet">
          <vs-checkbox
            v-model="selectedQuizSets"
            :vs-value="quizSet"
            style="justify-content: normal"
          >
            {{ quizSet }}
          </vs-checkbox>
        </div>
        <vs-button
          color="success"
          type="filled"
          class="mv3 w-100"
          @click="onStartQuiz"
        >
          Start
        </vs-button>
      </div>
    </vs-popup>
    <div class="vs-component vs-con-table stripe vs-table-primary">
      <table class="vs-con-table vs-table vs-table--tbody-table">
        <thead class="vs-table--thead">
          <tr>
            <th width="auto">
              <div class="w-100 pa3" style="text-align: center">Mode</div>
            </th>
            <th width="100%">
              <div class="w-100 pa3" style="text-align: center">Preview</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(mode, index) in modes"
            :key="mode"
            class="tr-values vs-table--tr tr-table-state-null"
            @click="playMode(index)"
          >
            <td class="td vs-table--td">
              <div class="flex justify-center items-center w-100 h-100">
                <span class="subtext pa3">{{ mode }}</span>
              </div>
            </td>
            <td class="td vs-table--td">
              <TileGrid
                class="flex flex-column"
                :mode="index + 1"
                size="sm"
                disabled
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TileGrid from '@/components/TileGrid';
import toSlug from '@/utils/toSlug';

export default {
  components: { TileGrid },
  async asyncData({ $content }) {
    const { modes } = await $content('/modes').fetch();
    const { quizzes } = await $content('/quizzes').fetch();

    return {
      modes,
      quizSets: quizzes.map(({ category }) => category),
    };
  },
  data() {
    return {
      isPopupOpen: false,
      modeSlug: null,
      selectedQuizSets: null,
    };
  },
  methods: {
    numberOfTilesFromIndex(index) {
      return index === 1 ? 2 : index;
    },
    playMode(index) {
      this.modeSlug = toSlug(this.modes[index]);
      this.selectedQuizSets = [this.quizSets[0]];
      this.isPopupOpen = true;
    },
    onStartQuiz() {
      // TODO: verify the list isn't empty
      const sets = this.selectedQuizSets.map(toSlug).join(',');
      this.$router.push({
        path: `/${this.modeSlug}/${sets}`,
      });
    },
  },
};
</script>

<style scoped>
.subtext {
  font-weight: 300;
  font-size: 1.1rem;
  color: #526488;
  word-spacing: 2px;
  max-width: 600px;
}

.con-vs-popup >>> .vs-popup {
  max-width: 300px;
}
.vs-con-table >>> .vs-table--tbody-table {
  min-width: 0px !important;
}
</style>
