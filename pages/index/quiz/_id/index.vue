<template>
  <div>
    <template lang="html">
      <div>
        <vs-table :data="quiz.answers">
          <template slot="header">
            <h3 class="ma2">Quiz Results</h3>
          </template>
          <template slot="thead">
            <vs-th>Category</vs-th>
            <vs-th>Question</vs-th>
            <vs-th>Correct</vs-th>
            <vs-th>Image</vs-th>
          </template>

          <template slot-scope="{ data }">
            <vs-tr v-for="(tr, i) in data" :key="i">
              <vs-td :data="data[i].category">
                {{ data[i].category }}
              </vs-td>

              <vs-td :data="data[i].text">
                {{ data[i].text }}
              </vs-td>

              <vs-td :data="data[i].correct">
                <vs-checkbox
                  v-model="data[i].correct"
                  color="success"
                  @click.native="() => false"
                ></vs-checkbox>
              </vs-td>
              <vs-td :data="data[i].id"></vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'QuizResults',
  components: {},
  async asyncData({ $axios, params }) {
    return {
      quiz: await $axios.$get(`/api/user/quiz/${params.id}`),
    };
  },
  methods: {},
};
</script>

<style lang="css" scoped></style>
