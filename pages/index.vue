<template>
  <div class="flex flex-column items-center">
    <div class="mt4">
      <vs-avatar
        :text="userDisplayName"
        size="120px"
        :src="userPhotoURL"
        @click="$fireAuth.signOut()"
      />
    </div>
    <h1 class="title">Vocab Tiles</h1>
    <nuxt-child />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {},
  computed: mapGetters(['userPhotoURL', 'userDisplayName']),
};
</script>

<style>
.blank-tile {
  height: 50px;
  width: 50px;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.subtext {
  font-weight: 300;
  font-size: 1.1rem;
  color: #526488;
  word-spacing: 2px;
  max-width: 600px;
}

.subtext a {
  font-weight: 500;
  color: inherit;
}

.links {
  padding-top: 15px;
  margin-bottom: 20px;
}

.content-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
}

.plus {
  font-size: 2.5rem;
  margin: 15px;
  color: #35495e;
}

.h3 {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  margin: 10px;
}

.vs-avatar--text {
  font-size: 3rem;
}
</style>
