<template>
  <div class="login-card-parent">
    <vs-row>
      <vs-col
        class="login-card"
        vs-offset="4"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="4"
      >
        <vs-card>
          <div>
            <vs-tabs v-model="openTabIndex">
              <vs-tab label="Login">
                <vs-input
                  v-model="email"
                  block
                  size="large"
                  placeholder="Email"
                  class="pt3"
                />
                <vs-input
                  v-model="password"
                  block
                  size="large"
                  placeholder="Password"
                  class="pt3 pb3"
                />
              </vs-tab>
              <vs-tab label="Sign Up">
                <vs-input
                  v-model="firstname"
                  block
                  size="large"
                  placeholder="First Name"
                  class="pt3"
                />
                <vs-input
                  v-model="lastname"
                  block
                  size="large"
                  placeholder="Last Name"
                  class="pt3"
                />
                <vs-input
                  v-model="email"
                  block
                  size="large"
                  placeholder="Email"
                  class="pt3"
                />
                <vs-input
                  v-model="password"
                  block
                  size="large"
                  placeholder="Password"
                  class="pt3 pb3"
                />
              </vs-tab>
            </vs-tabs>
            <div class="ph3">
              <vs-button class="w-100" @click="submit">
                {{ buttonText }}
              </vs-button>
            </div>
          </div>
          <div slot="footer">
            <!-- add about popup / github link / dark mode? -->
            <vs-row vs-justify="flex-end">
              <vs-button
                class="includeIconOnly"
                type="gradient"
                color="success"
              >
                <iconify-icon class="iconify" icon="qr-scan" />
              </vs-button>
              <vs-button
                class="includeIconOnly"
                color="#24292e"
                color-text="white"
                href="https://github.com/NoahCardoza/VocabTiles"
                target="_blank"
              >
                <iconify-icon class="iconify" icon="github" />
              </vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import IconifyIcon from '@iconify/vue';
import githubIcon from '@iconify/icons-mdi/github';
import qrCodeScanIcon from '@iconify/icons-mdi/qrcode-scan';

IconifyIcon.addIcon('github', githubIcon);
IconifyIcon.addIcon('qr-scan', qrCodeScanIcon);



export default Vue.extend({
  components: {IconifyIcon},
  props: {},
  data() {
    return {
      email: 'noahcardoza@gmail.com',
      password: '1234567',
      firstname: 'Noah',
      lastname: 'Cardoza',
      openTabIndex: 0
    };
  },
  computed: {
    buttonText() {
      return !this.openTabIndex ? 'Sign In' : 'Register';
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    submit(){
      [this.loginUser, this.createUser][this.openTabIndex]()
    },
    async createUser() {
      try {
        const { user } = await this.$fireAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );

        if (!user) {
          return; // TODO: handle error
        }

        await user.updateProfile({
          displayName: `${this.firstname} ${this.lastname}`,
          // photoURL: `https://s.gravatar.com/avatar/${md5(this.email)}`,
        });

        await this.$fireAuth.signOut();

        await this.loginUser();
      } catch (e) {
        // TODO: handle these errors with notifications
        alert(e);
      }
    },
    async loginUser() {
      try {
        const { user } = await this.$fireAuth.signInWithEmailAndPassword(
          this.email,
          this.password
        );

        if (!user) {
          return; // TODO: handle error
        }

        // it seems trying to push the path too soon get's blocked by the
        // auth gaurd middleware
        setTimeout(() => {
          this.$router.push({ path: '/' });
        }, 1000);
      } catch (e) {
        // TODO: handle these errors with notifications
        alert(e);
      }
    },
  },
});
</script>

<style lang="css" scoped>
.login-card-parent {
  position: relative;
  height: 100vh;
}
.login-card {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.con-ul-tabs .vs-button,
.login-card input,
.login-card .vs-input {
  width: 100%;
}
</style>
