// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueTouch from 'vue-touch';
import VueContenteditable from 'vue-contenteditable-directive';
import App from './App';

Vue.use(VueTouch, { name: 'v-touch' });
Vue.use(VueContenteditable);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
