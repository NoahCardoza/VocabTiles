<template>
  <div class="flex flex-column justify-center items-center vh-100 vw-100">
    <h1 class="title">Vocab Tiles</h1>
    <div class="ph3 w-100" style="max-width: 600px">
      <vs-card ref="loginBox">
        <div class="ph2 pt2">
          <div v-show="scanQRCode" class="vs-card--header">
            <h3>QR Scanner</h3>
          </div>
          <div v-show="scanQRCode">
            Hold up your phone to your camera to scan the QR code your teacher
            gave you.
          </div>
          <vs-tabs v-show="!scanQRCode" v-model="openTabIndex">
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
            <!-- <vs-tab label="Sign Up">
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
              </vs-tab> -->
          </vs-tabs>
          <div>
            <vs-button v-show="!scanQRCode" class="w-100" @click="submit">
              {{ buttonText }}
            </vs-button>
          </div>
          <qrcode-stream
            v-show="scanQRCode"
            class="mt3 br4 overflow-hidden shadow-1"
            @decode="onQRDecode"
          ></qrcode-stream>
        </div>
        <div slot="footer">
          <!-- add about popup / github link / dark mode? -->
          <vs-row vs-justify="flex-end">
            <vs-button
              class="includeIconOnly"
              type="gradient"
              color="success"
              @click="scanQRCode = !scanQRCode"
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
    </div>
  </div>
</template>

<script>
/*
 TODO:
  remove login page and only allow
  admin user to create accounts
*/

import Vue from 'vue';
import IconifyIcon from '@iconify/vue';
import githubIcon from '@iconify/icons-mdi/github';
import qrCodeScanIcon from '@iconify/icons-mdi/qrcode-scan';
import loaderMixin from '@/mixins/loader';

IconifyIcon.addIcon('github', githubIcon);
IconifyIcon.addIcon('qr-scan', qrCodeScanIcon);

export default Vue.extend({
  components: {
    IconifyIcon,
  },
  mixins: [loaderMixin],
  data() {
    return {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      openTabIndex: 0,
      scanQRCode: false,
    };
  },
  computed: {
    buttonText() {
      return !this.openTabIndex ? 'Sign In' : 'Register';
    },
  },
  methods: {
    onQRDecode(message) {
      // ignore false positives
      if (!message) {
        return;
      }

      try {
        const [email, password] = JSON.parse(message);

        this.email = email;
        this.password = password;

        this.loginUser();
      } catch (e) {
        this.$vs.notify({
          title: 'Error',
          text: 'This QR Code was unabled to be scanned.',
          color: 'warning',
          position: 'top-right',
          icon: 'error',
        });
      }
    },
    submit() {
      [this.loginUser, this.createUser][this.openTabIndex]();
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
        });

        await this.$fireAuth.signOut();

        await this.loginUser();
      } catch (e) {
        this.$vs.notify({
          title: 'Error',
          text: e.message,
          color: 'warning',
          position: 'top-right',
          icon: 'error',
        });
      }
    },
    async loginUser() {
      const loader = this.$loader(this.$refs.loginBox.$el);
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
          loader.close();
          this.$router.push({ path: '/' });
        }, 1000);
      } catch (e) {
        this.$vs.notify({
          title: 'Error',
          text: e.message,
          color: 'warning',
          position: 'top-right',
          icon: 'error',
        });
      }
      loader.close();
    },
  },
});
</script>

<style lang="css" scoped>
.vs-card--header,
.vs-tabs--content {
  padding: 0;
}

.vs-card--header {
  padding-bottom: 10px;
}

.con-ul-tabs .vs-button,
input,
.vs-input {
  width: 100%;
}
</style>
