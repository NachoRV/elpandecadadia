import { createApp } from 'vue';
// import firebase from 'firebase';
// import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';

/**
 *
 * firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  store.dispatch('fetchUser', user);
});

 *
*/

createApp(App).use(store).use(router).mount('#app');
