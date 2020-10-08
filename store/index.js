import Vue from 'vue';
import md5 from 'md5';

export const state = () => ({
  user: null,
});

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user;
  },
  UNSET_USER: (state) => {
    state.user = null;
  },
};

export const actions = {
  async nuxtServerInit({ dispatch }, { res }) {
    if (res && res.locals && res.locals.user) {
      const {
        allClaims: claims,
        idToken: token,
        ...authUser
      } = res.locals.user;

      await dispatch('onAuthStateChangedAction', {
        authUser,
        claims,
        token,
      });
    }
  },

  onAuthStateChangedAction({ commit, state }, { authUser, claims }) {
    if (!authUser) {
      commit('UNSET_USER');
      if (state.user !== null) {
        Vue.prototype.$nuxt.$router.push({ path: '/authenticate' });
      }
      return;
    }

    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser;

    commit('SET_USER', {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL: photoURL || null, // results in photoURL being undefined for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.custom_claim,
    });
  },
};

export const getters = {
  userPhotoURL: ({ user }) => {
    if (user === null) {
      return null;
    }
    return `https://s.gravatar.com/avatar/${md5(user.email)}?s=120`;
  },
  userDisplayName: ({ user }) => {
    if (user === null) {
      return 'Unknown';
    }
    return user.displayName;
  },
};
