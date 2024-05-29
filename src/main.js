// import { createApp } from 'vue'
// import Vue from 'vue';
// import App from './App.vue'
// import store from './store'
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';

// Vue.use(Vuetify);

// createApp(App).use(store).mount('#app')


// src/main.js
// import Vue from 'vue';
// import App from './App.vue';
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';
// import store from './store';

// Vue.use(Vuetify);

// new Vue({
//   vuetify: new Vuetify(),
//   store,
//   render: h => h(App)
// }).$mount('#app');


import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Import your Vuex store
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify CSS
import { createVuetify } from 'vuetify'; // Import createVuetify from Vuetify
import * as components from 'vuetify/lib/components'; // Import Vuetify components from vuetify/lib
import * as directives from 'vuetify/lib/directives'; // Import Vuetify directives from vuetify/lib
import '@mdi/font/css/materialdesignicons.css';



const vuetify = createVuetify({
    components,
    directives,
  });

const app = createApp(App);

app.use(vuetify);
app.use(store);

app.mount('#app');
