const shouldAttachToken = ({ baseURL, url, headers }) =>
  (process.server || `${location.origin}/` === baseURL) &&
  url.startsWith('/api') &&
  headers != null &&
  headers['X-Requested-With'] == null;

export default ({ $axios, $fireAuth }) => {
  $axios.onRequest(async (config) => {
    if ($fireAuth.currentUser && shouldAttachToken(config)) {
      config.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${await $fireAuth.currentUser.getIdToken()}`,
        ...config.headers,
      };
    }
    return config;
  });
};
