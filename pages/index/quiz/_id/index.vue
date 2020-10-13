<template>
  <div>
    <vs-table
      :data="quiz.answers"
      stripe
      style="width: 100vw; max-width: 600px; margin-bottom: -0.5rem"
      class="shadow-1"
    >
      <template slot="header">
        <div style="width: 33.33%">
          <vs-button
            class="ml3"
            icon="navigate_before"
            radius
            size="small"
            @click="$router.push({ path: '/' })"
          ></vs-button>
        </div>
        <h3 style="width: 33.33%; text-align: center" class="ma3">
          Quiz Results
        </h3>
        <div
          v-resize-text="{
            maxFontSize: 100,
            minFontSize: 10,
            delay: 100,
          }"
          style="width: 33.33%; text-align: right"
          class="ma3"
        >
          {{ correct }}/{{ total }} ({{ percentage }}%)
        </div>
      </template>
      <template slot="thead">
        <vs-th width="25%">Category</vs-th>
        <vs-th width="50%" class="justify-left">Question</vs-th>
        <vs-th width="25%">Tile</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr v-for="(tr, i) in data" :key="i">
          <vs-td :data="data[i].category">
            {{ data[i].title }}
          </vs-td>

          <vs-td
            class="justify-left stretch-chip items-center h-100"
            :data="data[i].text"
          >
            <div
              class="con-vs-chip w-100 vs-chip-null closable"
              style="color: rgba(0, 0, 0, 0.7); justify-content: space-between"
            >
              <vs-avatar icon="volume_up" @click="playAudio(data[i])" />
              <div>
                {{ data[i].text }}
              </div>

              <button
                type="button"
                class="btn-close vs-chip--close"
                style="pointer-events: none; background: transparent"
              >
                <i
                  class="vs-icon notranslate icon-scale material-icons null"
                  :style="{
                    color: `rgb(var(${
                      data[i].correct ? '--vs-success' : '--vs-danger'
                    }))`,
                  }"
                >
                  {{
                    data[i].correct ? 'check_circle_outline' : 'highlight_off'
                  }}
                </i>
              </button>
            </div>
          </vs-td>
          <vs-td :data="data[i].id">
            <div style="display: flex; justify-content: center" class="w-100">
              <Tile class="tile-preview" :tile="data[i]" />
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import Tile from '@/components/tiles/Tile';

export default {
  name: 'QuizResults',
  components: { Tile },
  async asyncData({ $axios, params }) {
    return {
      quiz: await $axios.$get(`/api/user/quiz/${params.id}`),
    };
  },
  computed: {
    total() {
      return this.quiz.answers.length;
    },
    correct() {
      return this.quiz.answers.filter((q) => q.correct).length;
    },
    percentage() {
      return Math.round((this.correct / this.total) * 100);
    },
  },
  methods: {
    playAudio({ audio }) {
      const player = new Audio(audio);
      player.play();
    },
  },
};
</script>

<style lang="css" scoped>
.tile-preview {
  pointer-events: none;
  width: 3vw;
  min-width: 32px;
}

.vs-con-table >>> .vs-table--tbody-table {
  min-width: unset;
}

.vs-con-table >>> .vs-table-text {
  padding: 10px;
}

.vs-con-table >>> .vs-table-text,
.vs-con-table >>> td span {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vs-con-table >>> .stretch-chip span {
  width: 100%;
}

.vs-con-table >>> .vs-table--tbody-table .tr-values td {
  margin: 0;
}
</style>
