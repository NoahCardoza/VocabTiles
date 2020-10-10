export default {
  methods: {
    $loader(container, options) {
      this.$vs.loading({
        container,
        ...(options || {}),
      });
      return {
        close: () => this.$vs.loading.close(container),
      };
    },
  },
};
