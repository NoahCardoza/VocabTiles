<template>
  <div class="ph3" style="width: 50vh; max-width: 800px">
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
    return {
      modes,
    };
  },
  methods: {
    numberOfTilesFromIndex(index) {
      return index === 1 ? 2 : index;
    },
    playMode(index) {
      const slug = toSlug(this.modes[index]);
      this.$router.push({
        path: `/${slug}/colors`,
      });
    },
  },
};
</script>

<style scoped>
.vs-con-table >>> .vs-table--tbody-table {
  min-width: 0px !important;
}
</style>
