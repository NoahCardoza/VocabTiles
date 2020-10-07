import Vue from 'vue';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

/* 
  TODO: while global imports are fine for a hackathon, we should make sure
  to import only the components we need later on. There might be a smart way
  to configure webpack to do this but I can't remember at the moment.
*/

Vue.use(Vuesax);
