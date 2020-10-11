<template>
  <div class="flex flex-column items-center mv2">
    <vs-avatar
      :text="userDisplayName"
      size="80px"
      :src="userPhotoURL"
      @click="$fireAuth.signOut()"
    />
    <h1 class="title">Vocab Tiles</h1>
    <nuxt-child />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['userPhotoURL', 'userDisplayName']),
};
</script>

<style>
.vs-avatar--text {
  font-size: 3rem;
}
</style>
