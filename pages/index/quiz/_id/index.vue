<template>
  <div>Quiz Results</div>
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
